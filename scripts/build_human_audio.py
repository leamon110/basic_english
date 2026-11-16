#!/usr/bin/env python3
"""Build the 850-word human-audio pack from Wikimedia recordings indexed by HF.

The source dataset supplies word, POS, dialect tags, Commons filename, direct
MP3 URL and Wiktionary source page. We use only General-American/US recordings
whose speakers have a published free licence in the cited recording credits.
"""
from __future__ import annotations

import argparse
import collections
import html
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

DATASET_URL = "https://huggingface.co/datasets/Reza2kn/wiktionary-ipa-audio-en/resolve/main/dataset.jsonl"
USER_AGENT = "BasicEnglishHumanAudio/1.0 (https://github.com/leamon110/basic_english)"
# Licence/source credits are published at https://lexcellent.app/data-sources/recordings.
# Entries with mixed or unclear per-speaker licences are deliberately omitted.
SPEAKER_LICENSE = {
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
# Prefer one consistent voice; use other licensed American voices only when
# Wodencafe has no matching recording for that particular word.
SPEAKER_PRIORITY = [
    "Wodencafe", "Grendelkhan", "Arlo Barnes", "Flame, not lame",
    "Simplificationalizer", "Steve Shives", "Rachlel", "NaomiAmethyst",
    "Sapaa", "Neøn", "Qwertygiy", "SchwaSoup", "Whomping Walrus",
    "Blurpeace", "Mx. Granger", "Rfc1394", "Scriptur", "Fae7",
    "Snowwsquire", "TranqyPoo", "TurtleMedicine", "Yangolin",
    "0x0077BE", "Aadenboy", "AnotherFriendlyHuman", "Gabriel Sjöberg",
    "Gbeebani", "Knabrupt", "LegionMammal978", "Mikemoral",
    "Mikemoral♪♫", "Neskaya", "StuckInLagToad", "Sylvanmoon",
    "Tharthan", "TreeMama", "VCcortex",
]
DATASET_CARD_URL = "https://huggingface.co/datasets/Reza2kn/wiktionary-ipa-audio-en"
RECORDING_CREDITS_URL = "https://lexcellent.app/data-sources/recordings"


def norm(value: str) -> str:
    return re.sub(r"\s+", " ", str(value).replace("_", " ").strip()).lower()


def slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def load_words(path: Path):
    source = path.read_text(encoding="utf-8")
    words = []
    groups = {}
    for match in re.finditer(r"const\s+(WORDS_[A-Z0-9_]+)\s*=\s*\[([\s\S]*?)\]", source):
        group = match.group(1)
        for word in re.findall(r'"([^"]+)"', match.group(2)):
            key = norm(word)
            if key in groups:
                raise RuntimeError(f"Duplicate word in source list: {word}")
            words.append(word)
            groups[key] = group
    if len(words) != 850 or len(groups) != 850:
        raise RuntimeError(f"Expected 850 unique Basic English words; found {len(words)}")
    return words, groups


def get_speaker(filename: str):
    name = urllib.parse.unquote(str(filename or "")).replace("%28", "(").replace("%29", ")")
    # Wiktionary audio filenames use LL-Q1860 (eng)-<speaker>-<word>.<format>.mp3.
    prefixes = ("LL-Q1860 (eng)-", "LL-Q1860_(eng)-", "LL-Q7976 (mis)-", "LL-Q7976_(mis)-")
    body = None
    for prefix in prefixes:
        if name.startswith(prefix):
            body = name[len(prefix):]
            break
    if body is None:
        return None, None

    for speaker in sorted(SPEAKER_LICENSE, key=len, reverse=True):
        tokens = {speaker, speaker.replace(" ", "_")}
        for token in tokens:
            prefix = token + "-"
            if body.startswith(prefix):
                word_part = body[len(prefix):]
                word_part = re.sub(r"\.(wav|ogg|oga|mp3|flac|m4a|opus)(\.mp3)?$", "", word_part, flags=re.I)
                return speaker, norm(word_part)
    return None, None


def has_us_audio(row: dict) -> bool:
    tags = row.get("audio_tags") or []
    if isinstance(tags, str):
        try:
            tags = json.loads(tags)
        except Exception:
            tags = [tags]
    normalized = {str(tag).strip().lower().replace("_", "-") for tag in tags}
    return bool(normalized & {"general-american", "us", "american-english"})


def pos_hint(group: str) -> str:
    if group in ("WORDS_THINGS_400", "WORDS_THINGS_200"):
        return "noun"
    if group in ("WORDS_QUALITIES_100", "WORDS_QUALITIES_50"):
        return "adjective"
    return ""


def fetch_manifest_rows(words: list[str], groups: dict):
    request = urllib.request.Request(DATASET_URL, headers={"User-Agent": USER_AGENT})
    candidates = collections.defaultdict(list)
    rows_seen = 0
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
            if word not in groups or not has_us_audio(row):
                continue
            speaker, filename_word = get_speaker(row.get("audio_filename", ""))
            if not speaker or filename_word != word:
                continue
            audio_url = row.get("audio_url")
            if not isinstance(audio_url, str) or not audio_url.startswith("https://upload.wikimedia.org/"):
                continue
            if speaker not in SPEAKER_LICENSE:
                continue
            pos = str(row.get("pos", "")).lower()
            hint = pos_hint(groups[word])
            candidate = {
                "word": word,
                "speaker": speaker,
                "license": SPEAKER_LICENSE[speaker],
                "title": urllib.parse.unquote(str(row.get("audio_filename", ""))),
                "audio_url": audio_url,
                "source_page": row.get("source_page", ""),
                "ipa": row.get("ipa", ""),
                "pos": pos,
                "audio_tags": row.get("audio_tags", []),
                "ipa_tags": row.get("ipa_tags", []),
                "ipa_audio_pairing": row.get("ipa_audio_pairing", ""),
                "source_dump": row.get("source_dump", ""),
            }
            candidates[word].append(candidate)

    selected = {}
    for original_word in words:
        word = norm(original_word)
        options = candidates.get(word, [])
        # Deduplicate rows pointing to the same recording; rank speaker first,
        # then prefer the expected part of speech for the Ogden category.
        unique = {}
        for item in options:
            unique[item["audio_url"]] = item
        options = list(unique.values())
        hint = pos_hint(groups[word])
        options.sort(key=lambda item: (
            SPEAKER_PRIORITY.index(item["speaker"]) if item["speaker"] in SPEAKER_PRIORITY else 999,
            0 if (not hint or item["pos"] == hint or (hint == "adjective" and item["pos"] == "adj")) else 1,
            0 if "General-American" in item.get("audio_tags", []) else 1,
            item["title"].lower(),
        ))
        if options:
            selected[original_word] = options[0]

    print(f"[HF dataset] rows scanned: {rows_seen:,}")
    print(f"[HF dataset] Basic English words with licensed US human recordings: {len(selected)}/850")
    return selected


def write_report(words, selected, manifest_path: Path, report_path: Path):
    missing = [word for word in words if word not in selected]
    speaker_counts = collections.Counter(item["speaker"] for item in selected.values())
    license_counts = collections.Counter(item["license"] for item in selected.values())
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
        "speakers": dict(speaker_counts),
        "licenses": dict(license_counts),
        "complete": len(missing) == 0,
    }
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Speakers:", json.dumps(dict(speaker_counts), ensure_ascii=False))
    print("Licences:", json.dumps(dict(license_counts), ensure_ascii=False))
    if missing:
        print("Missing:", ", ".join(missing))
    output = os.environ.get("GITHUB_OUTPUT")
    if output:
        with open(output, "a", encoding="utf-8") as f:
            f.write(f"complete={'true' if not missing else 'false'}\n")
            f.write(f"matched={len(selected)}\n")
            f.write(f"missing={len(missing)}\n")
    return manifest


def download_audio(manifest: dict, output_dir: Path, credits_path: Path):
    if manifest.get("missing_words"):
        raise SystemExit(f"Refusing partial build: {len(manifest['missing_words'])} words lack a verified recording.")
    output_dir.mkdir(parents=True, exist_ok=True)
    credits = [
        "# Human pronunciation audio credits",
        "",
        "850 individual human recordings sourced from Wiktionary / Wikimedia Commons.",
        "The source audio is downloaded from Wikimedia's MP3 transcodes without re-encoding.",
        f"Dataset index: {DATASET_CARD_URL}",
        f"Recording licence and speaker credits: {RECORDING_CREDITS_URL}",
        "",
        "Each file retains the licence listed for its recording author below.",
        "",
        "| Word | Speaker | Licence | Commons file | Wiktionary source |",
        "|---|---|---|---|---|",
    ]
    total_bytes = 0
    for number, (word, item) in enumerate(manifest["recordings"].items(), 1):
        request = urllib.request.Request(item["audio_url"], headers={"User-Agent": USER_AGENT})
        last_error = None
        data = None
        for attempt in range(6):
            try:
                with urllib.request.urlopen(request, timeout=90) as response:
                    content_type = response.headers.get("Content-Type", "").lower()
                    data = response.read()
                if len(data) < 500 or ("audio" not in content_type and not data.startswith(b"ID3") and data[:2] != b"\xff\xfb"):
                    raise RuntimeError(f"Unexpected audio response: {content_type}, {len(data)} bytes")
                last_error = None
                break
            except Exception as exc:
                last_error = exc
                time.sleep(min(2 ** attempt, 30))
        if last_error or data is None:
            raise RuntimeError(f"Audio download failed for {word}: {last_error}")

        target = output_dir / (slug(word) + ".mp3")
        target.write_bytes(data)
        total_bytes += len(data)

        title = item["title"]
        commons_page = "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(title.replace(" ", "_"))
        source_page = item.get("source_page", "")
        credits.append(
            f"| {word} | {item['speaker']} | {item['license']} | "
            f"[{title}]({commons_page}) | [Wiktionary]({source_page}) |"
        )
        if number % 50 == 0:
            print(f"[audio] downloaded {number}/850 · {total_bytes / 1024 / 1024:.1f} MB", flush=True)
        time.sleep(0.05)

    credits_path.parent.mkdir(parents=True, exist_ok=True)
    credits_path.write_text("\n".join(credits) + "\n", encoding="utf-8")
    (output_dir.parent / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    files = list(output_dir.glob("*.mp3"))
    if len(files) != 850:
        raise RuntimeError(f"Expected 850 MP3 files; found {len(files)}")
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
    if args.download:
        if not manifest_path.exists():
            raise SystemExit("Human-audio manifest is missing; run the coverage step first.")
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        download_audio(manifest, Path(args.output), Path(args.credits))
        return

    selected = fetch_manifest_rows(words, groups)
    write_report(words, selected, manifest_path, Path(args.report))
    if not args.check_only and len(selected) != 850:
        raise SystemExit("Not all 850 words have a licensed human recording; no APK will be built.")


if __name__ == "__main__":
    main()
