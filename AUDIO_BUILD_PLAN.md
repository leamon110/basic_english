# Basic English 850 Human Recording APK — Delivery Plan

This file is the durable source of truth for the human-recording delivery task. Update its status whenever a build result is verified. Do not treat chat messages or a successful source-matching report as proof that the APK is complete.

## Objective

Deliver an installable offline Android APK based on the existing Basic English app, preserving its existing screens, navigation, learning flow, and word-card behavior, while replacing system TTS pronunciation with locally packaged human recordings.

The target is the exact 850-word list in `docs/js/data.js`. Each target word must have one corresponding human pronunciation recording. The app must use the packaged local audio when the user presses the pronunciation control.

## Non-negotiable acceptance criteria

The task is complete only when all of the following have been verified:

1. The source word list contains exactly 850 unique words.
2. Every one of those 850 words has a selected human recording; no missing words and no duplicate word-to-file assignments.
3. Every recording has a recorded source page, speaker/author, accent label, and original licence. The licence is checked per recording; do not describe the entire set as CC0.
4. All 850 source recordings have been downloaded and converted successfully to MP3.
5. All 850 MP3 files exist in the Android app assets at `audio/words/<word>.mp3`.
6. Each output file passes integrity checks against its cache marker (source fingerprint, file size, and SHA-256). A successful metadata match alone is not proof that a file was downloaded.
7. The APK builds successfully and contains exactly 850 word MP3 files plus the audio attribution files.
8. The APK artifact is uploaded to GitHub Actions and can be retrieved for installation.
9. The actual app is checked: Word Cards pronunciation and the relevant course pronunciation controls play the local human recording, not Android system TTS. Existing interface and learning behavior remain intact.

Do not report completion until the APK contents and playback behavior have been checked.

## Current implementation

The current implementation is on branch `basic-english-learning-upgrade`.

Latest audio implementation commit: `bf1281e97fa8db1ee46129c7b82f9b82f2485be1`. The plan-only repository update was subsequently committed as `9531de15eda133186d1074935651fb7b2ad2a0bf`.

The build script is `scripts/build_human_word_audio.py`. The workflow is `.github/workflows/build-android-offline.yml`.

Implemented in the latest commit:

- Serial media downloads with a minimum 1.2-second interval between request starts.
- HTTP 429 handling using the server's `Retry-After` value where available, with bounded retry behavior.
- Per-word cache markers containing source fingerprint, MP3 SHA-256, and output size.
- Progress report updates during the download loop.
- GitHub Actions cache restore/save for both MP3 outputs and cache markers.
- Build job timeout increased to 180 minutes.

Important: these changes have been committed, but the cache mechanism is not considered proven until an Actions run has successfully saved a cache and a subsequent run has restored and reused it.

## Verified status after Run 32 completed (2026-11-16 21:23 UTC)

- Latest workflow run: [Run 32](https://github.com/leamon110/basic_english/actions/runs/43956129814)
- Run ID: `43956129814`
- Built code commit: `bf1281e97fa8db1ee46129c7b82f9b82f2485be1`
- Run conclusion: `success`.
- The audio download/conversion step completed successfully.
- The cache-save step completed successfully.
- The debug APK build completed successfully.
- APK upload and audio coverage/licence report upload completed successfully.
- APK artifact ID: `14274275039`, name `basic-english-human-voice-apk`.
- Coverage report artifact ID: `14274115136`, name `basic-english-human-audio-coverage`.
- Downloaded APK file: `Basic-English-Human-Voice.apk`, 9,808,578 bytes, SHA-256 `50456a1eba4d7deb0ee2ff646e5d7370f7942d481ff61bbd655efdaa4429a523`.

### Verified artifact contents

The downloaded APK was opened and checked locally:

- APK ZIP integrity: passed.
- AndroidManifest.xml, classes.dex, resources.arsc, local index.html, app.js, teaching.js and course.js are present.
- Word MP3 entries under `assets/www/audio/words/`: exactly 850.
- Unique word MP3 basenames: exactly 850.
- Coverage report source records: exactly 850.
- APK word basenames and report source keys: exact match; no missing or extra words.
- Report totals: target 850; matched 850; missing 0; downloaded 850; cached 0; completed 850; attempted 850; pending 0; failed 0; download errors 0.
- Encoded MP3 total: 9,446,648 bytes; average 11,114 bytes.
- All 850 MP3 files were extracted and passed a single FFmpeg concat-demuxer decode check (exit code 0).
- APK includes `assets/www/audio/credits.json` and `assets/www/audio/THIRD_PARTY_AUDIO_CREDITS.md`.

### Static playback-path inspection

- Android `MainActivity` loads `file:///android_asset/www/index.html`, enables WebView JavaScript and permits media playback without a second user gesture; it contains no native `TextToSpeech` integration.
- Word Cards button and the word-detail modal both call `BE.teaching.playWord`.
- `BE.teaching.playWord` delegates to `window.BE.speak`.
- `BE.speak` routes a single word to `new Audio('audio/words/' + word + '.mp3')` before any sentence-level browser speech fallback.
- Course vocabulary buttons call `BE.course.say`, which delegates to the same `BE.speak` path.
- This confirms the code wiring statically; physical-device installation and offline playback have not yet been tested.

### Remaining quality checks

- The coverage report contains two records whose speaker field is `Unknown` (`cough` and `measure`). The Commons page for `cough` explicitly says it was recorded by Dvortygirl. The `measure` page identifies uploader Muke and a Public Domain self-release, but does not identify the speaker.
- Three records (`tin`, `oven`, `sock`) currently carry the verbose fallback text "No machine-readable author provided. Dvortygirl assumed..."; their Commons descriptions explicitly say recorded by Dvortygirl. Normalize these attribution labels without inventing a speaker for `measure`.
- The current APK is a successfully built and inspectable test artifact, but final acceptance is not complete until attribution labels are made clear and a real Android device verifies Word Cards and course playback offline.
- The Run 32 cache-save step succeeded. A subsequent run must verify that cache restore reuses the 850 MP3s (expected report: 850 cached, 0 newly downloaded) before the cache mechanism is considered proven.

This is the latest verified snapshot. Refresh GitHub before making any later current-state claim.

## Mandatory startup check for every new conversation

A plan file by itself does not force a new conversation to read it. Therefore the repository also contains `AGENTS.md`, which tells AI assistants the required startup procedure.

Before doing any work in a new conversation, the assistant must:
1. Read `AGENTS.md` and the complete `AUDIO_BUILD_PLAN.md`.
2. Fetch the live branch head and latest Actions run(s) for `basic-english-learning-upgrade`.
3. Inspect the newest run's job steps and artifacts, and logs when required.
4. Check whether a run is active before any push or workflow trigger. The current workflow uses `cancel-in-progress: true`.
5. Reconcile the plan's historical status snapshot with live GitHub facts.
6. Only then continue with the next action.

If the assistant cannot perform one of these checks, it must state the limitation and must not pretend that the check happened. These repository files are durable instructions for agents that read them; they do not technically force every ChatGPT conversation to load them. For ChatGPT, also add the companion rule to this Project's instructions.

## Execution sequence

### Phase 1 — Finish the current run

Let Run 32 finish. Do not push changes to workflow-triggering paths while it is active: the workflow uses `cancel-in-progress: true`, so a new matching run can cancel the current run.

After it finishes, inspect the job steps, uploaded artifacts, and `audio-coverage-report.json`. Record the actual values for:

- matched words;
- missing words;
- downloaded count;
- cache-restored count;
- completed count;
- pending count;
- failed count;
- whether the cache-save step succeeded.

### Phase 2 — Preserve partial progress

If the run fails after downloading some files:

1. Confirm the cache-save step ran and succeeded.
2. Confirm the audio files and corresponding cache markers were included in the cache.
3. Rerun the same workflow on the same branch so the restore-key prefix can find the saved cache.
4. Verify that valid cached files are reused without another media download.
5. Continue until all 850 recordings are complete.

Do not cancel a run merely because it is taking time. A cancellation before the cache-save step can discard the current runner's unpersisted files.

### Phase 3 — Verify the audio package

Before APK compilation is considered successful, verify all 850 expected filenames against the source word list. Check file sizes, cache markers, source fingerprints, and SHA-256 hashes. Reject missing, empty, corrupt, or unverified files. Keep the per-recording attribution data.

### Phase 4 — Build and inspect the APK

Only after all 850 recordings pass verification:

1. Build the Android APK.
2. Inspect the APK archive and count the packaged word MP3 files; require exactly 850.
3. Confirm the attribution JSON and human-readable licence file are present.
4. Upload the APK artifact.
5. Record the artifact link and build commit here.

### Phase 5 — Verify app playback

Install the APK and test at least:
- a Word Cards pronunciation button;
- a pronunciation control in the system-learning course;
- offline playback with network disabled.

Confirm that playback uses the local human recording and that the existing interface and learning flow remain unchanged.

## Separate follow-up: Lingua Magna recording index

The `Lingua Magna` project's `data/audio/ll-en.json` was identified as a potentially useful structured recording index. It has not yet been integrated into the current build script.

Do not silently switch the active source-selection process during Run 32. After the current run, inspect the exact index and its referenced source files, verify word coverage and each recording's licence, and compare it with the current Commons selection. Integrate it only if the actual data improves coverage or reduces unnecessary Commons requests without weakening the 850-word and licence requirements.

## Handoff rule

At the end of every meaningful work session, update this file with:
- latest commit;
- latest workflow run and state;
- exact verified audio counts;
- cache restore/save outcome;
- APK artifact status;
- remaining blockers and the next concrete action.

A new conversation should read this file and the latest GitHub Actions run before changing code or starting another build.
