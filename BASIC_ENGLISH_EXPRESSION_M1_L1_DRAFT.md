# Module 1 · Lesson 1 — Names of Things: Meaning Expansion

> **Draft status:** first complete teaching-content prototype. It is based on the project's source index for *The ABC of Basic English* (1932), pp.146–154. The examples below are selected teaching examples, not a complete transcription of every source example. This draft must still pass review for clarity, exercise quality and length.

## What you will learn

A Basic word can sometimes be used for another thing that is related to its root meaning.

The important point is the connection:

**root meaning → recognizable relation → related thing**

This is not permission to use a word for anything that happens to remind you of it. The relation must be one recognized in the Basic source.

## 1. A familiar starting point: body parts

Some body-part words are also used for parts of other things.

| Word | Root meaning | Related use |
|---|---|---|
| head | the part of the body above the neck | a rounded or upper part of another thing |
| foot | the part of the body used for standing and walking | the bottom or supporting part |
| mouth | the opening used for eating and speaking | an opening |
| neck | the part connecting the head and body | a narrow connecting part |

Think about the relation, not just the translation:

- A foot supports the body. A foot of another thing can be its supporting bottom.
- A mouth is an opening. The mouth of another thing can be its opening.
- A neck is narrower than the parts it connects. The neck of another thing can be its narrow connecting part.

The object is not literally a human body. The word is being used because the parts have a related position, shape or function.

## 2. Similarity that can be seen, felt or heard

A Name can extend to something with a related sensory feature.

The source gives several kinds of similarity:

| Feature | Source examples | What connects them |
|---|---|---|
| size | mountains; babies | very large or very small things |
| shape / surface | plates; leaves; basins; sticks | flat, thin, hollow or long-and-narrow forms |
| group / arrangement | an army; a family tree | a group or arrangement understood through a familiar picture |
| sound | thunder; music | a sound is described through a familiar sound-image |

The connection does not have to be exact physical identity. It must be clear enough to explain why the Name is being used.

## 3. Similarity through use, behavior or function

Some extensions are not mainly about appearance.

The source also uses relations such as:

- **use:** an object name can be used for the activity or function connected with it;
- **behavior:** something may be described through an action or behavior it shares with another thing;
- **function:** two different objects may be connected because they do similar work;
- **result:** an action or effect may be described through a related familiar use.

For example, the source connects:
- a bed used for resting with the bed of a river or a flower-bed;
- a railway carriage with a horse carriage because both carry people;
- a machine with repeated work carried out in a machine-like way.

The relation here is not “they look alike”. It is their use, behavior or function.

## 4. Other real connections

The source also recognizes several relations that do not fit only into shape or function.

| Relation | Source examples | How the meaning is connected |
|---|---|---|
| cause | amusement, comfort, pleasure, agreement | a Name connected with a feeling can also refer to what causes it |
| process | addition, building, discovery | a Name connected with a thing or result can also refer to the process that produces it |
| use | brush, sail, whistle | a Name can extend to a use or activity connected with the object |
| part and whole | letter, country, body | a part or member can be used in relation to the whole |
| material and object | glass, iron, tin | a material name can refer to a familiar object made from it |

These are source-recognized relations. Do not turn them into unrestricted rules: a material name does not automatically name every object made from that material, and a part name does not automatically name every whole.

## 5. From physical things to abstract meaning

Sometimes the source uses a familiar picture to talk about something that is not a physical object.

Examples include:
- a field of interest;
- attraction between ideas or people;
- support given through money.

There is no literal field, physical force or roof being described. The familiar relation helps express an abstract meaning.

This is sometimes described as an “as if” use: understand the new meaning through the familiar picture, but do not mistake the picture for a real physical object.

## 6. The rule to remember

When you meet a Basic Name in an unfamiliar context, ask:

1. What does this word name in its root use?
2. What does it refer to in this sentence?
3. What connects the two uses — shape, position, sensory feature, use, behavior, cause, process, part/whole, material/object, or another source-recognized relation?
4. Does the source recognize this relation, or am I only making a personal association?

If you cannot explain the connection, do not invent one.

---

## Practice

### A. Identify the relation

Choose the main relation shown by each example.

{@body const questions = [
 {q:"The word “mouth” is used for an opening in another thing.",opts:["Shape/position or structure","Time","A promise"],a:0,why:"A mouth is an opening; the related use names another opening."},
 {q:"A long, narrow object is described with the word “stick”.",opts:["A time relation","Sensory shape","A financial exchange"],a:1,why:"The source connects the use with the long-and-narrow shape."},
 {q:"A railway carriage and a horse carriage are connected.",opts:["Similar function","Same material","A past event"],a:0,why:"Both are used to carry people."},
 {q:"A Name connected with a result is also used for the process that produces it.",opts:["Process relation","A body-part relation","A time sequence"],a:0,why:"The source recognizes result/process connections."},
 {q:"A material name is used for a familiar object made from that material.",opts:["Material/object relation","A feeling","A movement path"],a:0,why:"The source recognizes some material-to-object uses, but not as an unlimited rule."}
]}
{@body const [answers,setAnswers]=DIL.useState({})}
{@body const [show,setShow]=DIL.useState(false)}
<box border radius="lg" padding={3} gap={3}>
  {#each questions as q,i}
    <box gap={2}>
      **{i+1}. {q.q}**
      <radio-group direction="col" value={answers[i]===undefined?"":String(answers[i])} onChange={v=>{setAnswers(a=>({...a,[i]:Number(v)}));setShow(false);}}>
        {#each q.opts as opt,j}
          <radio value={String(j)}>{opt}</radio>
        {/each}
      </radio-group>
      {#if show}
        <text color={answers[i]===q.a?"success":"danger"} size="sm" weight="medium">{answers[i]===q.a?"正确":"需要再想一想"}</text>
        <text size="sm" color="secondary">{q.why}</text>
      {/if}
    </box>
    {#if i!==questions.length-1}
      <divider color="subtle"/>
    {/if}
  {/each}
  <row align="center" justify="between">
    <text color="secondary" size="xs">{Object.keys(answers).length} / {questions.length} 已作答</text>
    <button size="sm" disabled={Object.keys(answers).length!==questions.length} onClick={()=>setShow(true)}>检查答案</button>
  </row>
  {#if show}
    <title size="lg" color="default">{questions.filter((q,i)=>answers[i]===q.a).length} / {questions.length}</title>
  {/if}
</box>

### B. Explain the connection

For each pair, explain the relation in your own words:

1. foot → the bottom/supporting part of another thing;
2. mouth → an opening;
3. river-bed / flower-bed → a familiar use of the word bed;
4. material name → a familiar object made from that material.

### C. Check the boundary

A word reminding you of another word is not enough. Before accepting a new use, you must be able to identify the relation and confirm that it belongs to the source's recognized examples.

---

## Lesson review

You should now be able to:

- identify a word's root meaning;
- recognize a related use in context;
- explain the relation rather than memorize a second translation;
- distinguish source-supported expansion from a personal association.

**Next lesson:** Names of Qualities — Meaning Expansion & Use as Things.
