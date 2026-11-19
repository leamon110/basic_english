# 45-Step Course — Audit of the 14 Existing Chinese Adaptations

## Scope

This document records an initial review followed by a detailed source-fidelity audit of all 14 Steps currently adapted in `docs/js/course.js`. The detailed sections compare source teaching rules, examples, reading content and exercise coverage against the corresponding BasicEnglish.org Step pages.

This audit distinguishes:
- **Topic coverage:** whether the adaptation teaches the main source topic.
- **Reading fidelity:** whether a reading is reproduced, summarized, or rewritten.
- **Confirmed discrepancy:** a specific meaning, fact, or source point that differs.
- **Remaining validation limits:** every individual answer key, every source illustration asset, and a complete word-by-word mapping of all 850 words are not certified by this audit.

The initial results table is historical; the detailed audit sections below supersede its provisional verdicts. This is not a final acceptance sign-off for App integration or device testing.

## Results

| Step | Source teaching points | Current adaptation | Initial review (historical; see detailed audit below) |
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
| 20 | such; compass directions; it as a preparatory subject; so in its several uses; weather conversation | Covers the main topics and derives a tag-question note from the dialogue. The reading is explicitly rewritten. | **Correction:** the original Step 20 Notes explicitly explain the tag-question pattern (negative statement + positive question, or positive statement + negative question). The App's separate teaching panel is source-grounded, not an App-only addition. |
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

- The detailed audit compares teaching-rule coverage, notable examples, reading fidelity and exercise prompt coverage. It does **not** verify every answer key or every source illustration one-to-one.
- Reading passages in Steps 6, 10, 12, 18, 20 and 25 are project rewrites/summaries, not verbatim copies. Keep that disclosure in the App; the detailed sections identify where the rewrite also changes or omits source meaning.
- Step 2 uses a custom illustration; the original illustration assets have not yet been archived.
- No App code has been changed in this audit. Keep the corrections together for an integrated update/build/device acceptance rather than triggering a separate APK build for each research correction.

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

## Detailed source-fidelity audit — third batch (Steps 12, 13 and 15)

### Step 12 — Partial

Source: https://basicenglish.org/step-12/index.html

- The App covers the main teaching groups: one/ones, do as a substitute for a previously used operator, only, still, why, again, high/low/early/late as adverbs, at/in/on time phrases, and several operator + action-noun combinations.
- **Confirmed reading-sequence error:** the source opens with Bob waiting outside the bathroom. Jim answers "No" to "Are you in the bath?" because he is still taking off his clothes and the bath is not ready. The App instead says the other man is already in the bath and answers "Yes". This changes the initial physical situation and the answer to the first question.
- The App also compresses several important turns: Bob's wish not to go back to bed, Jim's explanation that Bob is late because he gets up late, Bob's claim that it is his time for a bath, the warning before Bob leaves to get soap, Jim's warning not to kick the door, and Bob's question about coming out / threat to come in. The main conflict remains, but the adapted reading is not a faithful sequence of the source dialogue.
- **Missing source notes:** outside as a preposition (with inside as a parallel use); bath meaning the bath-water as well as the bathing process; by used adverbially for the passage of time (goes by); the source's explanation of why do/give/have combine with different action nouns and its warning that this is only a rough guide because many combinations are fixed; the two readings of `in a minute` versus `have a bath in an hour`; and several context-specific explanations of quick, get up, quiet and give a laugh. The App includes some related collocations but not the full note set.
- Exercise coverage is substantially incomplete. The source has eight groups: label six items in a picture; eight picture-based Basic questions; eight preposition blanks; describe five actions in pictures; six blanks with again/only/still; four reason statements using why; three substitutions with does; and nine Basic-answer questions about the story. The App instead has five different groups (one/ones, two do-substitutions, five time-preposition blanks, free sentence writing, and five reading questions). These are useful supplementary tasks but do not preserve most of the source exercises.
- The App's one/ones summary also omits the source note that singular `every one` is more emphatic than plural `all`, and does not state the source's precise determiner/adjective restriction as carefully as the original.

### Step 13 — Partial

Source: https://basicenglish.org/step-13/index.html

- The App covers news as a substance-like noun, impersonal it, say forms, do/does questions, who/whom/whose/what/which, and how/when/where/why question formation.
- **Missing relative-adverb use:** the source explicitly teaches `how` as a relative adverb meaning "the way in which" (for example, "That is how she keeps them white"). The App teaches how only as an interrogative adverb asking about manner.
- **Missing question-rule qualifications:** the source teaches the position of `not` in negative do/does questions; distinguishes habitual/general do-questions from questions about an action happening now; gives the exceptions for say, see and seem; and notes that present-tense say can refer to an utterance just completed. The App gives the broad general rule but omits these qualifications.
- The App covers the major who/whom/whose/what/which distinctions, including subject vs object questions and selecting from a group. It does not preserve every source example or the source note that repeated bracketed material in answers is normally omitted.
- Exercise coverage is incomplete. The source has picture comprehension (11 questions), a list of all person-nouns learned so far, questions about numbered picture items using eight specified prompts (when/where/who/which/how/does/why/what), and 13 answer-to-question prompts. The App has six answer-to-question prompts, four yes/no transformations and a free-writing prompt for six questions; it omits the picture task, person-noun list and numbered-picture question task, and substantially reduces the answer-to-question set.

### Step 15 — Partial

Source: https://basicenglish.org/step-15/index.html

- The App covers foot/feet, opposite, send with its two-object patterns, the main Past forms of the operators, -ing forms as activity nouns, possessive adjectives identifying the doer, let us, among, through and together.
- **Missing adjective note:** the source explicitly teaches that `awake` is not used before a noun, with "Some of the girls are still awake." The App does not teach this point or include `awake`.
- The source's `opposite` explanation includes the spatial relation of two things at opposite sides of a field; the App gives opposite wall / opposite the house / opposite to us but omits that specific distinction.
- The App summarizes Past-form groups and gives a list, but omits some source explanations/examples about how the final letter or middle vowel changes (including dropping final `e` after the vowel change). The principal forms themselves are represented.
- Exercise coverage is substantially incomplete. The source has five groups: a picture-story cloze using Past forms; ten questions about that picture story; sentences about six pictures illustrating the prepositions; eight Past-tense transformations; and four rewrites introducing an -ing noun without changing the sense. The App replaces these with a list of Past forms, four Past-tense transformations and open writing about -ing nouns / let us. It does not include the source picture story, its ten questions, the six-picture preposition task, most Past transformations, or the four meaning-preserving -ing rewrites.

### Batch 3 result

- Detailed source audit completed: 10 of the 14 locally adapted Steps (1, 2, 3, 5, 6, 9, 10, 12, 13 and 15).
- Steps 12, 13 and 15 preserve the main teaching themes but contain confirmed reading/rule omissions and substantial exercise replacement. Step 12's opening dialogue changes Jim's answer and whether he is already in the bath.
- Audit-only work: no App code was changed. Remaining adapted Steps: 17, 18, 20 and 25.

## Detailed source-fidelity audit — final batch (Steps 17, 18, 20 and 25)

### Step 17 — Partial

Source: https://basicenglish.org/step-17/index.html

- The App covers the principal teaching groups: money as a substance-like collective noun; like; past participles; passive; get + past participle; perfect tenses; degrees; as...as / than; well/badly; and that-clauses.
- **Missing source qualifications:** the source says past participles are practically never used before a noun; says `gotten` is an alternative learners should recognize but do not need to use; and explains that `most/least` are generally preceded by `the`. The App lists got/gotten without the usage note and omits the other two qualifications.
- The source distinguishes fixed usage between `-er/-est` and `more/most`, notes that some adjectives cannot take degrees (e.g. married and first), teaches degree forms of `-ly` adverbs, and says well/badly cannot be moved to the beginning as an alternative position. The App gives a simplified short-adjective rule and examples but omits these qualifications.
- The App summarizes comparison clauses, but does not fully preserve the source's rules for repeating a preposition in both parts, repeating subject/operator when comparing different adjectives, using do in simple tenses, and using only the auxiliary (if anything) for a complex tense.
- There is no source reading passage in this Step, so the absence of a narrative panel is not a fidelity defect.
- Exercise coverage is incomplete. The source has six groups: paired comparisons for six pictures; seven Past-to-perfect transformations; six passive transformations; four sentence tasks with that in specified positions; six direct-speech rewrites using that; and six normal-form rewrites removing repeated words. The App has four passive conversions, three perfect conversions and open writing. It omits the picture comparisons and all three groups of that/normal-form exercises, and reduces the source conversion sets.

### Step 18 — Partial

Source: https://basicenglish.org/step-18/index.html

- The App covers noun possessives, possessive pronouns, object relative-pronoun omission, omission of be + relative pronoun, supplementary/appositional nouns, we men / you women, and contractions. Its safe rule for noun possessives and its note about modern `its` are source-aligned.
- **Missing relative-clause detail:** the source also allows omission of a relative pronoun and its preposition after certain time-words (with a specific exception for `time` meaning occasion); the App does not teach this. The source explains that adjectives following `some/every/no` compounds follow the compound word (e.g. `nothing strange`); the App omits this rule.
- **Reading meaning change:** the source's opening exchange says there is "nothing of interest tonight"; the App rewrites this as "no news of the ship tonight", which is a different statement. The App also removes much of the source account: the two distinct restaurants, the reason for choosing the second one, the old Mrs Price episode, the two committee meetings and the discussion of the proposals, why the curtains were blue, the Whites' arrival, and the book's story about the ship, island and snake. The reading is correctly labelled as a simplified rewrite, but these omissions remove many of the source's specific vocabulary expansions.
- Many source notes are absent from the App, including light as an apparatus (on/off/out), went down = sank, of interest, dear as price/affection/address, sent for, White as a familiar surname, before = previously, do the seats = mend, works = factory, did accounts, round = revolve, drink as alcoholic drink, have a meeting, at one time = previously, the reporting use of present-tense say, specialized business/meeting senses, get through = finish, see = understand, away, make a decision, in a bad humour, a drink as one serving, on the way back, the Whites as a plural family name, about = approximately, yes please, send to sleep, page as a sheet, and dress as clothing.
- Exercise coverage is not source-equivalent. The source has six groups: six picture descriptions using the present perfect; two-sense sentences for six words; two indirect-reporting tasks; a passage rewritten with contractions; six one-word substitutions; and ten Basic-answer questions. The App instead drills noun possessives, possessive pronouns, relative-clause omission and contraction expansion, then asks for five original sentences. None of the six source exercise groups is retained as a task.

### Step 20 — Partial

Source: https://basicenglish.org/step-20/index.html

- The App covers the main categories: such, compass directions as adjective/adverb/noun, it as a preparatory subject, so as degree word / substitute / echo / conjunction, tag questions, school/church/hospital/market/prison without an article in the activity sense, one day, one another, keep...from + -ing, come out/up/off and anywhere/everywhere/nowhere.
- **Correction to the initial review:** the original Step 20 Notes explicitly explain tag questions at the start of the weather dialogue. The App's separate teaching panel is source-based, not an invented project-only topic.
- **Missing rule detail:** the source teaches `such` adverbially before a descriptive adjective (including the `such a healthy boy as...` pattern), and `so` before an adjective/adverb without an expressed that-clause. The App focuses on the pointing-adjective and such...as / such...that patterns, and on so...that. In the echo construction, the source also gives `have` and auxiliary-only examples; the App gives only a subset.
- The App reading is a shortened rewrite. It preserves the broad weather conversation and the umbrella / rain / cough / snowball sequence, but omits much of the source's seasonal and garden discussion: bulbs coming up, shade, the two gardens' different heights and slopes, the river making land wet, early summer/fall, the warm sun and the bedroom's north window. It also shortens several transitions in the weather argument.
- Many source notes are omitted: at last; sign as indication; wet as rainy; on the way; coming spring; flowers come out / come off; bulbs come up; not one; early summer; fall = autumn; so suddenly without a following that-clause; raincoat; it is said; country as rural area vs nation; tired of; bad cough; able to; send at as target; healthy winter; ice-box; and more as additional.
- Exercise coverage is incomplete. The source includes compass statements from a picture, eight picture-description blanks, five so/such completions, thirteen quantity/degree blanks, two-sense sentences for spring/country/fall/sign, five meaning-preserving rewrites, and ten Basic-answer questions. The App has four direction sentences, four so/such blanks, free writing and six comprehension questions. It omits the picture-description tasks, quantity/degree exercise, two-sense word exercise and meaning-preserving rewrites, and reduces the comprehension set.

### Step 25 — Partial

Source: https://basicenglish.org/step-25/index.html

- The App covers -ing nouns, -er/-ing adjective forms, please + -ing/-ed, the un- prefix and the lesson's office vocabulary. Its note that `link` is not in the App's 850-word list is correct: the current `docs/js/data.js` arrays total exactly 850 entries (100 + 400 + 200 + 100 + 50), and `link` is absent from those arrays even though it appears in the Step 25 page's vocabulary.
- **Spelling / formation details:** the source footnote says dry changes y to i before -er and -ed and gives `hair-drier`; the App's table says `dryer`. The source also identifies `feeler` as the exception to the normal person-doer sense of the -er nouns; the App does not mention this exception.
- **Reading contains several meaning changes:** the source distinguishes the meeting with representatives today from the private meeting before the public Committee meeting tomorrow; the App moves the meeting into "this morning" and drops the tomorrow distinction. The source says the paper was a dearer sort despite no price increase; the App says the supplier asked for more money, which the source does not say. The source letter says "The money was sent without my approval"; the App replaces this with "I did not say yes to this". The source says "I was writing on my knee with a broken pencil"; the App says "I made the letter with a broken pencil". The source says the teacher called him the worst learner; the App says he was the worst boy. The source says "If anyone comes"; the App says "If some man comes". The source asks for two seats; the App asks for some seats. The App also omits the unclear word `approval`, the pen running out of ink and being refilled, and the fact that the signature is required both at the indicated place and at the end.
- Several source notes are not taught: railway company; Bell and Sons as a business-name form; wider insurance; goods as merchandise; current receipts; answering a question/person without `to`; cutter as a machine-part; paper as document; signed; school-days; overcoat; plays being "on"; and good-looking. Some related forms appear in the reading, but their source explanations are absent.
- Exercise coverage is incomplete. The source has six groups: six picture questions; five meaning-preserving rewrites; five -ing/-er fill-in sentences; three synonyms for untrue/unwise/unclean; an office-scene description; and ten Basic-answer questions. The App instead gives a general -ing/-er drill, un- formation, a short reading question set, and a writing prompt. It omits the picture task, source rewrites, source fill-ins and synonym task, and reduces the ten comprehension questions.
- The App's reading is correctly disclosed as a rewrite, but the above changes must be corrected if it is intended to preserve the original source meaning.

### Final consolidated result — all 14 adapted Steps

| Step | Detailed result |
|---|---|
| 1 | Partial — Step 1 promotes forms the source defers to Step 3; `my` and other source notes are not explicit; source picture is absent. |
| 2 | Substantially aligned — reading and exercise intentions are preserved; the source illustration is replaced by a custom diagram. |
| 3 | Partial — missing uses of take, details of of/at/here/there/other, and three source exercise groups. |
| 5 | Partial — several source restrictions and operator-use details are missing; multiple exercise groups are omitted; one negative source sentence is changed to positive. |
| 6 | Partial — reading details and source notes are omitted; the pictures passage changes the participants and contradicts itself; exercises are reduced. |
| 9 | Partial — missing the full -ing list, till as conjunction, adverb placement/order and two source exercise groups. |
| 10 | Partial — reading omits source scenes and changes the hospital action; source notes and three comprehension questions are missing. |
| 12 | Partial — opening dialogue changes Jim's answer and state; multiple source notes and most original exercises are missing. |
| 13 | Partial — how as a relative adverb and question-rule qualifications are missing; picture/person/numbered-item exercise groups are omitted. |
| 15 | Partial — awake note and some past-form details are missing; all five source exercise groups are replaced or reduced. |
| 17 | Partial — gotten qualification, participle position, comparison/adverb details and most source exercises are missing. |
| 18 | Partial — one reading statement changes meaning; many source notes and all six original exercise groups are omitted. |
| 20 | Partial — tag-question teaching is source-based, but several such/so rules, source notes and most exercise groups are missing. |
| 25 | Partial — several reading facts are changed, source notes/exercises are omitted, and the drier formation is not followed. |

**Overall conclusion:** the 14 existing adaptations preserve many broad lesson themes, but they do not yet demonstrate source-complete teaching or exercise coverage. Step 2 is the only adaptation that is substantially aligned across its reading and exercise intentions. The other 13 need targeted correction, explicit scope decisions or restored practice before they can be accepted as source-faithful.

### Consolidated correction and follow-up queue

1. Correct the Step 1 → Step 3 sequencing of `am` and third-person singular `puts/takes`; make `my` and the source pointing-word notes explicit.
2. Restore missing source rules and examples identified for Steps 3, 5, 6, 9, 12, 13, 15, 17, 18, 20 and 25.
3. Correct confirmed reading meaning changes in Steps 6, 10, 12, 18 and 25; keep all rewritten passages clearly labelled as adaptations.
4. Restore or deliberately map the missing original exercise groups in Steps 1, 3, 5, 6, 9, 10, 12, 13, 15, 17, 18, 20 and 25. The audit records exercise coverage gaps; individual answer-key correctness remains a separate verification task.
5. Keep Step 2's custom illustration clearly identified as a replacement; original illustration archival remains open.
6. Do not treat `link` as one of the 850 words: the repository's 850-word arrays were checked and total 850, with `link` absent.
7. Do not modify App code until the separate App migration plan has been reviewed and approved.
