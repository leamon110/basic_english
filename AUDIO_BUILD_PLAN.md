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

Original audio implementation commit: `bf1281e97fa8db1ee46129c7b82f9b82f2485be1`. Latest word-pronunciation interaction update: `d5d1b26a05070f66b6c02d5116f226c2ff708a70`.

The build script is `scripts/build_human_word_audio.py`. The workflow is `.github/workflows/build-android-offline.yml`.

Implemented in the latest commit:

- Serial media downloads with a minimum 1.2-second interval between request starts.
- HTTP 429 handling using the server's `Retry-After` value where available, with bounded retry behavior.
- Per-word cache markers containing source fingerprint, MP3 SHA-256, and output size.
- Progress report updates during the download loop.
- GitHub Actions cache restore/save for both MP3 outputs and cache markers.
- Build job timeout increased to 180 minutes.

Important: these changes have been committed, but the cache mechanism is not considered proven until an Actions run has successfully saved a cache and a subsequent run has restored and reused it.

## Verified status after Run 34 completed (2026-11-16 21:37 UTC)

### Run 34 — successful attribution-corrected APK

- Run: [Run 34](https://github.com/leamon110/basic_english/actions/runs/43961510814), ID `43961510814`.
- Conclusion: `success`.
- Built code commit: `0037aafad0bad9a436488332dd5928e854100668`.
- APK artifact ID: `14274786857`, name `basic-english-human-voice-apk`.
- Coverage report artifact ID: `14274556957`, name `basic-english-human-audio-coverage`.
- APK artifact ZIP size: 9,216,658 bytes.
- Extracted APK: `Basic-English-Human-Voice.apk`, 9,812,441 bytes.
- APK SHA-256: `233555f8311c22ad3a590ff567b905a25b154d58d5eadcb32c96d720123982d3`.

### Run 34 report and APK verification

- Report: target 850; matched 850; missing 0; downloaded 0; cached 850; completed 850; attempted 850; pending 0; failed 0; download errors 0.
- This confirms all 850 audio files were restored from the successful Run 32 cache and reused; Run 34 did not download the audio files again.
- Encoded audio total: 9,446,648 bytes; average 11,114 bytes.
- APK ZIP integrity passed.
- Exactly 850 files exist under `assets/www/audio/words/`; all 850 basenames are unique and match the 850 report source keys exactly.
- All 850 MP3s have distinct SHA-256 hashes; no duplicate audio payloads were found.
- All 850 MP3 files passed a single FFmpeg concat-demuxer decode pass (exit code 0).
- APK contains `AndroidManifest.xml`, `classes.dex`, `resources.arsc`, local site assets, `assets/www/audio/credits.json`, and `assets/www/audio/THIRD_PARTY_AUDIO_CREDITS.md`.
- All 850 source records have non-empty title, speaker label, uploader, accent, licence and source URL fields.

### Attribution corrections verified in Run 34

- `cough`: Dvortygirl; uploader Dvortygirl; US English; CC BY-SA 3.0.
- `tin`, `oven`, `sock`, `automatic`: Dvortygirl is now extracted as the speaker; uploader is separately recorded.
- `measure`: speaker remains explicitly `Not identified`; uploader is Muke; US English; Public Domain. Do not claim Muke is the speaker.
- Speaker counts: Wodencafe 607; Grendelkhan 118; Dvortygirl 118; Naomi Persephone Amethyst 5; TreeMama 1; speaker not identified 1.
- Accent labels: General American 730; US English 120.
- Licence labels: CC0 725; CC BY-SA 3.0 113; Public Domain 7; CC BY-SA 4.0 5.

### App playback-path inspection

- Android `MainActivity` loads `file:///android_asset/www/index.html`, enables WebView JavaScript, allows media playback without a second user gesture, and has no native `TextToSpeech` integration.
- Word Cards and the word-detail modal call `BE.teaching.playWord` → `BE.speak` → local `Audio('audio/words/<word>.mp3')`.
- Course vocabulary buttons call `BE.course.say` → the same `BE.speak` local-audio path.
- Static wiring is verified. The user installed the Run 34 APK and reported that Word Cards, the word-detail modal pronunciation button, and Course Step 1 pronunciation all played human recordings normally, without stutter or noticeable delay; all three continued to work with Wi-Fi and mobile data disabled; the existing interface was normal. This is user-reported physical-device verification.

### Current delivery status after user device test

- Run 34 APK was built, uploaded, downloaded, independently inspected, installed and tested on the user's Android phone.
- The user confirmed Word Cards pronunciation works; the detail modal exists and its pronunciation button works; Course Step 1 vocabulary pronunciation works; all three work offline with Wi-Fi/mobile data disabled; existing interface behavior is normal.
- The user additionally confirmed human voice quality: no stutter and no noticeable delay.
- Therefore the audio delivery acceptance criteria, including physical-device offline playback, are user-reported as passed for the Run 34 APK.
- A new UI interaction request is being implemented and must be verified in a new APK before that revised UI is accepted.
- Run 34 built code commit: `0037aafad0bad9a436488332dd5928e854100668`.
- Latest interaction-change commit: `d5d1b26a05070f66b6c02d5116f226c2ff708a70`.

Refresh GitHub before making any later current-state claim.


## UI interaction follow-up — Run 35 completed; device retest pending

User request:
- In Teaching / Word Cards, remove the separate pronunciation button. Tapping the word text itself plays its human recording. Tapping elsewhere on that word card opens the existing detail modal. Do not change the detail modal's contents or its existing pronunciation button.
- In every locally adapted course Step vocabulary tile, remove the separate visible "▶ 发音" label; tapping any part of the whole vocabulary tile plays the word.

Implementation:
- Code commit: `d5d1b26a05070f66b6c02d5116f226c2ff708a70`.
- Changed files: `docs/js/teaching.js`, `docs/js/course.js`, `docs/css/style.css`.
- Teaching word text is a button that stops event propagation and calls `BE.teaching.playWord(word)`; the parent word card retains its existing `showWordDetail(word)` click behavior for other card areas.
- Detail modal HTML was read back and verified unchanged, including its pronunciation button, Chinese translation and category.
- Course vocabulary tiles remain full-size buttons calling `BE.course.say(word)`; the visible `<small>▶ 发音</small>` was removed. The shared `vocab()` helper applies this to all locally adapted course steps using it.
- Word Cards grid minimum width on mobile increased from 100px to 120px; word text now uses `white-space: nowrap`.
- Static source checks passed for the two click routes, unchanged modal markup, removal of the course label and the no-wrap rule.

### Run 35 — successful APK build

- Run: [Run 35](https://github.com/leamon110/basic_english/actions/runs/43979897738), ID `43979897738`.
- Conclusion: `success`.
- Built code commit: `d5d1b26a05070f66b6c02d5116f226c2ff708a70`.
- All 22 job steps completed successfully; APK build and both artifact uploads succeeded.
- APK artifact ID: `14282513900`, name `basic-english-human-voice-apk`, artifact ZIP size 9,216,571 bytes.
- Coverage report artifact ID: `14281622981`, name `basic-english-human-audio-coverage`, artifact ZIP size 21,467 bytes.
- Extracted APK: `Basic-English-Human-Voice-Run35.apk`, 9,812,357 bytes.
- APK SHA-256: `292722b8352a5c1f208edb76dda7af9009762d8e45eb848efa257a677d79d9ef`.

### Run 35 artifact verification

- Report counts: target 850; matched 850; missing 0; downloaded 0; cached 850; completed 850; attempted 850; pending 0; failed 0; download errors 0.
- Workflow log explicitly reports `Packaged all 850 human recordings; MP3 total 9.45 MB (0 new, 850 cached)`.
- Downloaded APK artifact ZIP integrity passed.
- Extracted APK ZIP integrity passed.
- Exactly 850 word MP3 files are present; all 850 basenames are unique and exactly match the 850 report source keys.
- Both audio attribution files are present.
- Compared each of the 850 MP3 entries against the previously verified Run 34 APK: all 850 audio payloads are byte-identical. Run 34's 850 files had already passed the FFmpeg decode check.
- Static checks inside the APK passed:
  - Teaching word text plays pronunciation.
  - Tapping other areas of the Teaching word card opens the detail modal.
  - The detail modal pronunciation control remains.
  - Course vocabulary tiles retain their full-tile click action and no longer show the separate pronunciation label.
  - Word Cards text has the no-wrap CSS rule.
- One harmless obsolete CSS selector, `body.speech-unavailable .word-card-sound`, remains although the corresponding element was removed. It has no rendered target and does not affect the new behavior. Defer this cosmetic cleanup to avoid creating an unnecessary extra build.

### Re-verification of the delivered Run 35 file (2026-11-17)

- User reported that the provided download did not work and asked whether the wrong APK had been sent.
- Downloaded the official GitHub Actions artifact again directly from Run 35 artifact ID `14282513900` (`basic-english-human-voice-apk`).
- Official artifact ZIP size: 9,216,571 bytes. It contains exactly `Basic-English-Human-Voice.apk` (9,812,357 bytes).
- Extracted official APK SHA-256: `292722b8352a5c1f208edb76dda7af9009762d8e45eb848efa257a677d79d9ef`.
- The previously prepared `Basic-English-Run35-Download.apk` has the same SHA-256 and was compared byte-for-byte with the APK extracted from the freshly downloaded official artifact: exact match.
- Inspected that APK: exactly 850 word MP3 files are present; the Teaching word-text pronunciation button and course full-tile pronunciation behavior are present; the old standalone Teaching sound button and visible course `▶ 发音` label are absent; the 120px grid and no-wrap CSS rules are present.
- Conclusion: the APK file itself was not Run 34 or another wrong build; it is byte-identical to the official Run 35 artifact built from commit `d5d1b26a05070f66b6c02d5116f226c2ff708a70`.
- The user-facing sandbox download failure remains unresolved as a delivery/UI issue. Do not claim the user has successfully downloaded the file. A fallback is to open the Run 35 GitHub Actions page and download artifact `basic-english-human-voice-apk` from the Artifacts section.
- No code changes or new build were made for this re-verification.

### Run 35 device acceptance — user confirmed

- After downloading and installing the Run 35 APK, the user reported: “测过了，下一步。”
- Record this as the user's overall confirmation that the Run 35 phone retest was completed and accepted. The user did not provide separate item-by-item observations in that message; do not invent details beyond the overall acceptance.
- Run 35 remains the latest built APK: run ID `43979897738`, code commit `d5d1b26a05070f66b6c02d5116f226c2ff708a70`.
- Run status: completed / success; all 22 job steps completed; 850 recordings restored from cache, 0 downloaded, 0 errors.
- APK artifact ID `14282513900` and coverage artifact ID `14281622981` remain available.
- The user confirmed that the correct GitHub Actions artifact had been downloaded; the earlier file-selection issue was resolved.
- Audio + Run 35 interaction delivery is accepted based on the user's overall phone-test confirmation. No new audio build is required for this acceptance.


Latest code commit built by Run 35: `d5d1b26a05070f66b6c02d5116f226c2ff708a70`.
Latest plan/documentation commit before this update: `aa9df74c6ee77d74d9634be1125d4dd02d486244`.

Refresh GitHub before making any later current-state claim.


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


## Separate project track — Basic English expressive-system curriculum

This is a separate learning-product workstream; it does not alter the accepted audio APK or its build pipeline.

- Research and design baseline: `BASIC_ENGLISH_EXPRESSION_SYSTEM.md` at the repository root.
- Verified sources: Ogden's 45-step course as reproduced by BasicEnglish.org; Ogden's 1932 `The ABC of Basic English`, whose actual structure includes Other Word-Forms, Expansions, Special Uses and Common Needs; project rule notes are secondary and must be checked against original texts.
- Key correction: do not teach all non-operator verbs as `operator + direction + noun`. Ogden's own examples include Operator + Direction, Operator + Noun, Operator + Quality and context-specific multiword paraphrases.
- Current App audit: 14/45 steps adapted; Teaching has 8 rule-exercise categories; Sentence Practice has 100 example sentences, 20 word-order exercises and 10 dialogues. These are not yet a complete meaning-to-Basic expression-training system.
- No App source files were modified and no Android build was triggered by this research/documentation milestone. The workflow watches `docs/**`, `android-offline/**`, `scripts/**` and its workflow file; this update touches root-level Markdown only.
- Operator index completed: `BASIC_ENGLISH_OPERATORS.md` records the 16 core Operators, source-grounded starting senses and representative examples.
- Directives index completed: `BASIC_ENGLISH_DIRECTIVES.md` records the 21 entries in Ogden's Names of Directions chapter, with spatial roots, abstract extensions and context limits.
- Next action: cross-reference Operators × Directions and verify each real combination from the original text before changing the App's teaching UI.
- First operator-index milestone completed: `BASIC_ENGLISH_OPERATORS.md` records all 16 core Operators, their source-grounded starting senses, representative examples, and a correction map for the current App's mixed Operator + Direction exercise.

