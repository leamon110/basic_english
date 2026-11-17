// Structured Teaching: source-grounded rules, rule review and searchable lookup.
(function () {
  const DAY = 86400000, INTERVALS = [1,2,4,7,15,30], MAX_LEVEL = 6;
  const PROGRESS_KEY = 'BE_RULE_TRAINING_V1', REVIEW_KEY = 'BE_RULE_REVIEW_V1', SESSION_KEY = 'BE_RULE_SESSION_V1';
  const OPERATORS = ['be','come','do','get','have','give','go','keep','let','make','put','say','see','seem','send','take'];
  const DIRECTIVES = ['at','with','from','against','to','across','after','among','before','about','through','down','between','up','under','on','over','off','by','in'];
  const Q = (id,prompt,options,answers,explanation,multiple) => ({id,prompt,options,answers,explanation,multiple:!!multiple});
  const U = (id,group,title,summary,sections,examples,caution,source,basicExamples,questions) =>
    ({id,group,title,summary,sections,examples,caution,source,basicExamples,questions});
  const UNITS = [
    U('plural','词形变化','名词复数','先看词尾，再核对不规则形式。',
      [['规则形式','多数可规则变化的名词加 -s；以 s、x、sh、ch 等结尾的词常加 -es。辅音字母 + y 通常改为 -ies；元音字母 + y 通常直接加 -s。'],
       ['不规则形式','foot → feet、tooth → teeth、man → men、woman → women、knife → knives、leaf → leaves、child → children。sheep 等词单复数同形。'],
       ['适用边界','不能把所有 -o 或 -f 结尾的词都套用同一个规则；具体词项要看登记形式。']],
      ['book → books','box → boxes','fly → flies','day → days','knife → knives','sheep → sheep'],
      '词尾规则不能代替不规则词表。','项目数据 docs/js/data.js：IRREGULAR_PLURALS；Ogden 的 Other Word-Forms。',
      ['books','boxes','flies','days','knives','sheep'],[
        Q('pl1','box 的复数形式是什么？',[['boxs','boxs'],['boxes','boxes'],['boxies','boxies']],['boxes'],'box 以 x 结尾，使用 -es。'),
        Q('pl2','fly 的复数形式是什么？',[['flys','flys'],['flies','flies'],['flyes','flyes']],['flies'],'辅音字母 + y 通常改 y 为 -ies。'),
        Q('pl3','day 的复数形式是什么？',[['daies','daies'],['days','days'],['dayes','dayes']],['days'],'元音字母 + y 通常直接加 -s。'),
        Q('pl4','下面哪一项是不规则复数？',[['knifes','knifes'],['knives','knives'],['knifees','knifees']],['knives'],'knife → knives 是登记的不规则形式。'),
        Q('pl5','sheep 的复数形式是什么？',[['sheeps','sheeps'],['sheep','sheep'],['sheepen','sheepen']],['sheep'],'sheep 在这里单复数同形。')
      ]),
    U('derivatives','词形变化','-er、-ing、-ed 派生','词尾的意义取决于词根类别，不是三个万能公式。',
      [['可派生词项','项目数据登记了 300 个可用于相关派生练习的词根；不能把词尾机械加到所有名词上。'],
       ['意义并不固定','-er 可指做事的人，也可指引起某种结果的事物或装置；-ing 可表示动作或原因性质；-ed 可描述受到影响的事物或结果状态。'],
       ['例子','design → designer / designing / designed；oil → oiler / oiling / oiled。要结合词根和句子解释具体意思。']],
      ['design → designer / designing / designed','oil → oiler / oiling / oiled'],
      '词形合法不等于当前句子中的词义正确。','docs/js/data.js：NOUNS_WITH_DERIVATIVES；BASIC_ENGLISH_EXPANSIONS_THINGS_QUALITIES.md；Ogden, The ABC, Other Word-Forms。',
      ['designer','designing','designed','oiler','oiling','oiled'],[
        Q('der1','从 design 派生，下面哪些形式属于本课列出的形式？（选三项）',[['designer','designer'],['designly','designly'],['designing','designing'],['designed','designed']],['designer','designing','designed'],'项目登记了 design 的 -er、-ing、-ed 派生形式；designly 不在其中。',true),
        Q('der2','-er 是否永远表示“做这个动作的人”？',[['yes','是，所有词都如此'],['no','不是，意义取决于词根类别和用法']],['no'],'oil 的派生形式也涉及动作、执行者或装置，不能把 -er 固定解释为“人”。'),
        Q('der3','原书用 oil 展示的派生形式有哪些？（选三项）',[['oiler','oiler'],['oiling','oiling'],['oiled','oiled'],['oilying','oilying']],['oiler','oiling','oiled'],'oil → oiler / oiling / oiled。',true)
      ]),
    U('adverbs','词形变化','性质词与 -ly 副词','部分性质词可形成 -ly 副词；拼写变化和不规则形式要单独注意。',
      [['常见形式','quick → quickly、wise → wisely、beautiful → beautifully。'],
       ['拼写变化','happy → happily；simple → simply。拼写变化要看词尾。'],
       ['不规则形式','good 的常见副词形式是 well，不是 goodly。']],
      ['quick → quickly','happy → happily','simple → simply','good → well'],
      '不要把 -ly 当成无条件适用的拼接规则。','项目规则整理与 docs/js/validator.js；Ogden 的 Other Word-Forms。自动接受范围以当前 validator.js 为准。',
      ['quickly','happily','simply','truly','well'],[
        Q('adv1','quick 的副词形式是什么？',[['quickly','quickly'],['quickily','quickily'],['quickful','quickful']],['quickly'],'quick → quickly，直接加 -ly。'),
        Q('adv2','happy 的副词形式是什么？',[['happyly','happyly'],['happily','happily'],['happyle','happyle']],['happily'],'happy 以辅音字母 + y 结尾，改为 -ily。'),
        Q('adv3','good 的常见副词形式是什么？',[['goodly','goodly'],['well','well'],['gooder','gooder']],['well'],'good → well 是不规则对应。')
      ]),
    U('comparison','词形变化','比较级与最高级','比较形式既有 -er / -est，也有 more / most 和不规则变化。',
      [['规则形式','部分较短的性质词可使用 -er / -est；辅音字母 + y 常改为 -ier / -iest；以 e 结尾的词通常只加 -r / -st。'],
       ['more / most','较长或不适合词尾变化的性质词可用 more / most，不能把所有性质词都强行加 -er。'],
       ['不规则形式','good → better → best；bad → worse → worst；much → more → most；little → less → least。']],
      ['tall → taller → tallest','happy → happier → happiest','good → better → best','more beautiful → most beautiful'],
      '比较级和最高级的形式取决于具体性质词。','docs/js/data.js：COMPARATIVE_EXCEPTIONS；Ogden, The ABC, Other Word-Forms。',
      ['taller','tallest','happier','happiest','better','best','more beautiful','most beautiful'],[
        Q('cmp1','tall 的比较级和最高级是什么？（选两项）',[['taller','taller'],['tallest','tallest'],['more tall','more tall'],['tallier','tallier']],['taller','tallest'],'tall → taller → tallest。',true),
        Q('cmp2','good 的比较级和最高级是什么？（选两项）',[['gooder','gooder'],['better','better'],['best','best'],['goodest','goodest']],['better','best'],'good 的不规则变化是 better / best。',true),
        Q('cmp3','happy 的比较级和最高级是什么？（选两项）',[['happier','happier'],['happiest','happiest'],['happyer','happyer'],['happyest','happyest']],['happier','happiest'],'happy → happier → happiest。',true)
      ]),
    U('un-prefix','词形变化','un- 否定前缀','只有明确登记的一组性质词适用于本项目的 un- 规则。',
      [['登记词项','项目数据登记了 50 个可使用 un- 的性质词；练习应依据名单，不任意扩大。'],
       ['例子','happy → unhappy；safe → unsafe；able → unable。'],
       ['边界','普通英语中存在某个 un- 形式，不代表它自动属于本项目当前允许的 Basic 构式。']],
      ['happy → unhappy','safe → unsafe','able → unable'],
      'un- 不能自由添加到任意性质词。','docs/js/data.js：UN_PREFIX_ADJECTIVES；docs/js/validator.js。',
      ['unhappy','unsafe','unable'],[
        Q('un1','happy 使用本课的 un- 规则后是什么？',[['unhappy','unhappy'],['inhappy','inhappy'],['happyun','happyun']],['unhappy'],'happy 在登记名单中：un + happy → unhappy。'),
        Q('un2','un- 能否直接加到任意性质词前？',[['yes','可以，所有性质词都适用'],['no','不可以，必须符合登记词项和规则']],['no'],'本项目的词项名单有明确范围，不能无限扩大。'),
        Q('un3','safe 使用本课的 un- 规则后是什么？',[['unsafely','unsafely'],['unsafe','unsafe'],['notsafe','notsafe']],['unsafe'],'safe → unsafe。')
      ]),
    U('operators','表达结构','16 个核心 Operators','核心操作词各有自己的意义图景，不能互相替换。',
      [['完整清单',OPERATORS.join('、')+'。may、will 是辅助词，不计入这 16 个核心 Operators。'],
       ['make / take','make 常用于造成或形成某种新事物或结果，如 make an attempt；take 常用于取得、接受或参与某种活动，如 take a look、take care。'],
       ['come / go / get / keep','come 朝向说话者或参照点；go 从参照点向外或朝另一个目的地；get 涉及取得、到达或进入状态；keep 表示持续保持。']],
      ['make an attempt','take a look','come into the mind','go through the account','get the food ready','keep the food ready'],
      '16 个词不是可互换的万能动词。','BASIC_ENGLISH_OPERATORS.md；Ogden, The ABC of Basic English, Names of Acts。',
      ['make an attempt','take a look','come into the mind','go through the account','get the food ready','keep the food ready'],[
        Q('op1','下面哪一组是辅助词，而不是 16 个核心 Operators？',[['may / will','may / will'],['make / take','make / take'],['come / go','come / go']],['may / will'],'16 个核心 Operators 不包含 may、will。'),
        Q('op2','按项目索引，哪一组搭配正确？（选两项）',[['make an attempt','make an attempt'],['take a look','take a look'],['take an attempt','take an attempt'],['make a look','make a look']],['make an attempt','take a look'],'Ogden 用 make an attempt 与 take a look 展示 make / take 的差别。',true),
        Q('op3','come 与 go 的关键区别是什么？',[['只看动词时态','只看动词时态'],['移动方向相对于说话者或参照点','移动方向相对于说话者或参照点'],['二者完全可以互换','二者完全可以互换']],['移动方向相对于说话者或参照点'],'come 朝向当前参照点；go 从参照点向外或朝另一个目的地。'),
        Q('op4','get the food ready 与 keep the food ready 的区别是什么？',[['get 表示进入准备好的状态；keep 表示持续保持该状态','get 表示进入准备好的状态；keep 表示持续保持该状态'],['二者都只表示拥有食物','二者都只表示拥有食物'],['二者没有区别','二者没有区别']],['get 表示进入准备好的状态；keep 表示持续保持该状态'],'get 强调达到状态，keep 强调维持状态。')
      ]),
    U('directives','表达结构','20 个 proper Directives','方向关系从空间意义出发，再扩展到时间、目的、来源、方式和抽象关系。',
      [['完整清单',DIRECTIVES.join('、')+'。'],
       ['边界项目','out 有方向意义，但语法上属于副词，不是 20 个 proper Directives 之一。for、of、till 是非方向性介词；《The ABC》的章节标题列表与 20 个 proper Directives 名单并不相同。'],
       ['容易混淆的关系','between 用于两个对象之间；among 用于群体之中。to 指目标或接受者；for 指目的或用途；from 表示来源；by 可表示方式、工具、施事者或原因。'],
       ['空间对比','in 表示内部；out 表示从内部向外；on 表示接触或依托；off 表示分离。up / down 表示高度方向；over 表示上方或越过；through 表示穿过。']],
      ['between two objects','among friends','give it to him','goods from a store','out of danger','take the skin off an apple'],
      '不能把所有方向词都翻译成笼统的“方向”。','BASIC_ENGLISH_DIRECTIVES.md；Ogden, The ABC of Basic English, Names of Directions。',
      ['between two objects','among friends','give it to him','goods from a store','out of danger','take the skin off an apple'],[
        Q('dir1','只涉及两个对象之间的关系，应选哪个词？',[['between','between'],['among','among'],['through','through']],['between'],'between 对应两个对象之间；among 强调群体之中。'),
        Q('dir2','把“来源”与“方式／工具”分别对应到哪个词？',[['from / by','from / by'],['to / for','to / for'],['in / on','in / on']],['from / by'],'from 表示来源或起点；by 可表示方式、工具、施事者或原因。'),
        Q('dir3','out 在 20 个 proper Directives 中吗？',[['yes','是'],['no','不是；它是有方向意义的副词边界项']],['no'],'out 在方向图中出现，但语法上属于副词。'),
        Q('dir4','哪一组对比正确？',[['in = 内部；off = 分离','in = 内部；off = 分离'],['on = 向外；out = 接触表面','on = 向外；out = 接触表面'],['through = 上方；over = 穿过','through = 上方；over = 穿过']],['in = 内部；off = 分离'],'in 表示内部；off 表示脱离。out 表示向外；on 表示接触或依托。')
      ]),
    U('operator-directive','表达结构','Operator 与 Directive 的组合','组合要符合具体意义关系，不能把所有普通动词套进一个公式。',
      [['组合检验','原作者要求把 Operators 与 Directives 组合，并检查它们是否表达常见经验中成立的关系；对象、语序、语境和固定用法都会影响意义。'],
       ['不同结构','go into / put in 可分析为 Operator + Directive；get ready 是 Operator + Quality；get knowledge of 是 Operator + Name + Directive；talk about 是动作名称 + Directive；be like 是 Operator + Quality / 关系表达。'],
       ['学习原则','先判断动作或状态，再决定需要 Operator、Name、Quality 和 Directive 中的哪些单位。']],
      ['go into the room','put the paper in the box','get ready','get knowledge of it','talk about it','be like him'],
      'Operator + Directive 只是多种表达结构之一。','BASIC_ENGLISH_OPERATOR_DIRECTION_MAP.md；BASIC_ENGLISH_OPERATORS.md；BASIC_ENGLISH_DIRECTIVES.md。',
      ['go into the room','put the paper in the box','get ready','get knowledge of it','talk about it','be like him'],[
        Q('od1','enter → go into 属于哪种结构？',[['Operator + Directive','Operator + Directive'],['Operator + Quality','Operator + Quality'],['Name of Act + Directive','Name of Act + Directive']],['Operator + Directive'],'go 是 Operator；into 表达方向关系。'),
        Q('od2','get ready 属于哪种结构？',[['Operator + Quality','Operator + Quality'],['Operator + Directive','Operator + Directive'],['Operator + Name + Directive','Operator + Name + Directive']],['Operator + Quality'],'ready 是性质词，不是 Directive。'),
        Q('od3','get knowledge of it 属于哪种结构？',[['Operator + Name + Directive','Operator + Name + Directive'],['Operator + Quality','Operator + Quality'],['纯 Operator + Directive','纯 Operator + Directive']],['Operator + Name + Directive'],'get 是 Operator，knowledge 是 Name，of 是关系词。'),
        Q('od4','talk about it 为什么不是核心 Operator + Directive？',[['talk 是动作名称，不是 16 个核心 Operators 之一','talk 是动作名称，不是 16 个核心 Operators 之一'],['about 不是英语词','about 不是英语词'],['它没有任何关系词','它没有任何关系词']],['talk 是动作名称，不是 16 个核心 Operators 之一'],'talk about 是动作名称 + Directive。')
      ]),
    U('names-of-acts','意义表达','Names of Acts：按语境重表达动作','普通英语动词没有固定的一对一替换；先判断当前句子的具体意思。',
      [['speak 的三个语境','对某个人说话：say something to him；在会议上讲话：give a talk / make a statement；会说一种语言：have a knowledge of it。'],
       ['其他常见动作','tell a story → give it；sing → give a song；eat → take food / have a meal；listen → give attention；hear music → the music comes to the ears。'],
       ['分析顺序','先判断动作的实际含义，再找行为者、动作、对象、接受者、方向或结果；最后选择合适结构。']],
      ['say something to him','give a talk','make a statement','have a knowledge of it','take food','have a meal','give attention'],
      '不能把 speak = say / give / have 当成固定替换表。','BASIC_ENGLISH_NAMES_OF_ACTS.md；Ogden, The ABC of Basic English, Names of Acts and Some Common Needs。',
      ['say something to him','give a talk','make a statement','have a knowledge of it','take food','have a meal','give attention'],[
        Q('act1','speak to a person 在原作者例子中怎样表达？',[['say something to him','say something to him'],['give a talk','give a talk'],['have a knowledge of it','have a knowledge of it']],['say something to him'],'这里的 speak 有明确说话对象，重点是把内容说给对方。'),
        Q('act2','speak at a meeting 的原作者表达有哪些？（选两项）',[['give a talk','give a talk'],['make a statement','make a statement'],['say something to him','say something to him'],['have a knowledge of it','have a knowledge of it']],['give a talk','make a statement'],'会议讲话可表达为 give a talk，也可按发表陈述表达为 make a statement。',true),
        Q('act3','speak a language 在原作者例子中怎样表达？',[['have a knowledge of it','have a knowledge of it'],['give a song','give a song'],['take food','take food']],['have a knowledge of it'],'这里表达具有某种语言知识或能力，不是一次说话行为。'),
        Q('act4','eat 在原作者 Common Needs 的例子中可以怎样表达？（选两项）',[['take food','take food'],['have a meal','have a meal'],['make food','make food'],['send food','send food']],['take food','have a meal'],'take food 与 have a meal 都是原书给出的表达。',true),
        Q('act5','listen 在原作者例子中可以怎样表达？',[['give attention','give attention'],['make a statement','make a statement'],['go out of','go out of']],['give attention'],'listen 的表达会强调把注意力给予声音或说话内容。')
      ]),
    U('expansions','意义理解','Expansions：词义扩展与特定化','一个词可延伸到相关对象；special use 则把意义限制到较窄范围。',
      [['事物名称的扩展','neck of a bottle 指瓶子的较窄部分；leg of a bed 指床的支撑部分；mouth of a bottle 指瓶口；foot of a table 指桌子的底部或基座。'],
       ['性质名称的扩展','bitter taste → bitter experience；cold day → cold look。人的感受和反应也参与词义联系。'],
       ['Expansion 与 Special use','Expansion 是意义延伸；《The ABC》p.156 的 special use 是意义收窄，不是扩大。']],
      ['the neck of a bottle','the leg of a bed','the mouth of a bottle','the foot of a table','bitter experience','cold look'],
      '不是任意联想都算作 Basic 词义扩展；应指出形状、位置、结构、用途或经验联系。','BASIC_ENGLISH_EXPANSIONS_THINGS_QUALITIES.md；BASIC_ENGLISH_EXPRESSION_LESSON_02.md；Ogden, The ABC, pp.146–161。',
      ['the neck of a bottle','the leg of a bed','the mouth of a bottle','the foot of a table','bitter experience','cold look'],[
        Q('exp1','the neck of a bottle 中的 neck 指什么？',[['瓶子较窄的连接部分','瓶子较窄的连接部分'],['人的脖子','人的脖子'],['瓶子的底部','瓶子的底部']],['瓶子较窄的连接部分'],'这是从人的 neck 延伸到瓶子较窄连接部分。'),
        Q('exp2','the leg of a bed 中的 leg 指什么？',[['床的支撑部分','床的支撑部分'],['床上的被子','床上的被子'],['床头','床头']],['床的支撑部分'],'人的腿支撑身体；床的 leg 支撑床体。'),
        Q('exp3','bitter taste → bitter experience 属于什么联系？',[['由味觉感受延伸到经历带来的感受','由味觉感受延伸到经历带来的感受'],['从空间内部到外部','从空间内部到外部'],['名词复数变化','名词复数变化']],['由味觉感受延伸到经历带来的感受'],'性质扩展可以涉及人的感受和反应。'),
        Q('exp4','《The ABC》p.156 所说的 special use 在本项目索引中指什么？',[['意义收窄到较具体的用法','意义收窄到较具体的用法'],['任何自由的比喻','任何自由的比喻'],['意义必然扩大','意义必然扩大']],['意义收窄到较具体的用法'],'该处 special use 与 expansion 区分，重点是意义变窄。')
      ]),
    U('fixed-groups','意义理解','250 Fixed Word-Groups','固定词组需要按完整组合学习，不能只凭每个词的字面意思推导。',
      [['数量结构','原书给出的 250 项由 50 个 Operator 例子、80 个关系词例子、20 个其他 Operations / Directions 特殊用法，以及其余词表的 100 项特殊用法组成。'],
       ['三种形成原因','原书用 attraction（用法吸引）、loss / omission（省略）和 old picture（历史意象）解释固定用法为何不能完全从单词字面预测。'],
       ['例子与边界','原书举出 come to a stop、keep a government in、put up with 作为固定用法的例子。它与 Names of Acts / Common Needs 是相邻但不同的内容。']],
      ['come to a stop','keep a government in','put up with'],
      '每个单词通过词汇检查，不代表整个组合已被确认是合适的固定用法。','BASIC_ENGLISH_250_FIXED_WORD_GROUPS.md；Ogden, The ABC, pp.212–242。',
      ['come to a stop','keep a government in','put up with'],[
        Q('fix1','原书 250 Fixed Word-Groups 的数量结构是哪一项？',[['50 + 80 + 20 + 100','50 + 80 + 20 + 100'],['100 + 100 + 50','100 + 100 + 50'],['250 个 Operator 组合','250 个 Operator 组合']],['50 + 80 + 20 + 100'],'原书 p.214 给出四部分：50、80、20、100。'),
        Q('fix2','下面哪一个是原书用于说明固定词组的例子？',[['put up with','put up with'],['neck of a bottle','neck of a bottle'],['the leg of a bed','the leg of a bed']],['put up with'],'put up with 属于固定词组；neck of a bottle 和 leg of a bed 是意义扩展示例。'),
        Q('fix3','固定词组与词义扩展的关系是什么？',[['固定词组按完整组合学习；意义扩展是词义向相关对象延伸','固定词组按完整组合学习；意义扩展是词义向相关对象延伸'],['二者完全相同','二者完全相同'],['只要词汇通过就能确认固定词组','只要词汇通过就能确认固定词组']],['固定词组按完整组合学习；意义扩展是词义向相关对象延伸'],'原书把 Fixed Word-Groups 与 Expansions 分成不同部分。')
      ]),
    U('sentence-structure','句子组织','句子结构与语义角色','词序要表达清楚谁做什么、作用于谁、方向在哪里；没有一个万能词序公式。',
      [['先找语义角色','读句子时先找行为者、动作、对象、接受者、来源、目标和结果；不是每道题都包含所有角色。'],
       ['不同结构的词序','He gives the money to the man 与 He gives the man the money 保留同一组角色；The man gives the money to her 改变了给予者和接收者。'],
       ['不要绝对化','陈述、疑问、否定、时态和补足结构各有组织方式。Subject + Operator + Object 是常见骨架，不是覆盖所有句子的固定模板。']],
      ['I will put the book on the table.','He gave the letter to me.','She gives the money to the man.','She gives the man the money.'],
      '不能只按唯一字符串评分；要检查句子结构和语义角色是否保留。','Ogden 原版 45 Steps 的词汇与结构课程；BASIC_ENGLISH_MEANING_TO_BASIC_EXERCISE_BANK.md。',
      ['I will put the book on the table.','He gave the letter to me.','She gives the money to the man.','She gives the man the money.'],[
        Q('sent1','下面哪两句话保留了相同的给予者、对象和接收者？（选两项）',[['She gives the money to the man.','She gives the money to the man.'],['She gives the man the money.','She gives the man the money.'],['The man gives the money to her.','The man gives the money to her.']],['She gives the money to the man.','She gives the man the money.'],'前两句角色相同；第三句交换了给予者和接收者。',true),
        Q('sent2','come / go 的选择需要考虑什么？',[['说话者或观察者的参照位置','说话者或观察者的参照位置'],['单词长度','单词长度'],['是否有冠词','是否有冠词']],['说话者或观察者的参照位置'],'同一移动过程可能因参照点不同而用 come 或 go。'),
        Q('sent3','词汇检查通过，是否代表句子语法和意思一定正确？',[['是，词汇通过就代表整句正确','是，词汇通过就代表整句正确'],['不是，词汇、结构和意思是不同检查层','不是，词汇、结构和意思是不同检查层']],['不是，词汇、结构和意思是不同检查层'],'词汇、结构和意思需要分开检查。')
      ]),
    U('meaning-method','句子组织','Meaning → Basic：从意思构造表达','先判断语境，再拆角色、选结构、组成句子，最后反向理解。',
      [['第一步：判断语境','同一个普通英语词在不同语境中可能表达不同动作、状态或关系；先确认当前句子真正想表达什么。'],
       ['第二步：拆语义角色','找出行为者、动作、对象、接受者、来源、目标、材料、结果和观察视角。'],
       ['第三步：选择结构','根据意义选择 Operator、Name、Quality、Directive 或固定词组；不要预先认定所有普通动词都用同一种结构替换。'],
       ['第四步：分层检查','分别检查词汇、语法结构和意思是否保留，最后从 Basic 句子反向说出当前语境中的意思。未实现的句型应标为暂时无法判断。']],
      ['语境 → 语义角色 → Basic 结构 → 完整句子 → 反向理解'],
      '这是本项目的教学流程，不是 Ogden 原书命名的算法，也不是通用自然语言理解器。','BASIC_ENGLISH_EXPRESSION_SYSTEM.md；BASIC_ENGLISH_MEANING_TO_BASIC_EXERCISE_BANK.md。',
      ['say something to him','give a talk','have a knowledge of it'],[
        Q('mm1','把普通英语意思改写为 Basic，第一步应做什么？',[['先判断当前语境中的真实意思','先判断当前语境中的真实意思'],['先找一个看起来相似的单词','先找一个看起来相似的单词'],['先随意选择一个 Operator','先随意选择一个 Operator']],['先判断当前语境中的真实意思'],'必须先判断语境，才能选择合适的 Basic 表达。'),
        Q('mm2','为什么需要做反向理解？',[['确认 Basic 句子仍表达原来的意思','确认 Basic 句子仍表达原来的意思'],['只为了检查拼写','只为了检查拼写'],['词汇检查已经能理解句意','词汇检查已经能理解句意']],['确认 Basic 句子仍表达原来的意思'],'反向理解检查意义是否保留，不只是检查单词。'),
        Q('mm3','如果句型不在本题检查器支持范围内，应怎样反馈？',[['暂时无法判断，不自动判为语法错误','暂时无法判断，不自动判为语法错误'],['一律判错','一律判错'],['一律判对','一律判对']],['暂时无法判断，不自动判为语法错误'],'有限检查器只能判断已登记结构；未覆盖不等于错误，也不等于正确。')
      ])
  ];
  const GROUPS = Array.from(new Set(UNITS.map(unit => unit.group)));
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const load = (key,fallback) => { try { const raw=window.localStorage.getItem(key); return raw?JSON.parse(raw):fallback; } catch(e){ return fallback; } };
  const save = (key,value) => { try { window.localStorage.setItem(key,JSON.stringify(value)); } catch(e){} };
  function evaluateQuestion(question, selectedValues) {
    const selected=Array.from(new Set((selectedValues||[]).map(String))).sort(), expected=question.answers.map(String).sort();
    return {correct:selected.length===expected.length&&selected.every((value,index)=>value===expected[index]),expected:expected};
  }
  function nextSchedule(previous,known,now) {
    const old=previous||{}, oldLevel=Math.max(0,Math.min(MAX_LEVEL,Number(old.level)||0));
    const level=known?Math.min(oldLevel+1,MAX_LEVEL):0, days=known?INTERVALS[level-1]:1;
    return {level:level,nextReviewAt:now+days*DAY,correctCount:(Number(old.correctCount)||0)+(known?1:0),wrongCount:(Number(old.wrongCount)||0)+(known?0:1),reviewCount:(Number(old.reviewCount)||0)+1};
  }
  const training=()=>load(PROGRESS_KEY,{});
  const review=()=>load(REVIEW_KEY,{sessions:0,lastSession:null,units:{}});
  function reviewSummary(now) {
    const p=review(),states=p.units||{}; let started=0,mastered=0,due=0;
    UNITS.forEach(unit=>{const s=states[unit.id];if(!s)return;started++;if(s.level>=MAX_LEVEL)mastered++;else if(!s.nextReviewAt||s.nextReviewAt<=now)due++;});
    return {started,mastered,due,fresh:UNITS.length-started,sessions:p.sessions||0};
  }
  let activeUnit='plural',activeQuestion=0,activeDeck='words';
  function renderExercises(container) {
    if(!container)return;
    const p=training();
    container.innerHTML='<div class="rl-shell"><header class="rl-header"><span class="rl-kicker">TEACHING · RULE LEARNING</span><h3>规则学习与练习</h3><p>先看规则和适用范围，再做练习。每道题都会解释为什么正确。</p><div class="rl-legend">'+GROUPS.map(g=>'<span>'+esc(g)+'</span>').join('')+'</div></header><div class="rl-unit-grid">'+UNITS.map(unit=>{const s=p[unit.id]||{},a=s.attempts||0,c=s.correct||0;return '<button class="rl-unit-card '+(unit.id===activeUnit?'is-active':'')+'" data-unit="'+unit.id+'"><span class="rl-unit-group">'+esc(unit.group)+'</span><strong>'+esc(unit.title)+'</strong><span>'+esc(unit.summary)+'</span><small>'+(a?'已答 '+a+' 题 · 正确 '+c+' 题':'尚未练习')+'</small></button>';}).join('')+'</div><section class="rl-lesson" id="rl-lesson"></section></div>';
    container.querySelectorAll('[data-unit]').forEach(button=>button.addEventListener('click',()=>{activeUnit=button.dataset.unit;activeQuestion=0;renderExercises(container);}));
    renderLesson(container,UNITS.find(u=>u.id===activeUnit)||UNITS[0]);
  }
  function renderLesson(container,unit) {
    const host=container.querySelector('#rl-lesson');if(!host)return;
    const p=training()[unit.id]||{};
    host.innerHTML='<div class="rl-lesson-heading"><div><span class="rl-kicker">'+esc(unit.group)+'</span><h2>'+esc(unit.title)+'</h2><p>'+esc(unit.summary)+'</p></div><button class="rl-lookup-link" type="button" data-lookup="'+unit.id+'">在规则速查中查看</button></div><div class="rl-rule-sections">'+unit.sections.map(s=>'<article><h4>'+esc(s[0])+'</h4><p>'+esc(s[1])+'</p></article>').join('')+'</div><div class="rl-example-block"><h4>例子</h4><ul>'+unit.examples.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div><p class="rl-caution"><strong>适用边界：</strong>'+esc(unit.caution)+'</p><p class="rl-source"><strong>依据：</strong>'+esc(unit.source)+'</p><div class="rl-practice-heading"><div><span class="rl-kicker">PRACTICE</span><h3>检查理解</h3><p>本单元共 '+unit.questions.length+' 题；答错会显示正确答案和原因。</p></div><span class="rl-progress-count">累计正确 '+(p.correct||0)+' / 已答 '+(p.attempts||0)+'</span></div><div id="rl-question"></div>';
    host.querySelector('[data-lookup]').addEventListener('click',()=>{activeUnit=unit.id;window.BE.teaching.switchTab('reference');});
    renderQuestion(host,unit,activeQuestion);
  }
  function renderQuestion(host,unit,index) {
    const q=unit.questions[index],box=host.querySelector('#rl-question');if(!box)return;
    box.innerHTML='<div class="rl-question-card"><div class="rl-question-meta">第 '+(index+1)+' / '+unit.questions.length+' 题</div><h4>'+esc(q.prompt)+'</h4><div class="rl-options">'+q.options.map(o=>'<button type="button" class="rl-option" data-value="'+esc(o[0])+'" aria-pressed="false">'+esc(o[1])+'</button>').join('')+'</div><div class="rl-feedback" id="rl-feedback" aria-live="polite"></div><div class="rl-question-actions"><button type="button" class="rl-primary" id="rl-check">检查答案</button><button type="button" class="rl-secondary" id="rl-next" hidden>'+(index+1<unit.questions.length?'下一题':'完成本单元')+'</button></div></div>';
    let selected=[],checked=false;
    box.querySelectorAll('.rl-option').forEach(button=>button.addEventListener('click',()=>{if(checked)return;const v=button.dataset.value;if(q.multiple)selected=selected.includes(v)?selected.filter(x=>x!==v):selected.concat(v);else selected=[v];box.querySelectorAll('.rl-option').forEach(peer=>{peer.classList.toggle('is-selected',selected.includes(peer.dataset.value));peer.setAttribute('aria-pressed',selected.includes(peer.dataset.value)?'true':'false');});}));
    box.querySelector('#rl-check').addEventListener('click',()=>{
      if(checked)return;const feedback=box.querySelector('#rl-feedback');if(!selected.length){feedback.textContent='请先选择答案。';feedback.className='rl-feedback is-pending';return;}
      checked=true;const result=evaluateQuestion(q,selected),p=training(),s=p[unit.id]||{attempts:0,correct:0};s.attempts++;if(result.correct)s.correct++;s.lastQuestion=q.id;s.lastAnsweredAt=Date.now();p[unit.id]=s;save(PROGRESS_KEY,p);
      box.querySelectorAll('.rl-option').forEach(button=>{button.disabled=true;if(q.answers.includes(button.dataset.value))button.classList.add('is-answer');if(selected.includes(button.dataset.value)&&!q.answers.includes(button.dataset.value))button.classList.add('is-wrong-choice');});
      feedback.textContent=(result.correct?'回答正确。':'这次没有完全答对。')+' '+q.explanation;feedback.className='rl-feedback '+(result.correct?'is-correct':'is-wrong');box.querySelector('#rl-check').disabled=true;box.querySelector('#rl-next').hidden=false;
    });
    box.querySelector('#rl-next').addEventListener('click',()=>{if(!checked)return;activeQuestion++;if(activeQuestion>=unit.questions.length){activeQuestion=0;renderExercises(document.getElementById('teaching-content'));}else renderQuestion(host,unit,activeQuestion);});
  }
  function statCard(value,label){return '<div class="rl-stat-card"><strong>'+esc(value)+'</strong><span>'+esc(label)+'</span></div>';}
  function renderSpaced(container) {
    if(!container)return;
    const wd=load('BE_SR',{w:{},s:{sc:0,tl:0,ms:0}}),ws=load('BE_SR_SESSION',null),now=Date.now();
    let due=0;Object.keys(wd.w||{}).forEach(word=>{const x=wd.w[word];if(x&&Number(x.l)<MAX_LEVEL&&Number(x.nr)<=now)due++;});
    const started=Object.keys(wd.w||{}).length,rs=reviewSummary(now),session=load(SESSION_KEY,null);
    container.innerHTML='<div class="rl-spaced"><header class="rl-header"><span class="rl-kicker">SPACED REPETITION</span><h3>间隔复习</h3><p>复习是在合适的时间重新回忆学过的词或规则。这里分成两个独立复习组。</p></header><div class="rl-deck-tabs"><button type="button" data-deck="words" class="'+(activeDeck==='words'?'is-active':'')+'">850 词汇复习</button><button type="button" data-deck="rules" class="'+(activeDeck==='rules'?'is-active':'')+'">规则复习</button></div><section id="rl-deck-panel"></section></div>';
    container.querySelectorAll('[data-deck]').forEach(b=>b.addEventListener('click',()=>{activeDeck=b.dataset.deck;renderSpaced(container);}));
    const panel=container.querySelector('#rl-deck-panel');
    if(activeDeck==='words'){
      panel.innerHTML='<div class="rl-review-intro"><h4>850 词汇复习</h4><p>每次最多复习 50 个词。点“认识”会进入下一个等级；点“不认识”会回到第 0 级，并安排在 1 天后重试。</p><p>答对后的间隔依次为 1、2、4、7、15、30 天。第 6 级标记为“已掌握”，不再进入待复习队列。</p></div><div class="rl-stat-grid">'+statCard(wd.s.ms||0,'已掌握')+statCard(started,'已开始')+statCard(due,'待复习')+statCard(wd.s.sc||0,'完成轮次')+'</div><div class="rl-review-actions">'+(ws&&ws.idx<ws.words.length?'<button class="rl-primary" id="rl-word-resume">继续上次（剩余 '+(ws.words.length-ws.idx)+' 个）</button>':'')+'<button class="rl-primary" id="rl-word-start">开始词汇复习</button><button class="rl-secondary" id="rl-word-reset">重置词汇进度</button></div><p class="rl-note">复习记录保存在当前 App 的本地存储中，不需要联网。清除 App 数据会同时清除这些记录。</p><div id="sr-area"></div>';
      const start=panel.querySelector('#rl-word-start');if(start)start.addEventListener('click',()=>window.BE.teaching.srStart());
      const resume=panel.querySelector('#rl-word-resume');if(resume)resume.addEventListener('click',()=>window.BE.teaching.srResume());
      panel.querySelector('#rl-word-reset').addEventListener('click',()=>{if(!window.confirm('确定重置全部 850 词汇复习进度？此操作不能撤销。'))return;save('BE_SR',{w:{},s:{sc:0,tl:0,ms:0}});save('BE_SR_SESSION',null);renderSpaced(container);});
    }else{
      panel.innerHTML='<div class="rl-review-intro"><h4>规则复习</h4><p>复习对象是上面 13 个规则单元。每次用一道理解题检查你是否还记得规则。</p><p>答对后的间隔依次为 1、2、4、7、15、30 天；答错后回到第 0 级，1 天后重新复习。第 6 级表示本轮已掌握。</p></div><div class="rl-stat-grid">'+statCard(rs.mastered,'已掌握规则')+statCard(rs.started,'已开始')+statCard(rs.due,'待复习规则')+statCard(rs.fresh,'尚未开始')+'</div><p class="rl-session-count">已完成规则复习 '+rs.sessions+' 轮</p><div class="rl-review-actions">'+(session&&!session.completed&&session.index<session.queue.length?'<button class="rl-primary" id="rl-rule-resume">继续上次（剩余 '+(session.queue.length-session.index)+' 项）</button>':'')+'<button class="rl-primary" id="rl-rule-start">开始规则复习</button><button class="rl-secondary" id="rl-rule-reset">重置规则进度</button></div><p class="rl-note">规则复习与单词复习分开记录；答对一道题不代表永久掌握整个英语系统。</p><div id="rl-rule-area"></div>';
      const start=panel.querySelector('#rl-rule-start');start.addEventListener('click',startRuleReview);
      const resume=panel.querySelector('#rl-rule-resume');if(resume)resume.addEventListener('click',showRuleReviewCard);
      panel.querySelector('#rl-rule-reset').addEventListener('click',()=>{if(!window.confirm('确定重置全部规则复习进度？此操作不能撤销。'))return;save(REVIEW_KEY,{sessions:0,lastSession:null,units:{}});save(SESSION_KEY,null);renderSpaced(container);});
    }
  }
  function startRuleReview() {
    const p=review(),now=Date.now(),due=[],fresh=[];
    UNITS.forEach(unit=>{const s=p.units[unit.id];if(!s)fresh.push(unit.id);else if(s.level<MAX_LEVEL&&(!s.nextReviewAt||s.nextReviewAt<=now))due.push(unit.id);});
    const queue=due.concat(fresh).slice(0,UNITS.length);
    const area=document.getElementById('rl-rule-area');
    if(!queue.length){if(area)area.innerHTML='<div class="rl-empty">目前没有待复习或新规则。已开始的规则都在未来复习日期，或已经达到第 6 级。</div>';return;}
    save(SESSION_KEY,{queue,index:0,answers:[],completed:false});showRuleReviewCard();
  }
  function showRuleReviewCard() {
    const s=load(SESSION_KEY,null),area=document.getElementById('rl-rule-area');
    if(!area||!s||!s.queue||s.index>=s.queue.length){if(s&&s.queue&&s.index>=s.queue.length)showRuleReviewSummary();return;}
    const unit=UNITS.find(x=>x.id===s.queue[s.index]);if(!unit)return;
    const p=review(),state=p.units[unit.id]||{},q=unit.questions[(Number(state.reviewCount)||0)%unit.questions.length];
    area.innerHTML='<div class="rl-rule-review-card"><div class="rl-progress-bar"><span style="width:'+(s.index/s.queue.length*100)+'%"></span></div><p class="rl-question-meta">规则 '+(s.index+1)+' / '+s.queue.length+' · '+esc(unit.group)+'</p><h4>'+esc(unit.title)+'</h4><p class="rl-review-summary">'+esc(unit.summary)+'</p><div class="rl-question-card"><h4>'+esc(q.prompt)+'</h4><div class="rl-options">'+q.options.map(o=>'<button type="button" class="rl-option" data-value="'+esc(o[0])+'" aria-pressed="false">'+esc(o[1])+'</button>').join('')+'</div><div class="rl-feedback" id="rl-review-feedback" aria-live="polite"></div><div class="rl-question-actions"><button type="button" class="rl-primary" id="rl-review-check">检查答案</button><button type="button" class="rl-secondary" id="rl-review-next" hidden>下一项</button></div></div></div>';
    let selected=[],checked=false;
    area.querySelectorAll('.rl-option').forEach(b=>b.addEventListener('click',()=>{if(checked)return;const v=b.dataset.value;if(q.multiple)selected=selected.includes(v)?selected.filter(x=>x!==v):selected.concat(v);else selected=[v];area.querySelectorAll('.rl-option').forEach(peer=>{peer.classList.toggle('is-selected',selected.includes(peer.dataset.value));peer.setAttribute('aria-pressed',selected.includes(peer.dataset.value)?'true':'false');});}));
    area.querySelector('#rl-review-check').addEventListener('click',()=>{
      if(checked)return;const feedback=area.querySelector('#rl-review-feedback');if(!selected.length){feedback.textContent='请先选择答案。';feedback.className='rl-feedback is-pending';return;}
      checked=true;const result=evaluateQuestion(q,selected),current=review();current.units[unit.id]=nextSchedule(current.units[unit.id],result.correct,Date.now());current.units[unit.id].lastQuestion=q.id;save(REVIEW_KEY,current);
      s.answers.push({unitId:unit.id,correct:result.correct});save(SESSION_KEY,s);
      area.querySelectorAll('.rl-option').forEach(b=>{b.disabled=true;if(q.answers.includes(b.dataset.value))b.classList.add('is-answer');if(selected.includes(b.dataset.value)&&!q.answers.includes(b.dataset.value))b.classList.add('is-wrong-choice');});
      const level=current.units[unit.id].level,days=result.correct?INTERVALS[level-1]:1;
      feedback.textContent=(result.correct?'回答正确。':'回答错误。')+' '+q.explanation+(result.correct?' 下一次复习安排在 '+days+' 天后。':' 本项回到第 0 级，1 天后重新复习。');
      feedback.className='rl-feedback '+(result.correct?'is-correct':'is-wrong');area.querySelector('#rl-review-check').disabled=true;area.querySelector('#rl-review-next').hidden=false;
    });
    area.querySelector('#rl-review-next').addEventListener('click',()=>{if(!checked)return;s.index++;save(SESSION_KEY,s);if(s.index>=s.queue.length)showRuleReviewSummary();else showRuleReviewCard();});
  }
  function showRuleReviewSummary() {
    const s=load(SESSION_KEY,null),area=document.getElementById('rl-rule-area');if(!s||!area)return;
    const correct=s.answers.filter(x=>x.correct).length,wrong=s.answers.length-correct;s.completed=true;save(SESSION_KEY,s);
    const p=review();p.sessions=(Number(p.sessions)||0)+1;p.lastSession=new Date().toISOString();save(REVIEW_KEY,p);
    area.innerHTML='<div class="rl-summary"><h4>本轮规则复习完成</h4><div class="rl-summary-grid">'+statCard(correct,'答对')+statCard(wrong,'答错')+statCard(reviewSummary(Date.now()).mastered,'已掌握规则')+'</div><p>答错的规则回到第 0 级并安排在 1 天后复习；答对的规则按当前等级延长复习间隔。</p><button type="button" class="rl-primary" id="rl-rule-new">开始下一轮</button></div>';
    area.querySelector('#rl-rule-new').addEventListener('click',startRuleReview);
  }
  function renderReference(container,openId) {
    if(!container)return;const selected=openId||activeUnit;
    container.innerHTML='<div class="rl-reference"><header class="rl-header"><span class="rl-kicker">QUICK REFERENCE</span><h3>规则速查</h3><p>这里用于查规则，不代替系统学习。可以搜索规则名称、例子和适用边界。</p></header><div class="rl-search-row"><input type="search" id="rl-search" placeholder="搜索，例如 make、between、-ing、fixed..." /><select id="rl-group"><option value="all">全部分类</option>'+GROUPS.map(g=>'<option value="'+esc(g)+'">'+esc(g)+'</option>').join('')+'</select></div><p class="rl-reference-count" id="rl-count"></p><div class="rl-reference-list" id="rl-list"></div></div>';
    const search=container.querySelector('#rl-search'),group=container.querySelector('#rl-group'),list=container.querySelector('#rl-list'),count=container.querySelector('#rl-count');
    function draw(){
      const term=search.value.trim().toLowerCase(),g=group.value;
      const found=UNITS.filter(u=>{if(g!=='all'&&u.group!==g)return false;const text=[u.title,u.group,u.summary,u.caution,u.source].concat(u.sections.map(s=>s.join(' ')),u.examples).join(' ').toLowerCase();return !term||text.includes(term);});
      count.textContent='找到 '+found.length+' / '+UNITS.length+' 个规则主题';
      list.innerHTML=found.map(u=>'<article class="rl-reference-card"><details '+(u.id===selected?'open':'')+'><summary><span class="rl-unit-group">'+esc(u.group)+'</span><strong>'+esc(u.title)+'</strong><small>'+esc(u.summary)+'</small></summary><div class="rl-reference-body">'+u.sections.map(s=>'<h4>'+esc(s[0])+'</h4><p>'+esc(s[1])+'</p>').join('')+'<h4>例子</h4><ul>'+u.examples.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul><p class="rl-caution"><strong>边界：</strong>'+esc(u.caution)+'</p><p class="rl-source"><strong>依据：</strong>'+esc(u.source)+'</p><button type="button" class="rl-secondary" data-practice="'+u.id+'">进入本主题学习与练习</button></div></details></article>').join('')||'<p class="rl-empty">没有找到匹配规则，请尝试更短的关键词。</p>';
      list.querySelectorAll('[data-practice]').forEach(b=>b.addEventListener('click',()=>{activeUnit=b.dataset.practice;activeQuestion=0;window.BE.teaching.switchTab('exercises');}));
    }
    search.addEventListener('input',draw);group.addEventListener('change',draw);draw();
  }
  window.BE=window.BE||{};
  window.BE.ruleLearning={units:UNITS,operators:OPERATORS,directives:DIRECTIVES,evaluateQuestion,nextSchedule,reviewSummary,renderExercises,renderSpaced,renderReference,startRuleReview};
})();