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

以下是本项目新增的教学设计，不是 Ogden 原书目录。

建议保留两条互相配合的学习线：

**A. 原版45 Steps：基础课程**

继续使用原作者的词汇、结构、阅读顺序，完成中文教学适配。它负责建立基础词汇、语法、阅读理解和逐步应用能力。

**B. Expression System：表达系统专项课程**

以《The ABC of Basic English》的章节结构为主线：
1. Other Word-Forms：Operators、代词、比较和词形变化；
2. Expansions：Things and Qualities、Acts、Directions；
3. Special Uses：固定词组；
4. Common Needs：Simple Acts、Complex Acts 和其他常见表达；
5. Meaning-to-Basic Practice：把真实意思重新组织为 Basic 表达。

两条学习线互相引用。例如，45 Steps 引入 put / take / in / on 后，Expression System 用这些已学单位解释 insert、remove 等表达；引入 have、make、give 后，再学习相应的动作名词组合。

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

1. 已完成16个 Operators、20个 proper Directives、Operator × Directive 以及 Names of Acts / Common Needs 的首轮原文索引。
2. 下一步制作第一套可实际教学的 Meaning → Basic 表达单元，以 speak 的三种语境为例，训练语境判定、结构拆解、组合理由、独立生成和反向理解。
3. 在教学单元通过内容核验后，再决定如何改造 App 的表达练习；不先批量补写31课。
4. 整理 Things and Qualities 的意义扩展、特定化和词形扩展。
5. 整理250个固定词组与 Common Needs。
6. 建立普通英语 → Basic 的训练题库，并支持多种正确答案。
7. 再决定如何把这些内容放进 App，与45 Steps 逐步衔接。

在规则索引和例句核验之前，不先批量补写31课，也不触发 Android 构建。

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
- 本文档是内容原型，尚未集成进 App，也没有改变原有45 Steps。
