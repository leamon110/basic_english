# Basic English Expression System — 15-Lesson Review Sheet

> **Status (2026-11-19):** the curriculum architecture is accepted at **2 Modules / 15 Lessons**. A first complete teaching-content draft exists for every Lesson. The whole-course cross-Lesson boundary audit has been completed. This sheet is the consolidated handoff for the authoring phase; it does not claim learner-tested duration, final teaching acceptance, App integration or device acceptance.

## 1. Numbering — use these labels consistently

- **Module 1** contains Lessons 1–3.
- **Module 2** contains Lessons 1–12.
- Lesson numbering restarts inside each Module.
- **C01–C15 are internal Candidate IDs**, not Module numbers, global Lesson numbers or App screen IDs.
- Mapping: **C01–C12 = Module 2 Lessons 1–12**; **C13–C15 = Module 1 Lessons 1–3**.
- Use Module/Lesson labels in learner-facing material. Add a C ID only when a research cross-reference is needed.

## 2. The 15 authored lesson drafts

### Module 1 — Understanding Basic Word Meanings

| Official lesson | Candidate ID | Source scope (printed pages) | Main learner decision | Prerequisites and cross-links | Draft / practice status |
|---|---|---|---|---|---|
| [Module 1 · Lesson 1 — Names of Things: Meaning Expansion](./BASIC_ENGLISH_EXPRESSION_M1_L1_DRAFT.md) | C13 | *The ABC of Basic English*, pp.146–158 and pp.160–162 | Identify the familiar root meaning, then explain the source-supported relation that lets the Name refer to another object, feature or situation. Do not invent a personal association. | 850 Names of Things and familiar root meanings. Cross-link to C15 to distinguish expansion from narrowing. | Source-reviewed teaching draft, updated to include p.158's scope rule and the p.160–162 expansion exercises. Practice includes connection recognition, explanation, transfer, boundary and reverse check. Final teaching review and learner timing remain. |
| [Module 1 · Lesson 2 — Names of Qualities: Meaning Expansion & Use as Things](./BASIC_ENGLISH_EXPRESSION_M1_L2_DRAFT.md) | C14 | *The ABC of Basic English*, pp.152 and 160 | Distinguish a Quality whose meaning is extended from a Quality word that itself functions as a Name of Things. Preserve the source's restricted article use for the five specified forms. | Basic Quality words and word classes. Cross-link to C15; Quality-as-Thing is not Special Use / narrowing. | Source-reviewed first complete draft. Practice covers Quality extension, Quality-as-Thing, article restrictions, contrast and reverse understanding. Learner timing remains. |
| [Module 1 · Lesson 3 — Special Use: Meaning Narrowing](./BASIC_ENGLISH_EXPRESSION_M1_L3_DRAFT.md) | C15 | *The ABC of Basic English*, pp.156–160 | Use context to select a source-recognized narrower referent; keep the broader meaning when context does not support narrowing. | C13/C14 establish the contrast with meaning expansion and Quality-as-Thing. The 250 Fixed Word-Groups are not part of this Lesson. | First complete teaching-content draft. Practice covers material pieces, important subclasses, contextual defaults, the curtain warning, no-narrowing-without-evidence and reverse understanding. Learner timing remains. |

### Module 2 — Expressing Common Meanings in Basic English

| Official lesson | Candidate ID | Source scope (printed pages) | Main learner decision | Prerequisites and cross-links | Draft / practice status |
|---|---|---|---|---|---|
| [Module 2 · Lesson 1 — Communication & Information](./BASIC_ENGLISH_EXPRESSION_M2_L1_DRAFT.md) | C01 | *The ABC*, pp.244–245; short show comparison p.252 | Identify the communication event, participants, content, medium and destination before choosing a Basic expression. | Operators, Directives and Names of Acts. Reuses the existing speak prototype; “speak a language” cross-links to C05. Show's understanding/interest senses cross-link to C05/C06. | First integrated teaching-content draft. Practice covers event choice, writing/reading/sending, speak boundary, show, reverse understanding and independent construction. The original speak-writing checker in `expression-system.js` validates one registered five-part `say/says + something/nothing + to + object pronoun` pattern, with “I say something to him” as its target. Separately, `meaning-basic.js` contains 27 registered prompts across C01–C08 with 40 accepted answer variants and explicit unsupported boundaries; it is a finite pattern checker, not general semantic analysis. |
| [Module 2 · Lesson 2 — Bodily Action & Contact](./BASIC_ENGLISH_EXPRESSION_M2_L2_DRAFT.md) | C02 | *The ABC*, pp.245–247 | Identify the actual bodily action: intake/biting/expulsion or contact/impact/rubbing/scratching. | Operators, Directives and body-part vocabulary. C03 handles damage/effect/result; C04 handles transfer/path/posture; physical “feel” cross-links from C06. | First complete teaching-content draft. Practice covers bodily action, kinds of contact, boundaries, reverse understanding and independent construction. |
| [Module 2 · Lesson 3 — Physical Effects: Damage, Change & Result](./BASIC_ENGLISH_EXPRESSION_M2_L3_DRAFT.md) | C03 | *The ABC*, pp.246–247 and p.254 | Distinguish a caused action, physical damage/effect, resulting state and a change that happens by itself; distinguish hurt from destruction. | Explicit prerequisite: Step 17, sections 4–6, for past participles and be/get + past participle. C02 is contact; C04 is movement; C08 covers the death event itself. | Source-reviewed first complete draft. Practice covers action/result/state, destroy vs hurt, neighbouring lessons, reverse understanding, Step 17 and independent construction. C03/C08 causation boundary clarified in the whole-course audit. |
| [Module 2 · Lesson 4 — Movement & Position: Transfer, Posture & Viewpoint](./BASIC_ENGLISH_EXPRESSION_M2_L4_DRAFT.md) | C04 | *The ABC*, pp.248 and 250 | Identify what moves, its path/destination, viewpoint, or the position/posture of a body or object. | Operators and Directives are prerequisites; this Lesson applies them rather than reteaching them. C02 handles bodily contact; C03 handles damage/result; C11 cross-links the spatial use of next to. | Source-reviewed first complete draft. Practice covers movement/path, position/posture, run/slip, balance, reverse understanding and independent construction. |
| [Module 2 · Lesson 5 — Thinking, Knowledge, Memory & Learning](./BASIC_ENGLISH_EXPRESSION_M2_L5_DRAFT.md) | C05 | *The ABC*, pp.250 and 252 | Identify the mental relation: thought, opinion, certainty, awareness, understanding, meaning, memory, learning or teaching. | Operators, sentence/clause patterns and Names of Acts. C01 is communication; C06 is feeling/attitude. | Source-reviewed first complete draft. Practice covers thinking/opinion, knowledge/understanding, memory, learning/teaching, cross-topic boundaries, reverse understanding and independent construction. |
| [Module 2 · Lesson 6 — Feeling, Preference, Desire & Need](./BASIC_ENGLISH_EXPRESSION_M2_L6_DRAFT.md) | C06 | *The ABC*, p.252 | Distinguish internal experience, liking/friendship, preference, approval, desire and need. | Basic Quality forms and relations such as of/for/with. Physical feel cross-links to C02; awareness/knowledge to C05; sale “on approval” to C07. | Source-reviewed and internally reviewed. All 31 closed practice items have matching answers. Learner time and user feedback remain unmeasured. |
| [Module 2 · Lesson 7 — Exchange, Sale & Commitment](./BASIC_ENGLISH_EXPRESSION_M2_L7_DRAFT.md) | C07 | *The ABC*, p.254, plus selected 250 Fixed Word-Groups and 50 Most Necessary groups | Identify buyer/seller viewpoint, exchange, sale arrangement, payment condition, promise, agreement or completion. | Operators, relevant transaction vocabulary and selected fixed groups. Finding/encounter examples cross-link to C04; discovery/knowledge to C05; personal approval to C06. | Source-reviewed and internally reviewed. All 35 closed practice items have matching answers. The fixed phrases reinforce this Lesson; they do not create another vocabulary Lesson. |
| [Module 2 · Lesson 8 — State and Process: Change, Entry & Ending](./BASIC_ENGLISH_EXPRESSION_M2_L8_DRAFT.md) | C08 | *The ABC*, pp.255–256, plus selected Fixed Word-Groups | Distinguish change in Quality, a process under way, entry into a state, being in a state, an event and cessation/ending. | Existing word forms and be/get + participle foundations. C03 covers damage/destruction actions; C04 movement; C09 modal stance; “in the end” is primarily C11. | Source-reviewed and internally reviewed. All 34 closed practice prompts have matching answers. C03 destruction vs C08 dying boundary clarified in the whole-course audit. The source's explanatory use of finish is not taught as a Basic replacement. |
| [Module 2 · Lesson 9 — Ability, Obligation & Intention](./BASIC_ENGLISH_EXPRESSION_M2_L9_DRAFT.md) | C09 | *The ABC*, p.256; p.260 is used only for the unless boundary | Distinguish can as ability/possibility; ought as right/wise, duty or probability; shall in statements vs questions. | Basic sentence patterns, Operators and infinitive forms. unless → if ... not remains in the conditional-sentence foundation, not C09. | Source-reviewed and internally reviewed. All 25 closed practice prompts have matching answers. Learner time and user feedback remain unmeasured. |
| [Module 2 · Lesson 10 — Quantity, Amount & Degree](./BASIC_ENGLISH_EXPRESSION_M2_L10_DRAFT.md) | C10 | *The ABC*, pp.257–258 | Distinguish distribution, totality, whole, few/many, the three uses of too, and once as one occurrence vs a past-time sense. | Number names and counting remain in the original 45-Step foundation. Past-time once cross-links to C11; spatial next to cross-links to C04. | Source-reviewed and internally reviewed. All 30 closed practice prompts have matching answers. |
| [Module 2 · Lesson 11 — Time & Sequence](./BASIC_ENGLISH_EXPRESSION_M2_L11_DRAFT.md) | C11 | *The ABC*, pp.258–260 | Identify past time, an event before now, the period through now, negative yet vs joining yet, since as time/reason, next as sequence/repetition/space, and always by context. | Clock/calendar/time and tense foundations are not retaught. next to cross-links to C04; since-as-reason cross-links to sentence relations. | First complete draft and internally reviewed. 23 multiple-choice prompts / 23 matching keys; 5 foundation/boundary checks; 14 reverse prompts / 14 suggested answers; 1 independent task. The independent task is not auto-scored by the current App. |
| [Module 2 · Lesson 12 — Context-Dependent Words & Paraphrase](./BASIC_ENGLISH_EXPRESSION_M2_L12_DRAFT.md) | C12 | *The ABC*, pp.260–262 | Start with a non-Basic ordinary-English word, identify its sense in context, and express that meaning with Basic words. | 850 vocabulary, word forms and sentence structure. C12 differs from C13/C14 expansion and C15 narrowing. “Business” in busy is work/tasks, not C07's commercial exchange; noun life is distinct from C08's dying expressions. | First complete draft and internally reviewed. 22 multiple-choice prompts / 22 matching keys; 15 reverse prompts / 15 suggested answers; 4 independent tasks. All seven target words are absent from the 850 list. The source's highlands term is not in the 850 list and is not taught as a Basic entry. Independent construction is not auto-scored by the current App. |

## 3. Whole-course boundary audit — result

The 15 drafts were reviewed together for duplicate teaching decisions, unclear adjacent boundaries, prerequisite gaps and repeated examples.

| Boundary | Accepted distinction |
|---|---|
| M1L1 vs M1L3 | Expansion reaches a related referent; Special Use narrows to a contextually selected referent. |
| M1L2 vs M1L3 | Quality extension / Quality-as-Thing is not Special Use / narrowing. |
| C01 vs C05 | Communication to someone is not the same task as knowing or learning a language. C01 reuses the existing speak prototype; it does not duplicate it. |
| C02 vs C03 vs C04 | Bodily action/contact vs physical damage/effect/result vs movement/path/posture. |
| C03 vs C08 | Destroy-an-animal is the action causing death; die describes the death event itself. |
| C05 vs C06 | Cognition/knowledge vs feeling/attitude/desire/need. |
| C06 vs C07 | Personal approval is not the sale arrangement “on approval”. |
| C07 vs C12 | Business as commercial exchange is not the work/tasks sense used to paraphrase busy. |
| C08 vs C11 | State/process/ending vs temporal sequence; “in the end” is primarily C11. |
| C08 vs C12 | C08 teaches dying expressions; C12 teaches the contextual meanings of the noun life. |
| C09 vs conditional foundation | can/ought/shall meanings are C09; unless → if ... not stays in sentence structure. |
| C10 vs C11 | once as one occurrence vs once as a past-time reference. |
| C11 vs C04 | next in time/sequence vs next to as spatial adjacency. |
| C12 vs C13/C14/C15 | Ordinary-English non-Basic word → Basic paraphrase vs Basic-word expansion or narrowing. |

**Audit result:** no Lesson was added, removed, merged or renumbered. The accepted architecture remains 2 Modules / 15 Lessons. The two clarifications noted above were written back to C03, C08, C12 and the C12 flow.

## 4. Practice, testing and implementation status

- Every draft has teaching explanation, practice and a lesson review. The practice formats vary by learning task; not every prompt is multiple choice.
- Where explicit internal answer audits have been recorded, the counts are listed in the table. Earlier drafts still require a final answer/wording pass before learner testing.
- Open independent-construction tasks are not automatically scored by the current App unless a finite rule set is separately designed and tested.
- The existing C01 speak prototype is reused. Its checker supports only the registered target pattern; this does not mean the whole C01 lesson or the 15-Lesson system is integrated.
- No final learner duration has been measured. No real learner usability/retention test has been completed for this 15-Lesson sequence.
- No App screen migration or final learner-facing screen numbering has been performed.
- No App integration, automated validation of all 15 Lessons, Android build or device acceptance has been completed.

## 5. Current App baseline and migration risks

The repository currently contains five early content prototypes plus a separate finite Meaning→Basic checking tool. These are not six additional Lessons:

| Current App component | Verified current content | Migration implication |
|---|---|---|
| `expression-system.js` / old Lesson 01 | speak prototype, 3 quiz questions, 850-word checker, grammar/meaning checks for one registered five-part say/says pattern | Reuse as the opening and one finite checker inside Module 2 · Lesson 1 (C01); do not keep old global Lesson 01 numbering. |
| `expression-curriculum.js` / old Lesson 02 | 11 body-part terms and 10 questions; 8 questions concern C13, one question concerns C14 and one concerns C15 | Reuse the body-part material in Module 1 · Lesson 1 (C13); split the two cross-topic questions into C14 and C15. |
| `expression-more-lessons.js` / old Lessons 03–05 | three prototype sections (Names of Acts, Fixed Word-Groups, Some Common Needs), 23 multiple-choice questions total | Split Names of Acts across C01/C02/C04/C05; make fixed groups reference/practice support across lessons; split Common Needs across C09/C10/C11/C12 and the conditional foundation. |
| `meaning-basic.js` | 27 registered prompt IDs (MB01–MB27); 40 accepted answer variants; tests also cover 28 known meaning mismatches, 2 viewpoint mismatches, 1 unsupported boundary and punctuation normalization | Keep as a finite writing-check bank, map each MB ID to its primary Lesson, and do not present it as a general semantic parser or a numbered Lesson. |
| `app.js` + `docs/index.html` | the expression route appends the old components sequentially into one long page; scripts are loaded as separate local files | Replace the long-page prototype layout with the accepted 2-Module / 15-Lesson navigation only after the migration plan is approved. |

Progress storage currently exists for the body-part prototype (`BE_EXPR_LESSON_02_PROGRESS`) and the three follow-on prototypes (`BE_EXPR_MORE_LESSONS_PROGRESS`). Both store aggregate attempt/correct counts, not per-question history. The 27-prompt `meaning-basic.js` checker has no persistent progress store.

Because the old Lesson 02 question bank mixes C13/C14/C15, and old e3/e4/e5 progress is aggregate-only, those scores cannot be accurately split across the new Lessons. The safe migration is to preserve the old keys as legacy history, start new lesson-level progress separately, and never delete or rewrite the old values during the first migration.

## 6. Remaining gates

1. Review the drafts with actual learners and record time, confusion points and exercise results.
2. Revise lesson wording, exercise volume and answer keys based on those results.
3. Prepare a separate App migration plan that maps the five early App prototypes to the accepted 15-Lesson curriculum without accidental duplication or renumbering.
4. Design finite, testable offline checking rules for the specific writing patterns that the App will support. Do not promise general semantic checking for arbitrary sentences.
5. Implement, validate, build and test the integrated App; only then mark the corresponding acceptance items complete.

**Current conclusion:** the architecture, first teaching-flow pass, first complete content drafts and document-level cross-Lesson audit are complete. Learner validation and App/device acceptance remain open.
