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

## Verified status after Run 32 artifact inspection and Run 33 start

### Run 32 — completed and independently inspected

- Run: [Run 32](https://github.com/leamon110/basic_english/actions/runs/43956129814), ID `43956129814`.
- Conclusion: `success`.
- Built code commit: `bf1281e97fa8db1ee46129c7b82f9b82f2485be1`.
- Audio download/conversion step: success.
- Cache-save step: success.
- Debug APK build: success.
- APK upload and coverage-report upload: success.
- APK artifact ID: `14274275039`, name `basic-english-human-voice-apk`.
- Coverage report artifact ID: `14274115136`, name `basic-english-human-audio-coverage`.
- Downloaded APK: `Basic-English-Human-Voice.apk`, 9,808,578 bytes.
- APK SHA-256: `50456a1eba4d7deb0ee2ff646e5d7370f7942d481ff61bbd655efdaa4429a523`.

Independent artifact checks:

- APK ZIP integrity passed.
- `AndroidManifest.xml`, `classes.dex`, `resources.arsc`, `assets/www/index.html`, and the relevant JavaScript files are present.
- Exactly 850 files exist under `assets/www/audio/words/`; all 850 basenames are unique.
- Coverage report contains exactly 850 source records; its keys exactly match the APK word MP3 filenames.
- Report totals: target 850; matched 850; missing 0; downloaded 850; cached 0; completed 850; attempted 850; pending 0; failed 0; download errors 0.
- Encoded audio total: 9,446,648 bytes; average 11,114 bytes.
- SHA-256 comparison found 850 unique audio files; no two word files contain identical MP3 bytes.
- All 850 extracted MP3s passed one FFmpeg concat-demuxer decode pass (exit code 0).
- APK contains `assets/www/audio/credits.json` and `assets/www/audio/THIRD_PARTY_AUDIO_CREDITS.md`.

Static playback inspection:

- Android `MainActivity` loads `file:///android_asset/www/index.html`, enables WebView JavaScript, and sets `setMediaPlaybackRequiresUserGesture(false)`; it has no native `TextToSpeech` integration.
- Word Cards and the word-detail modal call `BE.teaching.playWord`; this delegates to `BE.speak`.
- A single word is routed to local `Audio('audio/words/<word>.mp3')` before sentence-level browser speech fallback.
- Course vocabulary buttons call `BE.course.say`, which delegates to the same `BE.speak` function.
- Static wiring is verified; actual installation and offline playback on a physical Android device remain unverified.

Attribution review:

- The report had two entries labelled `Unknown`: `cough` and `measure`.
- The Commons page for `cough` explicitly says the pronunciation was recorded by Dvortygirl.
- The Commons page for `measure` identifies uploader Muke and a Public Domain self-release, but does not identify the speaker. The credits must distinguish "speaker not identified" from the uploader rather than claim Muke spoke it.
- Three entries (`tin`, `oven`, `sock`) use the verbose Commons fallback author text even though their descriptions say they were recorded by Dvortygirl.
- Source pages reviewed: [cough](https://commons.wikimedia.org/wiki/File:En-us-cough.ogg), [measure](https://commons.wikimedia.org/wiki/File:En-us-measure.ogg), [tin](https://commons.wikimedia.org/wiki/File:En-us-tin.ogg), [oven](https://commons.wikimedia.org/wiki/File:En-us-oven.ogg), [sock](https://commons.wikimedia.org/wiki/File:En-us-sock.ogg).

### Run 33 — currently active

- Run: [Run 33](https://github.com/leamon110/basic_english/actions/runs/43960903223), ID `43960903223`.
- Built code commit: `43a39bcfcfbe1fafa62906795b54c840e916ec1d`.
- Last observed state: `in_progress`; the job was still in environment setup (Install FFmpeg) at the last check.
- No Run 33 artifacts were present at the last check.
- Run 33 was triggered by an attribution-report improvement. Its script now records the Commons uploader separately and attempts to extract an explicit speaker from the Commons description.
- A review of the committed script found that the regex in this parser is double-escaped (`\\b` and `\\s` in the Python raw string), so the intended "recorded by" extraction will not match. This is a known issue in the active Run 33 code.
- Do not push another change to `scripts/**` while Run 33 is active: the workflow uses `cancel-in-progress: true`. Let Run 33 finish, inspect its report/artifacts and cache result, then correct the regex and rebuild only after the run completes.
- Expected cache behavior: because Run 32 saved the 850 MP3s and the source fingerprint does not include speaker/uploader labels, Run 33 should restore and reuse the 850 MP3s. Verify the actual report counts; do not assume cache hit from the restore step's green status alone.

### Remaining acceptance work

1. Correct speaker metadata parsing after Run 33 completes; preserve uploader separately and do not invent a speaker for `measure`.
2. Verify the next run actually restores the 850-file cache (expected `cached_count=850`, `downloaded_count=0`).
3. Inspect the resulting APK again: exactly 850 unique MP3s, report/source keys match, audio decodes, and attribution files are present.
4. Install the APK on a physical Android device and test Word Cards, word-detail pronunciation, course vocabulary pronunciation, and offline playback.
5. Only then mark the project delivered.

The Run 32 APK is a real installable test artifact, but final acceptance remains open until the attribution and physical-device checks are complete. Refresh the branch and Actions status before any later action.

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
