# Basic English 学习体系覆盖审核

> **审核日期：** 2026-11-19  
> **审核目的：** 核对850词基础学习、45 Steps、Module 1、Module 2、Operators / Directives、词形规则及250 Fixed Word-Groups之间的职责和实际覆盖情况。  
> **范围边界：** 本文件是课程覆盖审核，不新增 Module 或 Lesson，不把“逐词索引”设为当前任务，也不代表 App 已完成集成。

## 1. 结论先行

需要把两个问题分开：

1. **850个 Basic 词是否都进入基础词汇学习？**  
   当前数据中有850个唯一词项，也有850条中文释义字段；原版45-Step课程明确以完成850词汇为目标。但当前 App 只有14/45步完成中文本地改编，其余31步仍链接原版网页。每个词的中文释义字段是否准确、是否足以解释根本意义，还没有逐项审核。

2. **是否已经解释了850个词各自所有可能的意义、扩展意义和特殊用法？**  
   **没有。** 当前没有一份逐词列出所有词义和语境的完整词典式资料。但这也不是 Ogden 原书要求的做法：*The ABC of Basic English* p.158 明确指出，相当数量的词既没有 Expansion，也没有 Special Use；有些词只有其中一种；一个词可以有多个 Expansion。原书在该处还限制一个词的 Special Use 数量，以避免混淆。

因此，正确目标不是给850个词强行增加额外释义，而是：
- 学会850词的基础意义和词类；
- 学会原书明确认可的意义扩展及 Special Use；
- 学会把原书列出的普通英语意思转成 Basic English；
- 学会250个固定词组的整体用法；
- 把词汇、词形、语法、意义和固定组合的检查边界分清。

## 2. 850词基础层：数据完整，不等于词义资料完整

### 2.1 当前词表和释义数据

对 `docs/js/data.js` 实际计数：

| 数据数组 | 数量 |
|---|---:|
| Operations | 100 |
| Things — General | 400 |
| Things — Pictured | 200 |
| Qualities — General | 100 |
| Qualities — Opposites | 50 |
| **合计** | **850** |

- 850个词项全部唯一，没有重复。
- `CHINESE_TRANSLATIONS` 有850个键，与850词数组逐项对应，没有缺失键或额外键。
- Word Cards 可浏览全部850词，并显示词项、所属类别、中文释义字段和发音。
- 详情弹窗仍然显示同一条中文释义字段，不是独立的多义词词条。

**审核边界：** 这证明850个词都有数据记录，不证明850条中文释义已经逐项与 Ogden 原书核对，也不证明每条释义包含该词所有扩展义和 Special Use。

### 2.2 45-Step原版课程承担什么任务

项目的 `BASIC_ENGLISH_45_STEP_COURSE_MAP.md` 记录了45个在线课程页面的内容：

- Steps 1–25：词汇与结构教学。
- Steps 26–35：Step 25所说的后续十课，用于完成850词汇。
- Steps 36–41：数字、时间、日历、金钱、重量和度量等实用内容。
- Steps 42–45：日常场景和综合阅读。

Step 25原文明确写道：学习者已经学完Basic English的全部结构；再学十课，就会掌握完整的850词汇。Step 26开始继续列出词汇并通过阅读应用。

这说明45 Steps是850词基础学习的主要课程路线，不应把它误认为15课表达系统，也不应把15课当成45 Steps的替代品。

### 2.3 当前App的45 Steps状态

`docs/js/course.js` 当前明确标记本地中文改编为：

**Step 1、2、3、5、6、9、10、12、13、15、17、18、20、25，共14/45。**

其余31步仍链接原版网页，尚未完成中文本地改编。因此：
- 原版45步课程有完整的在线页面路线；
- 当前App是14个本地中文改编步骤 + 31个原版网页入口；
- 不能把当前App描述为45步中文课程已经全部完成。

项目课程地图也注明：45个在线页面均已打开并取得可读内容，但没有把全部页面逐字与1930年印刷版校勘。因此，在线复本可用于当前课程研究，不能宣称已完成印刷版逐字校勘。

## 3. Module 1：教词义变化的机制，不是850词逐词词典

### 3.1 原书为什么这样分

重新核对 *The ABC of Basic English* 1932年版英文扫描页：

- pp.146–156：Names of Things and Qualities 的 Expansion。
- p.156–158：Special Use与Expansion的区别，以及词义扩展的范围限制。
- p.160：Quality作为Name使用的35个形式、颜色词，以及Expansion / Special Use练习。
- p.162：p.160部分Expansion练习的解释，并开始下一章 Names of Acts。

原书把Expansion与Special Use区分开：
- **Expansion：** 从根本意义延伸到有来源依据的相关意义。
- **Special Use：** 把较宽的意义限制到更具体的对象或语境。

### 3.2 三课当前覆盖情况

| 课程 | 当前内容 | 覆盖判断 |
|---|---|---|
| Module 1 · Lesson 1 — Names of Things | 身体部位、大小/形状/声音、用途/行为、“as if”、原因/过程/用途、部分与整体、材料与物件及其他真实联系 | 主要机制已覆盖；原先缺少p.158范围说明和p.160–162的部分Expansion练习例子。本轮已补入 |
| Module 1 · Lesson 2 — Names of Qualities | bitter/cold/smooth/bright等性质扩展；cheap、simple；原书35个Quality形式及颜色词；dark、first、last、quiet、same的the限制 | 原书列出的35个形式已纳入；不应推广成所有形容词都能作Name |
| Module 1 · Lesson 3 — Special Use | card、chalk、cloth、paper；shoes/boots、watches/clocks；ball、business man、judge、man、pictures；current、engine、rail、ring；curtain的语境提醒 | 原书列出的主要Special Use模式和练习例子已纳入 |

### 3.3 本轮补充的Module 1 · Lesson 1内容

已更新 `BASIC_ENGLISH_EXPRESSION_M1_L1_DRAFT.md`：

- 增加p.158的范围规则：不是每个词都有Expansion或Special Use；一个词可有多个Expansion。
- 加入law和line的多个扩展意义，说明同一个词可能有多个相关用法，必须看语境。
- 加入p.160–162的army、reaction、society、worm、wing五个Expansion练习例子。
- 保留p.162的invention、jump、stage、stiff、deep、horn、net、star，以及humor、wash作为开放分类练习；不伪造原书未给出的自动标准答案。
- 没有新增Lesson，也没有把所有850词强行分配到Expansion类别。

**结论：** Module 1的合理任务是教会学习者识别和理解原书认可的词义变化，不是为850个词各写一篇多义词词条。原书p.158本身就否定了“每个词都必须有额外意义”的假设。

## 4. Module 2：普通英语意思如何用Basic表达

Module 2的方向与Module 1相反：

- Module 1：从一个Basic词出发，理解其相关扩展或较窄用法。
- Module 2：从普通英语的具体意思出发，选择或组合Basic词表达。

当前正式架构为Module 2的12课，均已有第一版教学内容草稿。

项目候选结构记录的源材料覆盖为：
- **91条归一化Simple Acts / Complex Acts核心应用条目**，均有主要课程归属或明确交叉链接。
- **24个Other Suggestions目标词/类别**，均有课程或基础语法归属。
- 91是课程映射采用的核心目标数，不应把研究索引中所有辅助例句、上下文变体和交叉链接都另算成新Lesson。

Other Suggestions的24个目标类别分布为：
- can / ought / shall；
- each / altogether / whole / few / many / too / once；
- ago / already / yet / since / next / always；
- unless；
- busy / deaf；
- world / life / hill / home / address。

**边界：** Module 2不是对850个Basic词逐一补充词义，也不是所有普通英语词的完整翻译器。它处理的是原书列出的常见意思和表达任务。

## 5. 250 Fixed Word-Groups：短语层，不是单词词义层

- 原书250项的结构为50 + 80 + 20 + 100。
- `BASIC_ENGLISH_250_FIXED_WORD_GROUPS_INSTANCE_INDEX.md` 有250条实例记录，逐条记录意义和课程去向。
- 50 Most Necessary groups是250项中的优先子集，不是额外增加的50项。
- 当前250条去向计数如下：

| 去向 | 条数 |
|---|---:|
| C01 | 27 |
| C02 | 6 |
| C03 | 25 |
| C04 | 18 |
| C05 | 30 |
| C06 | 31 |
| C07 | 30 |
| C08 | 21 |
| C09 | 23 |
| C10 | 7 |
| C11 | 17 |
| C12 | 13 |
| C14 | 1 |
| Foundation | 1 |
| **合计** | **250** |

C01–C15是研究用Candidate ID；正式学习时仍使用Module/Lesson编号。

**覆盖判断：** 250项在资料层面全部有记录和去向；这不等于App已经把250项全部做成互动教学。当前App只选取部分固定词组作示例和练习，其余仍是索引及课程分配资料。

## 6. 基础规则层：覆盖结构规则，不等于逐词释义

当前 `docs/js/rule-learning.js` 已集成：

- 13个规则单元；
- 47道规则理解题；
- 名词复数、-er/-ing/-ed、-ly、副词、比较级、un-；
- 16个核心Operators；
- 20个proper Directives；
- Operator与Directive组合；
- Names of Acts；
- Expansion与Special Use基础对比；
- Fixed Word-Groups；
- 句子结构；
- Meaning → Basic的学习方法。

底层数据另有：
- 300个可用于相关派生练习的词根；
- 50个登记的un-前缀性质词。

这些内容承担词形和表达结构基础。它们并没有为850个词分别列出全部语义，也不能把词形合法直接当成当前语境中的意义正确。

## 7. 当前App实际能力与15课文档的区别

| 现有功能 | 已确认的实际范围 | 不能据此声称的能力 |
|---|---|---|
| Word Cards | 850词、850条中文释义字段、分类和真人发音 | 不是每个词的完整多义词词典 |
| 850词检查器 | 检查词项是否在允许词表中，以及程序已实现的词形规则 | 不检查句子语法、语义是否正确 |
| 规则学习 | 13个单元、47题；规则速查和间隔复习 | 不等于每个规则已经对850词逐一讲解 |
| Meaning → Basic | 27个登记题目；测试覆盖40个接受表达、28个已知意义错误、2个视角错误、1个暂不支持边界及标点大小写情况 | 不是任意句子的通用语义解析器 |
| speak原型 | 一个登记的say/says五部分句型检查 | 不等于整个Module 2 Lesson 1已集成 |
| 旧身体部位原型 | 11个词项、10道题；其中8题属C13，另两题分别涉及C14和C15 | 不等于新的Module 1三课 |
| 旧e3/e4/e5原型 | Names of Acts、Fixed Word-Groups、Some Common Needs三个旧原型，共23题 | 不等于Module 2的12课 |
| 新15课文档 | 2 Modules / 15 Lessons的第一版教学草稿全部存在 | 尚未集成到App，也未完成真实学习者测试 |

当前 `app.js` 仍把旧表达原型依次追加到一个页面；尚未实现正式的2 Module / 15 Lesson导航。迁移方案 `BASIC_ENGLISH_EXPRESSION_APP_MIGRATION_PLAN.md` 仍是草稿，尚未进入代码实施阶段。

## 8. 覆盖判断总表

| 知识层 | 资料/课程是否存在 | 当前覆盖状态 |
|---|---|---|
| 850个Basic词项 | 有850个唯一词项 | 数据数量已核对；中文释义准确性尚未逐词审核 |
| 850词根本意义 | Word Cards + 原版45 Steps | 原版课程目标覆盖850词；App本地中文改编仅14/45 |
| 词形和语法基础 | 45 Steps + 13个规则单元 | 核心规则已有；部分原版步骤仍未本地改编 |
| Expansion | Module 1 Lesson 1及研究索引 | 主要机制和代表性源例已覆盖；不是850词逐词词典 |
| Quality Expansion / Quality-as-Thing | Module 1 Lesson 2 | 原书35个形式和颜色词已纳入 |
| Special Use | Module 1 Lesson 3 | 原书列出的主要材料、子类和语境例子已纳入 |
| Ordinary English → Basic | Module 2十二课 | 91条核心应用目标和24个Other Suggestions目标已分配；尚未App集成 |
| Fixed Word-Groups | 250项索引及课程分配 | 250/250有记录和去向；App尚未逐项集成 |
| 任意句子的通用语义判断 | 无 | 当前不支持；仅有有限登记模式 |

## 9. 本轮判断与下一步

### 已确认

1. **当前体系没有完成850个词的全部词义逐项说明。**
2. **原书也没有要求每个词都必须有Expansion或Special Use。** 不应为追求“850个全部覆盖”而虚构词义。
3. 现有2 Modules / 15 Lessons的职责划分有依据，不需要因为这个问题增加Module或Lesson。
4. 850词基础学习、Expansion / Special Use、普通意思转Basic、固定词组和基础规则是互相配合的不同层次。
5. 本轮已把Module 1 Lesson 1中缺少的p.158范围原则及p.160–162源例补入文档，并更新正式课程边界和15课审核表。

### 暂时不做

- 不新建850词的完整词典式查找目录。
- 不要求每个Basic词都必须有扩展义或Special Use。
- 不增加Module或Lesson。
- 不改App代码，不触发Android构建。
- 不把有限Meaning → Basic检查器描述成通用语义检查。

### 已完成：14个现有Step来源忠实度审核

- 已完成全部14个本地改编Step的逐课审核：1、2、3、5、6、9、10、12、13、15、17、18、20、25。
- 详细结论见 `BASIC_ENGLISH_45_STEP_ADAPTATION_AUDIT.md`：Step 2基本符合；其余13步保留了主要主题，但存在已记录的规则遗漏、阅读内容丢失/意思改变和/或练习覆盖缺口。
- 该审核比较了原书教学点、关键例句、阅读忠实度和练习任务覆盖；尚未逐题验证全部答案键，也未完成全部原版插图的归档。
- 没有修改App代码、学习进度、音频或Android构建相关文件，没有触发Android构建。

### 已确定：剩余31个Step的改编顺序

按原版顺序，不重新分组为Module/Lesson：

- 第一批：4、7、8、11、14、16、19、21、22、23、24（补齐Step 1–25结构/阅读序列中的空缺）。
- 第二批：26–35（原书在Step 25说明的十个后续词汇课）。
- 第三批：36–41（数字、时间、日历、金钱、重量和度量等参考内容）。
- 第四批：42–45（日常场景、综合对话、事故叙事和文化阅读）。
- 完整顺序及每一步的内容依据见 `BASIC_ENGLISH_45_STEP_COURSE_MAP.md`。下一步未改编页面为 **Step 4 — At the Station**。

这些批次只是项目工作安排，不是新的课程模块。45 Steps仍是独立的基础课程；2 Modules / 15 Lessons仍是独立的Expression System。

### 下一项工作

进入Expression System的App迁移方案审阅：检查五个旧原型的归属、27个Meaning→Basic检查题的映射、250个固定词组的去向、旧进度键保留方式和离线验收条件。迁移方案获明确批准前，不修改App代码、屏幕编号或用户进度。

## 10. 资料依据

### 原书
- C. K. Ogden, *The ABC of Basic English* (1932), “Expansions: Names of Things and Qualities”, pp.146–162。
- 原书扫描件：<https://upload.wikimedia.org/wikipedia/commons/d/d3/NLC511-023031404015268-27413_%E5%9F%BA%E6%9C%AC%E8%8B%B1%E8%AA%9E%E4%B9%8B%E5%88%9D%E6%AD%A5._%E4%B8%8B.pdf>

### 45-Step在线课程复本
- Step 25：<https://basicenglish.org/step-25/index.html>
- Step 26：<https://basicenglish.org/step-26/index.html>
- 课程索引：<https://basicenglish.org/index_htm.html>

### 仓库内审核资料
- `basic-english-850.md`
- `docs/js/data.js`
- `docs/js/validator.js`
- `docs/js/rule-learning.js`
- `BASIC_ENGLISH_45_STEP_COURSE_MAP.md`
- `BASIC_ENGLISH_45_STEP_ADAPTATION_AUDIT.md`
- `BASIC_ENGLISH_EXPANSIONS_THINGS_QUALITIES.md`
- `BASIC_ENGLISH_NAMES_OF_ACTS.md`
- `BASIC_ENGLISH_250_FIXED_WORD_GROUPS.md`
- `BASIC_ENGLISH_250_FIXED_WORD_GROUPS_INSTANCE_INDEX.md`
- `BASIC_ENGLISH_EXPRESSION_CURRICULUM.md`
- `BASIC_ENGLISH_EXPRESSION_15_LESSON_REVIEW.md`
- 15份Module/Lesson教学草稿
- `BASIC_ENGLISH_EXPRESSION_APP_MIGRATION_PLAN.md`
