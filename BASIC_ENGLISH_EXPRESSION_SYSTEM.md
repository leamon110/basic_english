# Basic English 表达系统：研究与课程设计基线

> 本文是项目研究文档，不是 Ogden 原书，也不代表这些教学功能已经在 App 中实现。
> **当前课程架构说明（2026-11-19）：** 本文第 5 节及其早期课程地图形成于正式课程架构确定之前，其中“模块数和 Lesson 数尚未确定”等表述已被后续决策取代。当前正式架构以 `BASIC_ENGLISH_EXPRESSION_CURRICULUM.md` 为准：**2 Modules / 15 Lessons**；当前实际进度以 `AUDIO_BUILD_PLAN.md` 为准。本文继续作为原作者体系研究基线使用，但其中早期课程划分不再作为现行课程结构。

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

### 3.4 Names of Acts 与 Some Common Needs：两个不同层次

这两个名称容易被混在一起，但它们在《The ABC of Basic English》中不是同一章。

- **Names of Acts（pp.162–186）** 属于 Expansions。原书从 **BE、COME、DO** 等词开始，逐个讨论核心 Operators 的基本用法和特殊意义；项目的 \`BASIC_ENGLISH_OPERATORS.md\` 是这部分的教学索引。
- **Some Common Needs（pp.242–262）** 位于后面的 A Basic Selection，分为 Simple Acts、Complex Acts、Other Suggestions。它给出日常动作和其他常见意思怎样用 Basic 表达的实际例子。

例如，speak 的三个语境——say something to him、give a talk / make a statement、have a knowledge of it——出自 **Some Common Needs，p.244**，不是前面的 Names of Acts 章节。

所以：
- Names of Acts：理解 Operators 本身怎样工作；
- Some Common Needs：把这些基础词和结构用于表达具体的普通英语意思。

两者有关联，但不能把后者的常见动作例子直接当作前者的章节内容。

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

## 5. 课程组织：先区分基础工具、实际表达和补充内容

**这是课程结构初稿，不预设模块数和 Lesson 总数。** 先确定每部分解决什么学习问题，再决定哪些内容值得成为一课。

### 5.1 原书内容与学习任务的对应

| 原书内容 | 实际在讲什么 | 在项目课程中的作用 |
|---|---|---|
| Other Word-Forms | Operators、代词、比较形式及 -er / -ing / -ed 等词形 | 基础规则。已有部分内容在 Teaching 和原版45 Steps 中练习，不在表达课程里重复讲一遍。 |
| Expansions：Names of Things and Qualities | 一个词的意义怎样延伸到相关事物，或在特定语境中收窄 | 作为词义理解专题，帮助学习者判断同一个 Basic 词在不同语境中指什么。 |
| Expansions：Names of Acts | 原书逐个讨论16个核心 Operators 的用法和意义 | 属于表达工具的基础说明；项目已有 Operators 索引和 Teaching 入门单元。 |
| Expansions：Names of Directions | 从空间关系理解方向词及其扩展用法 | 属于表达工具的基础说明；项目已有 Directives 索引和 Teaching 入门单元。具体用法在实际表达练习中继续应用。 |
| Special Uses：250 Fixed Word-Groups（pp.212–242） | 不能只凭单词字面意义推导的固定组合，共250项 | 扩展参考资料；其中有一份另行挑出的50项优先清单，见下一行。 |
| A Basic Selection：Some Common Needs（pp.242–262） | Simple Acts、Complex Acts、Other Suggestions：日常动作及其他常见意思的 Basic 表达 | 表达课程的主要应用材料，围绕“这个意思在当前语境下怎样说成 Basic”组织练习。 |
| A Basic Selection：Words Formed by Endings（pp.262–264） | 原书挑出的实际需要的派生形式 | 作为词形学习的应用补充；结合具体表达使用，不重复讲一遍通用词尾规则。 |
| A Basic Selection：The Most Necessary Fixed Word-Groups（pp.264–269） | 从250项中挑出的50个最难缺少的固定词组 | 优先学习和反复使用的核心固定组合；不是另外50课。 |

这里有一个必须保持的来源区别：原书的 **Names of Acts** 主要讲 Operators；集中展示常见普通英语动作如何改用 Basic 表达的，是后面的 **Some Common Needs**。前者提供工具，后者提供实际应用材料。

另外，原书的 **A Basic Selection** 不等于 Some Common Needs。它有三个部分：Some Common Needs、Words Formed by Endings、The Most Necessary Fixed Word-Groups。课程设计不能漏掉后两部分，也不能把它们误算进250项固定词组的章节结构。

### 5.2 课程主线：从具体意思到实际表达

Some Common Needs 是最直接的应用材料。原作者说明，这些例子来自长期使用经验，目的是解决 Basic 写作者经常遇到的表达问题。课程应当让学习者看懂这些表达为什么成立，而不是背一张普通英语词语替换表。

先用 speak 做入门示范：对人说话、在会议上讲话、会说一种语言，意思不同，Basic 表达也不同。先学会判断意思，再选结构。

随后按原书的三个分组组织材料。下面的小组是项目为了教学而作的意义归类，不是原书额外设立的章节，也不预先等同于 Lesson：

| 原书分组 | 项目内部的自然主题 | 原书例子范围 |
|---|---|---|
| **Simple Acts** | 沟通与信息 | speak、tell、sing、hear、listen、write、read |
| | 饮食与身体动作 | eat、bite、spit、touch、hit、scratch、cut、break |
| | 移动与身体姿势 | throw、catch、hold、bring、lie、stand、sit、run、slip |
| **Complex Acts** | 思考、知识与记忆 | think、know、understand、mean、remember、forget |
| | 感受、喜好、需要与学习 | feel、like、want、need、learn、teach、show、try |
| | 社会活动与生活过程 | buy、sell、promise、find、lose、destroy、hurt、grow、sleep、die、begin、finish |
| **Other Suggestions** | 能力、义务与意愿 | can、ought、shall |
| | 数量与时间 | each、altogether、whole、few、many、too、once、ago、already、yet、since、next、always |
| | 条件、性质与常见名称 | unless、busy、deaf、world、life、hill、home、address |

这张表只负责把原书例子放到容易理解的意义组里。是否把某一组做成一课，要看它内部是否存在一个完整、清楚的学习目标；不能按表格行数直接生成 Lesson 数量。

A Basic Selection 中另外两组材料这样处理：

- **Words Formed by Endings：** 把实际常用的派生形式放到相应表达中学习；只有遇到新的词形问题时才补充解释，不另造一套重复课程。
- **The Most Necessary Fixed Word-Groups：** 以原书列出的50项作为优先清单，放入相关主题练习和复习；不按50项逐个机械开课。


### 5.3 两类补充内容怎样放进主线

**词义扩展（Names of Things and Qualities）**

它解决的是另一个问题：一个 Basic 词为什么能用于不同对象或不同性质。

- 事物名称：从身体部位开始，再看形状、位置、感官、用途或行为上的联系。
- 性质名称：看人的感受、反应和经验怎样形成扩展意义。
- 特定用法：与意义扩展对照，说明它是把意义收窄，而不是扩大。
- -er、-ing、-ed 等词形规则仍归入基础词形学习；在这里遇到时引用，不重复讲整套词形规则。

**固定词组（250 Fixed Word-Groups）**

- 先掌握 A Basic Selection 中的50项最必要固定词组。
- 其余固定词组作为扩展查询资料，遇到时再学习。
- 当前研究文档记录了250项的来源结构和分类；这不等于已经逐条收录全部250项原句。
- 注意：250项内部按10个 Operators × 每组5个例子形成的第一组50项，与 pp.264–269 另列的50项最必要固定词组，是两份不同的清单。

这类内容不需要为了形式而扩成一个庞大的独立模块；应在学习者真正需要时出现。

### 5.4 哪些内容作为基础工具，不再重复造课

当前 Teaching 已有词形规则、16个 Operators、20个 proper Directives、Operator 与 Directive 的组合边界、句子结构，以及 Names of Acts、Expansions、Fixed Word-Groups 和 Meaning → Basic 的入门说明。它们目前是基础讲解和快速参考，不代表所有细节都已经教完。

因此，表达课程应当**调用这些知识来解决具体表达问题**，而不是重新开一组课程再背一遍 Operators、Directives 或词形规则。原版45 Steps 继续作为独立课程保留；目前只有14/45步有本地中文适配，不把其余原版页面说成已经集成。

Meaning → Basic 也不是一个与原书章节并列的独立模块。它是贯穿各个主题的练习方式：判断语境、组织 Basic 表达、检查意思有没有改变。

### 5.5 Lesson 边界：只在学习任务真的变了时拆分

- 几个例子解决的是同一个意思问题、使用同一种判断方法，就放在一起讲和练。
- 同一个普通英语词在不同语境中会换意思，应把这些语境放在一起对比，不要拆成互不相干的替换卡。
- 只有当学习者需要作出新的判断，或需要掌握另一种表达方法时，才考虑另开一课。
- 不按原书页码、例句数量或旧 Lesson 编号决定拆分。
- 同一类表达结构会在不同主题中重复出现（如 Operator + Name、Operator + Name + Directive、Operator + Directive）；在第一个自然出现的主题里讲清楚，后面继续使用，不另造一个抽象的“结构模块”。
- 同一个普通英语词也可能因语境而换成不同结构（如 speak、run、touch）；这类对比应放在一起，让学习者看见意思变化，而不是拆成单词替换卡。



### 5.6 当前五个 App 原型应怎样处理

| 当前原型 | 实际内容与来源 | 后续处理方向 |
|---|---|---|
| Lesson 01：speak | Some Common Needs，p.244 的三个语境 | 保留为课程开端或总示范，不因为它已有 Lesson 01 编号就认定它必须独占一课。 |
| Lesson 02：身体部位扩展 | Names of Things and Qualities 的一个具体子题 | 保留为词义扩展专题的一部分；不能代表整个 Expansions。 |
| Lesson 03：当前标为 Names of Acts | tell、sing、touch、hit、catch、run 等来自 Simple Acts；think、understand、remember、forget 来自 Complex Acts | 不是原书 Names of Acts 章节的教学；应更正标题和来源，并按实际主题重新归类。 |
| Lesson 04：250 Fixed Word-Groups | come to a stop、put up with、keep a government in 等例子 | 前两项也在原书50项最必要固定词组清单中；keep a government in 是250项章节中的说明例子。当前5道题不代表完整250项，也不代表50项优先清单。 |
| Lesson 05：Some Common Needs | can、ought、unless、busy、deaf、home、world，以及 finish | 前七项来自 Other Suggestions；finish 属于 Complex Acts。应把 finish 放回相应主题，不把不同来源类别混在一课里。 |

Meaning → Basic 当前登记的27道练习是练习题库，不是27课，也不需要再另设一个“练习模块”。


### 5.7 当前课程地图（内容分组，不是最终 Lesson 目录）

**入口示范：** speak 的三个语境。它负责让学习者先理解“语境决定意思”，暂时不把它算作一个正式内容课。

**核心表达内容：**
- Simple Acts：沟通与信息；身体动作与物理变化；移动与身体姿势。
- Complex Acts：思考、知识与记忆；感受、喜好与需要；学习、教学与尝试；社会活动及生活过程。
- Other Suggestions：能力与义务；数量与时间；条件、性质和常见名称。

**配套材料：**
- Words Formed by Endings：在需要时配合具体主题学习。
- 50项最必要固定词组：优先进入例句、练习和复习，不按清单编号逐个开课。
- Names of Things and Qualities：作为词义扩展专题，保留身体部位扩展原型，但补齐其他扩展类型后再定内部划分。
- 250项中其余固定词组：作为扩展查询资料。

**基础工具：** Operators、Directives、基本词形和句子结构继续由 Teaching / 原版45 Steps 承担；表达课程在实际例子中调用它们，不重复讲整套基础知识。

前一版五模块、23个 Lesson 的规划，以及 OWF / EXP / SU / CN / MTB 编号和旧的原型映射，均已撤回，不再作为课程依据。

这张地图说明了内容之间的关系，但还不是最终 Lesson 目录。沟通主题正在用作第一个完整教学原型；其他主题还要用同样标准检查。**目前不确定正式课程有多少 Lesson，也不需要现在确定。**


## 6. 表达教学的基本做法

一课只需要把下面这件事教清楚：

1. **先看意思。** 给出真实语境或普通英语句子，判断当前究竟要表达什么。
2. **再看 Basic 怎么说。** 展示一个或多个成立的表达，解释为什么这样组织；如果不同表达有不同条件，就把条件讲清楚。
3. **最后让学习者自己用。** 给一个新语境让学习者构造表达，再让他反向解释 Basic 句子，检查原意有没有丢失。

这不是必须逐项打卡的固定模板。某个主题两步就能讲清楚，就不增加步骤；有必要比较的地方才增加对照。

检查结果仍须分开反馈：
- 词汇是否符合850词及已明确允许的词形／构式；
- 语法是否符合已经实现的规则；
- 原句的关键意思和关系是否保留；
- 是否涉及已核实的固定词组。

当前规则不能判断的内容，明确显示“暂时无法判断”，不自动判错，也不自动放行。


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

1. 用 Communication and Information 作为第一组完整教学原型，验证“同一主题下的表达结构和学习任务”是否自然；当前稿件是候选内容，不预先分配 Lesson 编号。
2. 继续检查 Simple Acts、Complex Acts、Other Suggestions 中其他主题，判断它们是否与这组原型具有相同的教学尺度。
3. 把词义扩展专题、必要词形和50项固定词组放到合适的位置，避免重复讲解。
4. 根据完整内容决定哪些主题应合并、哪些应拆分；再重新整理现有五个 App 原型和27道 Meaning → Basic 练习。
5. 上述内容完成后，才确定模块数、Lesson 数、顺序和编号；再进入 App 的整体整合与测试。


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
