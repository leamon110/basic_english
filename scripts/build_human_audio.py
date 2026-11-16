#!/usr/bin/env python3
"""Acquire licensed human English word recordings from Wikimedia Commons.

Reads the exact 850-word arrays in docs/js/data.js, matches American-English
recordings from vetted Lingua Libre speakers and Wiktionary's En-us files,
checks each file's Commons licence/author metadata, and optionally converts
the recordings to compact mono MP3 files for the Android APK.
"""
from __future__ import annotations

import argparse
import collections
import html
import json
import os
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

API = "https://commons.wikimedia.org/w/api.php"
USER_AGENT = "BasicEnglishHumanAudio/1.0 (offline word-pronunciation asset build; contact via GitHub repository)"
# These speakers are identified by the source projects as General American.
# Prefer Wodencafe for consistency; other speakers are fallbacks for uncovered words.
SPEAKERS = [
    ("Wodencafe", ["Wodencafe"]),
    ("Grendelkhan", ["Grendelkhan"]),
    ("Naomi Persephone Amethyst (NaomiAmethyst)", ["NaomiAmethyst", "Naomi Persephone Amethyst (NaomiAmethyst)"]),
    ("She animates", ["She animates"]),
    ("Rachlel", ["Rachlel"]),
    ("Simplificationalizer", ["Simplificationalizer"]),
    ("Semperosculto", ["Semperosculto"]),
    ("Flame, not lame", ["Flame, not lame"]),
    ("Vininn126", ["Vininn126"]),
    ("Persent101", ["Persent101"]),
    ("Qwertygiy", ["Qwertygiy"]),
    ("Neøn", ["Neøn"]),
    ("Sapaa", ["Sapaa"]),
]
ALLOWED_LICENSE_PREFIXES = ("CC BY", "CC0", "Public domain")
POS_SUFFIXES = ("noun", "verb", "adjective", "adj", "adverb")
EXTENSIONS = ("wav", "ogg", "oga", "mp3", "flac", "m4a", "opus")


def norm_word(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace("_", " ").strip()).lower()


def slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def api(params: dict) -> dict:
    query = urllib.parse.urlencode({"format": "json", **params}, doseq=True)
    request = urllib.request.Request(API + "?" + query, headers={"User-Agent": USER_AGENT})
    last_error = None
    for attempt in range(6):
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                payload = json.loads(response.read().decode("utf-8"))
            if "error" in payload:
                raise RuntimeError(payload["error"].get("info", str(payload["error"])))
            return payload
        except Exception as exc:
            last_error = exc
            if attempt == 5:
                break
            time.sleep(min(2 ** attempt, 20))
    raise RuntimeError(f"Wikimedia API request failed: {last_error}")


def paginated_names(params: dict, result_key: str) -> list[str]:
    names: list[str] = []
    continuation = {}
    while True:
        data = api({**params, **continuation})
        rows = data.get("query", {}).get(result_key, [])
        for row in rows:
            name = row.get("name")
            if not name and row.get("title"):
                name = row["title"].split(":", 1)[-1]
            if name:
                names.append(name)
        if "continue" not in data:
            return names
        continuation = data["continue"]
        time.sleep(0.15)


def load_words(path: Path) -> tuple[list[str], dict[str, str]]:
    source = path.read_text(encoding="utf-8")
    words: list[str] = []
    groups: dict[str, str] = {}
    for match in re.finditer(r"const\s+(WORDS_[A-Z0-9_]+)\s*=\s*\[([\s\S]*?)\]", source):
        group = match.group(1)
        entries = re.findall(r'"([^"]+)"', match.group(2))
        for entry in entries:
            word = entry.strip()
            key = norm_word(word)
            if key in groups:
                raise RuntimeError(f"Duplicate word in source list: {word}")
            words.append(word)
            groups[key] = group
    if len(words) != 850 or len({norm_word(w) for w in words}) != 850:
        raise RuntimeError(f"Expected exactly 850 unique source words; found {len(words)}")
    return words, groups


def add_candidate(index: dict, word: str, title: str, speaker: str, priority: int, kind: str, pos: str = ""):
    key = norm_word(word)
    if not key:
        return
    index.setdefault(key, []).append({
        "title": title,
        "speaker": speaker,
        "priority": priority,
        "kind": kind,
        "pos": pos,
    })


def collect_candidates(words: list[str], groups: dict[str, str]) -> dict:
    word_set = {norm_word(w) for w in words}
    index: dict[str, list[dict]] = collections.defaultdict(list)

    # Standard Wiktionary/Commons files named En-us-<word>.<format>.
    en_us_names = paginated_names({
        "action": "query", "list": "allimages", "aiprefix": "En-us-", "ailimit": 500
    }, "allimages")
    for title in en_us_names:
        match = re.match(r"En-us-(.+)\.(" + "|".join(EXTENSIONS) + r")$", title, re.I)
        if not match:
            continue
        body = match.group(1)
        pos = ""
        suffix = re.search(r"-(noun|verb|adjective|adj|adverb)$", body, re.I)
        if suffix:
            pos = suffix.group(1).lower()
            body = body[:suffix.start()]
        key = norm_word(body)
        if key in word_set:
            add_candidate(index, body, title, "", 50, "En-us", pos)

    # Lingua Libre files by vetted American-English speakers.
    for speaker_priority, (speaker, category_aliases) in enumerate(SPEAKERS):
        names = []
        seen_names = set()
        for alias in category_aliases:
            category = f"Category:Lingua Libre pronunciation by {alias}"
            try:
                listed = paginated_names({
                    "action": "query", "list": "categorymembers",
                    "cmtype": "file", "cmtitle": category, "cmlimit": 500
                }, "categorymembers")
            except Exception as exc:
                print(f"[Commons] category unavailable ({category}): {exc}", file=sys.stderr)
                continue
            for name in listed:
                if name not in seen_names:
                    seen_names.add(name)
                    names.append(name)

        for title in names:
            body = None
            for language_prefix in ("LL-Q1860 (eng)-", "LL-Q7976 (mis)-"):
                exact_prefix = language_prefix + speaker + "-"
                if title.startswith(exact_prefix):
                    body = title[len(exact_prefix):]
                    break
            if body is None:
                continue
            body = re.sub(r"\.(" + "|".join(EXTENSIONS) + r")$", "", body, flags=re.I)
            key = norm_word(body)
            if key in word_set:
                add_candidate(index, body, title, speaker, speaker_priority, "Lingua Libre")

    # Keep only a small, ordered candidate set per word. This preserves
    # speaker consistency and limits Commons metadata requests.
    for key in list(index):
        unique = {}
        for candidate in index[key]:
            unique[candidate["title"]] = candidate
        candidates = list(unique.values())
        group = groups.get(key, "")
        pos_hint = "noun" if group in ("WORDS_THINGS_400", "WORDS_THINGS_200") else (
            "adjective" if group in ("WORDS_QUALITIES_100", "WORDS_QUALITIES_50") else ""
        )
        candidates.sort(key=lambda c: (
            c["priority"],
            0 if (not c["pos"] or c["pos"] == pos_hint or (pos_hint == "adjective" and c["pos"] == "adj")) else 1,
            c["title"].lower(),
        ))
        index[key] = candidates[:5]
    return index


def clean_meta(value: str) -> str:
    value = re.sub(r"<br\s*/?>", "\n", value or "", flags=re.I)
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def license_allowed(name: str) -> bool:
    value = clean_meta(name).lower()
    if "noncommercial" in value or "non-commercial" in value or "no derivatives" in value:
        return False
    if "nc" in value.split() or "nd" in value.split():
        return False
    return value == "cc0" or "public domain" in value or value.startswith("cc by")


def fetch_metadata(index: dict) -> dict[str, dict]:
    title_to_candidates = {}
    for candidates in index.values():
        for candidate in candidates:
            title_to_candidates[candidate["title"]] = candidate

    titles = list(title_to_candidates)
    metadata: dict[str, dict] = {}
    for offset in range(0, len(titles), 50):
        batch = titles[offset:offset + 50]
        data = api({
            "action": "query",
            "prop": "imageinfo",
            "iiprop": "url|extmetadata",
            "iiextmetadatafilter": "LicenseShortName|Artist|Credit|LicenseUrl|ImageDescription",
            "titles": "|".join("File:" + title for title in batch),
        })
        for page in data.get("query", {}).get("pages", {}).values():
            infos = page.get("imageinfo") or []
            if not infos:
                continue
            info = infos[0]
            ext = info.get("extmetadata", {})
            title = page.get("title", "").split(":", 1)[-1]
            license_name = clean_meta(ext.get("LicenseShortName", {}).get("value", ""))
            artist = clean_meta(ext.get("Artist", {}).get("value", ""))
            description = clean_meta(ext.get("ImageDescription", {}).get("value", ""))
            candidate = title_to_candidates.get(title)
            if not candidate or not info.get("url") or not license_allowed(license_name):
                continue
            # Lingua Libre is explicitly a human-recording source. For generic
            # En-us files, require a named author and a pronunciation description.
            if candidate["kind"] == "En-us":
                if not artist or "pronounc" not in description.lower():
                    continue
            metadata[title] = {
                **candidate,
                "url": info["url"],
                "license": license_name,
                "license_url": clean_meta(ext.get("LicenseUrl", {}).get("value", "")),
                "artist": artist or candidate["speaker"],
                "description": description,
                "source_page": "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(title.replace(" ", "_")),
            }
        time.sleep(0.2)
        print(f"[Commons] checked metadata {min(offset + len(batch), len(titles))}/{len(titles)}", flush=True)

    selected = {}
    for key, candidates in index.items():
        for candidate in candidates:
            found = metadata.get(candidate["title"])
            if found:
                selected[key] = found
                break
    return selected


def write_report(words: list[str], selected: dict, report_path: Path, manifest_path: Path):
    missing = [word for word in words if norm_word(word) not in selected]
    by_speaker = collections.Counter(
        selected[norm_word(word)].get("speaker") or selected[norm_word(word)].get("artist") or "Unknown"
        for word in words if norm_word(word) in selected
    )
    by_license = collections.Counter(
        selected[norm_word(word)]["license"]
        for word in words if norm_word(word) in selected
    )
    manifest = {
        "total_words": len(words),
        "matched_words": len(selected),
        "missing_words": missing,
        "speakers": dict(by_speaker),
        "licenses": dict(by_license),
        "recordings": {word: selected[norm_word(word)] for word in words if norm_word(word) in selected},
    }
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    report = {
        "total_words": len(words),
        "matched_words": len(selected),
        "missing_count": len(missing),
        "missing_words": missing,
        "speakers": dict(by_speaker),
        "licenses": dict(by_license),
        "complete": not missing,
    }
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print("\n=== HUMAN AUDIO COVERAGE ===")
    print(f"Words in original Basic English list: {len(words)}")
    print(f"Words with verified human recordings and reusable licences: {len(selected)}")
    print(f"Words still missing: {len(missing)}")
    print("Speakers:", json.dumps(dict(by_speaker), ensure_ascii=False))
    print("Licences:", json.dumps(dict(by_license), ensure_ascii=False))
    if missing:
        print("Missing words:", ", ".join(missing))
    output_path = os.environ.get("GITHUB_OUTPUT")
    if output_path:
        with open(output_path, "a", encoding="utf-8") as output:
            output.write(f"complete={'true' if not missing else 'false'}\n")
            output.write(f"matched={len(selected)}\n")
            output.write(f"missing={len(missing)}\n")
    return manifest


def download_and_convert(manifest: dict, output_dir: Path, credits_path: Path):
    if manifest["missing_words"]:
        raise SystemExit(f"Refusing to build: {len(manifest['missing_words'])} of 850 words lack verified human audio.")
    output_dir.mkdir(parents=True, exist_ok=True)
    temp_dir = output_dir.parent / "_audio-originals"
    temp_dir.mkdir(parents=True, exist_ok=True)
    credits = [
        "# Human pronunciation audio credits",
        "",
        "All 850 recordings are human speech from Wikimedia Commons / Lingua Libre.",
        "Each audio item retains the individual licence shown below. Audio was only",
        "re-encoded to mono MP3 (22.05 kHz, 64 kbit/s) for compact offline playback.",
        "",
        "| Word | Speaker / Author | Licence | Original file | Source |",
        "|---|---|---|---|---|",
    ]
    total_bytes = 0
    for number, (word, item) in enumerate(manifest["recordings"].items(), 1):
        extension = Path(urllib.parse.urlparse(item["url"]).path).suffix.lower() or ".wav"
        raw_path = temp_dir / (slug(word) + extension)
        request = urllib.request.Request(item["url"], headers={"User-Agent": USER_AGENT})
        last_error = None
        for attempt in range(6):
            try:
                with urllib.request.urlopen(request, timeout=60) as response:
                    content_type = response.headers.get("Content-Type", "")
                    data = response.read()
                if len(data) < 500 or "text/html" in content_type.lower():
                    raise RuntimeError(f"Not an audio file ({content_type}, {len(data)} bytes)")
                raw_path.write_bytes(data)
                last_error = None
                break
            except Exception as exc:
                last_error = exc
                time.sleep(min(2 ** attempt, 20))
        if last_error:
            raise RuntimeError(f"Download failed for {word} ({item['title']}): {last_error}")

        target = output_dir / (slug(word) + ".mp3")
        command = [
            "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
            "-i", str(raw_path), "-vn", "-ac", "1", "-ar", "22050",
            "-b:a", "64k", "-map_metadata", "-1", str(target),
        ]
        result = subprocess.run(command, capture_output=True, text=True)
        if result.returncode != 0 or not target.exists() or target.stat().st_size < 500:
            raise RuntimeError(f"Audio conversion failed for {word}: {result.stderr[-1000:]}")
        total_bytes += target.stat().st_size
        speaker = item.get("speaker") or item.get("artist") or "Unknown"
        source_title = item["title"].replace("|", "\\|")
        credits.append(
            f"| {word} | {speaker} | {item['license']} | {source_title} | "
            f"[Wikimedia Commons]({item['source_page']}) |"
        )
        if number % 50 == 0:
            print(f"[audio] converted {number}/850 · {total_bytes / 1024 / 1024:.1f} MB", flush=True)
        time.sleep(0.05)

    credits_path.parent.mkdir(parents=True, exist_ok=True)
    credits_path.write_text("\n".join(credits) + "\n", encoding="utf-8")
    # Keep the full machine-readable per-file attribution alongside the assets.
    (output_dir.parent / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    files = list(output_dir.glob("*.mp3"))
    if len(files) != 850:
        raise RuntimeError(f"Expected 850 MP3 files after conversion; found {len(files)}")
    print(f"[audio] finished: {len(files)} MP3 files, {total_bytes / 1024 / 1024:.2f} MB")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check-only", action="store_true")
    parser.add_argument("--download", action="store_true")
    parser.add_argument("--manifest", default="build/human-audio-manifest.json")
    parser.add_argument("--report", default="build/human-audio-coverage.json")
    parser.add_argument("--output", default="android-offline/app/src/main/assets/www/audio/words")
    parser.add_argument("--credits", default="android-offline/app/src/main/assets/www/audio/CREDITS.md")
    args = parser.parse_args()

    words, groups = load_words(Path("docs/js/data.js"))
    manifest_path = Path(args.manifest)
    report_path = Path(args.report)

    if args.download:
        if not manifest_path.exists():
            raise SystemExit("Audio manifest not found; run the coverage step first.")
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        download_and_convert(manifest, Path(args.output), Path(args.credits))
        return

    index = collect_candidates(words, groups)
    candidate_words = len(index)
    candidate_files = sum(len(v) for v in index.values())
    print(f"[Commons] indexed {candidate_words}/850 words with {candidate_files} candidate files")
    selected = fetch_metadata(index)
    write_report(words, selected, report_path, manifest_path)
    print(f"[Commons] report: {report_path}")
    print(f"[Commons] manifest: {manifest_path}")
    if not args.check_only and len(selected) != 850:
        raise SystemExit("Not all 850 words have verified recordings; no APK will be built.")


if __name__ == "__main__":
    main()
