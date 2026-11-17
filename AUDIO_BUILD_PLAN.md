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


### Run 37 build result and Service Worker cache update (2026-11-18)

- Run 37 / ID `44129407922`, built code commit `26527a38ff154590617b6ea7d61f7bf4b974dd2d`, completed successfully.
- All 22 job steps completed successfully. Android Gradle reported `BUILD SUCCESSFUL` in 44 seconds.
- Audio: exactly 850/850 restored from cache, 0 newly downloaded, 0 errors; package log reports 9.45 MB.
- Cache-save step completed; the action reported the cache as read-only because the matching cache key already exists. No audio files needed to be downloaded again.
- APK artifact: `basic-english-human-voice-apk`, ID `14349132511`, 9,226,694 bytes, not expired.
- Coverage artifact: `basic-english-human-audio-coverage`, ID `14347754685`, 21,467 bytes, not expired.
- Non-fatal warnings: Node.js 20 deprecation notices and dependency notices for `punycode` / `url.parse()`. No step failed.
- Before delivering this build, the service-worker cache review found the app still used `basic-english-v32`. Updated `docs/sw.js` to `basic-english-v33` in commit `cbb42aa85ea00942a7166260315977863856f8a3`, so existing PWA clients will not keep the old expression JS/CSS under the previous cache key.
- The v33 change touches `docs/**` and triggers a follow-up build. Run 37 is not the final APK for user testing; use the successful artifact from the v33 build.


## Run 38 — final APK for staged writing-check device test (2026-11-18)

### Build result
- Run: [Run 38](https://github.com/leamon110/basic_english/actions/runs/44130128141), ID `44130128141`.
- Built code commit: `cbb42aa85ea00942a7166260315977863856f8a3` (includes Expression Lesson 01 staged checker and Service Worker cache v33).
- Conclusion: completed / success; all 22 job steps succeeded.
- Android Gradle: `BUILD SUCCESSFUL` in 40 seconds.
- Audio: 850/850 restored from cache, 0 newly downloaded, 0 errors; packaged MP3 total 9.45 MB.
- APK artifact: `basic-english-human-voice-apk`, ID `14348239555`, 9,226,681 bytes, not expired.
- Coverage artifact: `basic-english-human-audio-coverage`, ID `14349582365`, 21,467 bytes, not expired.
- Non-fatal warnings: Node.js 20 deprecation notices and `punycode` / `url.parse()` dependency notices; no failed build steps.
- Latest Actions state checked after completion: Run 38 success; no active or queued run.

### APK extraction and independent verification
- Downloaded the exact Run 38 APK artifact ZIP, artifact ID `14348239555`, to `/mnt/data/Basic-English-Expression-System-Run38-artifact.zip`.
- Wrapper ZIP size: 9,226,681 bytes; ZIP integrity passed; it contains exactly one member: `Basic-English-Human-Voice.apk`.
- Extracted APK: `Basic-English-Expression-System-Run38.apk`, 9,822,914 bytes.
- APK SHA-256: `3d147432c5ec15f38863fc70d87fb295df4c1cfd24ab51c93adb4aeeb420d1e3`.
- APK ZIP integrity passed.
- Exactly 850 MP3 files exist under `assets/www/audio/words/`.
- Confirmed APK includes the new `assets/www/js/expression-system.js`, `assets/www/css/expression-system.css`, Service Worker `assets/www/sw.js` with `basic-english-v33`, and both audio attribution files.
- Inspected packaged JS for all three check buttons, semantic role mapping, and the “unsupported is not automatically a grammar error” feedback; inspected CSS for disabled-button styling.
- Created user-visible direct attachment copy: `/mnt/data/Basic-English-Expression-System-Run38-verified.apk`.
- Direct attachment size: 9,822,914 bytes; SHA-256 matches the extracted official APK exactly; source/destination byte comparison and destination APK ZIP integrity passed.
- This is the official Run 38 APK, not a rebuild or the outer Artifact ZIP. User download, installation, and device acceptance of the new writing checker remain pending.

### Next action
- Provide the direct APK attachment to the user.
- Ask the user to retest only the new writing-check flow:
  1. `I say something to him.` → vocabulary, grammar structure, and meaning should all pass.
  2. `I says something to him.` → vocabulary passes; grammar structure fails for subject–verb agreement.
  3. `I say something to her.` → vocabulary and grammar pass; meaning fails because the recipient differs.
  4. Edit the sentence after a check → later-stage results clear and the next-stage buttons lock until checks are repeated.
- Do not mark Run 38 device acceptance complete until the user reports the result.


## Run 38 device acceptance and offline checker implementation (2026-11-18)

- User confirmed: “测试通过。” This follows the four requested Run 38 phone tests (correct sentence; subject–verb error; recipient/meaning mismatch; edit-and-reset flow). Record the Run 38 staged writing-check feature as accepted on the user's Android device.
- Run 38 remains the latest Android build: run ID `44130128141`, built code commit `cbb42aa85ea00942a7166260315977863856f8a3`, conclusion `success`, all 22 steps succeeded; APK artifact ID `14348239555`. No active Actions run at this handoff.
- Verified implementation architecture:
  - Android `MainActivity` loads `file:///android_asset/www/index.html`.
  - Workflow step “Package the learning site as local app assets” copies `docs/.` into `android-offline/app/src/main/assets/www/`.
  - `docs/index.html` loads local `js/data.js`, `js/validator.js`, and `js/expression-system.js`. The vocabulary, grammar-pattern and meaning checks described below execute in local JavaScript; these code paths do not call a remote API or require network access.
  - The Service Worker cache is `basic-english-v33`; the APK also bundles these web assets, so the Android offline app does not depend on the Service Worker fetching them from the internet.
- Verified grammar checker: `analyzeLessonSentence()` lowercases and tokenizes the input, then applies a fixed local rule for `subject + say/says + something/nothing + to + object pronoun`. It checks the supported subject and object pronoun sets, say/says agreement, the required `to`, and ordering. It is not a general grammar parser; unsupported sentence shapes are reported as temporarily uncheckable.
- Verified meaning checker: after the supported sentence shape is parsed, it compares three slots against the prompt “我向他表达一些内容”: subject `I`, content `something`, recipient `him`. It is a fixed target-slot comparison, not general semantic understanding or translation.
- Verified word-list structure by executing the current `docs/js/data.js` in V8:
  - Operations: 100; Things (general): 400; Things (picturable): 200; Qualities (general): 100; Qualities (opposites): 50.
  - The `ALL_850` Set contains exactly 850 unique base entries.
  - The direct `ALLOWED_WORDS` Set currently contains 1,909 accepted word forms/entries. This is broader than the 850 base list: it includes operator conjugations, pronoun forms, irregular plurals, comparative exceptions, possessives, contractions, 74 international words, and other additions. The validator also accepts selected suffix-derived forms, numerals and explicitly taught Basic constructions outside the base list.
  - Confirmed examples: `something`, `says`, `said`, `telephone`, and `away` pass the current validator but are not all base-850 entries; `communicate`, `speak`, `computer`, and `hello` are not accepted by the current validator.
- Important explanation for future work: the 850 list is a fixed curated Basic English vocabulary, not a claim that it contains every elementary/high-frequency everyday English word. The checker can identify membership because the exact list and extension rules are embedded in the local app. The “检查850词汇” UI label is shorthand; technically it checks the current Basic vocabulary rules, which include more than the 850 base entries. This stage checks lexical acceptability only, not syntax, intended meaning, word sense, or naturalness.
- No source-code change or Android rebuild was made for this Q&A. This plan update changes only the root-level `AUDIO_BUILD_PLAN.md`, which is not included in the workflow's watched paths (`docs/**`, `android-offline/**`, `scripts/**`, workflow file); it will not trigger or cancel an Android build.


## Basic vocabulary checker transparency — implementation in progress (2026-11-18)

- User handoff screenshots identify the next task: make the Lesson 01 vocabulary check explain why each token is accepted or rejected, instead of returning only pass/fail.
- Implemented initial UI and classification logic in commit `91e314d78e584816ca0cd0ea098a384a4128a15f`, changing only `docs/js/expression-system.js`.
- The button label now says `检查 Basic 词汇规则`, avoiding the misleading implication that the checker accepts only the 850 base entries. The UI explains that it classifies each word and that vocabulary acceptance does not prove grammar or meaning.
- Per-word categories: 850 base words (with the five source groups and Chinese gloss when available); permitted word forms (operator conjugations, pronoun forms, irregular plurals, comparative exceptions, suffix-derived forms, possessives and contractions); course-listed special forms/constructions; extra international words; numerals; other directly registered accepted forms; and words not accepted by current rules.
- The report aggregates repeated tokens, shows category counts, and gives a reason for each distinct word. Existing validation rules and the later grammar/meaning stages were not changed.
- Local V8 test harness compiled the actual current `data.js`, `validator.js`, and `expression-system.js`. It confirmed exactly 850 unique base entries and 1,909 direct `ALLOWED_WORDS` entries. Representative tests covered the canonical sentence, operator conjugation, regular and irregular plurals, pronoun oblique form, international word, course construction, comparative exception, -ly/-ed/-ing forms, un- prefix, numeral, possessive, contraction, and an invalid word.
- The first full scan of the 1,909 direct allowed entries found six entries (`we`, `she`, `it`, `they`, `these`, `those`) falling into the generic fallback category. They are present in `PRONOUN_MAP` and should be classified explicitly as permitted pronoun forms. This is a classification-report defect, not a change to whether the validator accepts them.
- Run 39 (ID `44170203544`), built from commit `91e314d78e584816ca0cd0ea098a384a4128a15f`, is currently in progress at workflow step 12, “Fetch and package all 850 human word recordings”. The job steps before it completed successfully; no artifacts have been uploaded yet. The workflow uses `cancel-in-progress: true`.
- Do not modify `docs/**` while Run 39 is active. After it completes, correct the six pronoun classifications, run a full classification-coverage test over all 1,909 direct allowed entries plus representative generated forms, then allow the follow-up APK build to complete.
- Device acceptance of the revised word-by-word feedback remains pending; do not mark it accepted before the user tests it.


### Run 39 — initial vocabulary-feedback APK build result (2026-11-18)

- Run 39 / ID `44170203544`, built code commit `91e314d78e584816ca0cd0ea098a384a4128a15f`, completed successfully.
- All 22 job steps completed successfully. Android Gradle reported `BUILD SUCCESSFUL` in 35 seconds.
- Audio coverage: 850/850; 0 downloaded, 850 restored from cache, 0 errors. Log confirms `Packaged all 850 human recordings; MP3 total 9.45 MB (0 new, 850 cached)`.
- Cache restore succeeded. Cache-save step completed and saved the run-specific cache key.
- APK artifact: `basic-english-human-voice-apk`, ID `14365979863`, 9,231,026 bytes, not expired.
- Coverage artifact: `basic-english-human-audio-coverage`, ID `14367117630`, 21,467 bytes, not expired.
- Workflow warnings were dependency/runtime deprecation notices only; no job step failed.
- Run 39 is a successful build of the first transparency implementation, but it is not the final user-test APK because the full allowed-word scan identified six pronoun entries needing explicit classification.
- At this checkpoint, the branch head is `1c22385d90e1cd4b33c623a033de4386c06df31d`; this is the root-level plan update and does not alter the Run 39 build commit. No active or queued Actions run remained.
- Next action: fix classification for `we`, `she`, `it`, `they`, `these`, and `those`; then rerun the complete 1,909-entry direct-allowlist classification scan and representative generated-form tests before triggering the final APK build.


### Vocabulary classification correction and complete local verification (2026-11-18)

- Corrected the pronoun classifier in code commit `644a49a107468e2fc7280ff73ee29dc938fe2a90`. The six entries `we`, `she`, `it`, `they`, `these`, and `those` are now explicitly classified as permitted pronoun forms, with Chinese glosses; they are not misreported as 850 base words.
- Full direct-allowlist scan of the actual current `data.js`, `validator.js`, and `expression-system.js`:
  - `ALL_850`: exactly 850 unique entries.
  - `ALLOWED_WORDS`: exactly 1,909 direct entries.
  - All 1,909 were accepted by the existing validator and received an explicit category: 850 base words, 985 permitted forms, 74 international words.
  - 0 invalid direct entries; 0 generic “other” fallback classifications.
- Course special-form scan: all 67 entries in the validator's explicit course list were accepted and classified (2 overlap with base words, 59 as course forms, 6 as other specifically classified forms such as pronouns/contractions); no unclassified course entry.
- Generated-form scan: generated 7,579 candidate suffix/prefix forms from the 850 base words; 6,128 were accepted by the existing validator, and all 6,128 received a specific category (0 generic fallback).
- Mock-DOM integration test invoked the actual Lesson 01 render and vocabulary button handler:
  - `I say something to him.`: shows 3 base words, 1 permitted pronoun form, 1 course construction, and unlocks the grammar button.
  - `I say communicate to him.`: reports `communicate` as unsupported and keeps the grammar button locked.
- The vocabulary classifier does not change the existing validator's acceptance rules. The grammar and meaning check implementations remain unchanged.
- Updated `BASIC_ENGLISH_EXPRESSION_LESSON_01.md` with the new feedback categories, exact list distinctions, and examples; this is a root-level documentation update and does not trigger Android builds.

### Run 40 — corrected vocabulary classification build result (2026-11-18)

- Run 40 / ID `44170807849`, built code commit `644a49a107468e2fc7280ff73ee29dc938fe2a90`, completed successfully.
- All 22 job steps completed successfully. Android Gradle reported `BUILD SUCCESSFUL` in 31 seconds.
- Audio: 850/850 restored from cache, 0 newly downloaded, 0 errors; log reports 9.45 MB packaged.
- Cache restore succeeded and the run-specific cache-save step completed.
- APK artifact: `basic-english-human-voice-apk`, ID `14368605592`, 9,231,182 bytes, not expired.
- Coverage artifact: `basic-english-human-audio-coverage`, ID `14366893608`, 21,467 bytes, not expired.
- No active or queued Actions run remained after Run 40.
- The code change updates `docs/js/expression-system.js`, while the current Service Worker still names cache `basic-english-v33`. Before treating the build as final for PWA users, bump the cache name to v34 and let that follow-up build complete. Do not deliver Run 40 as the final APK.
- Next action: update only `docs/sw.js` to `basic-english-v34`, then inspect and verify the resulting Run 41 build and APK. Device acceptance of the new word-by-word feedback remains pending.


### Run 41 — Service Worker v34 follow-up started (2026-11-18)

- After Run 40 completed, updated only `docs/sw.js` from cache name `basic-english-v33` to `basic-english-v34` in commit `8a73f00ec3e865a28c514eaf80bbc11fe6364470`.
- This invalidates the previous PWA cache so clients can receive the updated word-by-word vocabulary feedback code.
- Run 41 / ID `44171284617` was automatically triggered for that commit and is currently in progress. At the latest inspection, the job had completed setup through FFmpeg and was provisioning Gradle; no artifacts had been uploaded yet.
- The workflow still uses `cancel-in-progress: true`; do not modify `docs/**` until Run 41 finishes.
- After completion, inspect every job step and log, verify audio/cache results and artifacts, then extract and inspect the exact APK before providing a direct download.


### Run 41 completion and APK verification — Basic vocabulary feedback (2026-11-18)

- Run 41 / ID `44171284617`, built code commit `8a73f00ec3e865a28c514eaf80bbc11fe6364470`, completed successfully. All 22 workflow steps succeeded; no step failed.
- The live branch head before this documentation update was `030386486dc58be42a04d356365b517e8c3b709a`. That commit changes only this plan file; the Android build used the preceding code commit `8a73f00...`.
- Audio/cache log verification:
  - Cache restore succeeded.
  - Final human audio coverage: 850 / 850.
  - Downloaded: 0; restored from cache: 850; errors: 0.
  - Packaged MP3 total: 9,446,648 bytes (9.45 MB).
  - Cache-save step succeeded and saved the run-specific cache key.
- Android Gradle: `BUILD SUCCESSFUL` in 30 seconds.
- APK artifact: `basic-english-human-voice-apk`, ID `14368266540`, artifact ZIP size 9,231,198 bytes, not expired.
- Coverage artifact: `basic-english-human-audio-coverage`, ID `14367173320`, artifact ZIP size 21,467 bytes, not expired.
- Workflow warnings were non-fatal dependency/runtime deprecations (`setup-java@v4`, Node.js 20, `punycode`, and `url.parse()`); no build step failed.

#### Run 41 coverage report

- Downloaded the exact coverage artifact and verified its ZIP integrity. It contains `audio-coverage-report.json` (413,180 bytes).
- Report values: target 850; primary coverage 845; matched 850; missing 0; downloaded 0; cached 850; completed 850; attempted 850; pending 0; failed 0; download errors 0.
- Encoded MP3 total: 9,446,648 bytes; average: 11,114 bytes.
- All 850 selected source records have non-empty title, speaker, uploader, accent, licence, and source URL fields.

#### Run 41 APK archive verification

- Downloaded artifact ZIP size: 9,231,198 bytes; ZIP integrity passed; it contains exactly one member, `Basic-English-Human-Voice.apk` (9,827,195 bytes).
- Extracted APK: `Basic-English-Expression-System-Run41.apk`, 9,827,195 bytes.
- APK SHA-256: `2ce451a18b2504a608719af67f3b25135004d38b4c8ad470728727b79c4e04e9`.
- APK ZIP integrity passed.
- Exactly 850 MP3 files exist under `assets/www/audio/words/`; their basenames exactly match the 850 unique entries in the APK's `ALL_850` list. Missing: 0; extra: 0.
- No zero-byte MP3s; file sizes range from 6,380 to 21,068 bytes; total MP3 bytes: 9,446,648.
- All 850 MP3 payload SHA-256 hashes are distinct. A single FFmpeg concat-demuxer decode pass over all 850 recordings completed with exit code 0.
- APK includes `assets/www/audio/credits.json`, `assets/www/audio/THIRD_PARTY_AUDIO_CREDITS.md`, `assets/www/js/expression-system.js`, and `assets/www/css/expression-system.css`.
- Packaged Service Worker cache name is `basic-english-v34`.

#### Vocabulary-feedback code verification inside the Run 41 APK

- Executed the packaged `data.js`, `validator.js`, and `expression-system.js` with Node.js against the actual APK-extracted files.
- `ALL_850`: exactly 850 unique base words. `ALLOWED_WORDS`: 1,909 direct entries.
- All 1,909 direct entries pass the existing validator and receive explicit categories: 850 base words, 985 permitted forms, 74 extra international words. Generic fallback classifications: 0; invalid direct entries: 0.
- Representative classifications:
  - Base: `apple`.
  - Permitted forms: `says`, `said`, `books`, `him`, `we`, `she`, `it`, `they`, `these`, `those`.
  - Course forms: `something`, `into`, `away`.
  - Extra international word: `telephone`.
  - Rejected by current rules: `communicate`, `speak`, `computer`, `hello`.
- This classifier explains why a word passes the existing vocabulary validator; it does not change the validator's acceptance rules or the already-tested grammar/meaning stages.

#### Device acceptance and next action

- Run 41 is the first build containing the corrected full word-by-word category feedback and Service Worker v34.
- APK archive, 850 audio files, attribution files, and packaged classification logic are verified. The APK has not yet been confirmed installed or tested on the user's phone.
- Next: provide the extracted Run 41 APK as a direct attachment. Ask the user to check the vocabulary feedback categories and individual explanations, especially the six pronoun entries `we`, `she`, `it`, `they`, `these`, and `those`; also confirm that the existing grammar/meaning checks and original app functions remain intact.
- No further `docs/**` changes or new Android build are needed before this device retest. Do not mark the new vocabulary-feedback UI accepted until the user confirms the phone test.


### Run 41 device acceptance — vocabulary classification feedback (2026-11-18)

- User tested the Run 41 APK on the Android device and confirmed: “可以了。”
- Record the Run 41 vocabulary-feedback revision as accepted at the overall feature level. The user did not provide separate item-by-item observations; do not claim individual test results beyond the overall confirmation.
- Accepted build: Run 41 / ID `44171284617`, code commit `8a73f00ec3e865a28c514eaf80bbc11fe6364470`; APK artifact ID `14368266540`; extracted APK SHA-256 `2ce451a18b2504a608719af67f3b25135004d38b4c8ad470728727b79c4e04e9`.
- The new word-by-word Basic vocabulary classification UI and Service Worker v34 are now user-accepted. Existing grammar/meaning checks and original app functions were included in the user's overall confirmation; no more device retest is currently pending for Run 41.
- Latest live branch head at this handoff: `634b778afb6affac38fb7c86bc97d66fe3b80781` (plan-only update). Latest Actions run remains Run 41, completed / success; no active or queued runs. Run 41 logs, all job steps, both artifacts, coverage report and APK contents were rechecked.
- Next project action, following Section 12 of `BASIC_ENGLISH_EXPRESSION_SYSTEM.md`: research and document the source-grounded treatment of Things and Qualities — stretch of sense, limiting/special use, and extensions through `-er`, `-ing`, and `-ed`. This is a research/documentation milestone; do not change App code or trigger an Android build until the source map and teaching sequence are checked.


### Expression System research milestone — Things and Qualities (2026-11-18)

- Run 41 device acceptance is recorded above; the user's overall confirmation “可以了” marks the vocabulary-feedback revision accepted.
- Added root-level research index `BASIC_ENGLISH_EXPANSIONS_THINGS_QUALITIES.md` and Lesson 02 content prototype `BASIC_ENGLISH_EXPRESSION_LESSON_02.md`.
- Research covers Ogden, `The ABC of Basic English`, “Expansions: Names of Things and Qualities”, pp.146–161: body-part analogies; sense-quality similarity; purpose/behavior similarity; “as if” comparisons; quality-name extensions; narrower special uses; -er/-ing/-ed derived forms; and selected quality names used as names of things.
- Directly inspected the English source pages pp.146, 148, 150, 152, 156, 158 and 160. The scan image for p.154 timed out repeatedly; no claim is made that this page was directly inspected. Secondary research was kept separate and used only as cross-reference.
- Lesson 02 is a source-grounded content prototype, not yet integrated into the App. No files under `docs/**`, `android-offline/**`, `scripts/**`, or the workflow were changed; no Android build was triggered.
- The 850-word audio APK and Run 41 acceptance remain unchanged.
- Next concrete action: create a source-verified index of Ogden's 250 Fixed Word-Groups, keeping it distinct from the already indexed Names of Acts / Common Needs material. Then build a multi-answer Meaning → Basic exercise bank before changing the App UI.


### Expression System research milestone — 250 Fixed Word-Groups (2026-11-18)

- Added `BASIC_ENGLISH_250_FIXED_WORD_GROUPS.md`, a source-verified structure and teaching index for Ogden's *The ABC of Basic English*, pp.212–242.
- Directly inspected all English text pages in the section: pp.212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240 and 242.
- Verified the source count: 50 Operator examples + 80 relation-word examples + 20 additional Operations / Directions special uses + 100 uses with the remaining Basic vocabulary = 250.
- Verified the 100-use category split: Operations 13; General Names 51; Picturable Things 18; Names of Qualities 15; Opposites 3.
- Preserved the source distinction: Fixed Word-Groups are idiomatic/special uses, not expansions of root sense. The source gives three causes: attraction, omission/loss of words, and an old picture no longer clear.
- Clarified that for and of are included in the Fixed Word-Groups relation-word groups even though they are not among the 20 proper Directives. Fixed-group inclusion and lexical classification are separate.
- Clarified that the 250 Fixed Word-Groups section is distinct from Some Common Needs; the latter is already indexed in `BASIC_ENGLISH_NAMES_OF_ACTS.md`.
- No App source code or watched workflow paths changed; no Android build was triggered.
- Next concrete action: create an original Meaning → Basic exercise-bank prototype that accepts multiple semantically correct Basic renderings and evaluates vocabulary, grammar, meaning preservation and fixed-group use as separate dimensions.


### Meaning → Basic multi-answer checker — first App implementation (2026-11-18)

- Implemented a local first practice set with six exercises (MB-01 to MB-06) in docs/js/meaning-basic.js, with styles in docs/css/meaning-basic.css.
- Integrated the section into the existing Expression System route; the home-card description now reflects the first multi-answer practice set.
- Added multi-answer patterns and conditions for put in/into, take from/out of, give recipient order, make material/result order, come/go viewpoint, and a causative light-result pattern.
- The checker has three ordered stages: existing vocabulary validation; limited registered sentence-pattern recognition; semantic role/direction/material/viewpoint/result checks. Editing the answer or changing the question resets later stages.
- Known grammatical-but-meaning-wrong patterns pass the structure stage so the meaning stage can identify the changed role or direction. Unrecognized patterns return “暂时无法判断” rather than a false grammar error.
- Added the module and stylesheet to the HTML entry point and Service Worker cache; cache name is now basic-english-v35.
- This implementation is local JavaScript and does not call a remote API. Offline behavior still requires verification in the built APK and on the user's phone.
- Next: run syntax and rule tests, inspect the triggered Android Actions run and all artifacts/logs, extract and inspect the exact APK, then ask the user to test the six exercises. Device acceptance remains pending.


### Run 42 — Meaning → Basic multi-answer practice build and APK verification (2026-11-18)

- Run 42 / ID `44188628473`, built from code commit `53be103a9ee39f5f42f1186f50f50d7789e27f37`, completed successfully. All 22 workflow steps succeeded.
- The added workflow step “Validate JavaScript and Meaning-to-Basic rules” passed:
  - All JavaScript files under `docs/js/` passed `node --check`.
  - Rule tests passed: 11 accepted answer patterns; 10 known semantic mismatches; 2 come/go viewpoint mismatches; 1 unsupported boundary; 1 capitalization/punctuation case.
  - The actual existing `data.js` and `validator.js` were loaded in Node; all accepted and known-wrong answer examples passed the vocabulary layer as expected.
- Audio/cache:
  - Cache restore succeeded; final coverage 850 / 850.
  - Downloaded 0; restored from cache 850; errors 0.
  - All 850 chosen source records have title, speaker, uploader, accent, licence and source URL.
  - Primary coverage 845; matched 850; missing 0; completed 850; attempted 850; pending 0; failed 0; download errors 0.
  - MP3 total 9,446,648 bytes; average 11,114 bytes.
  - Cache-save step succeeded and saved the run-specific key.
- Android Gradle: `BUILD SUCCESSFUL` in 36 seconds.
- APK artifact: `basic-english-human-voice-apk`, ID `14374873602`, artifact ZIP size 9,237,150 bytes, not expired.
- Coverage artifact: `basic-english-human-audio-coverage`, ID `14375966732`, artifact ZIP size 21,467 bytes, not expired.
- Non-fatal warnings: setup-java@v4 and Node.js 20 deprecation notices; no failed steps.
- Extracted the exact APK from the official artifact ZIP:
  - File: `Basic-English-Expression-System-Run42.apk`.
  - Size: 9,833,411 bytes.
  - SHA-256: `9ac0df5f57264e34ed14ea3c70bf2c3ce3e4d1051113928245b247a0fb386b96`.
  - Outer artifact ZIP SHA-256 matches GitHub artifact metadata: `69ed755f6c5adcf2e1eddc26f1f08bea94a0f3a7f9129a63438466ee6d9030a3`.
  - APK ZIP integrity passed; exactly 850 MP3s exist, all unique, and their basenames exactly match the 850 entries in packaged `ALL_850`.
  - All 850 MP3 payload SHA-256 hashes are distinct; MP3 total 9,446,648 bytes; a single FFmpeg concat-demuxer decode pass over all 850 files passed.
  - APK includes `meaning-basic.js`, `meaning-basic.css`, updated app route and HTML references, Service Worker cache v35, and both audio attribution files.
- Created direct attachment copy `/mnt/data/Basic-English-Expression-System-Run42-verified.apk`; size 9,833,411 bytes; SHA-256 matches extracted APK exactly; destination ZIP integrity and 850-audio count passed.
- The new multi-answer checker is built and archive-verified, but the user's Android installation/device acceptance is pending. Do not mark the feature accepted until the user tests it.
- Latest run after completion: Run 42 success; no active or queued Actions run.
- Next action: provide the verified direct APK and ask the user to test MB-01 to MB-06, especially multiple accepted answers, direction reversal, giver/receiver reversal, come/go viewpoint, and causative meaning.


### Project delivery rhythm reset — user feedback (2026-11-18)

- User feedback: recent work has felt like opening several features, implementing only their first small part, then switching elsewhere. The user wants a coherent, actually usable result and one overall review, not repeated requests to install/test each partial APK.
- Delivery rule from this point: perform source/rule research and internal tests throughout development, but do not hand off each small increment for user acceptance. Complete the agreed Teaching + Expression System work as one integrated milestone, run the full regression suite, trigger one Android build after the code is integrated, verify the final APK and audio package, then request one combined device acceptance and provide one consolidated usage explanation.
- Current code audit of Teaching (from live `docs/js/teaching.js`):
  - Word Cards: 850-word browsing/search/category/page UI and word-detail modal; human-word playback is already accepted in Run 35.
  - Rule Exercises: 8 hard-coded exercise types. Several generators apply only a simple string suffix; plural exercise currently generates only `+s` examples, while -er/-ing tasks simply append endings. Operator + Direction mixes structurally different answers (e.g. go into, get ready, get knowledge of, talk about, be like). Most checks require one exact answer string; incorrect feedback reveals the answer but does not teach the rule/semantic distinction.
  - Spaced Repetition: this is currently a word-card review system, not rule review. It stores progress in localStorage, uses 50-word sessions and code-defined 1/2/4/7/15/30-day levels; “Not Know” resets the level and schedules the word for one day later. Level-6 mastered words are excluded from future due selection. The UI does not explain these mechanics or connect them to Rule Exercises.
  - Quick Reference: 11 static rule summaries. The blanket statement “use operator + direction + noun for all other actions” conflicts with the project's source-checked findings and must be corrected; the current rule categories also need to match the actual source structures.
- Current Expression System state:
  - Lesson 01 staged vocabulary/grammar/meaning checks are device-accepted (Run 38); word-by-word vocabulary classification is device-accepted (Run 41).
  - Lesson 02 exists only as a source-based content prototype, not an App lesson.
  - Operators, Directives, Names of Acts / Common Needs, Things and Qualities, and the 250 Fixed Word-Groups have research indexes, but these are not yet a complete connected course.
  - Meaning → Basic currently has only six registered exercises in code. Run 42 built and archive-verified them; device acceptance is pending.
- Existing product baseline to preserve: original 45-Step directory has 14 locally adapted steps and 31 original-page links; Sentence Practice has 100 example sentences, 20 word-order exercises and 10 dialogues. This delivery reset does not silently claim the remaining 31 original steps have been locally adapted.
- Run 42 remains the latest APK build: run 44188628473, code commit 53be103a9ee39f5f42f1186f50f50d7789e27f37, success; all 22 job steps succeeded; 850/850 audio restored from cache; APK artifact 14374873602 and coverage artifact 14375966732 uploaded. Current branch head bf01cc44b6bd1bac68432ed268b32921a2e9a603 is three documentation-only commits ahead of that build; no code changes after Run 42. No active or queued Actions runs.
- The previous instruction to ask the user to test the six MB questions immediately is superseded. Keep Run 42 device acceptance pending, carry the feature into the integrated release, and ask for one combined device test only after the Teaching + Expression System milestone is complete.
- Next work: complete the source-grounded rule map and curriculum sequence; redesign the Teaching Rule Exercises, Spaced Repetition guidance/progress and Quick Reference as one coherent learning workflow; integrate the Expression System lessons and a substantially complete multi-answer Meaning → Basic bank; add clear in-App instructions. Preserve accepted word-audio behavior and existing baseline pages. Internally test all modules and regressions, then build and hand off once.


### Teaching rule learning implementation and Run 46 (2026-11-18)

- Replaced the active Teaching rule-practice, spaced-review and quick-reference screens with a structured module, while preserving the existing 850 Word Cards and accepted human-word playback.
- Integrated 13 rule-learning units across word forms, the 16 core Operators, 20 proper Directives, Operator/Directive distinctions, Names of Acts, Expansions, the 250 Fixed Word-Groups, sentence roles and the Meaning → Basic method.
- Added 47 single-/multiple-choice questions with answer explanations, per-unit practice progress, a searchable reference index, and a separate rule-review deck.
- Kept the original 850-word spaced-review records compatible. Its UI now explains the existing 50-word session size, the 1/2/4/7/15/30-day intervals, the reset-after-wrong behavior and the level-6 mastered state. Rule review has its own local progress and the same interval sequence.
- Fixed the existing -ly validator spelling path so simple → simply and true → truly are accepted; added regression assertions. The test bank checks that all authored Basic phrase examples pass the current vocabulary validator.
- Validation history: Run 43 stopped at an incorrect 12-unit count assertion; Run 44 exposed the validator's simple → simply bug; Run 45 exposed a non-Basic spelled-out number in a phrase marked as a Basic example. The count, validator and examples were corrected. These were caught before APK generation in those runs.
- Run 46 / ID 44195097971 built commit \`19c624d7a37811fc514d9fbb875ca45909ec6d2e\` successfully. All 18 workflow steps succeeded. The validation step reported: 13 rule units, 47 questions, 16 Operators, 20 Directives; all Basic examples passed vocabulary validation; spaced-review scheduling tests passed.
- Run 46 restored all 850 human recordings from cache: 0 downloaded, 850 restored, 0 errors. Android build reported BUILD SUCCESSFUL.
- Artifacts uploaded: APK artifact ZIP ID 14379705020 (9,256,226 bytes; ZIP digest \`sha256:cefe80950f5820cc40138bf8e91d7b19332e028a8ae44a019e38e418e9da67ac\`); audio coverage artifact ID 14379081208 (21,467 bytes; digest \`sha256:8a154171d80902458ee36a45d88b423a1e4f9988fd5442e28386278e02343654\`).
- This is a successful CI build, not a user-device acceptance result. The artifact has not been extracted and verified as a standalone APK for handoff. Per the delivery reset, do not ask the user to install this intermediate build.
- Next: integrate the source-based Expression System Lesson 02 into the App, expand the finite Meaning → Basic exercise bank beyond its initial six items, test both offline modules, then perform one consolidated Android build and one combined device acceptance.



### Expression Lesson 02 and expanded Meaning → Basic bank — Run 47 (2026-11-18)

- Integrated BASIC_ENGLISH_EXPRESSION_LESSON_02.md into the Expression System page as an interactive lesson.
- Lesson 02 includes 11 source-indexed body-part terms (head, foot, arm, leg, chest, mouth, lip, neck, tail, tooth, face), a root/expanded-meaning table, 10 interactive understanding questions and a free-response explanation exercise with a reference reveal. The free response is explicitly not auto-scored.
- Expanded Meaning → Basic from 6 to 18 registered tasks, based on the Names of Acts / Common Needs source index. The finite checker now has 29 accepted sentence patterns and 20 registered semantic-mismatch examples, plus the existing viewpoint, unsupported-boundary and punctuation tests.
- Added offline assets and advanced the Service Worker cache to v37.
- Run 47 / ID 44196442702 built commit b0e23ad02b5ce6c9f17d03652c150974a502cf80 successfully. All 18 workflow steps succeeded.
- Validation results: Meaning → Basic passed 29 accepted patterns, 20 known semantic mismatches, 2 viewpoint mismatches, 1 unsupported boundary and 1 punctuation case; Teaching passed 13 units / 47 questions / 16 Operators / 20 Directives / vocabulary and spaced-schedule checks; Expression Lesson 02 passed 11 terms / 10 questions.
- All 850 recordings were restored from cache: 0 downloaded, 850 restored, 0 errors. Android build reported BUILD SUCCESSFUL.
- Uploaded APK artifact ZIP ID 14380140359 (9,264,880 bytes; digest sha256:6d77b9a08a597ee5ab99b8346a4f72589f9065a3e13994127ecd973a38cda62b); coverage artifact ID 14379860711 (21,467 bytes; digest sha256:aa19836e516c84c981d43c621f282c9d7839b9b1ea33bcfc54f3b68e6817e50b).
- This is still an intermediate CI build, not device acceptance or final APK handoff. It has not been extracted and independently verified as a standalone APK for the user.
- Next: finish the Expression System sequence around Names of Acts, Fixed Word-Groups and Common Needs; then run the final consolidated regression/build and one combined device acceptance.



### Integrated Expression System milestone — Run 48 (2026-11-18)

- Current App curriculum contains five numbered Expression System lessons:
  1. Lesson 01 — speak in three contexts (already integrated in the earlier Run 36 line, with staged vocabulary / constrained grammar / target-meaning checks added and accepted in Run 38).
  2. Lesson 02 — Things and Qualities meaning extensions, including 11 source-indexed body-part terms, a root/expanded-meaning table, 10 questions and an unscored free-response explanation exercise.
  3. Lesson 03 — Names of Acts: context-dependent Basic renderings of actions.
  4. Lesson 04 — 250 Fixed Word-Groups: fixed combinations and their source-described formation.
  5. Lesson 05 — Some Common Needs: common meanings and context-dependent Basic paraphrases.
- Lessons 03–05 add 23 interactive questions (10 + 5 + 8). Their examples and question feedback distinguish the source's examples from project-level explanation. The three follow-on lessons are implemented in docs/js/expression-more-lessons.js; Lesson 02 remains in docs/js/expression-curriculum.js.
- Meaning → Basic has now been expanded to 27 registered tasks. The finite checker test suite passes 40 accepted answer patterns, 28 known semantic mismatches, 2 viewpoint mismatches, 1 unsupported-boundary case and 1 punctuation/capitalization case. It remains a bounded rule checker, not a general grammar or semantic parser.
- Run 48 / ID 44197915524 built commit 9a1793905b4abc7d24bd1c598a5a3004450f6748 successfully. All 18 main workflow steps and all post-job steps completed successfully.
- Validation log results: Meaning → Basic passed (40 accepted patterns / 28 known mismatches); Teaching passed (13 units / 47 questions / 16 Operators / 20 Directives, Basic examples and spaced schedule); Lesson 02 passed (11 terms / 10 questions); follow-on lessons passed (3 lessons / 23 questions).
- Audio: all 850 recordings restored from cache; 0 downloaded, 850 restored, 0 errors; package log reports 9.45 MB. Cache-save post-step reported read-only because the matching cache key already exists; this was not a build failure.
- Android Gradle reported BUILD SUCCESSFUL in 33 seconds.
- Uploaded APK artifact: basic-english-human-voice-apk, ID 14379604453, ZIP size 9,272,570 bytes, SHA-256 digest c6ca5160739813e556232e027fe389747087f9a44043cbd63d19ed25bbbab863.
- Uploaded coverage artifact: basic-english-human-audio-coverage, ID 14380462964, size 21,467 bytes, SHA-256 digest b5795138694e56cdc4fb3f29033d069b669c370b3930114309e7761a55635d98.
- Run 48 is a successful CI build and artifact upload, but the APK ZIP has not yet been extracted and independently inspected in this session. The combined Run 48 APK has not been accepted on the user's Android device. Do not claim final delivery or device acceptance yet.
- Live branch head at this checkpoint: 9a1793905b4abc7d24bd1c598a5a3004450f6748; latest Actions run: Run 48, completed / success. No active or queued Actions run remains.
- Next concrete action: inspect/extract the exact Run 48 APK artifact, verify APK integrity, exact 850 audio files, attribution files and the integrated Teaching / Expression assets; then prepare one combined device acceptance. Do not ask for separate incremental APK tests. Before any new code push, refresh branch and Actions state and account for cancel-in-progress: true.



### Run 48 APK extraction and archive verification (2026-11-18)

- Downloaded official Run 48 APK artifact ID 14379604453. Outer artifact ZIP size 9,272,570 bytes; SHA-256 matches GitHub artifact digest c6ca5160739813e556232e027fe389747087f9a44043cbd63d19ed25bbbab863; ZIP integrity passed.
- Outer ZIP contains exactly one member: Basic-English-Human-Voice.apk. Extracted APK size: 9,869,645 bytes; APK SHA-256: c5fb46dfb687073e48a1f502a5045d5d38ab4255055b1e0897d1fdf0d5772cf1; APK ZIP integrity passed.
- APK archive has exactly 850 MP3 files under assets/www/audio/words/. Their 850 basenames exactly match the 850 unique entries in the packaged ALL_850 set: missing 0, extra 0, duplicate paths 0, zero-byte files 0.
- All 850 audio payloads have distinct SHA-256 hashes. MP3 total size: 9,446,648 bytes; individual size range 6,380–21,068 bytes. A single serial FFmpeg concat-demuxer decode pass over all 850 MP3 files completed with exit code 0.
- Packaged credits.json contains 850 recording records. All records have non-empty title, speaker, uploader, accent, license and source_url fields. Licence counts: CC0 725; CC BY-SA 3.0 113; Public domain 7; CC BY-SA 4.0 5. Speaker attribution retains one explicitly unidentified speaker.
- Both attribution assets are present: assets/www/audio/credits.json and assets/www/audio/THIRD_PARTY_AUDIO_CREDITS.md.
- Confirmed packaged App assets include Lesson 01, Lesson 02, Lessons 03–05, Meaning → Basic (27 tasks), Teaching, their stylesheets, app route wiring, and Service Worker cache basic-english-v38. Run 48 CI tests had already passed: Teaching 13 units / 47 questions; Lesson 02 11 terms / 10 questions; follow-on lessons 3 / 23 questions; Meaning → Basic 40 accepted patterns and 28 known semantic mismatches.
- Downloaded and inspected coverage artifact ID 14380462964; its ZIP integrity passed. Report: target 850; primary coverage 845; matched 850; missing 0; downloaded 0; cached 850; completed 850; attempted 850; pending 0; failed 0; download errors 0; encoded MP3 total 9,446,648 bytes.
- Archive verification is complete for Run 48. Physical-device acceptance of this combined Teaching + Expression System build is still pending. Do not claim the new combined learning modules are device-accepted until the user tests them.
- The verified extracted APK is named Basic-English-Human-Voice.apk and has the SHA-256 above. No direct download link has been sent in this response.
- Latest branch head before this plan-only update: 304d38841ef23315ed1947116212a6d47083164f; latest Actions run remains Run 48 / 44197915524, completed / success. No active or queued run remained.
- Next: provide this one combined Run 48 APK for device acceptance, with one consolidated checklist covering Teaching, all five Expression System lessons, Meaning → Basic, original 45 Steps, Word Cards human audio, and offline behavior. Do not trigger another build unless testing reveals a concrete defect.



### Run 48 direct APK attachment prepared (2026-11-18)

- Created user-visible copy: /mnt/data/Basic-English-Expression-System-Run48.apk.
- Verified copy size: 9,869,645 bytes; SHA-256 c5fb46dfb687073e48a1f502a5045d5d38ab4255055b1e0897d1fdf0d5772cf1.
- In the same file-generation operation, confirmed the source and copied files exist, sizes and SHA-256 hashes match, APK ZIP integrity passes, and exactly 850 unique word-audio entries are present.
- This records file preparation only. User download, installation and combined device acceptance have not yet been confirmed.
