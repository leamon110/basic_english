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
