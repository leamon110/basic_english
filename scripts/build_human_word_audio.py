#!/usr/bin/env python3
"""Find and package one openly licensed human recording for every Basic English 850 word."""
import collections
import concurrent.futures
import hashlib
import html
import json
import re
import subprocess
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
    "User-Agent": "BasicEnglish850AudioBuilder/1.0 (https://github.com/leamon110/basic_english)"
}
GA_SPEAKERS = [
    "Wodencafe",
    "Grendelkhan",
    "Naomi Persephone Amethyst (NaomiAmethyst)",
    "She animates",
    "Rachlel",
    "Simplificationalizer",
    "Semperosculto",
]
GA_RANK = {name: i for i, name in enumerate(GA_SPEAKERS)}
ACCENTS = {
    "us": "US English",
    "uk": "British English",
    "au": "Australian English",
    "ca": "Canadian English",
}

def read_words():
    source = DATA_JS.read_text(encoding="utf-8")
    groups = re.findall(r"const\s+(WORDS_[A-Z0-9_]+)\s*=\s*\[([\s\S]*?)\]", source)
    words = []
    for _, body in groups:
        words.extend(re.findall(r'"([^"]+)"', body))
    unique = list(dict.fromkeys(w.strip().lower() for w in words if w.strip()))
    if len(unique) != 850:
        raise RuntimeError("Expected 850 unique source words; found %d" % len(unique))
    return unique

def api(params):
    query = urllib.parse.urlencode(dict(params, format="json", maxlag="5"))
    url = "https://commons.wikimedia.org/w/api.php?" + query
    last_error = None
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=25) as response:
                data = json.load(response)
            if "error" in data:
                raise RuntimeError(str(data["error"]))
            return data
        except Exception as exc:
            last_error = exc
            if attempt < 3:
                time.sleep(1 + (2 ** attempt))
    raise RuntimeError("Wikimedia API failed after retries: %s" % last_error)

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

def candidate_title(word, kind, speaker=None, accent=None, extension=None):
    if kind == "Lingua Libre":
        title = "File:LL-Q1860 (eng)-%s-%s.wav" % (speaker, word)
    elif kind == "Wikimedia Commons":
        title = "File:En-%s-%s.%s" % (accent, word, extension)
    else:
        title = "File:En-%s.%s" % (word, extension)
    return {
        "word": word,
        "title": title,
        "kind": kind,
        "speaker": speaker,
        "accent": "General American" if kind == "Lingua Libre" else (
            ACCENTS.get(accent, "English (accent unspecified)") if accent else "English (accent unspecified)"
        ),
    }

def fetch_candidates(records):
    by_title = {r["title"]: r for r in records}
    titles = list(by_title)
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
            record = by_title.get(title)
            if not record:
                record = next((v for k, v in by_title.items()
                               if k.replace("_", " ") == title.replace("_", " ")), None)
            if not record:
                continue
            artist = strip_html(ext.get("Artist", {}).get("value", ""))
            metadata[title] = dict(
                record,
                url=info["url"].split("?")[0],
                license=lic,
                artist=artist or record.get("speaker") or page.get("imageinfo", [{}])[0].get("user", "Unknown"),
                uploader=page.get("imageinfo", [{}])[0].get("user", ""),
                size=info.get("size", 0),
                source_url="https://commons.wikimedia.org/wiki/" + urllib.parse.quote(title.replace(" ", "_"), safe=":()_-."),
            )
        if offset % 500 == 0:
            print("Checked Commons titles", min(offset + 50, len(titles)), "/", len(titles),
                  "valid recordings", len(metadata), flush=True)
        time.sleep(0.18)
    return metadata

def rank_candidate(item):
    accent = item["accent"]
    if accent == "General American":
        accent_rank = 0
        speaker_rank = GA_RANK.get(item.get("speaker"), 99)
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
    for attempt in range(5):
        try:
            req = urllib.request.Request(item["url"], headers=UA)
            with urllib.request.urlopen(req, timeout=45) as response:
                source_path.write_bytes(response.read())
            break
        except Exception as exc:
            last_error = exc
            if attempt < 4:
                time.sleep(1 + 2 ** attempt)
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
    chosen = {}
    report = {
        "target_words": 850,
        "primary_coverage": 0,
        "matched_words": 0,
        "missing_words": [],
        "candidate_search": "Exact Wikimedia Commons file titles; no full-category crawl",
    }

    # First pass: two high-coverage General American Lingua Libre speakers,
    # plus conventional US English dictionary recordings.
    primary = []
    for word in words:
        primary.append(candidate_title(word, "Lingua Libre", speaker="Wodencafe"))
        primary.append(candidate_title(word, "Lingua Libre", speaker="Grendelkhan"))
        for ext in ("ogg", "oga", "wav", "mp3"):
            primary.append(candidate_title(word, "Wikimedia Commons", accent="us", extension=ext))
    primary_meta = fetch_candidates(primary)
    by_word = collections.defaultdict(list)
    for item in primary_meta.values():
        by_word[item["word"]].append(item)
    for word in words:
        if by_word[word]:
            by_word[word].sort(key=rank_candidate)
            chosen[word] = by_word[word][0]
    report["primary_coverage"] = len(chosen)
    print("Primary human recording coverage:", len(chosen), "/ 850", flush=True)

    # Second pass: only words still missing. Search additional vetted
    # General American Lingua Libre speakers and openly licensed English variants.
    missing = [word for word in words if word not in chosen]
    fallback = []
    other_speakers = GA_SPEAKERS[2:]
    for word in missing:
        for speaker in other_speakers:
            fallback.append(candidate_title(word, "Lingua Libre", speaker=speaker))
        for accent in ("us", "uk", "au", "ca"):
            for ext in ("ogg", "oga", "wav", "mp3"):
                fallback.append(candidate_title(word, "Wikimedia Commons", accent=accent, extension=ext))
        for ext in ("ogg", "oga", "wav", "mp3"):
            fallback.append(candidate_title(word, "Wikimedia Commons", extension=ext))
    fallback_meta = fetch_candidates(fallback) if fallback else {}
    fallback_by_word = collections.defaultdict(list)
    for item in fallback_meta.values():
        fallback_by_word[item["word"]].append(item)
    for word in missing:
        if fallback_by_word[word]:
            fallback_by_word[word].sort(key=rank_candidate)
            chosen[word] = fallback_by_word[word][0]

    missing = [word for word in words if word not in chosen]
    report.update({
        "matched_words": len(chosen),
        "missing_count": len(missing),
        "missing_words": missing,
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
    })
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Final human audio coverage:", len(chosen), "/ 850", flush=True)
    if missing:
        print("Words with no matching openly licensed human recording:", ", ".join(missing), flush=True)
        raise SystemExit(2)

    results = {}
    errors = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        future_map = {executor.submit(download_and_encode, word, item): word for word, item in chosen.items()}
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
        lines.append("| %s | %s | %s | %s | [Commons file](%s) |" % (
            word, speaker, item["accent"].replace("|", "/"),
            item["license"].replace("|", "/"), item["source_url"]
        ))
    CREDITS_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")

    report["downloaded_count"] = len(results)
    report["encoded_total_bytes"] = sum(results.values())
    report["average_mp3_bytes"] = round(sum(results.values()) / max(1, len(results)))
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Packaged all 850 human recordings; MP3 total %.2f MB" %
          (sum(results.values()) / 1_000_000), flush=True)

if __name__ == "__main__":
    main()
