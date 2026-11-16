#!/usr/bin/env python3
"""Acquire 850 human word recordings and verify Commons reuse licences."""
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
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

HF_DATASET_URL = "https://huggingface.co/datasets/Reza2kn/wiktionary-ipa-audio-en/resolve/main/dataset.jsonl"
LINGUA_MASTERY_MAP_URL = "https://raw.githubusercontent.com/rchrdchn/lingua-mastery/main/data/audio/ll-en.json"
COMMONS_API = "https://commons.wikimedia.org/w/api.php"
USER_AGENT = "BasicEnglishHumanAudio/1.0 (https://github.com/leamon110/basic_english/issues)"
DATASET_CARD_URL = "https://huggingface.co/datasets/Reza2kn/wiktionary-ipa-audio-en"
RECORDING_CREDITS_URL = "https://lexcellent.app/data-sources/recordings"

# These are the General-American speakers explicitly used/identified by
# open pronunciation projects. If their Wiktionary row lacks a dialect tag,
# the speaker identity itself is sufficient to accept the recording as US.
GA_SPEAKERS = {
    "Wodencafe", "Grendelkhan", "NaomiAmethyst", "Rachlel",
    "Simplificationalizer", "Flame, not lame", "Qwertygiy",
    "Neøn", "Sapaa", "She animates", "Semperosculto",
}
SPEAKER_PRIORITY = [
    "Wodencafe", "Grendelkhan", "Flame, not lame", "Simplificationalizer",
    "Rachlel", "NaomiAmethyst", "Arlo Barnes", "Steve Shives",
    "Qwertygiy", "Neøn", "Sapaa", "SchwaSoup", "Whomping Walrus",
    "Blurpeace", "Mx. Granger", "Rfc1394", "Scriptur", "Fae7",
    "Snowwsquire", "TranqyPoo", "TurtleMedicine", "Yangolin",
    "0x0077BE", "Aadenboy", "AnotherFriendlyHuman", "Gabriel Sjöberg",
    "Gbeebani", "Knabrupt", "LegionMammal978", "Mikemoral",
    "Mikemoral♪♫", "Neskaya", "StuckInLagToad", "Sylvanmoon",
    "Tharthan", "TreeMama", "VCcortex",
]
SPEAKER_FILE_ALIASES = {
    "NaomiAmethyst": ["NaomiAmethyst", "Naomi Persephone Amethyst (NaomiAmethyst)"],
}
# The public recording credits page lists these single, unambiguous licences.
# We still query Commons metadata for all non-Wodencafe files where possible.
KNOWN_SPEAKER_LICENSE = {
    "Wodencafe": "CC0",
    "Grendelkhan": "CC0",
    "Arlo Barnes": "CC0",
    "Flame, not lame": "CC0",
    "Simplificationalizer": "CC0",
    "Steve Shives": "CC0",
    "Sapaa": "CC0",
    "Neøn": "CC0",
    "Qwertygiy": "CC0",
    "SchwaSoup": "CC0",
    "Whomping Walrus": "CC0",
    "Blurpeace": "CC0",
    "Mx. Granger": "CC0",
    "Rfc1394": "CC0",
    "Scriptur": "CC0",
    "Fae7": "CC0",
    "Snowwsquire": "CC0",
    "TranqyPoo": "CC0",
    "TurtleMedicine": "CC0",
    "Yangolin": "CC0",
    "0x0077BE": "CC0",
    "Rachlel": "CC BY 4.0",
    "Neskaya": "CC BY-SA 3.0",
    "Aadenboy": "CC BY 4.0",
    "AnotherFriendlyHuman": "CC BY-SA 4.0",
    "Gabriel Sjöberg": "CC BY-SA 3.0",
    "Gbeebani": "CC BY-SA 3.0",
    "Knabrupt": "CC BY-SA 4.0",
    "LegionMammal978": "CC BY-SA 4.0",
    "Mikemoral": "CC BY-SA 3.0",
    "Mikemoral♪♫": "CC BY-SA 3.0",
    "StuckInLagToad": "CC BY-SA 4.0",
    "Sylvanmoon": "CC BY-SA 4.0",
    "Tharthan": "CC BY-SA 4.0",
    "TreeMama": "CC BY-SA 3.0",
    "VCcortex": "CC BY-SA 4.0",
    "NaomiAmethyst": "CC BY-SA 4.0",
}
ALLOWED_LICENSES = ("CC0", "Public domain", "CC BY", "CC BY-SA")


def norm(value: str) -> str:
    return re.sub(r"\s+", " ", str(value).replace("_", " ").strip()).lower()


def slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def load_words(path: Path):
    source = path.read_text(encoding="utf-8")
    words, groups = [], {}
    for match in re.finditer(r"const\s+(WORDS_[A-Z0-9_]+)\s*=\s*\[([\s\S]*?)\]", source):
        group = match.group(1)
        for word in re.findall(r'"([^"]+)"', match.group(2)):
            key = norm(word)
            if key in groups:
                raise RuntimeError(f"Duplicate source word: {word}")
            words.append(word)
            groups[key] = group
    if len(words) != 850 or len(groups) != 850:
        raise RuntimeError(f"Expected 850 unique words, found {len(words)}")
    return words, groups


def get_speaker(filename: str, word: str = ""):
    name = urllib.parse.unquote(str(filename or "")).replace("%28", "(").replace("%29", ")")
    prefixes = ("LL-Q1860_(eng)-", "LL-Q1860 (eng)-", "LL-Q7976_(mis)-", "LL-Q7976 (mis)-")
    body = None
    for prefix in prefixes:
        if name.startswith(prefix):
            body = name[len(prefix):]
            break
    if body is None:
        return None
    word_key = norm(word)
    for speaker in sorted(set(SPEAKER_PRIORITY) | set(KNOWN_SPEAKER_LICENSE), key=len, reverse=True):
        aliases = SPEAKER_FILE_ALIASES.get(speaker, [speaker])
        for alias in aliases:
            for token in {alias, alias.replace(" ", "_")}:
                prefix = token + "-"
                if body.startswith(prefix):
                    tail = body[len(prefix):]
                    tail = re.sub(r"\.(wav|ogg|oga|mp3|flac|m4a|opus)(\.mp3)?$", "", tail, flags=re.I)
                    if norm(tail) == word_key:
                        return speaker
    # Generic speaker extraction for LL-Q recordings not in the allow-list.
    tail = re.sub(r"\.(wav|ogg|oga|mp3|flac|m4a|opus)(\.mp3)?$", "", body, flags=re.I)
    if word_key and norm(tail).endswith("-" + word_key):
        return tail[:-(len(word_key) + 1)].replace("_", " ")
    return None


def has_us_audio(row: dict, speaker: str | None) -> bool:
    if speaker in GA_SPEAKERS:
        return True
    tags = row.get("audio_tags") or []
    if isinstance(tags, str):
        try:
            tags = json.loads(tags)
        except Exception:
            tags = [tags]
    normalized = {str(tag).strip().lower().replace("_", "-") for tag in tags}
    return bool(normalized & {"general-american", "us", "american-english"})


def get_original_commons_title(row: dict) -> str:
    audio_url = row.get("audio_url", "")
    path_parts = [p for p in urllib.parse.urlparse(audio_url).path.split("/") if p]
    if "transcoded" in path_parts:
        idx = path_parts.index("transcoded")
        if len(path_parts) > idx + 3:
            return urllib.parse.unquote(path_parts[-2])
    filename = urllib.parse.unquote(str(row.get("audio_filename", "")))
    if filename.endswith(".mp3") and not filename.endswith(".mp3.mp3"):
        filename = filename[:-4]
    return filename.replace("%28", "(").replace("%29", ")")


def get_pos_hint(group: str) -> str:
    if group in ("WORDS_THINGS_400", "WORDS_THINGS_200"):
        return "noun"
    if group in ("WORDS_QUALITIES_100", "WORDS_QUALITIES_50"):
        return "adjective"
    return ""


def read_json_url(url: str) -> dict:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=180) as response:
        return json.loads(response.read().decode("utf-8"))


def fetch_hf_candidates(words: list[str], groups: dict):
    targets = {norm(w) for w in words}
    candidates = collections.defaultdict(list)
    rows_seen = 0
    request = urllib.request.Request(HF_DATASET_URL, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=180) as response:
        for raw in response:
            if not raw.strip():
                continue
            try:
                row = json.loads(raw)
            except json.JSONDecodeError:
                continue
            rows_seen += 1
            word = norm(row.get("word", ""))
            if word not in targets:
                continue
            filename = row.get("audio_filename", "")
            speaker = get_speaker(filename, word)
            if not has_us_audio(row, speaker):
                continue
            audio_url = row.get("audio_url", "")
            if not isinstance(audio_url, str) or not audio_url.startswith("https://upload.wikimedia.org/"):
                continue
            title = get_original_commons_title(row)
            if not title:
                continue
            candidates[word].append({
                "word": word,
                "speaker": speaker or "Unidentified Wiktionary contributor",
                "license": KNOWN_SPEAKER_LICENSE.get(speaker or "", ""),
                "title": title,
                "audio_url": audio_url,
                "source_page": row.get("source_page", ""),
                "pos": str(row.get("pos", "")).lower(),
                "audio_tags": row.get("audio_tags", []),
                "ipa": row.get("ipa", ""),
                "origin": "Wiktionary/Wikimedia Commons",
                "audio_format": "mp3",
            })
    print(f"[HF dataset] rows scanned: {rows_seen:,}")
    return candidates


def fetch_wodencafe_map(words: list[str]):
    data = read_json_url(LINGUA_MASTERY_MAP_URL)
    found = {}
    for word in words:
        item = data.get(norm(word))
        if not item:
            continue
        if item.get("speaker") != "Wodencafe" or item.get("license") != "CC0":
            continue
        found[word] = {
            "word": norm(word),
            "speaker": "Wodencafe",
            "license": "CC0",
            "title": item["title"],
            "audio_url": item["url"],
            "source_page": "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(item["title"].replace(" ", "_")),
            "pos": "",
            "audio_tags": ["General-American (speaker-verified)"],
            "ipa": "",
            "origin": "Lingua Libre / Wikimedia Commons",
            "audio_format": "wav",
        }
    return found


def commons_api(params: dict) -> dict:
    query = urllib.parse.urlencode({"format": "json", "maxlag": 5, **params}, doseq=True)
    request = urllib.request.Request(COMMONS_API + "?" + query, headers={
        "User-Agent": USER_AGENT,
        "Accept": "application/json",
    })
    last_error = None
    for attempt in range(10):
        try:
            with urllib.request.urlopen(request, timeout=90) as response:
                payload = json.loads(response.read().decode("utf-8"))
            if "error" in payload:
                raise RuntimeError(payload["error"].get("info", str(payload["error"])))
            return payload
        except urllib.error.HTTPError as exc:
            last_error = exc
            retry_after = exc.headers.get("Retry-After")
            delay = float(retry_after) if retry_after and retry_after.isdigit() else min(2 ** attempt, 60)
            print(f"[Commons API] HTTP {exc.code}; retrying in {delay}s", file=sys.stderr, flush=True)
            time.sleep(delay)
        except Exception as exc:
            last_error = exc
            if attempt == 9:
                break
            time.sleep(min(2 ** attempt, 60))
    raise RuntimeError(f"Commons metadata request failed: {last_error}")


def clean_meta(value: str) -> str:
    value = re.sub(r"<br\s*/?>", "\n", value or "", flags=re.I)
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def licence_allowed(licence: str) -> bool:
    value = clean_meta(licence).lower()
    if "noncommercial" in value or "non-commercial" in value or "no derivatives" in value:
        return False
    if value == "cc0" or "public domain" in value:
        return True
    return value.startswith("cc by") and "nc" not in value.split() and "nd" not in value.split()


def fetch_commons_licences(candidates: dict):
    titles = sorted({
        item["title"].replace("_", " ")
        for options in candidates.values()
        for item in options
        if not item.get("license")
    })
    metadata = {}
    print(f"[Commons API] checking {len(titles)} candidate files for licence metadata", flush=True)
    for offset in range(0, len(titles), 50):
        batch = titles[offset:offset + 50]
        data = commons_api({
            "action": "query",
            "prop": "imageinfo",
            "iiprop": "extmetadata",
            "iiextmetadatafilter": "LicenseShortName|Artist|Credit|LicenseUrl|ImageDescription",
            "titles": "|".join("File:" + title for title in batch),
        })
        for page in data.get("query", {}).get("pages", {}).values():
            infos = page.get("imageinfo") or []
            if not infos:
                continue
            ext = infos[0].get("extmetadata", {})
            title = page.get("title", "").split(":", 1)[-1].replace("_", " ")
            licence = clean_meta(ext.get("LicenseShortName", {}).get("value", ""))
            artist = clean_meta(ext.get("Artist", {}).get("value", ""))
            description = clean_meta(ext.get("ImageDescription", {}).get("value", ""))
            if licence_allowed(licence):
                metadata[norm(title)] = {
                    "license": licence,
                    "artist": artist,
                    "description": description,
                    "license_url": clean_meta(ext.get("LicenseUrl", {}).get("value", "")),
                }
        print(f"[Commons API] verified {min(offset + len(batch), len(titles))}/{len(titles)} files", flush=True)
        time.sleep(1.2)

    for word, options in candidates.items():
        for item in options:
            meta = metadata.get(norm(item["title"].replace("_", " ")))
            if meta:
                item["license"] = meta["license"]
                item["artist"] = meta["artist"] or item.get("speaker", "")
                item["description"] = meta["description"]
                item["license_url"] = meta["license_url"]
    return candidates


def choose_recordings(words: list[str], groups: dict, wodencafe: dict, candidates: dict):
    selected = dict(wodencafe)
    for word in words:
        if word in selected:
            continue
        options = candidates.get(norm(word), [])
        # Deduplicate by original Commons file.
        unique = {}
        for item in options:
            unique[item["title"]] = item
        options = list(unique.values())
        hint = get_pos_hint(groups[norm(word)])
        options.sort(key=lambda item: (
            SPEAKER_PRIORITY.index(item["speaker"]) if item["speaker"] in SPEAKER_PRIORITY else 999,
            0 if (not hint or item.get("pos") == hint or (hint == "adjective" and item.get("pos") == "adj")) else 1,
            0 if "General-American" in item.get("audio_tags", []) else 1,
            item["title"].lower(),
        ))
        for item in options:
            if licence_allowed(item.get("license", "")):
                selected[word] = item
                break
    return selected


def write_report(words, selected, manifest_path: Path, report_path: Path):
    missing = [word for word in words if word not in selected]
    speakers = collections.Counter(item.get("speaker", "Unknown") for item in selected.values())
    licences = collections.Counter(item.get("license", "Unknown") for item in selected.values())
    manifest = {
        "total_words": 850,
        "matched_words": len(selected),
        "missing_words": missing,
        "recordings": selected,
        "dataset_source": DATASET_CARD_URL,
        "recording_credits_source": RECORDING_CREDITS_URL,
    }
    report = {
        "total_words": 850,
        "matched_words": len(selected),
        "missing_count": len(missing),
        "missing_words": missing,
        "speakers": dict(speakers),
        "licenses": dict(licences),
        "complete": not missing,
    }
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print("\n=== VERIFIED HUMAN AUDIO COVERAGE ===")
    print(f"Basic English words: {len(words)}")
    print(f"Human recordings with reusable licence: {len(selected)}/850")
    print(f"Missing: {len(missing)}")
    print("Speakers:", json.dumps(dict(speakers), ensure_ascii=False))
    print("Licences:", json.dumps(dict(licences), ensure_ascii=False))
    if missing:
        print("Missing words:", ", ".join(missing))
    output = os.environ.get("GITHUB_OUTPUT")
    if output:
        with open(output, "a", encoding="utf-8") as f:
            f.write(f"complete={'true' if not missing else 'false'}\n")
            f.write(f"matched={len(selected)}\n")
            f.write(f"missing={len(missing)}\n")
    return manifest


def download_audio(manifest: dict, output_dir: Path, credits_path: Path):
    if manifest.get("missing_words"):
        raise SystemExit(f"Refusing partial build: {len(manifest['missing_words'])} words lack human recordings.")
    output_dir.mkdir(parents=True, exist_ok=True)
    temp_dir = output_dir.parent / "_audio-originals"
    temp_dir.mkdir(parents=True, exist_ok=True)
    credits = [
        "# Human pronunciation audio credits",
        "",
        "850 human word recordings sourced from Lingua Libre and Wiktionary/Wikimedia Commons.",
        "Each audio file retains its own Commons licence. CC BY and CC BY-SA files are attributed below.",
        "WAV sources are converted to compact mono MP3 for offline playback; MP3 transcodes from Wikimedia are kept unchanged.",
        f"Dataset index: {DATASET_CARD_URL}",
        f"Speaker/licence reference: {RECORDING_CREDITS_URL}",
        "",
        "| Word | Speaker / Author | Licence | Original Commons file | Source |",
        "|---|---|---|---|---|",
    ]
    total_bytes = 0
    for number, (word, item) in enumerate(manifest["recordings"].items(), 1):
        url = item["audio_url"]
        extension = Path(urllib.parse.urlparse(url).path).suffix.lower()
        request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        last_error, data = None, None
        for attempt in range(6):
            try:
                with urllib.request.urlopen(request, timeout=90) as response:
                    content_type = response.headers.get("Content-Type", "").lower()
                    data = response.read()
                mp3_frame = len(data or b"") > 2 and data[0] == 0xff and (data[1] & 0xe0) == 0xe0
                if len(data or b"") < 500:
                    raise RuntimeError(f"Audio response too small: {len(data or b'')} bytes")
                if extension != ".wav" and "audio" not in content_type and not data.startswith(b"ID3") and not mp3_frame:
                    raise RuntimeError(f"Unexpected audio response: {content_type}, {len(data)} bytes")
                last_error = None
                break
            except Exception as exc:
                last_error = exc
                time.sleep(min(2 ** attempt, 30))
        if last_error or data is None:
            raise RuntimeError(f"Download failed for {word}: {last_error}")

        target = output_dir / (slug(word) + ".mp3")
        if extension == ".wav":
            raw_path = temp_dir / (slug(word) + ".wav")
            raw_path.write_bytes(data)
            command = [
                "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                "-i", str(raw_path), "-vn", "-ac", "1", "-ar", "22050",
                "-b:a", "64k", "-map_metadata", "-1", str(target),
            ]
            result = subprocess.run(command, capture_output=True, text=True)
            raw_path.unlink(missing_ok=True)
            if result.returncode != 0 or not target.exists():
                raise RuntimeError(f"MP3 conversion failed for {word}: {result.stderr[-1000:]}")
        else:
            target.write_bytes(data)
        if target.stat().st_size < 500:
            raise RuntimeError(f"Output audio too small for {word}")
        total_bytes += target.stat().st_size

        speaker = item.get("speaker") or item.get("artist") or "Unknown contributor"
        title = item["title"]
        commons_page = "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(title.replace(" ", "_"))
        source_page = item.get("source_page") or commons_page
        credits.append(
            f"| {word} | {speaker} | {item['license']} | "
            f"[{title}]({commons_page}) | [source]({source_page}) |"
        )
        if number % 50 == 0:
            print(f"[audio] packaged {number}/850 · {total_bytes / 1024 / 1024:.1f} MB", flush=True)
        time.sleep(0.05)

    credits_path.parent.mkdir(parents=True, exist_ok=True)
    credits_path.write_text("\n".join(credits) + "\n", encoding="utf-8")
    (output_dir.parent / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    files = list(output_dir.glob("*.mp3"))
    if len(files) != 850:
        raise RuntimeError(f"Expected 850 MP3 files, found {len(files)}")
    print(f"[audio] completed {len(files)} MP3 files · {total_bytes / 1024 / 1024:.2f} MB")


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
    if args.download:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        download_audio(manifest, Path(args.output), Path(args.credits))
        return

    print("[source] loading Wodencafe CC0 recording map", flush=True)
    wodencafe = fetch_wodencafe_map(words)
    print(f"[source] Wodencafe CC0 recordings matched: {len(wodencafe)}/850", flush=True)

    print("[source] scanning Wiktionary US/General-American recordings", flush=True)
    candidates = fetch_hf_candidates(words, groups)
    candidate_count = sum(len(v) for v in candidates.values())
    print(f"[source] candidate rows: {candidate_count}", flush=True)

    # Verify Commons file licences for candidate files. Wodencafe CC0 files
    # already have a direct source manifest and do not need another API lookup.
    for word in list(candidates):
        if word in {norm(w) for w in wodencafe}:
            candidates[word] = [x for x in candidates[word] if x["speaker"] != "Wodencafe"]
    candidates = fetch_commons_licences(candidates)

    selected = choose_recordings(words, groups, wodencafe, candidates)
    write_report(words, selected, manifest_path, Path(args.report))
    if not args.check_only and len(selected) != 850:
        raise SystemExit("Not all 850 words have licensed human recordings; no APK will be built.")


if __name__ == "__main__":
    main()
