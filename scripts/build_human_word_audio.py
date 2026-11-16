#!/usr/bin/env python3
"""Fetch and package human English word recordings for the Basic English 850 list.

Sources are Wikimedia Commons / Lingua Libre. Only openly licensed files
(CC0, CC BY, CC BY-SA, or public domain) are accepted. The script refuses to
build an incomplete 850-word set.
"""
import collections
import concurrent.futures
import hashlib
import html
import json
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_JS = ROOT / "docs/js/data.js"
OUT_DIR = ROOT / "android-offline/app/src/main/assets/www/audio/words"
REPORT = ROOT / "audio-coverage-report.json"
CREDITS_JSON = ROOT / "android-offline/app/src/main/assets/www/audio/credits.json"
CREDITS_MD = ROOT / "android-offline/app/src/main/assets/www/audio/THIRD_PARTY_AUDIO_CREDITS.md"
TMP_DIR = ROOT / ".audio-build-tmp"

UA = {
    "User-Agent": "BasicEnglish850AudioBuilder/1.0 (one-time fetch of openly licensed English pronunciation recordings)"
}
CATEGORIES = [
    "Category:Lingua Libre pronunciation-eng",
    "Category:U.S. English pronunciation",
    "Category:British English pronunciation",
    "Category:Australian English pronunciation",
    "Category:Canadian English pronunciation",
    "Category:English pronunciation",
]
GA_SPEAKERS = [
    "Wodencafe",
    "Grendelkhan",
    "Naomi Persephone Amethyst (NaomiAmethyst)",
    "She animates",
    "Rachlel",
    "Simplificationalizer",
    "Semperosculto",
]
SPEAKER_RANK = {name: i for i, name in enumerate(GA_SPEAKERS)}

def read_words():
    source = DATA_JS.read_text(encoding="utf-8")
    groups = re.findall(r"const\s+(WORDS_[A-Z0-9_]+)\s*=\s*\[([\s\S]*?)\]", source)
    words = []
    for _, body in groups:
        words.extend(re.findall(r'"([^"]+)"', body))
    words = [w.strip().lower() for w in words if w.strip()]
    unique = list(dict.fromkeys(words))
    if len(unique) != 850:
        raise RuntimeError("Expected 850 unique source words; found %d" % len(unique))
    return unique

def api(params):
    query = urllib.parse.urlencode(dict(params, format="json", maxlag="5"))
    url = "https://commons.wikimedia.org/w/api.php?" + query
    last_error = None
    for attempt in range(7):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=60) as response:
                data = json.load(response)
            if "error" in data:
                raise RuntimeError(str(data["error"]))
            return data
        except Exception as exc:
            last_error = exc
            time.sleep(min(2 ** attempt, 30))
    raise RuntimeError("Wikimedia API failed: %s" % last_error)

def category_titles(category):
    titles = []
    continuation = {}
    page = 0
    while True:
        params = {
            "action": "query",
            "list": "categorymembers",
            "cmtitle": category,
            "cmtype": "file",
            "cmlimit": "500",
        }
        params.update(continuation)
        data = api(params)
        members = data.get("query", {}).get("categorymembers", [])
        titles.extend(item["title"] for item in members)
        page += 1
        if page % 20 == 0:
            print("Commons category", category, "pages", page, "files", len(titles), flush=True)
        continuation = data.get("continue", {})
        if not continuation:
            break
        time.sleep(0.12)
    return titles

def add_candidate(candidates, word, title, accent, kind, speaker=None):
    word = word.lower()
    if word not in candidates:
        return
    candidates[word][title] = {
        "title": title,
        "accent": accent,
        "kind": kind,
        "speaker": speaker,
    }

def discover_candidates(words):
    word_set = set(words)
    candidates = {word: {} for word in words}
    all_titles = set()
    category_counts = {}
    for category in CATEGORIES:
        try:
            titles = category_titles(category)
            category_counts[category] = len(titles)
            all_titles.update(titles)
            print("Category loaded:", category, len(titles), flush=True)
        except Exception as exc:
            category_counts[category] = "unavailable: " + str(exc)
            print("Skipping category:", category, exc, flush=True)

    # Lingua Libre: use a vetted allowlist of General American speakers.
    ll_prefix = "File:LL-Q1860 (eng)-"
    for title in all_titles:
        normalized = title.replace("_", " ")
        if not normalized.startswith(ll_prefix) or not normalized.lower().endswith(".wav"):
            continue
        body = normalized[len(ll_prefix):-4]
        for speaker in GA_SPEAKERS:
            prefix = speaker + "-"
            if body.startswith(prefix):
                word = body[len(prefix):].lower()
                add_candidate(candidates, word, normalized, "General American", "Lingua Libre", speaker)
                break

    # Wikimedia's conventional En-us / En-uk / En-au / En-ca one-word files.
    accent_names = {
        "us": "US English",
        "uk": "British English",
        "au": "Australian English",
        "ca": "Canadian English",
    }
    for title in all_titles:
        normalized = title.replace("_", " ")
        m = re.match(r"^File:En-(us|uk|au|ca)-([A-Za-z][A-Za-z'-]*)\.(ogg|oga|wav|mp3)$", normalized, re.I)
        if m:
            accent_code = m.group(1).lower()
            word = m.group(2).lower()
            add_candidate(candidates, word, normalized, accent_names[accent_code], "Wikimedia Commons")
            continue
        m = re.match(r"^File:En-([A-Za-z][A-Za-z'-]*)\.(ogg|oga|wav|mp3)$", normalized, re.I)
        if m:
            word = m.group(1).lower()
            add_candidate(candidates, word, normalized, "English (accent unspecified)", "Wikimedia Commons")

    counts = collections.Counter()
    for word in words:
        counts.update(c["speaker"] for c in candidates[word].values() if c["speaker"])
    total_candidates = sum(len(v) for v in candidates.values())
    print("Target words:", len(words), "candidate files:", total_candidates,
          "candidate speakers:", counts.most_common(10), flush=True)
    return candidates, category_counts, counts

def strip_html(value):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]*>", "", html.unescape(value or ""))).strip()

def allowed_license(value):
    lic = strip_html(value)
    if re.search(r"\b(NC|ND)\b", lic, re.I):
        return False
    return bool(
        re.search(r"\bCC0\b", lic, re.I)
        or re.search(r"\bPublic domain\b", lic, re.I)
        or re.search(r"\bCC BY(?:-SA)?\s+\d", lic, re.I)
    )

def license_rank(lic):
    lic = (lic or "").lower()
    if "cc0" in lic or "public domain" in lic:
        return 0
    if "cc by " in lic and "sa" not in lic:
        return 1
    if "cc by-sa" in lic:
        return 2
    return 3

def fetch_metadata(candidates):
    title_to_candidate = {}
    for per_word in candidates.values():
        for title, candidate in per_word.items():
            title_to_candidate[title] = candidate
    titles = list(title_to_candidate)
    metadata = {}
    for offset in range(0, len(titles), 50):
        chunk = titles[offset:offset + 50]
        data = api({
            "action": "query",
            "prop": "imageinfo",
            "iiprop": "url|size|extmetadata",
            "iiextmetadatafilter": "LicenseShortName|Artist|ImageDescription",
            "titles": "|".join(chunk),
        })
        normalized = {item["to"]: item["from"] for item in data.get("query", {}).get("normalized", [])}
        for page in data.get("query", {}).get("pages", {}).values():
            title = normalized.get(page.get("title"), page.get("title"))
            info = (page.get("imageinfo") or [{}])[0]
            if not info.get("url"):
                continue
            ext = info.get("extmetadata", {})
            lic = strip_html(ext.get("LicenseShortName", {}).get("value", ""))
            if not allowed_license(lic):
                continue
            candidate = title_to_candidate.get(title)
            if not candidate:
                # MediaWiki may normalize underscores/spaces; compare normalized names.
                candidate = next((v for k, v in title_to_candidate.items()
                                  if k.replace("_", " ") == title.replace("_", " ")), None)
            if not candidate:
                continue
            artist = strip_html(ext.get("Artist", {}).get("value", ""))
            uploader = page.get("imageinfo", [{}])[0].get("user", "")
            metadata[title] = dict(
                candidate,
                url=info["url"].split("?")[0],
                license=lic,
                artist=artist or candidate.get("speaker") or uploader or "Unknown",
                uploader=uploader,
                size=info.get("size", 0),
                source_url="https://commons.wikimedia.org/wiki/" + urllib.parse.quote(title.replace(" ", "_"), safe=":()_-."),
            )
        if offset % 500 == 0:
            print("Commons metadata", min(offset + 50, len(titles)), "/", len(titles),
                  "valid", len(metadata), flush=True)
        time.sleep(0.15)
    return metadata

def candidate_rank(item, speaker_counts):
    accent = item["accent"]
    if accent == "General American":
        accent_rank = 0
        speaker_rank = -speaker_counts.get(item.get("speaker"), 0)
    elif accent == "US English":
        accent_rank = 1
        speaker_rank = 0 if "dvortygirl" in item.get("artist", "").lower() else 1
    elif accent == "Canadian English":
        accent_rank = 2
        speaker_rank = 0
    elif accent == "British English":
        accent_rank = 3
        speaker_rank = 0
    elif accent == "Australian English":
        accent_rank = 4
        speaker_rank = 0
    else:
        accent_rank = 5
        speaker_rank = 0
    return (accent_rank, speaker_rank, license_rank(item.get("license")), item.get("size", 0))

def download_and_encode(word, item):
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    digest = hashlib.sha1((word + "|" + item["title"]).encode("utf-8")).hexdigest()
    source_ext = Path(urllib.parse.urlparse(item["url"]).path).suffix or ".audio"
    source_path = TMP_DIR / (digest + source_ext)
    output_path = OUT_DIR / (word + ".mp3")
    last_error = None
    for attempt in range(6):
        try:
            req = urllib.request.Request(item["url"], headers=UA)
            with urllib.request.urlopen(req, timeout=90) as response:
                source_path.write_bytes(response.read())
            break
        except Exception as exc:
            last_error = exc
            time.sleep(min(2 ** attempt, 20))
    else:
        raise RuntimeError("download failed for %s: %s" % (word, last_error))
    try:
        subprocess.run([
            "ffmpeg", "-nostdin", "-hide_banner", "-loglevel", "error", "-y",
            "-i", str(source_path), "-vn", "-ac", "1", "-ar", "24000",
            "-codec:a", "libmp3lame", "-b:a", "96k", str(output_path)
        ], check=True, timeout=90)
        if not output_path.exists() or output_path.stat().st_size < 1000:
            raise RuntimeError("encoded file missing or too small")
    finally:
        source_path.unlink(missing_ok=True)
    return output_path.stat().st_size

def main():
    words = read_words()
    candidates, category_counts, speaker_counts = discover_candidates(words)
    metadata = fetch_metadata(candidates)

    chosen = {}
    missing = []
    for word in words:
        valid = []
        for title in candidates[word]:
            item = metadata.get(title)
            if item:
                valid.append(item)
        if not valid:
            missing.append(word)
            continue
        valid.sort(key=lambda item: candidate_rank(item, speaker_counts))
        chosen[word] = valid[0]

    report = {
        "target_words": len(words),
        "matched_words": len(chosen),
        "missing_count": len(missing),
        "missing_words": missing,
        "category_file_counts": category_counts,
        "speaker_counts_in_candidates": dict(speaker_counts),
        "chosen_speakers": dict(collections.Counter(item.get("speaker") or item.get("artist") for item in chosen.values())),
        "chosen_accents": dict(collections.Counter(item["accent"] for item in chosen.values())),
        "chosen_licenses": dict(collections.Counter(item["license"] for item in chosen.values())),
        "chosen_sources": {
            word: {
                "title": item["title"],
                "speaker": item.get("speaker") or item.get("artist"),
                "accent": item["accent"],
                "license": item["license"],
                "artist": item.get("artist"),
                "source_url": item["source_url"],
                "original_size_bytes": item.get("size", 0),
            }
            for word, item in chosen.items()
        },
    }
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Human audio coverage:", len(chosen), "/", len(words), flush=True)
    print("Missing:", ", ".join(missing[:100]), flush=True)
    if missing:
        print("Refusing to build: every one of the 850 words must have a human recording.", flush=True)
        raise SystemExit(2)

    results = {}
    errors = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        future_map = {
            executor.submit(download_and_encode, word, item): word
            for word, item in chosen.items()
        }
        for future in concurrent.futures.as_completed(future_map):
            word = future_map[future]
            try:
                results[word] = future.result()
            except Exception as exc:
                errors.append({"word": word, "error": str(exc)})
                print("Audio error:", word, exc, flush=True)

    if errors or len(results) != 850:
        report["download_errors"] = errors
        report["downloaded_count"] = len(results)
        REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
        raise SystemExit("Refusing to build: not all 850 audio files downloaded and encoded.")

    CREDITS_JSON.parent.mkdir(parents=True, exist_ok=True)
    credits = {
        "title": "Basic English 850 human word pronunciations",
        "source": "Wikimedia Commons and Lingua Libre",
        "encoding": "MP3, mono, 24 kHz, 96 kbps",
        "recordings": report["chosen_sources"],
    }
    CREDITS_JSON.write_text(json.dumps(credits, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "# Third-party audio credits",
        "",
        "The 850 word recordings in this app are human pronunciation recordings sourced from Wikimedia Commons / Lingua Libre.",
        "Each source file is listed below with its speaker or uploader, accent label, original licence and source page.",
        "The recordings were converted from their original format to mono MP3 (24 kHz, 96 kbps) for app packaging.",
        "",
        "The licence applies per recording. CC BY and CC BY-SA recordings retain their respective attribution and share-alike requirements; CC0 and public-domain recordings remain under those terms.",
        "",
        "| Word | Speaker / author | Accent | Licence | Source |",
        "|---|---|---|---|---|",
    ]
    for word in words:
        item = chosen[word]
        speaker = (item.get("speaker") or item.get("artist") or "Unknown").replace("|", "/")
        accent = item["accent"].replace("|", "/")
        lic = item["license"].replace("|", "/")
        url = item["source_url"]
        lines.append("| %s | %s | %s | %s | [Commons file](%s) |" % (word, speaker, accent, lic, url))
    CREDITS_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")

    report["downloaded_count"] = len(results)
    report["encoded_total_bytes"] = sum(results.values())
    report["average_mp3_bytes"] = round(sum(results.values()) / max(1, len(results)))
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Packaged 850 human recordings; MP3 total %.2f MB" %
          (sum(results.values()) / 1_000_000), flush=True)

if __name__ == "__main__":
    main()
