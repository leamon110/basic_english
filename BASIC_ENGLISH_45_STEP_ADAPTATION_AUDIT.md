# 45-Step Course — Audit of the 14 Existing Chinese Adaptations

## Scope

This is a first-pass source-fidelity audit of the 14 Steps that `docs/js/course.js` currently adapts locally. Each adapted lesson was compared at the level of its stated teaching topics and the relevant reading passages against the corresponding BasicEnglish.org Step page.

This audit distinguishes:
- **Topic coverage:** whether the adaptation teaches the main source topic.
- **Reading fidelity:** whether a reading is reproduced, summarized, or rewritten.
- **Confirmed discrepancy:** a specific meaning, fact, or source point that differs.
- **Not yet checked:** exhaustive exercise-by-exercise equivalence and every illustration.

It is not a final acceptance sign-off for all lesson content.

## Results

| Step | Source teaching points | Current adaptation | First-pass result |
|---|---|---|---|
| 1 | Nouns and regular plural; adjective position; a/an/the; personal pronouns; this/that; BE/PUT/TAKE; spatial prepositions; and; basic word order | Covers the main topics and source exercises. | **Small omission:** the source explicitly introduces I, my and it, and says pointing with this/that need not be physical. The App explains I and it and uses my in examples, but does not clearly teach my as the possessive adjective or explain non-physical pointing. |
| 2 | Ten room nouns, two adjectives, the “My Room” reading, adjective order, adjective coordination with and, on used for a wall surface, and five exercise groups | Reading text is reproduced; Chinese translation, a custom SVG room diagram and exercises are added. | **Good source alignment.** The diagram is project-made, not the source illustration. Exercise formats are adapted, but the original task intentions are represented. |
| 3 | Irregular plurals man/men and woman/women; -es and -ves; nouns qualifying nouns; other; pronoun forms; present tense of give/get/come/go; across/at/of/to/from/with/here/there | Covers these main topics and makes the present-only scope explicit. | **Main topic coverage matches.** The original page says only the present tense of the four new Operators is to be learned at this Step; the App correctly avoids teaching their past/future forms as this Step's target. |
| 5 | Family/families; countable nouns versus names of substances; a/the with substance nouns; country; some as adjective and pronoun; third-person pronouns; do/have/make; may; negation; before/after/for/out/or/but/where/when/while | Covers the listed grammar and vocabulary points. | **Main topic coverage matches** in this pass. |
| 6 | Family vocabulary and the “An English Family” reading, including work and meal routines, the different schedules of family members, and who goes to the pictures | Reading is explicitly rewritten and shortened. | **Confirmed internal/story discrepancy:** the App says “the family goes to the pictures” and immediately says “the father does not go to the pictures.” The source says the family members take Ellen and their mother to the pictures, while Mr. Robinson does not go. Rewrite as “Fred and Tom take Ellen and their mother to the pictures” (or another wording that keeps the father excluded). The adaptation also omits several details about Ellen, Fred and the men's meal arrangements; that is acceptable only if it remains labelled as a simplified reading. |
| 9 | what as “that which”; old opposite to young and new; see forms; positive and negative commands; Operator -ing forms; -ly adverbs; till/very/because; yes/no questions | Covers the main points and gives exercises. | **Main topic coverage matches** in this pass. |
| 10 | “A Town” dialogue; town buildings and locations; word extensions such as in the middle, made of, on one's back, high/low, get a view of, in front of, over and back | Reading is rewritten as a shorter narrative. | **Confirmed location mismatch:** the source asks whether the building between the stores is an office building, then says the building *in the middle* is a hospital. The App merges these into “A building between the stores is a hospital.” Keep the distinction: the hospital is the building in the middle, not the building between the stores. The rewritten format should remain labelled as an adaptation, not an original transcription. |
| 12 | one/ones; do as a substitute Operator; only/still/why/again; high/low/early/late as adverbs; at/in/on for time; “At the Bathroom Door” dialogue and Operator + action-noun combinations | Grammar topics are covered; the reading is explicitly rewritten. | **Confirmed opening-scene error:** the App says the second man is already in the bath and answers “Yes” to “Are you in the bath?” In the source, Jim answers “No, I am taking off my things. My bath is not quite ready”; only later does he say the bath is ready and get into it. Restore that event order. |
| 13 | news as a substance-like noun; impersonal it for time/weather; say; how as a relative adverb; yes/no questions with do/does; who/whom/whose/what/which/how/when/where/why | Covers the main points and gives question-building exercises. | **Main topic coverage matches** in this pass. |
| 15 | foot/feet; awake not used before a noun; opposite; send and indirect-object patterns; past forms of all Operators; Operator -ing forms as nouns; let us; among/through/together | Covers the past forms, send patterns, -ing nouns, let us, among/through/together. | **Small omission:** the source explicitly teaches that awake is not used before a noun. The App's vocabulary and teaching panels omit this point. Add a short note and an example such as “Some of the girls are still awake.” |
| 17 | money as a substance-like collective noun; like; past-participle forms; passive; get + past participle; perfect tenses; comparison; well/badly; that clauses | Covers the main topics, including passive, get-passive and perfect forms. | **Small qualification omitted:** the source says gotten is an alternative form; learners should recognize it but do not need to use it. The App table currently presents “got / gotten” without that qualification. Add the source's usage note. |
| 18 | noun possessives; possessive pronouns; omission of object relative pronouns and some related omissions; supplementary/appositional nouns; contractions | Covers the main topics. The reading is explicitly simplified. | **Main topic coverage matches** in this pass. The source's caution that noun possessives are safest with people/animals and that the of-construction is preferred elsewhere is represented in the App. |
| 20 | such; compass directions; it as a preparatory subject; so in its several uses; weather conversation | Covers the main topics and derives a tag-question note from the dialogue. The reading is explicitly rewritten. | **Main topic coverage matches** in this pass. Tag questions are visible in the source dialogue; the App elevates them into a separate teaching point, so label that as a project teaching choice rather than an original numbered rule. |
| 25 | -ing nouns; -er/-ing forms of adjectives; please + -ing/-ed; un- prefix; “At the Office” reading; Step 25's statement that the structure stage is complete | Covers the main topics; reading is explicitly rewritten. | **Two confirmed discrepancies:** (1) the source footnote says dry changes y to i before -er and -ed and gives hair-drier; the App table currently says “dryer” in the suffix-pattern row. Use the source spelling “drier” for this formation, or explicitly distinguish a modern variant if retained. (2) the source says “I was writing on my knee with a broken pencil”; the App changes this to “I made the letter with a broken pencil,” which changes the meaning. Restore the writing-on-knee detail. The source also specifies that the public Committee meeting is tomorrow; the App shortens that timing detail. |

## Confirmed correction queue

These should be corrected in the next integrated App update:

1. Step 6 — remove the “family goes” contradiction and preserve that Mr. Robinson does not go to the pictures.
2. Step 10 — distinguish the building between the stores from the hospital building in the middle.
3. Step 12 — restore the opening sequence: Jim is not yet in the bath; he is taking off his things.
4. Step 15 — add the source note that awake is not used before a noun.
5. Step 17 — qualify gotten as an alternative that learners need only recognize.
6. Step 25 — use drier for the source's suffix rule and restore “writing on my knee with a broken pencil.”
7. Step 1 — make the I / my / it introduction and non-physical use of pointing words explicit.

## Validation limits and next work

- This pass checks the main topic coverage and identified reading discrepancies; it does **not** yet prove every exercise prompt, answer key, vocabulary item or example is one-to-one with the source.
- Reading passages in Steps 6, 10, 12, 18, 20 and 25 are project rewrites/summaries, not verbatim copies. Keep that disclosure in the App.
- Step 2 uses a custom illustration; the original illustration assets have not yet been archived.
- No App code has been changed in this audit. The project has been keeping the 45-Step curriculum work together for an integrated update/build/device acceptance rather than triggering a separate APK build for each research correction.

## Source pages

- [Step 1](https://basicenglish.org/step-1/index.html)
- [Step 2](https://basicenglish.org/step-2/index.html)
- [Step 3](https://basicenglish.org/step-3/index.html)
- [Step 5](https://basicenglish.org/step-5/index.html)
- [Step 6](https://basicenglish.org/step-6/index.html)
- [Step 9](https://basicenglish.org/step-9/index.html)
- [Step 10](https://basicenglish.org/step-10/index.html)
- [Step 12](https://basicenglish.org/step-12/index.html)
- [Step 13](https://basicenglish.org/step-13/index.html)
- [Step 15](https://basicenglish.org/step-15/index.html)
- [Step 17](https://basicenglish.org/step-17/index.html)
- [Step 18](https://basicenglish.org/step-18/index.html)
- [Step 20](https://basicenglish.org/step-20/index.html)
- [Step 25](https://basicenglish.org/step-25/index.html)

## Detailed source-fidelity audit — first batch (Steps 1, 2, 3 and 5)

Audit basis: the original Step pages linked below were compared with the current local adaptations in `docs/js/course.js`. This pass checks taught rules, source examples, reading material and exercise coverage. "Partial" means the App preserves the main topic but omits or changes identifiable source content; it does not mean the App is unusable.

### Step 1 — Partial

Source: https://basicenglish.org/step-1/index.html

- The App covers the main beginner topics: singular/plural, adjective position, a/an/the, this/that, basic spatial prepositions, and/or, and the simple sentence pattern.
- **Confirmed sequence error:** the original says only present forms are used in Steps 1–2; learners meet no third-person singular form of put/take in these two Steps; and only the third-person singular and plural forms of be are to be learned in Step 1. The original introduces first-person singular `am` in Step 3 and the third-person singular forms of put/take in Step 3. The App currently tells learners to master `am/is/are` and `he/she/it puts/takes` in Step 1. These forms are displayed in the source reference table, but the source explicitly defers learning/usage; the App's instruction incorrectly promotes them to Step 1 targets.
- **Missing explicit teaching:** `my` appears in App examples but is not explained as the possessive adjective that the source introduces alongside `I` and `it`; the source also says the pointing use of this/that need not be a physical pointing act, and that `my`, `this`, and `that` precede descriptive adjectives. The App does not state these points.
- The App does not explain the source's distinction that `is/are` link the subject to a description rather than naming an operation, or the source use of a prepositional phrase after a noun to identify it more exactly.
- Exercise coverage: the six opposites, article/operator blanks and plural transformation are represented. The first source task asks the learner to describe a supplied picture with four specified prepositions; the App keeps the prompt but does not provide that source picture. Mark this task as only partially reproduced.

### Step 2 — Substantially aligned

Source: https://basicenglish.org/step-2/index.html

- The English reading is reproduced in full and in the original order; the App adds Chinese translations and a sentence-structure explanation.
- The vocabulary and the source's main sentence patterns are represented.
- The five source exercise intentions are retained: identify numbered objects, describe the room in five sentences, name house parts, practise put/take with the specified position words, and answer reading questions. The two source subparts for the put/take and is/are patterns are combined into one App exercise.
- The original illustration is not reproduced: the App explicitly uses a newly drawn room diagram. This is a replacement illustration, not the source image. The change is identified to the learner in the App.
- No material teaching-rule or reading-content contradiction was found in this pass.

### Step 3 — Partial

Source: https://basicenglish.org/step-3/index.html

- The App includes the major topic groups: plural spelling, nouns qualifying nouns, other, object pronouns, give/get/come/go, of/to/from/with/across/at, be-negation, compounds, another/into and some word-order variation.
- **Missing operator uses:** the source explicitly teaches `take + to/destination` for transport/conveying, and `take` without a preposition for taking hold of / taking possession of something. The App only explains `take from` and `take off`.
- **Missing preposition/adverb detail:** the source links the ownership sense of `of` to its historical relation with `off`; gives restrictions and spatial distinctions for `at` (including when it cannot replace `in`, and the purposeful relation in `at the table`); and teaches the normal placement of here/there after the operator as well as their possible placement after a noun. The App gives simplified meanings/examples but omits these distinctions.
- **Other rule detail:** the source gives ordering and determiner restrictions for `other`; the App only gives a short summary and examples.
- **Cross-Step sequencing:** the source introduces `am` and third-person singular `puts/takes` here. The App has already told learners to master them in Step 1 and does not clearly reintroduce their Step 3 role.
- Exercise coverage is incomplete. The source has picture description from two speaker viewpoints, negative transformations, definitions plus sentence use for three noun pairs, and four preposition blanks. The App instead has a plural drill, one four-item preposition task and open sentence writing; it omits the picture, negative-transformation and definition tasks.

### Step 5 — Partial

Source: https://basicenglish.org/step-5/index.html

- The App represents the main teaching groups: substance nouns, family plural, country, some, do/have/make, will/may, negatives, before/after/for/out, conjunctions and where/when/while.
- **Missing restrictions and distinctions:** the source says `some` is never preceded by `the`, a pointing adjective or a possessive adjective; its `some of` construction requires a specific referent/group. The App gives examples but does not state these restrictions. The source warns that the objects used with `do` are largely fixed by usage and cannot be freely inferred from any activity noun; this warning is absent. The source explains `have` across parts of the body, ownership, looser possession, accompaniment, wearing/carrying and attached objects; the App only gives a small subset.
- The App says before/after can refer to space and time, but omits the source's qualification that spatial `after` requires an idea of succession. It also omits the source's same-subject ellipsis rule for `and/or`, and the note that where/when may function as relative adverbs.
- The operator table displays Past forms but the App explicitly says they are not a mastery target in this Step. This matches the source's instruction to learn all table forms except the Past; do not treat the table display alone as a discrepancy.
- **Exercise coverage is materially incomplete:** the source has six groups: picture sentences using do/make/have; five future transformations; conjunction blanks; sentence-making with for/may/when/where; seven negative transformations; and four operator-form blanks in dependent clauses. The App has a family-plural drill, only three future transformations, only three negative transformations, and a general writing prompt. It omits the picture task, conjunction blanks, the specific for/may/when/where task and the operator-form blanks.
- **Confirmed meaning change in an exercise:** the source future-tense exercise includes `The porter has not a flag in his hand`; the App changes this to the positive `The porter has a flag in his hand`. This removes the original negative meaning being practised. The source's sentence about the train and the other train is also omitted from the future exercise.

### Batch 1 result

- Detailed source audit completed: 4 of the 14 locally adapted Steps (1, 2, 3 and 5).
- Step 2 is substantially aligned; Steps 1, 3 and 5 need source-fidelity corrections or explicit coverage notes before they can be called fully aligned.
- This is an audit/documentation pass only. No App source was changed. The remaining locally adapted Steps are 6, 9, 10, 12, 13, 15, 17, 18, 20 and 25.

## Detailed source-fidelity audit — second batch (Steps 6, 9 and 10)

### Step 6 — Partial

Source: https://basicenglish.org/step-6/index.html

- The App preserves several central points: full of + a following noun phrase, adjective placement after a noun when completed by a phrase, in the morning / at night / on the days or nights, have a meal, come in / go out, the pictures as cinema, and the two senses of day/night.
- **Reading omissions and one meaning change:** the original names the married daughter in the country, the daughter Ellen, and the sons Fred and Tom; gives the bedroom arrangement; says Ellen eats early before the others and takes food with her; distinguishes where the father, Tom and Fred eat; and explains that Mr Robinson may have a late meal after the others. The App removes these details. More importantly, the source says Fred and Tom sometimes take Ellen and their mother to the pictures, Mr Robinson does not go, and on the described night the family will not go out. The App says "the family goes to the pictures" and then says the father does not go, which changes the participants and creates an internal contradiction.
- **Missing source notes:** titles Mr / Mrs / Miss / Ms / Master; the wider relation expressed by `of` in "the work of the house"; `at` with back/front/side; a shared adjective applying to two associated nouns; time/place phrase order; `at the other side of`; `after that` referring back to an action; `in` used adverbially in `come in / be in`; `plates of meat` as container/content; and `before` introducing a dependent statement. The App covers some but not all of these notes.
- Exercise coverage is incomplete. The source has a family-relationship picture task, six preposition blanks, three sentence-making prompts, and six Basic-answer questions. The App omits the relationship picture task, includes only four of the six preposition blanks, and has five reading questions rather than six; the source's final "describe the Robinson's house" task is absent.

### Step 9 — Partial

Source: https://basicenglish.org/step-9/index.html

- The App covers the main topics: `what` = "that which"; old/young/new; see forms; positive and negative orders; be + -ing; the main exceptions for state verbs; same-subject omission in when/while clauses; till; very; -ly; because; yes/no questions and short answers.
- **Missing rule detail:** the source lists all 15 operator -ing forms and gives their spelling changes; the App gives examples and spelling notes but does not present the full list. The source also teaches `till` as both a time preposition and a conjunction; the App only teaches the preposition use. The source explains that simple present is used when an act is not being described as in progress, and gives restrictions on fronting -ly adverbs plus their order relative to place/time adverbials; the App omits these distinctions.
- Exercise coverage is incomplete. The source has four picture-based questions, a passage to rewrite using -ing forms where possible, three orders, five question transformations, and five Basic-answer questions. The App includes three separate continuous-form transformations (not the passage rewrite), the three orders and five question transformations, but omits the picture questions and the final five Basic-answer questions.

### Step 10 — Partial

Source: https://basicenglish.org/step-10/index.html

- The App covers several source expansions: in the middle, made of glass/steel, steel frames, on her back, high/low, get a view of, in front of, inside/outside, go over/go back, and early/late.
- **Reading omissions / altered detail:** the source includes the school and its red building, children going with their parents to get books from the library, and the market-place in front of the church; these are omitted from the App reading. The source says almost all the new buildings have steel frames, while the App's wording can be read as saying the buildings in that paragraph all have steel frames. Most importantly, the source says men are taking a young woman into the hospital and she is on her back; the App retains only "a young woman is on her back", removing the action and the people taking her into the hospital. The source's "they" in the market sentence refers to the market stall-holders; the App attributes the stock to the market itself.
- **Missing source notes:** the group reference of we/they; with pleasure for non-physical relations; the general/habitual present in "my train does not go till"; end of the morning; go used beyond physical movement; the source's detailed limits for in the middle; here/there and adverb fronting; almost everything / something / nothing; the generalized class use of the; near as a preposition; very near; the specific meaning of workman; over meaning across (and its limits); and on a train.
- Exercise coverage is incomplete. The source has numbered-picture sentences, plural forms, five words for "Some of the ___ is here", sentences using inside/everything/workman, and nine Basic-answer questions. The App preserves the plural, five-word, and three sentence-making tasks, but omits the numbered-picture task and has six rather than nine comprehension questions. One App question asks "Who is on her back by the hospital?" where the source asks "Who is being taken into the hospital?", so it no longer tests the source event.

### Batch 2 result

- Detailed source audit completed: 7 of the 14 locally adapted Steps (1, 2, 3, 5, 6, 9 and 10).
- Steps 6, 9 and 10 preserve the broad lesson themes but have documented reading, note and exercise omissions; Step 6 also contains a contradiction in the adapted picture-going passage, and Step 10 removes the hospital action from a comprehension question.
- Audit-only work: no App code was changed. Remaining adapted Steps: 12, 13, 15, 17, 18, 20 and 25.
