# Expression System App Migration Plan — Draft

> **Status:** approved on 2026-11-19; Phases 1–5 have passed automated verification and Run 50 Android build succeeded. A learner-label correction is being revalidated in Run 51. Device acceptance remains pending.
>
> Architecture authority: `BASIC_ENGLISH_EXPRESSION_CURRICULUM.md`  
> Content and boundary handoff: `BASIC_ENGLISH_EXPRESSION_15_LESSON_REVIEW.md`  
> Current progress: `AUDIO_BUILD_PLAN.md`

## 1. Goal and non-goals

Migrate the existing Expression System prototypes into the accepted learner-facing structure:

- **2 Modules / 15 Lessons**.
- Module 1: 3 Lessons.
- Module 2: 12 Lessons.
- Official display labels use **Module X · Lesson Y**.
- C01–C15 remain internal Candidate IDs, not global Lesson numbers or screen numbers.

The migration must preserve the useful source examples, existing finite checkers, offline operation and existing user progress. It must not turn the five early prototypes into extra Lessons, duplicate the same teaching content, or merge the Expression System into the original 45 Steps.

**Not part of this migration:** changing the 850-word list, changing audio files, rewriting the 45-Step course, adding an AI/API service, or claiming unrestricted grammar/semantic checking.

## 2. Verified current App structure

The current Expression route in `docs/js/app.js` calls these renderers in sequence:

1. `window.BE.expression.render(main)`
2. `window.BE.expressionCurriculum.render(main)`
3. `window.BE.expressionMoreLessons.render(main)`
4. `window.BE.meaningBasic.render(main)`

The scripts are loaded by `docs/index.html`. The current result is one long page of old prototype sections, not a Module/Lesson navigation.

| Current component | Verified baseline | Current test / state |
|---|---|---|
| `docs/js/expression-system.js` | Old speak prototype; 3 quiz questions; 850 vocabulary checker; a grammar checker limited to one five-part `say/says + something/nothing + to + object pronoun` structure; a meaning checker that verifies the prompt's subject/content/recipient | The writing checker is finite and only covers its registered pattern. It is not a general grammar or semantic parser. |
| `docs/js/expression-curriculum.js` | Old body-part expansion prototype; 11 terms; 10 questions | `scripts/test_expression_curriculum.js` currently expects 11 terms and 10 questions. The question bank is mixed: 8 questions map to C13, q7 maps to C14, q8 maps to C15. |
| `docs/js/expression-more-lessons.js` | Old e3/e4/e5 prototypes; 23 multiple-choice questions total | `scripts/test_expression_more_lessons.js` currently expects 3 prototype sections and 23 questions. |
| `docs/js/meaning-basic.js` | 27 registered prompt IDs MB01–MB27; 40 accepted answer variants; finite accepted/wrong pattern matching; returns unsupported when the response is outside the registered pattern | `scripts/test_meaning_basic.js` checks 40 accepted variants, 28 known meaning mismatches, 2 viewpoint mismatches, 1 unsupported boundary and punctuation normalization. No persistent progress store is present. |
| `docs/js/app.js` | Appends all four renderers into one expression page | No current 2-Module / 15-Lesson navigation. |
| `docs/css/expression-system.css`, `expression-curriculum.css`, `expression-more-lessons.css` | Styles for the old prototype components | Reuse only where the migrated component still uses the same structure; do not assume the old long-page layout should remain. |

## 3. Mapping the five early App prototypes

The five early prototypes are source/content prototypes, not five permanent Lessons.

| Early App prototype | Current file / content | Accepted destination | Migration rule |
|---|---|---|---|
| Old Lesson 01 — speak | `BASIC_ENGLISH_EXPRESSION_LESSON_01.md`, `expression-system.js` | Module 2 · Lesson 1 (C01 — Communication & Information) | Reuse the three speak contexts as the opening contrast. Keep the registered speak checker as a finite C01 exercise. Do not display it as a separate global Lesson 01. |
| Old Lesson 02 — body-part names | `BASIC_ENGLISH_EXPRESSION_LESSON_02.md`, `expression-curriculum.js` | Module 1 · Lesson 1 (C13 — Names of Things: Meaning Expansion) | Reuse the 11 body-part terms as one C13 segment, not the whole Lesson. Split the current question about bitter taste/experience to C14; split the question defining Special Use / narrowing to C15. |
| Old Lesson 03 — mixed Names of Acts | `expression-more-lessons.js`, e3 | Split across Module 2 · Lessons 1, 2, 4 and 5 | tell/story and sing → C01; touch and hit → C02 (C03 cross-link only when the result/damage is the focus); catch, hold and run → C04; think, understand, remember and forget → C05. No standalone “Lesson 03”. |
| Old Lesson 04 — 250 Fixed Word-Groups | `expression-more-lessons.js`, e4; `BASIC_ENGLISH_250_FIXED_WORD_GROUPS_INSTANCE_INDEX.md` | Reference/practice support across C01–C15 and the existing foundations | Do not create a standalone Lesson. Use the 250/250 instance index as the destination authority; place a fixed group with its primary meaning and add a cross-link only when needed. The 50 Most Necessary groups remain a priority subset, not 50 additional items. |
| Old Lesson 05 — Some Common Needs | `expression-more-lessons.js`, e5 | Split across C09, C10, C11, C12 and the conditional-sentence foundation | can/ought/shall → C09; quantity/degree examples → C10; time/sequence examples → C11; busy/deaf/world/life/hill/home/address → C12; unless → conditional foundation; finish is not added as a Basic replacement or a separate Lesson. |

The old prototype numbers must not be copied into the accepted learner-facing numbering. In particular, old App Lesson 02 maps to **Module 1 · Lesson 1**, not Module 1 · Lesson 2.

## 4. Mapping the 27 Meaning→Basic checker patterns

`meaning-basic.js` is a separate finite checking bank, not a sixth prototype Lesson and not a general semantic engine. Keep the MB IDs stable and attach each prompt to a primary Lesson.

| MB ID | Meaning pattern | Primary destination | Cross-link / note |
|---|---|---|---|
| MB01 | insert → put into a container | C04 — Movement & Position | Direction into an internal position |
| MB02 | remove → take out/from a container | C04 — Movement & Position | Direction out / source position |
| MB03 | transfer money/object → give to recipient | C04 — Movement & Position | C07 only when the context is an exchange/payment |
| MB04 | construct → make from / make into | C03 — Physical Effects | Material change and resulting object |
| MB05 | approach → come / go | C04 — Movement & Position | Preserve the speaker's viewpoint setting |
| MB06 | extinguish → make the light go out | C08 — State and Process | Causing a state change |
| MB07 | eat → take food / have a meal | C02 — Bodily Action & Contact | Intake/action context |
| MB08 | listen → give attention | C01 — Communication & Information | Active reception of information |
| MB09 | hear music → music comes to ears | C01 — Communication & Information | Sound reaching the receiver |
| MB10 | write views → put into writing / down on paper | C01 — Communication & Information | Expressing information |
| MB11 | throw → send across | C04 — Movement & Position | Path across a space |
| MB12 | catch → get into the hand | C04 — Movement & Position | Movement ending in a position |
| MB13 | hold → grip / keep / have in the hand | C04 — Movement & Position | Distinguish action from continuing position |
| MB14 | think → give thought to | C05 — Thinking & Knowledge | Mental activity |
| MB15 | remember → keep in mind / have a memory | C05 — Thinking & Knowledge | Memory |
| MB16 | forget → put out of mind / have no memory | C05 — Thinking & Knowledge | Memory loss |
| MB17 | want → have a desire | C06 — Feeling & Need | Desire |
| MB18 | need → be in need of | C06 — Feeling & Need | Need |
| MB19 | sing → give a song | C01 — Communication & Information | Expression |
| MB20 | touch → put a hand on / give a touch | C02 — Bodily Action & Contact | Contact |
| MB21 | hit hard → give a blow | C02 — Bodily Action & Contact | C03 cross-link if the physical result/damage is the focus |
| MB22 | run quickly → go quickly | C04 — Movement & Position | Movement speed |
| MB23 | run for health → take a run | C04 — Movement & Position | Running as an activity |
| MB24 | begin → make a start | C08 — State and Process | Beginning/entry into a process |
| MB25 | understand an argument → see its point | C05 — Thinking & Knowledge | Understanding |
| MB26 | know → have knowledge / be certain | C05 — Thinking & Knowledge | Knowledge/certainty |
| MB27 | learn → get knowledge | C05 — Thinking & Knowledge | Learning |

**Checker rule:** preserve the current finite accepted-pattern matching and its explicit unsupported result. Do not broaden it into a general parser by guessing. The existing tests are an acceptance baseline; extend them when a new pattern is intentionally added.

**Duplication rule:** the old e3 multiple-choice items and the MB writing prompts overlap in several examples. Do not place the same example twice merely because it exists in two old components. Keep the lesson's teaching/recognition exercise and the registered MB writing-check pattern as distinct stages only when each adds a different learner action.

## 5. Fixed Word-Groups integration

- Keep all 250 source items in `BASIC_ENGLISH_250_FIXED_WORD_GROUPS_INSTANCE_INDEX.md`.
- Keep the 50 Most Necessary groups as a priority subset, not additional groups.
- A fixed group is supporting material for the Lesson whose meaning it serves; it does not create another Lesson.
- Do not move a group based only on one shared word. Use the complete phrase meaning.
- Keep Foundation and Reference destinations where a phrase belongs to an already-taught grammar/word-form foundation or does not need a dedicated Lesson.
- Update the index's status to accepted Candidate IDs; official learner labels remain Module/Lesson labels.

## 6. Proposed learner-facing navigation

**Recommended structure:**

1. Expression System overview.
2. Module 1 — 3 Lessons.
3. Module 2 — 12 Lessons.
4. Selecting a Lesson opens its teaching content, guided examples, practice and review.
5. A lesson's registered writing-check patterns appear inside that Lesson's practice area; the MB ID remains internal metadata.

Rules:

- Display “Module 1 · Lesson 1”, etc. Never display “C13” as a Lesson number.
- Keep C01–C15 in source metadata and cross-reference data only.
- Do not display the old global labels Lesson 01–05 as if they were the accepted course sequence.
- Keep the original 45 Steps, Word Cards, audio and the Expression System as separate learning areas.
- Do not put all 15 lessons into one uninterrupted long page; use module/lesson navigation and render the selected lesson.
- Final layout and exact screen transitions remain subject to review; no UI code is changed by this plan.

## 7. Existing progress and data preservation

Current progress stores:

| Old key | Data stored | Migration treatment |
|---|---|---|
| `BE_EXPR_LESSON_02_PROGRESS` | Aggregate attempts/correct for the mixed body-part prototype question bank | Preserve unchanged as legacy history. Because the old bank includes C13, C14 and C15 questions, do not assign the aggregate score to C13 alone. New lesson-level progress starts separately. |
| `BE_EXPR_MORE_LESSONS_PROGRESS` | Aggregate attempts/correct for old e3/e4/e5 prototype sections | Preserve unchanged as legacy history. The old sections split across several Lessons, so the aggregate cannot be accurately divided. New lesson-level progress starts separately. |
| `meaning-basic.js` | No persistent progress store found | No progress migration needed. Keep MB IDs and checker tests. |
| `expression-system.js` | No separate persistent lesson-progress key found in the inspected file | No progress migration identified. Recheck before implementation. |

Do not delete or overwrite old keys. If a later migration script is used, it must be additive, idempotent and tested against a copy of the old data.

## 8. Test and validation plan

Before any code migration:

1. Create a data model test that asserts exactly 2 Modules and 15 Lessons.
2. Assert the official mapping: Module 1 has 3 Lessons; Module 2 has 12; C01–C12 map to Module 2; C13–C15 map to Module 1.
3. Split the current body-part question bank: C13 retains its own questions; the bitter-taste question moves to C14; the Special Use question moves to C15.
4. Replace the old test expectation of one 10-question Lesson 02 bank with separate C13/C14/C15 tests.
5. Test the old prototype migration map so all five prototypes have an explicit destination and none remains as an extra Lesson.
6. Preserve the 27 MB IDs and the current 40 accepted variants, 28 known meaning mismatches, 2 viewpoint mismatches, unsupported-boundary case and punctuation case. Add a test that every MB ID has exactly one primary Lesson destination.
7. Preserve the 250/250 Fixed Word-Groups index and test that every item has a primary Lesson, Foundation or Reference destination.
8. Test that old localStorage keys are preserved and new progress keys do not collide with them.
9. Test offline operation: all lesson data, checker rules and required UI assets must load locally; no AI/API/network dependency may be introduced.
10. Regression-test Word Cards, the original 45 Steps, audio playback and existing offline behavior.

## 9. Implementation sequence and gates

| Phase | Work | Completion condition |
|---|---|---|
| 0. Plan review | Review this mapping and the progress-preservation rules | <text>Approved by the user on 2026-11-19; complete</text> |
| 1. Data model | Add the accepted 2-Module / 15-Lesson metadata and navigation model | Unit tests confirm 2/15 and C-ID mapping |
| 2. Content split | Move prototype content to the correct Lesson; split C13/C14/C15 questions | Every old example has one primary destination; no accidental duplicate Lesson |
| 3. Checker integration | Attach the 27 MB prompts to C01–C08; retain finite accepted patterns | Existing and new checker tests pass |
| 4. Fixed groups | Expose the 250-group reference content in the appropriate Lessons | 250/250 items remain accounted for |
| 5. Progress | Preserve legacy keys and introduce new lesson-level progress | No old key deleted or overwritten; migration tests pass |
| 6. UI and offline tests | Build Module/Lesson navigation and test all learning areas offline | 15 Lessons usable; Word Cards/45 Steps/audio unchanged |
| 7. Build and device acceptance | Run the approved Android build and test on device | Build succeeds and the agreed device acceptance checklist passes |

**Phase 0 was approved on 2026-11-19.** Proceed with Phases 1–7 in order. Before each code-changing phase, verify the live branch and Actions state; preserve the progress and offline constraints above.

## 10. Acceptance checklist

- [ ] Exactly 2 Modules / 15 Lessons are shown to the learner.
- [ ] Module 1 contains 3 Lessons; Module 2 contains 12.
- [ ] C01–C15 are not displayed as global Lesson numbers.
- [ ] All five early prototypes are accounted for and none appears as an extra Lesson.
- [ ] The C13/C14/C15 question contamination is corrected.
- [ ] All 27 MB prompts retain their stable IDs and finite checking behavior.
- [ ] The 250 Fixed Word-Groups remain fully indexed and are supporting material, not a standalone Lesson.
- [ ] Old progress keys remain intact; new progress is stored separately.
- [ ] No AI/API dependency is introduced; the Expression System remains offline-capable.
- [ ] The original 45 Steps, Word Cards, 850 list and audio are not regressed.
- [ ] Automated tests pass.
- [ ] Android build and device acceptance pass.

**Current result at approval:** repository inspection and the migration mapping were complete; the user approved implementation on 2026-11-19. At the moment of approval, no App code, test, CSS, HTML, Android workflow or user progress had yet been modified.

## 11. Relationship to the separate 45-Step course

- The original 45-Step course remains a separate learning area. This migration is only for the Expression System's accepted 2 Modules / 15 Lessons.
- The source-fidelity audit of all 14 locally adapted 45 Steps is complete; the detailed findings are in `BASIC_ENGLISH_45_STEP_ADAPTATION_AUDIT.md`.
- The remaining 31 source Steps have a source-ordered adaptation plan in `BASIC_ENGLISH_45_STEP_COURSE_MAP.md`: gaps within Steps 1–25 first, then Steps 26–35 vocabulary, Steps 36–41 reference topics, and Steps 42–45 integrated use. The next unadapted source page is Step 4 — At the Station.
- Do not rewrite, renumber, merge or convert the 45 Steps into the 15 Expression Lessons during this migration. The 14-step correction queue and 31-step adaptation work remain a separate 45-Step content workstream.
- The user explicitly approved this migration plan on 2026-11-19. Phase 0 is complete. The 45-Step course remains separate and must not be rewritten, renumbered, merged or converted during this migration.


## 12. Approval record

- User approval received: 2026-11-19T00:00:45Z.
- Approved scope: this migration plan's Phases 1–7 and acceptance checklist, preserving the 2 Modules / 15 Lessons architecture and all non-goals and data-safety rules above.
- Phase 0: complete.
- Approval does not waive verification gates, expand the checker into general AI grammar/semantic analysis, permit network/API dependencies, or authorize changes to the separate 45-Step course, 850-word list or human audio assets.

## 13. Implementation checkpoint — automated verification pending

- Implementation commit: `b16e290bc313f092fb84cb688ee6f7fcc59bd233`.
- The first integrated implementation covers Phases 1–6: 2/15 data model, all 15 bundled lesson drafts, prototype destination mapping, finite MB/speak checker integration, searchable 250-item reference, separate new progress key, Module/Lesson UI and local offline assets.
- Run 49 / 44428857337 is currently in progress on this commit. The new migration test is scheduled in the workflow's JavaScript validation step; it has not yet run at this checkpoint.
- Phases 1–6 are **implemented but not yet verified**. Phase 7 Android build/artifact checks and device acceptance are also pending. Do not mark the acceptance checklist complete until CI and device results are confirmed.
- No App code changes are to be pushed while Run 49 is active; the workflow uses `cancel-in-progress: true`.

## 14. Run 49 test failure and correction

- Run 49 failed only because the edit to `scripts/test_expression_curriculum.js` inserted literal backslash-n text, causing a JavaScript SyntaxError. The repository-wide `docs/js` syntax check, Meaning-to-Basic regression test and Teaching regression test had passed before this test-file failure.
- The malformed test was corrected in commit `3a0872d59a1da7a41d43c916acb4a66804ed3909`.
- Run 50 / 44429176259 is in progress on the correction commit. Automated migration tests, Android packaging/build, artifacts and device acceptance remain pending; Phases 1–6 are implemented but not yet verified.

## 15. Run 50 automated validation milestone

- Run 50 / 44429176259 passed workflow step 9, `Validate JavaScript and Meaning-to-Basic rules`, including the new migration test and all existing regression tests.
- Site asset packaging and audio-cache restore steps also passed. The 850-recording packaging step is still running; APK build/artifact upload and device acceptance remain pending.
- Phases 1–6 are now implemented and have passed the automated JavaScript validation step. Phase 7 is not yet complete.

## 16. Run 50 build/artifact success and final-label revalidation

- Run 50 / 44429176259 completed successfully: all 23 workflow steps passed, including all regression/migration tests, 850 human audio packaging, Gradle build and artifact uploads.
- The audio coverage report confirms 850 matched, 0 missing, 850 cached, 0 newly downloaded and 0 errors. It separately reports primary_coverage=845; this field is not being conflated with matched_words=850.
- The real APK was extracted and integrity-checked at `/mnt/data/Basic-English-Human-Voice.apk` (9,968,250 bytes; SHA-256 `518094ea63b89f83b73bb1a9dbcc8dbf9e6c23c0c58f85c24fcbcb4c67636db4`). It contains the new local course assets and 850 audio files.
- Final source review found internal C01–C15 Candidate IDs visible in a practice heading/note/cross-links. These are not permitted in learner-facing UI. The renderer now converts cross-links to official Module/Lesson labels and removes the visible Candidate-ID note; regression test added.
- Correction commit: `4afc2da2313518e6c093fe93cfd000ab60e8d961`. Run 51 / 44430168437 is revalidating this correction and rebuilding the APK.
- Phases 1–5 have passed automated verification. Phase 6 UI/offline device checks and Phase 7 device acceptance remain pending; the user must install the verified APK and test the app on-device before final acceptance.

## 16. Run 51 implementation build and APK verification

- The final learner-facing UI correction (hide internal Candidate IDs; show Module/Lesson labels only) was committed in `4afc2da2313518e6c093fe93cfd000ab60e8d961`; the automated regression assertion passed.
- Run 51 / 44430168437 completed successfully. All 23 job steps succeeded; all course/migration regression tests passed; Gradle APK build and both artifact uploads succeeded.
- APK artifact ID: `14485622177`. The real APK was downloaded and extracted to `/mnt/data/Basic-English-Human-Voice-run51.apk` (9,968,282 bytes; SHA-256 `11d41bf69c5c456ce653a631878c7d496011b326e451656f1170f0bb981787b9`). APK archive integrity passed. The package contains the five local Expression course JS assets, course CSS, and exactly 850 matching MP3 files.
- Coverage report: 850 target/matched/cached/completed, 0 missing, 0 pending, 0 failed, 0 download errors; its separate `primary_coverage` field is 845 and remains distinct from `matched_words=850`.
- The build deliverable is ready for installation. Real-device install, offline checks, navigation, audio playback and user acceptance are still pending. Do not call the overall acceptance complete before device verification.
