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


Previous accepted device-tested build: Run 35, code commit `d5d1b26a05070f66b6c02d5116f226c2ff708a70`.

Latest built code commit: Run 36, code commit `86e81894a544ad6ec7e6a768d4f0d1f791e08619` (build succeeded; user-device acceptance is pending).

The branch may contain newer root-level research/documentation commits that do not trigger Android builds. Always refresh GitHub for the live branch head and latest Actions run before making a current-state claim.


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
- Operator × Directive first-pass cross-map completed: `BASIC_ENGLISH_OPERATOR_DIRECTION_MAP.md` records Ogden's 1937 go/get/come directional demonstration, source-verified examples from the 1930/1932 texts, the 20 proper Directives vs the out boundary item, and a reclassification of all 14 current App exercises.
- Classification correction: the 21 headings in `The ABC of Basic English` Names of Directions chapter are not the same list as the 20 proper Directives. The 20 proper Directives exclude out; out is a directional adverb boundary item. For/of/till are non-directional prepositions.
- Next action: build a source-verified Names of Acts map, classifying common Standard English verbs by the Basic structures Ogden actually gives (Operator + Directive, Operator + Name, Name of Act + Directive, and fixed word-groups), before changing the App's teaching UI.
- First operator-index milestone completed: `BASIC_ENGLISH_OPERATORS.md` records all 16 core Operators, their source-grounded starting senses, representative examples, and a correction map for the current App's mixed Operator + Direction exercise.



## Research milestone — Operator × Directive cross-map (2026-11-17)

- Read Ogden's 1930 `Basic English: A General Introduction with Rules and Grammar` sections on the system, Operators, Directives, and the Panopticon exercise.
- Rechecked Ogden's 1932 `The ABC of Basic English` Names of Acts and Names of Directions, including the source's cross-reference lines.
- Read Ogden's 1937 `Basic English and Grammatical Reform`, especially “Directional Thinking” and “An Example of Verb-Elimination”.
- Core result: Ogden explicitly teaches testing each Operator against each Directive, accepting combinations that refer to physically possible relations in common experience; object choice, word order, metaphorical extension, and fixed idioms then affect interpretation.
- Verified demonstration: the 1937 story uses go, get, and come with 19 of the 20 proper Directives appearing in its directional/temporal expressions; after / before are temporal modifiers, not direct Operator + Directive complements. It also uses the compound into. Ogden says 21 ordinary verbs are replaced in the story by the three Operators.
- Corrected classification: 20 proper Directives; out is included in the direction diagram as a directional adverb boundary item; for / of / till are non-directional prepositions. The 21 Names of Directions chapter headings in the ABC are a different list.
- Current App audit: the existing 14 “Operator + Direction” questions mix several structures, including Operator + Quality, Operator + Name + of, Name of Act + Directive, and an answer using away, which is not one of the 850 base entries but is explicitly allowed by the current validator as a taught construction.
- Files added/updated: `BASIC_ENGLISH_OPERATOR_DIRECTION_MAP.md`, `BASIC_ENGLISH_DIRECTIVES.md`, `BASIC_ENGLISH_OPERATORS.md`, `BASIC_ENGLISH_EXPRESSION_SYSTEM.md`.
- No App source code was changed. No Android build was triggered. The updated files are repository-root Markdown and do not match the workflow's watched paths.
- Next concrete action: create the first end-to-end Meaning → Basic teaching unit, using the three context-specific Basic renderings of speak; include analysis, reasoning, independent generation and reverse interpretation before changing the App.


## Research milestone — Names of Acts / Common Needs first-pass index (2026-11-17)

- Reopened the original `The ABC of Basic English` source at its table of contents and pp.244–262.
- Verified the original section structure: Some Common Needs → Simple Acts, Complex Acts, Other Suggestions.
- Extracted and classified the source examples for speaking/telling/singing/hearing/reading/writing, eating/biting/touching/cutting/breaking, movement and body positions, mental processes, feeling/liking/wanting/learning/teaching, buying/selling/finding/losing/destroying, growth/sleep/death, and other common expressions.
- Added `BASIC_ENGLISH_NAMES_OF_ACTS.md` with source examples and a separate project-level structural classification.
- Core correction reinforced: the source uses several different structures, not a single Operator + Directive formula. Examples include give a talk, have a knowledge of it, put views into writing, keep it in mind, make an attempt, and get taller.
- No App source code was changed. No Android build was triggered. This is a repository-root Markdown research milestone and does not match the workflow's watched paths.
- Next action: create the first end-to-end Meaning → Basic lesson, using the source's three different speak contexts, before changing the App's teaching UI.


## Research milestone — Expression Lesson 01 prototype (2026-11-17)

- Added `BASIC_ENGLISH_EXPRESSION_LESSON_01.md`.
- The lesson uses Ogden's original three speak contexts from `The ABC of Basic English`, p.244: speak to a person → say something to him; speak at a meeting → give a talk / make a statement; speak a language → have a knowledge of it.
- The lesson separates original examples from project-designed explanations and exercises.
- It teaches context recognition, Operator / Name / Directive decomposition, independent construction and reverse interpretation.
- No App source code was changed and no Android build was triggered. This is a repository-root Markdown lesson prototype.
- App integration completed in commit `86e81894`: added a separate Expression System navigation entry and home card, the speak lesson page, a local quiz, a vocabulary-only writing check, responsive CSS, and service-worker offline caching. Original 45 Steps, Teaching, Sentence Practice, and audio code were not changed.
- Run 36 (`44080767833`) completed successfully for commit `86e81894`. All 22 job steps completed successfully. The APK artifact `basic-english-human-voice-apk` (ID `14326577845`, 9,223,913 bytes) and coverage artifact `basic-english-human-audio-coverage` (ID `14327920679`, 21,467 bytes) are uploaded and not expired. No build is currently running.
- Local verification: expression-system.js and app.js parse successfully; render() produced the page; the actual validator accepted `I say something to him.` and rejected `I communicate with him.` as out-of-vocabulary. This does not replace device testing.
- Next action: user installs the Run 36 APK and tests the new Expression System page on Android. Device acceptance remains pending; do not mark the new lesson as user-accepted until the user reports the test result.


## Validation-rule clarification — taught constructions (2026-11-17)

- Inspected `docs/js/validator.js` rather than relying only on the base 850 array.
- Confirmed that the validator explicitly accepts course-taught constructions including `something`, `someone`, `nothing`, `into`, and `away`, even though some are not individual entries in the 850 base-word arrays.
- Corrected the Operator × Directive map: `go away` is accepted by the current App validator as a taught construction, but `away` is not one of the 20 proper Directives; it must be classified separately from the core Operator × Directive system.
- Lesson 01 now notes why `say something to him` is accepted without treating `something` as an extra base-list entry.


## App implementation milestone — Expression System Lesson 01 (2026-11-17)

- Code commit: `86e81894a544ad6ec7e6a768d4f0d1f791e08619`.
- Added `docs/js/expression-system.js` and `docs/css/expression-system.css`.
- Added the new Expression System navigation route and home card in `docs/index.html` / `docs/js/app.js`.
- Updated `docs/sw.js` to cache the new module and stylesheet offline (cache version v32).
- Lesson 01 teaches the three source-backed meanings of speak; includes a three-question context quiz, a free-writing area with vocabulary-only validation, reverse interpretation, and explicit source attribution.
- Existing original 45 Steps, Teaching, Sentence Practice, word audio, and audio assets were not edited.
- Static/runtime verification in the tools environment: both JavaScript files parse; the new module renders into a mock container; validator accepts `I say something to him.` and rejects the out-of-vocabulary word `communicate`.
- GitHub Actions Run 36 (`44080767833`) subsequently completed successfully; see the verified Run 36 build-result section below. No new build was triggered after it.
- User-device installation and interaction retest remain pending; the feature is not yet accepted on device.


## Run 36 build result — Expression System Lesson 01 (2026-11-17)

- Workflow run: [Run 36](https://github.com/leamon110/basic_english/actions/runs/44080767833).
- Built code commit: `86e81894a544ad6ec7e6a768d4f0d1f791e08619`.
- Final status: completed / success; all 22 job steps completed.
- Audio coverage: 850 / 850 recordings restored from cache, 0 newly downloaded, 0 errors; MP3 total 9.45 MB.
- APK: artifact `basic-english-human-voice-apk`, ID `14326577845`, 9,223,913 bytes, not expired.
- Coverage report: artifact `basic-english-human-audio-coverage`, ID `14327920679`, 21,467 bytes, not expired.
- Android Gradle build: `BUILD SUCCESSFUL` in 39 seconds.
- Non-fatal workflow warnings: Node.js 20 deprecation notices and dependency deprecation warnings for `punycode` / `url.parse()`; no build step failed.
- The artifact ZIP was requested from GitHub Actions; the exact artifact name to download is `basic-english-human-voice-apk` (not the coverage report).
- No active workflow remains.
- User-device test is still pending. Next: install the Run 36 APK, open the separate “表达系统” page, test Lesson 01 quiz and vocabulary checker, and confirm that original 45 Steps and audio still work.


## Curriculum clarification — 45 Steps and the project Expression System (2026-11-17)

- The 45-step course is not devoid of expressive practice. The reproduced course on BasicEnglish.org labels Step 42 “Basic for everyday needs”; it contains five practical dialogues and asks the learner to “Give an account in Basic” of a railway journey. Step 1 already has sentence-production exercises using the learned words and structures.
- Therefore, do not describe the new Expression System track as filling a complete absence in the original 45 Steps. The distinction is that the project is making the meaning-to-Basic conversion process an explicit, separately navigable, systematically practiced learning track.
- “Expression System” is a project-level umbrella name, not a formal Ogden chapter title or a claim that Ogden published one standalone course with this exact name.
- Names of Acts is one component of the broader system. The ABC's structure also covers Things, Qualities, Operations/Operators, Directions, Word-order, other word-forms, Expansions and Special Senses, 250 Fixed Word-Groups, and “Some Common Needs” (Simple Acts, Complex Acts, Other Suggestions), among other sections.
- Source checks: [Basic English 45-step course, Step 42](https://basicenglish.org/step-42/index.html); [45-step course index](https://basicenglish.org/index_htm.html); Ogden, *The ABC of Basic English* (1932), table of contents and “Some Common Needs”.
- Next content-design action: preserve the original 45-step material and build the supplementary track by mapping the relevant original system components to explicit meaning-analysis, Basic construction, and reverse-understanding exercises. Do not present the project track as Ogden's original named module.


## Cross-session handoff — 45 Steps vs Expression System (verified 2026-11-17)

### Source distinction
- Ogden's 45 Steps is a staged course. It does contain sentence production and applied use; do not say it contains no expression practice.
- Ogden's *The ABC of Basic English* is a separate systematic exposition of the mechanisms and special uses behind Basic: Other Word-Forms, Expansions (Things/Qualities/Acts/Directions), 250 Fixed Word-Groups, and Some Common Needs.
- The project term `Expression System` is our supplementary curriculum name, not an original Ogden course title. Its content is based primarily on *The ABC*, with original examples distinguished from project-created explanations and exercises.

### Exact current App state
- `docs/js/course.js` defines the 45-step directory. Only Steps 1, 2, 3, 5, 6, 9, 10, 12, 13, 15, 17, 18, 20 and 25 have local Chinese adaptations (14/45).
- The other 31 steps, including Step 42, call `openOriginal(n)` and open the BasicEnglish.org original page; they are not locally reproduced in the App.
- The adapted local steps include vocabulary/structure exercises, reading comprehension, and constrained sentence-writing prompts. Example: local Step 1 asks learners to write four Basic sentences using between/by/in/on. These are real practice, but they do not form a systematic ordinary-meaning → semantic analysis → Basic re-expression training loop.
- Original Step 42 is titled “Basic for everyday needs”. It contains five practical dialogues (railway station, hotel, bank, post office, library) and exercise 3 explicitly asks: “Give an account in Basic of the experiences of a person starting on a railway journey.” This is in the external original page, not currently inside the App's Chinese-adapted course.
- Therefore, when the user says they cannot see the original expressive practice in the App, that observation is correct: Step 42 is not locally adapted, and the 14 adapted lessons do not yet provide the dedicated meaning-to-Basic training track.

### Expression System implementation and limitations
- A separate App navigation item and home card exist; Lesson 01 (speak in three contexts) is integrated in code commit `86e81894a544ad6ec7e6a768d4f0d1f791e08619`.
- Lesson 01 has context questions, a free-writing area, a vocabulary-only check, and reverse interpretation. The writing check validates vocabulary/allowed forms only; it does not validate grammar, semantic preservation, or naturalness.
- GitHub Actions Run 36 (`44080767833`) built successfully; APK artifact `basic-english-human-voice-apk`, ID `14326577845`, 9,223,913 bytes. All 22 steps passed; audio 850/850 restored from cache, 0 errors; APK build successful. No active Actions run at this handoff.
- User-device acceptance of the Run 36 Expression System page is still pending. Do not mark it accepted until the user confirms the install and tests.
- Next content action after device retest: continue designing the supplementary Meaning → Basic curriculum from *The ABC*, preserving source/provenance distinctions and not misrepresenting it as original 45 Steps content.

### Primary source pages checked
- [Original 45-step Step 1](https://basicenglish.org/step-1/index.html)
- [Original 45-step Step 42](https://basicenglish.org/step-42/index.html), especially the five dialogues and exercise 3.
- Research details and original-source mapping: `BASIC_ENGLISH_EXPRESSION_SYSTEM.md`, `BASIC_ENGLISH_NAMES_OF_ACTS.md`, `BASIC_ENGLISH_OPERATORS.md`, `BASIC_ENGLISH_DIRECTIVES.md`, `BASIC_ENGLISH_OPERATOR_DIRECTION_MAP.md`, `BASIC_ENGLISH_EXPRESSION_LESSON_01.md`.


## Run 36 APK direct-delivery preparation (2026-11-17)

- Retrieved the official GitHub Actions artifact `basic-english-human-voice-apk` from Run 36, artifact ID `14326577845`.
- Verified the downloaded outer artifact ZIP (8.8 MiB) has no ZIP integrity errors and contains exactly `Basic-English-Human-Voice.apk`.
- Extracted the APK as `Basic-English-Expression-System-Run36.apk` for direct user download.
- APK size: 9,820,317 bytes.
- APK SHA-256: `e8a8dfd8f58f3f9f659002822c1a3cc7f92d198a20688c55b5d397426bae30e7`.
- APK ZIP integrity: passed.
- Independently counted exactly 850 files under `assets/www/audio/words/`.
- Confirmed the APK contains `assets/www/js/expression-system.js`, `assets/www/css/expression-system.css`, `assets/www/audio/credits.json`, and `assets/www/audio/THIRD_PARTY_AUDIO_CREDITS.md`.
- Direct APK file was prepared in the current conversation for download. This is the same official Run 36 artifact, not a rebuild.
- User-device installation and Lesson 01 acceptance remain pending.


## Run 36 download-link failure investigation and corrected delivery (2026-11-17)

### Verified build and artifact
- Latest branch at investigation: `18b706476a201e6ca4465eb2c75980afe6c08b74`; no active Actions run.
- Latest run: Run 36 / ID `44080767833`, completed successfully for code commit `86e81894a544ad6ec7e6a768d4f0d1f791e08619`.
- All 22 job steps succeeded. Official APK artifact: `basic-english-human-voice-apk`, ID `14326577845`, 9,223,913 bytes, not expired. The coverage artifact is a separate 21,467-byte report and is not the APK.
- The official artifact ZIP contains exactly one member: `Basic-English-Human-Voice.apk`, 9,820,317 bytes.
- The extracted APK SHA-256 is `e8a8dfd8f58f3f9f659002822c1a3cc7f92d198a20688c55b5d397426bae30e7`; the same hash was obtained by streaming the APK directly from the official artifact ZIP.
- APK ZIP integrity passed. It contains exactly 850 `assets/www/audio/words/*.mp3` files, `assets/www/js/expression-system.js`, `assets/www/css/expression-system.css`, and both audio attribution files.

### Root cause of the failed Run 36 link
- The assistant sent `sandbox:/mnt/data/Basic-English-Expression-System-Run36.apk` before the artifact extraction / file-upload tool had returned a successful result for that APK path. At the time the link was emitted, the verified item available from the GitHub download step was the outer artifact ZIP; the extracted APK file had not yet been confirmed as materialized.
- The user then reported “无法完成操作”. The APK path was populated by a later tool upload. This is a file-creation/link-order error, not a failed GitHub build, a wrong Run 36 APK, or a corrupt APK.
- Do not repeat this sequence: create/extract/copy first, wait for success, verify the exact path, then send the link.

### Corrected direct-delivery copy
- Created a fresh user-visible copy: `/mnt/data/Basic-English-Expression-System-Run36-verified.apk`.
- Size: 9,820,317 bytes.
- SHA-256: `e8a8dfd8f58f3f9f659002822c1a3cc7f92d198a20688c55b5d397426bae30e7`.
- APK ZIP integrity passed.
- This is the same official Run 36 APK, not a rebuild. User download success and device acceptance are still pending.

### Delivery-method distinction
- GitHub Actions run URL opens a workflow page; the user must locate and download the correct ZIP artifact. It is slower and easier to select the wrong artifact.
- `sandbox:/mnt/data/...` is the direct ChatGPT file link. It works only when that exact file has already been created in the active runtime and surfaced through the user-visible file-generation flow. A path string, connector file reference, or pending tool operation is not proof that a direct attachment exists.
- Historical direct sandbox deliveries recorded as successful include Run 34, Run 35 after the user selected the correct file, and `Basic-English-Voice-Fix-v2-direct.apk`. This supports the direct-file method when the file is actually prepared before the link is sent.
- Next action: send the verified Run 36 direct attachment link, then wait for the user to confirm download and Android installation. Do not trigger a new build for this delivery-only issue.


## Run 36 Android device retest — writing-checker UX gap (2026-11-17)

- User installed and tested Run 36. User reports that the other requested checks meet expectations.
- In Lesson 01's writing area, the user entered a sentence and tapped `检查850词汇`; the vocabulary check passed.
- User correctly identified a confusing message: `词汇检查通过……请继续检查语法和意思是否准确`, but the writing area has no corresponding grammar/meaning-check button or next action.
- Inspected `docs/js/expression-system.js`: `checkVocabulary()` calls only `window.BE.validate(text)`. It checks the current vocabulary rules (850 words plus explicitly permitted taught forms); it does not check grammar, meaning preservation, or naturalness.
- The writing area has only two controls: `检查850词汇` and `显示提示`. The separate `检查答案` / `重新练习` buttons belong to the multiple-choice quiz, not the writing task.
- Therefore the displayed sentence is only a manual self-check reminder, not an implemented feature or a hidden button. The wording implies a next app step that does not exist; this is a UX defect and the user's confusion is justified.
- Run 36 device status: vocabulary validation is user-tested and passed; the other requested checks are user-reported as meeting expectations. The writing task's grammar/meaning stage is not implemented, so the Expression System lesson is only partially accepted pending a clear UI and a real next-stage design.
- No source code was changed and no new Android build was triggered in this retest.
- Next action: design and implement a distinct second-stage grammar-and-meaning review for Lesson 01. Define exactly what can be checked locally against the taught sentence patterns and the intended Chinese meaning; do not imply unrestricted natural-language understanding. Until that exists, the vocabulary-check success message must clearly state that only vocabulary was checked and that grammar/meaning review is not available in this version.


## Expression Lesson 01 — staged writing checks implemented (2026-11-18)

- User-device feedback on Run 36 exposed a real UX gap: after vocabulary validation, the UI asked the learner to check grammar and meaning but provided no corresponding controls or automated checks.
- Implemented in code commit `26527a38ff154590617b6ea7d61f7bf4b974dd2d`.
- Changed:
  - `docs/js/expression-system.js`: replaced the misleading single-stage writing feedback with three ordered stages: (1) vocabulary, (2) grammar-structure check, (3) meaning check. The grammar and meaning buttons unlock only after the preceding stage passes. Editing the sentence resets downstream results and disables the later stages.
  - `docs/css/expression-system.css`: added stage guidance, disabled-button styling, and responsive button layout.
  - `BASIC_ENGLISH_EXPRESSION_LESSON_01.md`: documented the exact checker scope and examples.
- Grammar checker is deliberately a constrained local rule checker for this lesson's taught pattern: subject pronoun + say/says + something/nothing + to + object pronoun. It checks subject–verb agreement, the content/to/recipient order, and object-pronoun form.
- Meaning checker compares the parsed roles against the exercise prompt “我向他表达一些内容”: speaker I, content something, recipient him. It reports which semantic role differs.
- Important limitation: this is not a general English grammar parser or naturalness evaluator. Sentence forms outside the supported pattern are reported as “暂时无法判断”, not incorrectly labelled ungrammatical.
- Local V8 syntax compilation passed. Rule tests passed for:
  - `I say something to him.` → grammar pass, meaning pass.
  - `He says something to him.`, `I say nothing to him.`, `I say something to her.` → grammar pass, meaning mismatch correctly identified.
  - `I says something to him.`, `He say something to him.`, missing `to`, wrong word order, and subject pronoun after `to` → grammar errors correctly identified.
  - `I give a talk.` and `I am saying something to him.` → outside this checker's scope, reported as unsupported rather than grammatical errors.
- This code push changes `docs/**`, so it triggers the Android workflow. The build result and artifact status must be recorded after the new run completes. Do not treat local syntax/rule tests as a substitute for the APK build or Android device retest.
- Next action: inspect the new Actions run, verify all build steps and the APK artifact, then provide the new APK for the user's phone test. Device acceptance of these new writing checks remains pending.


### Additional verification and cache follow-up (2026-11-18)

- Executed the actual committed `docs/js/expression-system.js` in a V8 mock-DOM harness, clicked the real registered UI handlers, and verified all three stages and feedback states.
- Ten integration cases matched expectations: canonical sentence passes both checks; changed speaker/content/recipient pass the sentence-pattern check but fail meaning; subject–verb agreement, missing `to`, object-pronoun case and word-order errors fail the grammar stage; unsupported alternative structures are reported as temporarily uncheckable rather than grammar errors.
- Verified that the meaning button stays locked until grammar passes, and the source code resets later-stage results when the learner edits the input.
- Review found `docs/sw.js` still uses cache name `basic-english-v32`. The expression JS/CSS changed in the current code commit, so bump the service-worker cache name to v33 after Run 37 completes. Do not modify `docs/**` while Run 37 is active because the workflow uses `cancel-in-progress: true`.
- Run 37 (ID `44129407922`) is currently in progress; the job is still on “Fetch and package all 850 human word recordings”. Its log endpoint returned 404 while the job was running, and no artifact has been uploaded yet. This is not evidence of build failure.
- After Run 37 finishes, update `docs/sw.js` to v33, allow the resulting follow-up Android build to complete, and deliver only the APK from the final cache-versioned successful run.
