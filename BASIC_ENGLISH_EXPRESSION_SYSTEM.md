# Basic English 表达系统：研究与课程设计基线

> 本文是项目研究文档，不是 Ogden 原书，也不代表这些教学功能已经在 App 中实现。

## 1. 核心结论

Basic English 的表达能力不是“850 个单词各自对应很多同义词”，也不是把所有普通英语动词机械替换成“operator + 方向词”。

它依靠一套组合系统：
1. 受控词汇：选择能参与大量定义和表达的基础词。
2. 有限核心动词：16 个 Operators 承担基本操作。
3. 关系词与方向词：从空间关系扩展到时间、目的、思维和其他关系。
4. 动作重新表达：把复杂动作拆解为基础动作、名词、性质和关系短语。
5. 词义扩展：在上下文中延伸或特定化基础词的意义。
6. 词形变化与固定搭配：利用允许的词形形式，并学习不能单靠字面推导的固定词组。
7. 语法组织：把这些单位组成完整句子。

所以，真正要训练的是：从一个意思出发，自己构造 Basic 表达。

## 2. 原作者资料与证据层级

### 原版45 Steps

BasicEnglish.org 将45 Steps 标为 C. K. Ogden 1930 年的原版课程。课程交替安排 Vocabulary and Structure、Vocabulary and Reading，后段逐渐加入综合阅读、数字、时间、日历、金钱、重量和日常需要。

- [45 Steps 目录](https://basicenglish.org/index_htm.html)
- [Step 1](https://basicenglish.org/step-1/index.html)
- [Step 3](https://basicenglish.org/step-3/index.html)
- [Step 5](https://basicenglish.org/step-5/index.html)
- [Step 7](https://basicenglish.org/step-7/index.html)
- [Step 9](https://basicenglish.org/step-9/index.html)

### Ogden 的《The ABC of Basic English》

《The ABC of Basic English》1932年出版，书目记录列出 C. K. Ogden 和 A. Lloyd James。项目研究核对了该书的英汉对照扫描文本。

- [1932年书目记录](https://ci.nii.ac.jp/ncid/BA85034660?l=en)
- [扫描文本](https://upload.wikimedia.org/wikipedia/commons/d/d3/NLC511-023031404015268-27413_%E5%9F%BA%E6%9C%AC%E8%8B%B1%E8%AA%9E%E4%B9%8B%E5%88%9D%E6%AD%A5._%E4%B8%8B.pdf)

该书的实际章节结构是：

**I. Other Word-Forms**
- Operator-forms
- Comparison
- Endings in -er, -ing, -ed

**II. Expansions**
- Names of Things and Qualities
- Names of Acts
- Names of Directions

**III. Special Uses**
- The 250 Fixed Word-Groups
- A Basic Selection
- Some Common Needs：Simple Acts、Complex Acts、Other Suggestions

这才是理解“850词如何承担更多表达任务”的关键原作者结构。前文六机制图是我的教学归纳，不是原书目录。

### 项目内规则笔记的地位

项目中的 docs/ogden-rules-and-techniques.md 明确注明其内容整理自 zbenglish.net。它是二手整理笔记，可用于查找主题，但不能代替原作者文本；有冲突时，以可核对的原作者文本为准。

### 学术背景

Ian Maun 的论文回顾了 Basic English 的词汇分类、16个核心动词、功能词，以及用可组合的语义单位和迂回表达替代复杂词的思路；论文也记录了对多义词负担和表达范围的批评。因此不能把“850词”夸大成无损替代所有英语表达。

- [Ian Maun, ‘Real Character’: Towards a Lexicon](https://www.sejongjul.org/archive/view_article?pid=jul-16-1-87)

## 3. 原作者系统的组成

### 3.1 850词是基础词汇，不是完整表达规则

词表分为：
- 100 Operations
- 600 Things：400 general nouns + 200 picturable objects
- 150 Qualities：100 adjectives + 50 adjectival opposites

100 Operations 不等于100个普通动词。它包括16个核心 Operators，以及介词、冠词、代词、连词、副词等结构词。

16个核心 Operators：

**be, come, do, get, have, give, go, keep, let, make, put, say, see, seem, send, take**

另有 **may**、**will** 等辅助词。教学时应区分16个核心 Operators 与辅助词，不要混报数量。

### 3.2 Operators：有限的核心动作单位

Operators 不是普通英语动词的一对一同义词，也不是可互换的空壳。每个 Operator 都有自己的基本意义、词形变化和搭配范围。

原版 Step 1 先教 be、put、take，并解释复杂动词 disembark 可拆成 get off the ship。它还明确要求学习者熟悉 Operators 的意义、词形变化和组合方式。

原版 Step 3 再加入 give、get、come、go，并解释：
- come / go 以说话者或参照位置为中心；
- give 后的 to 指向接受者；
- get 后的 from 指向给予者或来源。

所以，学习 Operators 不能只背中文释义，还要理解动作视角和搭配关系。

### 3.3 Directives：从空间关系扩展到抽象关系

原版 Step 1 要求先掌握方向词的简单空间意义，再理解后续的其他用法。

例如：
- put the pot on the table：把物体放到某个位置；
- take the pot off the table：把物体从某个位置取走；
- come into the mind：把“进入”延伸到思想进入头脑；
- come to an end：把“到达某处”延伸到过程到达终点；
- a book about religion：about 从“周围、涉及”扩展为“关于”。

重点是从具体空间图景理解抽象用法，而不是孤立地背每个介词的中文释义。

### 3.4 Names of Acts：复杂动作必须按语境拆解

《The ABC of Basic English》专门用一章讲 Names of Acts，后面又用 Some Common Needs 处理普通英语动作词。

原书把 speak 按不同语境改写：
- 对一个人 speak：say something to him；
- 在会议上 speak：give a talk / make a statement；
- speak a language：have a knowledge of it。

这说明必须先判断 speak 在当前句子中的意思，再选择 Basic 表达。

原书还区分：
- make an attempt / a sign / a statement / a project；
- take care / a look / an interest / pleasure / a part；
- give a talk / an account / directions；
- have knowledge of something。

make 与 take 不是可互换的万能动词。Ogden 对它们的选择有语义解释：make 用于造成、形成某种新事物或结果；take 用于取得、接受、进行某种活动或接触某事。

实际表达涉及多种结构：Operator + Directive、Operator + Noun、Operator + Quality、Operator + Noun + Directive，以及依语境组织的更长短语。它们是教学分析类别，不是宣称原作者列出了这些固定公式。

### 3.5 Expansions：一个词如何承担相关的多个意义

《The ABC of Basic English》指出，词义扩展主要有两种方向：
1. Stretch of sense：把一个词的意义延伸到相关事物；
2. Limiting of sense：把一个词的意义限制到某种特定事物。

原书的意义延伸例子包括：
- letter：字母；由字母组成并寄出的信；
- glass：玻璃材料；由玻璃制成的饮水器皿；
- iron：铁；由铁制成的熨斗；
- body：身体；法律或组织语境中的团体；
- spring / fall：原有动作意义延伸为季节名称。

特定化则是同一个词在特定场景中采用较窄的意义。学习者必须结合上下文判断，不能把某个中文释义套用到所有场景。

### 3.6 Word-Forms：词形变化增加可用表达

《The ABC of Basic English》依次讨论 Operators 和代词的词形、比较级，以及 -er、-ing、-ed。

原书指出，600个 Things 中有300个可按规则使用这些词尾，其中200个是 general、100个是 picturable。原书也提醒，词根与加词尾后的意义关系并非每个词都完全相同，不能机械地对所有词根套用。

### 3.7 250 Fixed Word-Groups：有些组合必须作为固定用法学习

原作者把250个固定词组单独列出，并说明它们有些来自其他词用法的吸引、有些来自省略、有些来自历史形成而不再透明的意象。

原书建议通过阅读 Basic 文本、积累实际用法来熟悉它们。这证明 Basic 不是“知道每个词的字面意思，就能任意组合”的自由生成系统。

### 3.8 Common Needs：为850词表没有直接覆盖的常见动作准备表达

原作者明确指出，要熟练使用 Basic，必须知道如何用850词覆盖那些通常不在850词表中的常见动作和事物。

例如：
- 对一个人说话：say something to him；
- 在会议上讲话：give a talk / make a statement；
- 会说某种语言：have a knowledge of it；
- 阅读文章：read it / go through it with care；
- 吃东西：take food / have a meal。

复杂心理活动也要拆解，例如 think、know、understand、remember、forget 等，原书分别使用 give thought to、be of the opinion、be certain of、have knowledge of、keep in mind、put out of the mind 等表达。

## 4. 当前 App 的实际情况

以下是对当前分支代码的检查，不是未来计划。

### 4.1 原版45 Steps
- 原版目录共45步。
- 当前中文适配14步：1、2、3、5、6、9、10、12、13、15、17、18、20、25。
- 其余31步仍链接到原版课程。

### 4.2 Teaching / Rule Exercises

当前已有8类规则练习：复数、-er、-ing、-ly、un-、Operator + Direction、词序、名词表达动作。

但它们大多是有限题目或直接变形练习，还没有系统训练“分析一个意思，再独立构造 Basic 表达”。

当前 Quick Look-up 中“所有其他动作都用 operator + direction + noun”的概括过度。Operator + Direction 练习也把不同结构混在同一题型中：
- go into：Operator + Direction；
- get ready：Operator + Quality；
- get knowledge of：Operator + Noun + Directive；
- talk about：名词性动作表达 + Directive；
- be like：Operator + Quality。

这些例子必须重新分类，不能用一个标签概括。

### 4.3 Sentence Practice

当前已有10个主题组、100个完整例句、20个单词排序练习和10组日常/工作对话。它们能练习基本句型，但还没有形成“普通英语意思 → Basic 分析 → Basic 表达”的完整闭环。

### 4.4 写作检查的能力边界

课程中的 checkWriting 只检查词汇是否属于项目的 Basic 词汇或规则形式，不判断语法、语义和表达是否自然。因此不能把它当成 Basic 表达正确性检查器。

## 5. 新课程设计：保留原版骨架，补上表达能力训练

以下是本项目新增的教学设计，不是 Ogden 原书的 Lesson 编号。课程以《The ABC of Basic English》的原作者章节结构为骨架，拆成可以独立学习、练习和复习的单元。

原版45 Steps 与 Expression System 是两条互相配合、但不互相替代的学习线：

**A. 原版45 Steps：基础课程**

继续使用原作者的词汇、结构、阅读顺序，完成中文教学适配。它负责建立基础词汇、语法、阅读理解和逐步应用能力。

**B. Expression System：表达系统专项课程**

负责解释850词如何通过词形、意义扩展、固定用法和组合结构表达更多意思，并训练学习者从真实意思构造 Basic 表达。

### 5.1 最终课程规模

| 模块 | 模块名称 | Lesson 数量 | Lesson 编号 |
|---|---|---:|---|
| 1 | Other Word-Forms（其他词形） | 4 | OWF-01～OWF-04 |
| 2 | Expansions（意义扩展） | 8 | EXP-01～EXP-08 |
| 3 | Special Uses（特殊用法／固定词组） | 4 | SU-01～SU-04 |
| 4 | Common Needs（常见表达需要） | 3 | CN-01～CN-03 |
| 5 | Meaning-to-Basic Practice（从意思构造 Basic） | 4 | MTB-01～MTB-04 |
| **合计** | **5 个模块** | **23** | **OWF / EXP / SU / CN / MB** |

**最终规划：5 个模块，共 23 个 Lesson。** 这是本项目根据原作者章节内容作出的教学拆分，不是声称 Ogden 原书本身规定了23课。

### 5.2 每个模块的 Lesson 目录

#### 模块 1 — Other Word-Forms（4 Lessons）

原作者结构：Operator-forms、Comparison、Endings in -er、-ing、-ed。项目研究基线还把代词词形列入这一教学范围。

1. **OWF-01｜Operators 的词形变化**：16个核心 Operators 的常见词形，以及它们在句子中的作用；区分核心 Operators 与 may、will 等辅助词。
2. **OWF-02｜代词的词形与句中关系**：学习原作者列出的代词形式及其在句子中的关系，避免只背孤立词形。
3. **OWF-03｜性质比较与比较形式**：比较性质的程度，理解比较形式及其句中使用。
4. **OWF-04｜-er、-ing、-ed 词尾**：学习这些词尾在不同词类中的作用、词根限制和具体意义；不把词尾当成可以机械套用的万能公式。

#### 模块 2 — Expansions（8 Lessons）

原作者结构：Names of Things and Qualities、Names of Acts、Names of Directions。

1. **EXP-01｜Names of Things：身体部位名称向事物部位扩展**：head、foot、leg、mouth、neck 等名称如何依据形状、位置、结构或作用用于其他事物。
2. **EXP-02｜Names of Things：感官、用途与行为相似**：从感官性质、用途／行为相似，以及 “as if” 比较理解事物名称的扩展。
3. **EXP-03｜Names of Qualities：性质名称的意义扩展**：理解由人的反应、感受和常伴随性质形成的扩展；并学习原书列出的部分 Qualities 如何作为 Names of Things 使用。
4. **EXP-04｜意义扩展与意义收窄**：区分 stretch of sense 与 limiting of sense；判断一个词是延伸到相关对象，还是在特定语境中收窄到某类对象。此处的 narrower special use 不与模块3的固定词组混为一谈。
5. **EXP-05｜Names of Acts：简单动作的结构**：把普通英语动作拆解为 Operator、Name、Quality 和关系成分，理解不同表达模式。
6. **EXP-06｜Names of Acts：复杂动作与抽象活动**：处理思考、判断、知道、记忆、感觉、学习及社会活动等；按具体语境选择 Basic 表达，不建立一对一替换表。
7. **EXP-07｜Names of Directions：空间根义**：学习20个 proper Directives 的空间关系，并说明 out 的方向性副词边界；区分 for、of、till 等非方向性介词。
8. **EXP-08｜Names of Directions：抽象扩展与组合**：从空间关系理解时间、目的、原因、思想、控制等扩展；用有原文依据的 Operator × Directive 实例训练，不能把16×20的所有词对当作有效搭配。

#### 模块 3 — Special Uses（4 Lessons）

原作者的 The 250 Fixed Word-Groups，共250项。课程按原书数量结构拆分，学习重点是识别固定组合及其语境，不是把250项当作孤立词卡死记。

1. **SU-01｜50个 Operator 固定用法**：10个 Operators，每组5个例子；理解固定组合与普通字面组合的区别。
2. **SU-02｜80个关系词固定用法**：8组关系词，每组10个例子；保留 for、of 在本节固定词组清单中的位置，不因此把它们误列为20个 proper Directives。
3. **SU-03｜20个其他 Operations / Directions 特殊用法**：10个词项，每项2种特殊用法；重点训练语境识别。
4. **SU-04｜其他 Basic 词类的100个特殊用法**：覆盖 General Names、Picturable Things、Qualities、Opposites 等类别，并保留原书分类数量。

#### 模块 4 — Common Needs（3 Lessons）

按原作者 Some Common Needs 的三个部分组织。它与模块2的区别是：模块2解释表达结构如何形成；本模块整理原作者为常见意思提供的具体 Basic 表达和使用场景。

1. **CN-01｜Simple Acts**：常见身体动作和日常行为的 Basic 表达。
2. **CN-02｜Complex Acts**：常见心理、认知、感觉、意愿等复杂活动的 Basic 表达。
3. **CN-03｜Other Suggestions**：原作者列出的其他常见表达需要；按原文场景学习，不把它们硬塞进单一语法公式。

#### 模块 5 — Meaning-to-Basic Practice（4 Lessons）

这是项目新增的综合训练模块，不是《The ABC of Basic English》的独立原书章节。它把前四个模块学到的内容用于实际表达。

1. **MTB-01｜先判断语境和真实意思**：同一个普通英语词在不同句子中可能表达不同意思；以 speak 的三种语境作为示范。
2. **MTB-02｜拆解意思中的角色与关系**：识别行为者、动作、对象、接收者、来源、目标位置、材料、结果和观察视角等。
3. **MTB-03｜选择 Basic 单位并构造表达**：选择合适的 Operator、Name、Quality、Directive 或固定词组；允许多个语义正确的 Basic 表达，并说明选择理由。
4. **MTB-04｜反向理解、比较与独立迁移**：从 Basic 句子恢复原意，比较不同表达的语义差异，诊断方向／角色错误，并独立处理新语境。

### 5.3 目前 App 内容与最终目录的对应关系

当前 App 中显示的 Lesson 01～05 是开发过程中形成的编号，不等于最终23课目录的顺序。为避免把已有原型误认为完整课程，按内容映射如下：

| 当前 App 内容 | 最终目录归属 | 当前实际完成范围 |
|---|---|---|
| Lesson 01：speak 的三种语境 | MTB-01 | 已集成；已包含语境判断、构造表达、反向理解及分阶段检查。原作者例子来自 Some Common Needs。 |
| Lesson 02：身体部位名称扩展 | EXP-01 | 已集成；11个词条、10道选择题和一个不自动评分的自由说明练习。 |
| Lesson 03：Names of Acts | EXP-05、EXP-06 | 已集成一个跨简单／复杂动作的入门单元；最终仍需拆成两个完整教学单元。 |
| Lesson 04：250 Fixed Word-Groups | SU-01～SU-04 | 已集成总览和5道练习；不代表250项都已逐项教学或掌握。 |
| Lesson 05：Some Common Needs | CN-01～CN-03 | 已集成总览和8道练习；不代表原作者三个部分已经全部展开。 |
| Meaning → Basic 题库（27个登记任务） | MTB-01～MTB-04 的共享练习资源 | 已有跨主题题目；它是题库，不另算一个 Lesson，也不代表四个训练阶段全部完成。 |

**当前完成度说明：**

- 已有可用内容：MTB-01 的 speak 案例、EXP-01、EXP-05/06 的入门内容、SU 总览、CN 总览，以及跨主题 Meaning → Basic 题库。
- 尚未形成独立完整课程的重点：模块1的4课；模块2其余 Things / Qualities、Directions 课程及 Names of Acts 的完整拆分；模块3的250项分组教学；模块4三个部分的完整展开；模块5的 MTB-02～MTB-04。
- Teaching 中已有的13个规则单元、47道练习和 Quick Reference 是另一套规则学习工具，不因此自动计入上述23个 Expression System Lessons。

### 5.4 课程之间的衔接原则

- 原版45 Steps 负责先教基础词汇和结构；Expression System 在学习者具备相应基础后引用这些内容，不另造一套冲突的词汇规则。
- 模块1解决词形；模块2解释意义如何扩展、动作和关系如何拆解；模块3处理不能单靠字面推导的固定用法；模块4提供原作者整理的常见表达实例；模块5训练把前面学到的知识用于新意思。
- 模块2教“表达结构为什么成立”；模块4教“原作者为常见需要提供了哪些具体表达”。两者可以引用同一例句，但练习目标不同，不重复做同一道题。
- 23课是课程目录规模，不等于每课只允许一个例句或固定题数。每课均需有解释、对照、练习、反馈和复习材料。


## 6. 每个表达教学单元必须采用的结构

1. 表达目标：给出真实想表达的意思或普通英语句子。
2. 语境判定：确认普通英语词在当前句子中的具体含义。
3. 拆解：指出动作、事物、性质和关系。
4. Basic 选择：说明选用了哪些基础词、Operator、Directive 或名词。
5. 组合理由：解释为什么用 make 而不是 take，为什么用 come 而不是 go。
6. 完整句子：展示符合 Basic 词汇和语法的表达。
7. 对照与边界：给出容易混淆的另一种表达，说明何时不适用。
8. 独立生成：让学习者自己表达新的句子。
9. 理解回测：让学习者解释 Basic 句子的实际意思，检查是否保留原意。

一个普通英语句子可能存在多个 Basic 表达；评分不能只接受唯一字符串答案。应分别检查词汇合规、语法、语义是否保留以及表达是否符合语境。

## 7. 第一个教学示范：speak 为什么不能只对应一个替换词

原作者按语境区分 speak：
- 对一个人 speak：say something to him；
- 在会议上 speak：give a talk / make a statement；
- speak a language：have a knowledge of it。

关键是先判断 speak 在当前句子中的意义，再选择 Basic 结构。

如果只记住 speak = say，就无法正确处理“在会议上讲话”或“会说一种语言”。

这正是本项目需要反复训练的核心能力。

## 8. Operators 首轮索引已建立

- 详细索引：\`BASIC_ENGLISH_OPERATORS.md\`。
- 已逐项整理16个核心 Operators 的起始意义图景、Ogden 原书代表例子和教学边界。
- 已将当前 App 的14个 Operator + Direction 练习映射重新分类，确认其中混有 Operator + Quality、Operator + Noun + Directive、名词性动作表达等不同结构。
- 本索引是第一轮教学索引，不是完整词典；特殊用法和搭配仍需继续从原书核对。

## 9. Directives 首轮索引已建立

- 详细索引：\`BASIC_ENGLISH_DIRECTIVES.md\`。
- 已整理《The ABC of Basic English》Names of Directions 的21个章节词条。
- 已核对 Ogden 的20个 proper Directives 与图示中的方向性副词 out；for / of / till 则属于非方向性介词。
- 已特别整理 among / between、before / after、to / for / from / by、in / on / out / off、up / down / over / through 等对比。

## 10. Operator × Directive 首轮交叉索引已建立

- 详细索引：\`BASIC_ENGLISH_OPERATOR_DIRECTION_MAP.md\`。
- 已核对 Ogden 1937 年 Directional Thinking 的 go / get / come 示范，并整理出原文中的方向组合。
- 已从1930/1932原作者文本补充 Operator × Directive 例句及词条交叉参照。
- 已将当前 App 的14道练习重新分类，指出其中并非全部属于 Operator + Directive。
- 该索引是首轮源文核验，不是穷尽16 × 20的所有组合；不把未核验词对自动认定为有效表达。

## 11. Names of Acts / Common Needs 首轮索引已建立

- 详细索引：\`BASIC_ENGLISH_NAMES_OF_ACTS.md\`。
- 已依据《The ABC of Basic English》pp.244–262 整理 Simple Acts、Complex Acts、Other Suggestions。
- 已覆盖原书的口语/阅读/写作、饮食、触碰与身体动作、移动、心理活动、学习、社会经济行为、成长与生命过程等示例。
- 已把例句按 Operator + Directive、Operator + Name、Operator + Name + Directive、Operator + Quality、Operator + Clause、Name of Act + Directive 和固定词组等结构归类。
- 这些结构分类是本项目的教学归纳；原作者原文例句仍是判定依据。

## 12. 下一阶段执行顺序

完整课程目录现已确定为5个模块、23个 Lesson。后续按目录补齐内容，不再临时新增没有归属的 Lesson：

1. 先完成模块1 Other Word-Forms 的原文核验和4课内容设计；这是目前缺少独立 Expression System 课程的模块。
2. 完成模块2剩余的 Things / Qualities、Names of Acts 拆分和 Names of Directions 两课；已有 Lesson 02、Lesson 03 作为原型，按最终目录整理，不重复另起编号。
3. 将250 Fixed Word-Groups 按原书50 + 80 + 20 + 100的结构整理为模块3四课；选取有教学价值的代表例句和练习，明确覆盖范围，不把总览课冒充250项全部教学。
4. 将 Some Common Needs 的 Simple Acts、Complex Acts、Other Suggestions 完整整理为模块4三课；与模块2的结构讲解区分。
5. 将现有 speak 案例和27个 Meaning → Basic 登记任务纳入模块5，补齐 MB-02～MB-04 的角色拆解、表达构造、反向理解和独立迁移。
6. 完成内容核验、题目答案及多答案规则的内部测试后，再一次性整合 App、执行回归测试、构建和检查最终 APK；遵守 AUDIO_BUILD_PLAN.md 的单次综合设备验收规则，不为每个小单元单独要求用户安装测试。

在每课的原文依据、例句来源、教学新增内容和评分边界尚未核验前，不将研究笔记直接冒充成已经完成的课程。
## 13. 当前状态

- 已核对：原版45 Steps目录、Step 1、3、5、7、9，以及《The ABC of Basic English》中 Other Word-Forms、Expansions、Names of Acts、Names of Directions、250 Fixed Word-Groups、Some Common Needs 的相关文本。
- 当前 App：14/45课已中文适配；Teaching 有8类规则练习；Sentence Practice 有100例句、20排序题和10组对话。
- 已确认问题：当前“operator + direction + noun”概括过度，表达练习尚未形成意思分析和独立生成闭环。
- 本文是研究与设计基线；尚未修改 App 代码，也尚未生成新的课程 APK。


## 12. 首个表达系统教学单元已完成

- 教学原型：`BASIC_ENGLISH_EXPRESSION_LESSON_01.md`。
- 主题：同一个普通英语动词 speak 在三个语境中的不同含义。
- 原作者例子：say something to him；give a talk / make a statement；have a knowledge of it。
- 新增教学步骤：语境识别 → 结构拆解 → 组合理由 → 独立生成 → 反向理解。
- 内容原型已集成到独立的 Expression System 页面；尚未完成用户 Android 设备上的安装与交互验收。原有45 Steps保持不变。


### 词表与课程构式的边界

850个基础词条与 App 当前允许的课程构式不是同一张清单。validator.js 明确允许原书课程中教授的若干构式，例如 something、someone、nothing、into、away。教学时应标明它们是课程构式，而不是把它们冒充为850个基础词条之一。


## Verified App distinction and handoff (2026-11-17)

- The original 45 Steps does include expressive practice. Step 1 asks learners to write four Basic sentences describing a picture using between, by, in and on. Step 42, “Basic for everyday needs”, contains five practical dialogues and asks learners to give an account in Basic of a person's railway-journey experience.
- Current App implementation is narrower: `docs/js/course.js` locally adapts only 14/45 steps (1, 2, 3, 5, 6, 9, 10, 12, 13, 15, 17, 18, 20, 25). The remaining 31, including Step 42, open the original BasicEnglish.org pages. The adapted steps have sentence-writing prompts, but not a complete meaning-analysis-to-Basic-re-expression training loop.
- The separate Expression System track is our supplementary curriculum design based primarily on *The ABC of Basic English*. It is not an original Ogden course title and does not replace the original 45 Steps.
- Lesson 01 is integrated into the App, but Run 36 device acceptance remains pending. Its current writing checker validates vocabulary/allowed forms only, not grammar or semantic correctness.


## 14. Things and Qualities 扩展研究首轮完成（2026-11-18）

- 新增研究索引：`BASIC_ENGLISH_EXPANSIONS_THINGS_QUALITIES.md`。
- 新增课程原型：`BASIC_ENGLISH_EXPRESSION_LESSON_02.md`，主题为身体部位名称如何扩展到其他事物部位。
- 主要依据：Ogden, `The ABC of Basic English`, “Expansions: Names of Things and Qualities”, pp.146–161；直接核对了 pp.146、148、150、152、156、158、160 的英文原文图像。
- 已整理：身体部位类比、感官性质相似、用途／行为相似、“as if”抽象比较、性质词基于人的反应和经验倾向的扩展、较窄的 special use、-er/-ing/-ed 派生形式、性质词作为事物名称。
- 术语边界：Expansion 是意义延伸；p.156 的 special use 是意义收窄；派生词可能继续形成扩展或特定用法。后期 Ogden 资料中的习语式 special uses 与本章的 narrower special use 不混为一谈。
- 原始扫描 p.154 的页面图像请求连续超时；本文没有把未读到的 p.154 内容写成已核实事实。二手资料仅作交叉提示，不代替原书。
- Lesson 02 是内容原型，不是 Ogden 原书课程编号；尚未集成 App，也没有为它编写自动检查器。
- 下一步：整理原书 250 Fixed Word-Groups 的来源和分类，并与已有 Names of Acts / Common Needs 索引区分；之后再建立跨单元 Meaning → Basic 题库。


## 15. 250 Fixed Word-Groups 首轮结构索引完成（2026-11-18）

- 新增索引：`BASIC_ENGLISH_250_FIXED_WORD_GROUPS.md`。
- 已直接核对《The ABC of Basic English》英文原文 pp.212、214、216、218、220、222、224、226、228、230、232、234、236、238、240、242，覆盖该节全部英文正文页。
- 原书在 p.214 给出的计数结构已核对：10 个 Operators × 5 例 = 50；8 个关系词 × 10 例 = 80；另外 10 个 Operations / Directions 词项各有 2 种特殊用法 = 20；Basic 词表其他类别的特殊用法 = 100；总计 250。
- p.212 把固定词组与意义扩展区分开，并提出三种形成原因：用法吸引、省略、历史意象。
- 100 项的原书类别分布：Operations 13、General Names 51、Picturable Things 18、Names of Qualities 15、Opposites 3。
- 已明确 for / of 虽不属于20个 proper Directives，仍被原作者纳入 Fixed Word-Groups 的8组关系词之一；词项分类与固定搭配收录是两个问题。
- 已明确 250 Fixed Word-Groups 与后续 Some Common Needs 不同；后者已有 `BASIC_ENGLISH_NAMES_OF_ACTS.md` 首轮索引。
- 新文档保留数量、分组、页码和教学边界，不逐字复制原书250条例句；尚未修改 App 代码或触发 Android 构建。
- 下一步：建立跨主题 Meaning → Basic 训练题库，支持多种语义正确的 Basic 表达，并将词汇、语法、语义保留和固定词组识别分开评价。


## 16. Meaning → Basic 多答案练习第一组接入 App（2026-11-18）

- 新增本地模块：docs/js/meaning-basic.js；新增样式：docs/css/meaning-basic.css。
- 在表达系统页面追加第一组 Meaning → Basic 练习，包含 MB-01 至 MB-06 六道题。
- 已登记多答案模式：放入（in / into）、取出（from / out of）、给予（to 结构／双宾语结构）、材料与结果（from / into）；come / go 题额外依据观察视角选择答案。
- 检查顺序：现有词汇验证器 → 本题有限句型识别 → 语义角色／方向／材料／观察视角检查。编辑答案或切换题目会清除后续结果并锁定后续按钮。
- 对未登记的句型显示“暂时无法判断”，不把它直接判为语法错误；该功能不是通用英语语法解析器或通用语义理解器。
- 模块使用本地 JavaScript 和现有词汇验证器，不调用远程 API；Android APK 打包后可离线运行。
- 本次同时更新 Service Worker 缓存至 v35，并把新 JS/CSS 加入离线资源列表。
- 当前仅完成代码接入；仍需规则测试、Android 构建、APK 内容检查和手机设备测试。不能提前标记为已验收。


## 17. Meaning → Basic 多答案练习第一组构建完成（2026-11-18）

- Run 42 / ID 44188628473，代码提交 53be103a9ee39f5f42f1186f50f50d7789e27f37，全部22个步骤成功。
- 新增模块 meaning-basic.js 与样式 meaning-basic.css 已打包进 APK；Service Worker 为 v35。
- 六题的多答案规则通过自动化测试：11种正确模式、10种已知语义错误、2种 come/go 视角不匹配、1种未支持边界和1种大小写／标点情况。
- APK 已从官方 Artifact ZIP 提取并独立验证：9,833,411 bytes；SHA-256 9ac0df5f57264e34ed14ea3c70bf2c3ce3e4d1051113928245b247a0fb386b96；850个录音与 ALL_850 精确匹配，FFmpeg 全量解码通过。
- 当前状态：构建与文件检查通过；用户手机安装和六题交互验收尚未完成。不得提前标记为设备验收通过。


## 18. Delivery rhythm reset and current implementation audit (2026-11-18)

The user asked to stop the pattern of implementing a small beginning of one feature, switching to another, and repeatedly handing off partial APKs. The agreed delivery approach is now one integrated Teaching + Expression System milestone, with internal testing throughout and one combined Android/device acceptance round at the end.

Live code audit:
- Teaching Rule Exercises currently has eight fixed exercise types. Several only append one suffix, the plural generator currently produces only simple `+s` items, and the Operator + Direction group mixes different structures such as Operator + Directive, Operator + Quality, Operator + Name + Directive and act-name phrases. Most grading uses exact single-string matching.
- Spaced Repetition currently reviews words only: localStorage progress, 50-word sessions and 1/2/4/7/15/30-day levels. It does not schedule rule exercises. The UI does not explain the schedule, and mastered level-6 words are no longer selected as due.
- Quick Reference is a static 11-topic list. Its “all other actions use operator + direction + noun” rule is too broad and conflicts with the source-grounded structural distinctions established in this project.
- Lesson 01 and the word-by-word vocabulary classification are already device-accepted. Lesson 02 is still a document prototype. Meaning → Basic has six registered exercises built in Run 42, but device acceptance is pending and will be deferred to the integrated release.
- Existing baseline remains: 14/45 original course steps are locally adapted; the other 31 still link to the original pages. Sentence Practice remains 100 sentences, 20 word-order exercises and 10 dialogues. No claim is made that these are newly completed or that all 45 steps have been adapted.

Run 42 is the latest built APK (run 44188628473, code commit 53be103a9ee39f5f42f1186f50f50d7789e27f37). The live branch head is documentation-only ahead of that build; no app code has changed after Run 42. All 22 workflow steps succeeded, 850/850 audio files were restored from cache, and the APK and coverage artifacts were uploaded. The Run 42 phone test remains pending.

**New handoff rule:** do not ask the user to test each partial Teaching or Expression System increment. Finish the integrated work, run internal rule and regression tests, create one final APK, verify its contents, then request one combined phone test and explain the whole learning workflow together.


## 19. Teaching rule-learning implementation (2026-11-18)

The Teaching screen now has a structured rule-learning implementation in code:
- 13 rule units, grouped into word forms, expression structures, meaning interpretation and sentence organization.
- 47 practice questions, including multi-select questions and answer explanations.
- A searchable Quick Reference generated from the same rule-unit content, so lesson explanations and lookup entries no longer contradict one another.
- A separate Rule Review deck, with local progress and the 1/2/4/7/15/30-day schedule. Existing Word Review records and 50-word sessions are preserved; the interface now explains how to use them.
- Fixed the validator's -ly spelling reconstruction for simple → simply and true → truly.

Run 46 (44195097971) built commit \`19c624d7a37811fc514d9fbb875ca45909ec6d2e\` successfully. All 18 workflow steps succeeded; the new rule tests passed (13 units, 47 questions, 16 Operators, 20 Directives, Basic phrase validation and interval scheduling). All 850 audio files were restored from cache with zero downloads and zero errors. The APK and audio-coverage artifacts were uploaded.

The CI APK is not yet extracted and verified for user handoff, and the user has not accepted this intermediate Teaching build on a device. The agreed process remains one final combined device test after Expression Lesson 02 and the expanded Meaning → Basic bank are integrated.


## 20. Expression Lesson 02 and Meaning → Basic expansion (Run 47)

- Lesson 02 is now integrated into the Expression System page with 11 source-indexed body-part terms, 10 interactive questions and a free-response explanation exercise. The free response is not automatically scored.
- Meaning → Basic has 18 finite tasks and 29 accepted answer patterns, based on the project's Names of Acts / Common Needs index.
- Run 47 (44196442702) built successfully. All 18 workflow steps passed. Meaning → Basic, Teaching and Lesson 02 automated tests passed. All 850 recordings were restored from cache with zero errors.
- The APK artifact ZIP and audio-coverage artifact were uploaded. No user-device acceptance has been requested or recorded; the intermediate artifact is not the final handoff.
- Remaining Expression System work: integrate the researched Names of Acts, Fixed Word-Groups and Common Needs into a coherent learning sequence before the consolidated final device test.
