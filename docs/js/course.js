// ============================================================
// BASIC ENGLISH COURSE — Chinese-guided lessons
// Course order and lesson scope follow C. K. Ogden's 1930 course index.
// Lessons 1, 2, 3, 5 and 6 are adapted in-app from the original course.
// Other steps remain linked to their original pages until adapted.
// ============================================================

(function () {
  const steps = [
    { n: 1, title: "词汇与结构", en: "Vocabulary and Structure", kind: "Vocabulary and Structure" },
    { n: 2, title: "我的房间", en: "My Room", kind: "Vocabulary and Reading" },
    { n: 3, title: "词汇与结构", en: "Vocabulary and Structure", kind: "Vocabulary and Structure" },
    { n: 4, title: "在车站", en: "At the Station", kind: "Vocabulary and Reading" },
    { n: 5, title: "词汇与结构", en: "Vocabulary and Structure", kind: "Vocabulary and Structure" },
    { n: 6, title: "一个英国家庭", en: "An English Family", kind: "Vocabulary and Reading" },
    { n: 7, title: "词汇与结构", en: "Vocabulary and Structure", kind: "Vocabulary and Structure" },
    { n: 8, title: "在花园里", en: "In the Garden", kind: "Vocabulary and Reading" },
    { n: 9, title: "词汇与结构", en: "Vocabulary and Structure", kind: "Vocabulary and Structure" },
    { n: 10, title: "一座城镇", en: "A Town", kind: "Vocabulary and Reading" },
    { n: 11, title: "牙齿的问题", en: "Trouble with a Tooth", kind: "Vocabulary, Structure, Reading" },
    { n: 12, title: "浴室的门", en: "Bathroom Door", kind: "Vocabulary, Structure, Reading" },
    { n: 13, title: "词汇与结构", en: "Vocabulary and Structure", kind: "Vocabulary and Structure" },
    { n: 14, title: "一艘船进港", en: "A Ship Comes In", kind: "Vocabulary and Reading" },
    { n: 15, title: "词汇与结构", en: "Vocabulary and Structure", kind: "Vocabulary and Structure" },
    { n: 16, title: "火车上的谈话", en: "A Talk in the Train", kind: "Vocabulary and Reading" },
    { n: 17, title: "词汇与结构", en: "Vocabulary and Structure", kind: "Vocabulary and Structure" },
    { n: 18, title: "一天结束时", en: "At the End of the Day", kind: "Vocabulary, Structure, Reading" },
    { n: 19, title: "老朋友的消息", en: "News of Old Friends", kind: "Vocabulary, Structure, Reading" },
    { n: 20, title: "谈论天气", en: "A Talk about the Weather", kind: "Vocabulary, Structure, Reading" },
    { n: 21, title: "夏日时光", en: "Summer Time", kind: "Vocabulary, Structure, Reading" },
    { n: 22, title: "词汇与结构", en: "Vocabulary and Structure", kind: "Vocabulary and Structure" },
    { n: 23, title: "起床前的最后一分钟", en: "The Last Minute in Bed", kind: "Vocabulary and Reading" },
    { n: 24, title: "请一位新厨师", en: "Getting a New Cook", kind: "Vocabulary, Structure, Reading" },
    { n: 25, title: "在办公室", en: "At the Office", kind: "Vocabulary, Structure, Reading" },
    { n: 26, title: "看一所房子", en: "Looking at a House", kind: "Vocabulary and Reading" },
    { n: 27, title: "税", en: "Taxes", kind: "Vocabulary and Reading" },
    { n: 28, title: "拍照", en: "Getting Ones Picture Taken", kind: "Vocabulary and Reading" },
    { n: 29, title: "裁缝店", en: "The Dressmaker", kind: "Vocabulary and Reading" },
    { n: 30, title: "钓鱼", en: "Fishing", kind: "Vocabulary and Reading" },
    { n: 31, title: "家务", en: "Housework", kind: "Vocabulary and Reading" },
    { n: 32, title: "搬家", en: "Moving In", kind: "Vocabulary and Reading" },
    { n: 33, title: "人与机器", en: "Men and Machines", kind: "Vocabulary and Reading" },
    { n: 34, title: "看图", en: "Looking at Pictures", kind: "Vocabulary and Reading" },
    { n: 35, title: "战争与和平", en: "War and Peace", kind: "Vocabulary and Reading" },
    { n: 36, title: "一个贫困家庭", en: "A Poor Family", kind: "Numbers and Reading" },
    { n: 37, title: "收音机", en: "The Radio", kind: "The Time and Reading" },
    { n: 38, title: "城里的一天", en: "A Day in Town", kind: "Reading" },
    { n: 39, title: "电话交谈", en: "A Talk on the Telephone", kind: "The Calendar and Reading" },
    { n: 40, title: "给朋友的一封信", en: "A Letter to a Friend", kind: "Reading" },
    { n: 41, title: "购物", en: "Goes Marketing", kind: "Money, Weights, Measures, Reading" },
    { n: 42, title: "日常所需的 Basic English", en: "Basic for Everyday Needs", kind: "Reading" },
    { n: 43, title: "去看电影", en: "Going to the Pictures", kind: "Reading" },
    { n: 44, title: "撞击", en: "The Smash", kind: "Reading" },
    { n: 45, title: "关于英国的一些笔记", en: "Some Notes about England", kind: "Reading" }
  ];

  const lessons = [1, 2, 3, 5, 6, 9, 10, 12];

  function vocab(items) {
    return '<div class="lesson-words">' + items.map(function (w) {
      return '<button class="lesson-word" onclick="BE.course.say(\'' + w[0] + '\')"><b>' + w[0] +
        '</b><span>' + w[1] + '</span><small>▶ 发音</small></button>';
    }).join('') + '</div>';
  }

  function panel(title, body) {
    return '<section class="lesson-panel"><h2>' + title + '</h2>' + body + '</section>';
  }

  function answer(id, title, body) {
    return '<details class="lesson-answer" id="' + id + '"><summary>' + title + '</summary><div>' + body + '</div></details>';
  }

  function writingBox(id, prompt) {
    return '<div class="lesson-writing"><p>' + prompt + '</p><textarea id="' + id +
      '" rows="4" placeholder="Write your English sentences here..."></textarea>' +
      '<button class="course-primary" onclick="BE.course.checkWriting(\'' + id + '\',\'' + id + '-feedback\')">检查 Basic 词汇</button>' +
      '<div id="' + id + '-feedback" class="course-feedback" aria-live="polite"></div>' +
      '<p class="lesson-instruction">此检查只核对词汇是否属于本项目的 Basic 词汇/规则形式，不判断语法和表达是否自然。</p></div>';
  }

  function courseShell() {
    const cards = steps.map(function (s) {
      const ready = lessons.indexOf(s.n) >= 0;
      return '<button class="course-step ' + (ready ? 'course-step-ready' : '') + '" ' +
        (ready ? 'onclick="BE.course.open(' + s.n + ')"' : 'onclick="BE.course.openOriginal(' + s.n + ')"') + '>' +
        '<span class="course-step-no">STEP ' + s.n + '</span>' +
        '<span class="course-step-cn">' + s.title + '</span>' +
        '<span class="course-step-en">' + s.en + '</span>' +
        '<span class="course-step-kind">' + s.kind + '</span>' +
        '<span class="course-step-state">' + (ready ? '进入中文课程 →' : '原版课程入口 ↗') + '</span></button>';
    }).join('');

    return '<section class="course-page">' +
      '<header class="course-hero"><p class="course-kicker">C. K. OGDEN · 1930 ORIGINAL COURSE</p>' +
      '<h1>从 850 个词，学会说完整的英语</h1>' +
      '<p>按原版 45 Steps 的顺序学习。每课把词汇放进句子、阅读和练习中，而不是孤立地背单词。</p>' +
      '<div class="course-note">目前已完成 8 / 45 课的中文教学改编：Step 1、2、3、5、6、9、10、12。其余步骤保留原版入口，尚未改编的内容不会冒充已完成课程。</div></header>' +
      '<div class="course-progress"><strong>45 个原版步骤</strong><span>已改编：8 课 · 待补：Step 4、7、8、11</span></div>' +
      '<div class="course-grid">' + cards + '</div></section>';
  }

  function openOriginal(n) {
    window.open('https://basicenglish.org/step-' + n + '/index.html', '_blank', 'noopener');
  }

  function lessonHeader(n, title, subtitle) {
    return '<button class="course-back" onclick="BE.course.render()">← 返回 45 步课程</button>' +
      '<header class="course-hero"><p class="course-kicker">STEP ' + n + ' · OGden BASIC ENGLISH COURSE</p>' +
      '<h1>' + title + '</h1><p>' + subtitle + '</p></header>';
  }

  function roomMatch() {
    const words = ['book','cover','curtain','cushion','drawer','floor','frame','picture','seat','wall'];
    const rows = words.map(function (word, i) {
      const opts = ['<option value="">选择单词…</option>'].concat(words.map(function (w) {
        return '<option value="' + w + '">' + w + '</option>';
      }));
      return '<label class="room-match-row"><span>' + (i + 1) + '</span><select id="room-match-' + (i + 1) + '">' +
        opts.join('') + '</select></label>';
    }).join('');
    return '<div class="room-picture-wrap"><svg class="room-picture" viewBox="0 0 760 340" role="img" aria-label="一间有床、桌子、窗户和家具的房间示意图">' +
      '<rect x="18" y="18" width="724" height="290" rx="5" fill="#f4f0e8" stroke="#9b8f80" stroke-width="3"/>' +
      '<rect x="18" y="270" width="724" height="38" fill="#c9b99f"/>' +
      '<rect x="270" y="48" width="190" height="112" fill="#d7edfa" stroke="#657f91" stroke-width="5"/><path d="M365 48V160 M270 104H460" stroke="#657f91" stroke-width="4"/>' +
      '<path d="M250 40 Q265 80 250 165 L270 165 L270 40Z M460 40 Q445 80 460 165 L480 165 L480 40Z" fill="#8b9fc5"/>' +
      '<rect x="525" y="48" width="130" height="100" fill="#b88d63" stroke="#6d523d" stroke-width="8"/><rect x="540" y="62" width="100" height="72" fill="#cce5d1"/><path d="M590 62V134 M540 98H640" stroke="#8a6b50" stroke-width="3"/>' +
      '<rect x="60" y="190" width="300" height="68" rx="8" fill="#6f89aa"/><rect x="72" y="174" width="280" height="40" rx="6" fill="#b5c3d6"/><rect x="82" y="182" width="75" height="30" rx="8" fill="#e8e3d8"/>' +
      '<rect x="400" y="204" width="135" height="14" fill="#9b7049"/><path d="M412 218V272 M523 218V272" stroke="#765537" stroke-width="8"/><rect x="435" y="185" width="72" height="18" fill="#d6b47a"/>' +
      '<rect x="560" y="202" width="112" height="66" fill="#a77c54"/><rect x="570" y="212" width="92" height="18" fill="#d8c09c"/><rect x="570" y="238" width="92" height="18" fill="#d8c09c"/>' +
      '<rect x="165" y="238" width="92" height="30" rx="8" fill="#5d7695"/><path d="M178 268V292 M244 268V292" stroke="#4b5d73" stroke-width="7"/>' +
      '<rect x="438" y="168" width="35" height="18" fill="#4e6684"/><path d="M444 168V160 M454 168V157 M464 168V162" stroke="#467a4c" stroke-width="3"/>' +
      '<g font-family="Arial,sans-serif" font-size="16" font-weight="bold" text-anchor="middle">' +
      [[435,178,1],[205,202,2],[252,85,3],[117,195,4],[615,245,5],[705,291,6],[518,45,7],[590,90,8],[205,286,9],[38,32,10]].map(function (p) {
        return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="14" fill="#ffffff" stroke="#315f9e" stroke-width="3"/><text x="' + p[0] + '" y="' + (p[1] + 6) + '" fill="#234c83">' + p[2] + '</text>';
      }).join('') + '</g></svg></div>' +
      '<div class="room-match-grid">' + rows + '</div>' +
      '<button class="course-primary" onclick="BE.course.checkRoomMatch()">检查 10 个单词</button>' +
      '<div id="room-match-feedback" class="course-feedback" aria-live="polite"></div>';
  }

  const lessonHTML = {};

  lessonHTML[1] =
    panel('1. 本课词汇', '<p>第一课先从房间里的常见物品和形状开始。</p>' +
      vocab([['bed','床'],['building','建筑物'],['door','门'],['flower','花'],['house','房子'],['pot','花盆；罐'],['room','房间'],['table','桌子'],['window','窗户'],['round','圆的'],['wide','宽的'],['narrow','窄的']])) +
    panel('补充提示：本课基础形式', '<p><b>I</b> 始终使用大写字母。<b>it</b> 是代词；<b>am / is / are</b> 是 be 的现在时形式。</p>') +
    panel('2. 名词的单数与复数', '<p>本课先学习规则复数：通常在名词后加 <b>-s</b>。</p>' +
      '<div class="lesson-examples"><p>bed → beds</p><p>door → doors</p><p>pot → pots</p></div>' +
      '<p>一个名词指一个对象时，要留意它前面的限定词；复数名词不使用 a。</p>') +
    panel('3. 形容词放在哪里', '<p>描述性形容词有两种常见位置：</p>' +
      '<div class="lesson-rule"><b>形容词 + 名词</b><p>a round window（一扇圆窗）</p><p>the narrow door（那扇窄门）</p></div>' +
      '<div class="lesson-rule"><b>be + 形容词</b><p>The room is narrow.（房间很窄。）</p><p>The window is wide.（窗户很宽。）</p></div>' +
      '<p>形容词本身不因名词单复数而变化：a wide door / wide doors。</p>') +
    panel('4. a、an 和 the', '<p><b>a / an</b> 用于单数可数名词，表示某一个，不特别指出是哪一个。元音发音开头的词前用 an。</p>' +
      '<p><b>the</b> 用于已经明确、前文提过或语境中可以确定的对象。</p>' +
      '<div class="lesson-examples"><p>This is a bed. The bed is narrow.</p><p>A flower is under the table.</p><p>A house is a building.</p></div>' +
      '<p>注意：a 不用于复数名词。泛指复数时可直接使用复数形式，例如 Houses are buildings.</p>') +
    panel('5. this / that 与复数形式', '<div class="lesson-table"><div><b>单数</b><b>复数</b></div><div><span>this</span><span>these</span></div><div><span>that</span><span>those</span></div></div>' +
      '<p>this 指说话者附近的对象；that 指较远的对象。它们放在名词前时也要与单复数对应。</p>' +
      '<div class="lesson-examples"><p>This window is wide. → These windows are wide.</p><p>That window is narrow. → Those windows are narrow.</p></div>') +
    panel('6. 本课三个核心 operator', '<div class="lesson-table"><div><b>原形</b><b>现在</b><b>过去</b><b>将来</b></div>' +
      '<div><span>be</span><span>am / is / are</span><span>was / were</span><span>will be</span></div>' +
      '<div><span>put</span><span>put / puts</span><span>put</span><span>will put</span></div>' +
      '<div><span>take</span><span>take / takes</span><span>took</span><span>will take</span></div></div>' +
      '<p>本课重点先掌握 be 的 am / is / are，以及 put、take 的现在时。第三人称单数：he / she / it puts、takes。</p>' +
      '<div class="lesson-examples"><p>I put the pot on the table.</p><p>I take the pot off the table.</p></div>') +
    panel('7. 位置词与基本语序', '<p>第一课把介词当作空间位置或方向来学习，再与 put、take 组合。</p>' +
      '<div class="lesson-examples"><p>The bed is against the door.</p><p>The bed is between the windows.</p><p>The table is by the bed.</p><p>The bed is in the room.</p><p>The pot is on the table.</p><p>The pot is off the table.</p><p>This room is over my room.</p><p>My room is under this room.</p></div>' +
      '<p>基本陈述句先按“主语 + operator + 其他部分”组织，例如：I put a pot on the round table.</p>' +
      '<p><b>and</b> 可以连接词、短语或完整陈述。and 连接两个单数名词作主语时，operator 用复数：A bed and a table are in the room.</p>') +
    panel('8. 练习', '<p><b>练习 A：写四句话。</b> 每句话分别使用 between、by、in、on 中的一个位置词，描述房间里的物品。</p>' +
      writingBox('step1-writing','Write four short sentences using between, by, in and on.') +
      '<p><b>练习 B：写出反义词。</b></p><div class="lesson-examples"><p>that → ?　narrow → ?　put → ?</p><p>off → ?　over → ?　these → ?</p></div>' +
      answer('step1-answers','查看参考答案','<p>this；wide；take；on；under；those。</p>') +
      '<p><b>练习 C：填入 is / are / a / the。</b></p><div class="lesson-examples"><p>1. _____ window in this room _____ round.</p><p>2. This _____ _____ room in my house.</p><p>3. The pot _____ on the table.</p><p>4. I take _____ pot off the table.</p><p>5. That _____ my flower.</p><p>6. _____ flower _____ in a pot.</p></div>' +
      answer('step1-fill','查看参考答案','<p>1. The / is　2. is / a　3. is　4. the　5. is　6. The / is。</p>') +
      '<p><b>练习 D：把句子改成复数。</b> This narrow bed is between the windows.</p>' +
      answer('step1-plural','查看参考答案','<p>These narrow beds are between the windows.</p>'));

  lessonHTML[2] =
    panel('1. 本课词汇', '<p>先学习本课新增的 10 个名词和 2 个形容词。点击单词可以听发音。</p>' +
      vocab([['book','书'],['cover','覆盖物；床罩'],['curtain','窗帘'],['cushion','靠垫'],['drawer','抽屉'],['floor','地板'],['frame','框；画框'],['picture','图画'],['seat','座位'],['wall','墙'],['black','黑色的'],['white','白色的']])) +
    panel('2. 阅读：My Room', '<p class="lesson-instruction">下面保留原版 Step 2 的阅读内容，并配上中文翻译。</p>' +
      '<div class="lesson-passage"><p>This building is a house. It is a white house. My room is in this white house. This is my room. My bed is against this wall. It is under the wide window. My books are on that narrow, black table between the bed and the door. Those are my books. A picture in a frame is on the wall over the books.</p>' +
      '<p class="lesson-translation">这栋建筑是一所房子。它是一所白色的房子。我的房间就在这所白色房子里。这是我的房间。我的床靠着这面墙，在宽窗户下面。我的书在那张黑色的窄桌子上，桌子位于床和门之间。那些是我的书。一幅装在画框里的图画挂在书上方的墙上。</p>' +
      '<p>The walls are white and the floor is black. The curtains over the bed are black. A cover and cushions are on the bed. The cushions are against the wall.</p>' +
      '<p class="lesson-translation">墙是白色的，地板是黑色的。床上方的窗帘是黑色的。床上有床罩和靠垫。靠垫靠着墙。</p>' +
      '<p>My seat is by the round table. It is between the table and the bed. That seat is between the table and the door. The pot on the table is round and black. These flowers are in the pot. A white flower is on the floor under the table.</p>' +
      '<p class="lesson-translation">我的座位在圆桌旁边。它位于桌子和床之间。那个座位位于桌子和门之间。桌子上的花盆是圆形的，也是黑色的。这些花在花盆里。一朵白花在桌子下面的地板上。</p>' +
      '<p>I take the white flower off the floor and put it in the pot. I take the pot off this table and put it by the books. I take a book off that table and put it in the drawer. I put this round cushion on a seat and I put this cushion on the floor. I take the cover off my bed and put it on a seat.</p>' +
      '<p class="lesson-translation">我把地板上的白花拿起来，放进花盆里。我把这个桌子上的花盆拿下来，放到书旁边。我把那张桌子上的一本书拿下来，放进抽屉里。我把这个圆靠垫放在一个座位上，又把这个靠垫放在地板上。我把床上的床罩拿下来，放在一个座位上。</p></div>') +
    panel('3. 句子结构拆解', '<div class="lesson-rule"><b>That narrow, black table</b><p>名词前有两个或更多描述性形容词时，形容词之间通常用逗号隔开。</p></div>' +
      '<div class="lesson-rule"><b>The pot is round and black.</b><p>两个形容词放在 be 后面共同描述主语时，要用 and 连接。</p></div>' +
      '<div class="lesson-rule"><b>On the wall</b><p>on 所表示的表面不一定是水平面；挂在墙上的图画也可以说 picture on the wall。</p></div>' +
      '<div class="lesson-rule"><b>I take the flower off the floor and put it in the pot.</b><p>and 连接两个动作且主语相同时，第二个分句通常不重复主语 I。</p></div>') +
    panel('4. 图示单词匹配', '<p>看下面这幅重新绘制的房间示意图，把编号与本课 10 个名词对应起来。图示是本软件制作的练习图，不是原版插图。</p>' +
      roomMatch()) +
    panel('5. 造句练习', '<p>原版练习要求描述图中的物品、说出房子的组成部分，并练习 put / take 与位置词。</p>' +
      '<p><b>A. 写五句话描述上面的房间图。</b></p>' +
      writingBox('step2-writing-a','Write five sentences about the room. Use words from this lesson.') +
      '<p><b>B. 写出房子的五个部分。</b> 可以使用 wall、floor、door、window 等词。</p>' +
      writingBox('step2-writing-b','Write five parts of a house in English.') +
      answer('step2-house-parts','查看参考答案','<p>wall；floor；roof；door；window。</p>') +
      '<p><b>C. 按句型造句。</b> 练习 put + against / between / by，take + off；再用 is / are + in / on / over / under。</p>' +
      writingBox('step2-writing-c','Write at least four sentences using the patterns above.') +
      answer('step2-models','查看参考句','<p>Put the cushion against the wall.</p><p>Put the seat between the table and the bed.</p><p>Put the book by the books.</p><p>I take the book off the table.</p><p>The books are on the table.</p><p>The flower is under the table.</p><p>The picture is over the books.</p><p>The flowers are in the pot.</p>') +
      '<p><b>D. 阅读理解。</b></p><div class="lesson-examples"><p>1. Which table are the seats by?</p><p>2. Where is the white flower?</p><p>3. Where are your books?</p><p>4. What do you do with the cover on your bed?</p><p>5. What color are the curtains?</p><p>6. Describe the pot on the table.</p></div>' +
      answer('step2-reading-answers','查看参考答案','<p>1. The round table.</p><p>2. It is on the floor under the table.</p><p>3. They are on the narrow, black table between the bed and the door.</p><p>4. I take it off my bed and put it on a seat.</p><p>5. They are black.</p><p>6. It is round and black.</p>'));

  lessonHTML[3] =
    panel('1. 本课词汇', '<p>本课增加与人物、物品、移动和交付有关的词。</p>' +
      vocab([['arm','手臂'],['box','盒子'],['hand','手'],['man','男人'],['office','办公室'],['pocket','口袋'],['shelf','架子'],['ticket','票'],['side','侧面'],['other','其他的'],['across','穿过']])) +
    panel('本课结构词', '<p>本课同时学习以下方向词、关系词和代词。点击可听发音。</p>' + vocab([['come','来'],['go','去'],['give','给'],['get','得到；拿到'],['across','穿过'],['at','在；位于'],['of','……的'],['to','到；给'],['from','从'],['with','和；带有'],['here','这里'],['there','那里']])) +
    panel('代词形式（语法形式）', '<p>原版课程在本课学习 he / she 等第三人称代词形式。这些由代词表管理，不另计入 850 个基础词。</p>' + vocab([['he','他'],['she','她'],['him','他（宾格）'],['her','她（宾格／所有格）'],['his','他的'],['me','我（宾格）'],['my','我的']])) +
    panel('2. 名词复数的变化', '<p>本课在规则复数之外，加入三类拼写变化。</p>' +
      '<div class="lesson-examples"><p>man → men；woman → women（不规则）</p><p>box → boxes（以 x 结尾，加 -es）</p><p>shelf → shelves（部分以 f / fe 结尾的词变为 -ves）</p></div>' +
      '<p>名词放在另一个名词前作限定时，通常保持单数：office floor（办公室的地板）、side door（侧门）。</p>') +
    panel('3. other、a / an 与代词', '<p><b>other</b> 是非描述性限定词，放在名词前；它可以与 my 等词一起使用。</p>' +
      '<div class="lesson-examples"><p>The other ticket is in my other pocket.</p><p>Other white tickets are in the box.</p><p>An office. An arm.</p></div>' +
      '<p>an 用在元音发音开头的词前。宾格代词 me / him / her 等用于 operator（be 以外）和介词之后。</p>') +
    panel('4. come / go、give / get', '<div class="lesson-table"><div><b>operator</b><b>现在时</b><b>第三人称单数</b></div><div><span>give</span><span>give</span><span>gives</span></div><div><span>get</span><span>get</span><span>gets</span></div><div><span>come</span><span>come</span><span>comes</span></div><div><span>go</span><span>go</span><span>goes</span></div></div>' +
      '<p>come：朝说话者所在位置移动。go：离开说话者所在位置。</p><p>give + to 指明接收者；get + from 指明来源。</p>' +
      '<div class="lesson-examples"><p>I give a book to the woman.</p><p>She gets it from me and gives it to the man.</p><p>He comes to my room. I go to my house.</p></div>') +
    panel('5. 本课位置关系词', '<div class="lesson-rule"><b>take from 与 take off</b><p>take from 表示从某处取走；take off 特指从一个表面上拿走。</p></div>' +
      '<div class="lesson-rule"><b>at</b><p>at 用于指出某个位置或地点。at the door 表示就在门的位置；at the table 可以表示处在可使用桌子的位置。</p></div>' +
      '<div class="lesson-rule"><b>with</b><p>with 表示伴随，也可表达某物带有另一物。</p><p>This is a box with a cover.</p></div>' +
      '<div class="lesson-rule"><b>across</b><p>表示从一边到另一边。</p><p>She goes across the room.</p></div>' +
      '<div class="lesson-rule"><b>of</b><p>常用于表示所属关系：the cover of the box。</p></div>') +
    panel('6. 否定句、复合词与语序', '<p>be 的否定：not 放在 be 后面。</p><p>This is not a shelf. The ticket is not in his hand.</p>' +
      '<p>两个名词可以组成复合词，前一个名词说明用途：bedroom、bookshelf、ticket-office。第一个名词作限定时保持单数。</p>' +
      '<p>another 表示另一个；into 表示从外面进入里面的方向。</p>' +
      '<p>句首也可以放地点短语或副词来改变信息重点：In this building, the rooms are offices.</p>') +
    panel('7. 练习', '<p><b>A. 写出复数。</b> man、woman、box、shelf。</p>' +
      answer('step3-plurals','查看参考答案','<p>men；women；boxes；shelves。</p>') +
      '<p><b>B. 选择正确的介词。</b></p><div class="lesson-examples"><p>I give a book _____ my friend.</p><p>She goes _____ me.</p><p>This side _____ the ticket is white.</p><p>I put the ticket _____ my pocket.</p></div>' +
      answer('step3-preps','查看参考答案','<p>to；with；of；in / into（按句意表示放入时，原课程说明 in 与 into 均可用于此类语境）。</p>') +
      writingBox('step3-writing','Write four sentences using give, get, come, go, with, across, at or of.') +
      answer('step3-model','查看参考句','<p>I give a ticket to the man.</p><p>She gets a book from me.</p><p>He comes to the office with her.</p><p>They go across the room.</p>'));

  lessonHTML[5] =
    panel('1. 本课词汇', '<p>本课从具体物品扩展到食物、工作、家庭和时间。</p>' +
      vocab([['country','乡村；国家'],['family','家庭'],['food','食物'],['meal','一餐'],['meat','肉'],['plate','盘子'],['town','城镇'],['place','地方'],['work','工作'],['early','早的'],['late','晚的；迟的'],['some','一些']])) +
    panel('本课结构词', '<p>这些词会在本课句子和语法说明中反复出现。</p>' + vocab([['be','是；处于'],['before','在……之前'],['after','在……之后'],['or','或者'],['do','做'],['for','为了；给'],['when','当……时'],['have','有；吃'],['will','将；会'],['where','在哪里；……的地方'],['make','制作'],['come','来'],['while','当……期间'],['may','可能；可以'],['some','一些'],['out','向外'],['but','但是']])) +
    panel('2. 名词：family 与 substance words', '<p>以辅音字母 + y 结尾的名词，变复数时把 y 改为 ies。</p>' +
      '<div class="lesson-examples"><p>family → families</p></div>' +
      '<p>本课开始区分可数名词和表示物质、活动、性质或状态的名词。后者通常不按一个一个的个体计数。</p>' +
      '<div class="lesson-rule"><b>谈论物质的一般情况</b><p>名词前不加 a / an，也不一定加 the：Meat is not black.</p></div>' +
      '<div class="lesson-rule"><b>表示不确定数量</b><p>I put food on the table.</p></div>' +
      '<div class="lesson-rule"><b>表示特定的那部分</b><p>The food is on the table.</p></div>' +
      '<p>物质名词前使用 a / an 时，表达的是“一种”；复数 foods 表示不同种类。</p>') +
    panel('3. country 与 some', '<p>country 表示乡村这一意义时，原课程把它作为特殊用法处理：通常说 <b>the country</b>，不使用复数，也不单独裸用。</p>' +
      '<p><b>some</b> 表示不确定的数量或数量大于一的对象，可放在名词前，也可单独作代词。</p>' +
      '<div class="lesson-examples"><p>He puts some food on the table.</p><p>She puts some on her plate.</p><p>Some of the meat is here.</p><p>She put some of it on her plate.</p></div>') +
    panel('4. 三个新 operator：do / have / make', '<div class="lesson-table"><div><b>原形</b><b>现在</b><b>过去</b><b>将来</b></div>' +
      '<div><span>do</span><span>do / does</span><span>did</span><span>will do</span></div>' +
      '<div><span>have</span><span>have / has</span><span>had</span><span>will have</span></div>' +
      '<div><span>make</span><span>make / makes</span><span>made</span><span>will make</span></div></div>' +
      '<p>本课要求学习表中的原形、现在时和将来时；过去时暂不作为本课掌握重点。</p>' +
      '<div class="lesson-examples"><p>I do work in the country.</p><p>They have a house in the town.</p><p>The men make a road.</p><p>She makes a curtain.</p></div>' +
      '<p>will 在所有人称前形式相同，后面接 operator 原形：He will make a seat.</p>') +
    panel('5. may 与否定句', '<p><b>may</b> 表示某事现在有可能成立，或将来有可能发生；may 后接 operator 原形。</p>' +
      '<div class="lesson-examples"><p>He may come here.</p><p>This train may be the early train.</p><p>She may take her family to the country.</p></div>' +
      '<div class="lesson-rule"><b>have 的否定</b><p>本课所讲的 have 现在时否定，把 not 放在 have / has 后面：She has not a ticket.</p></div>' +
      '<div class="lesson-rule"><b>其他 operator 的现在时否定</b><p>使用 do / does + not + operator 原形：I do not make pots. She does not do work in the store.</p></div>' +
      '<div class="lesson-rule"><b>will / may 的否定</b><p>不需要 do，直接在 will / may 后加 not：He will not give the picture to me.</p></div>') +
    panel('6. before / after / for / out / or / but / where / when / while', '<p><b>before / after</b> 可以表示空间先后，也可以表示时间先后。</p>' +
      '<p><b>for</b> 可指出用途或目的：a shelf for books。</p>' +
      '<p><b>out</b> 表示与 in 相反的空间方向：She takes it out.</p>' +
      '<p><b>or</b> 连接选择；两个单数主语由 or 连接时，operator 用单数：The man or the woman is in the house.</p>' +
      '<p><b>but</b> 连接相反或对照的陈述。</p>' +
      '<p><b>where / when / while</b> 引出地点或时间相关的从句。</p>' +
      '<div class="lesson-examples"><p>She puts the meat where the other food is.</p><p>I come into the room when the meal is on the table.</p><p>I do work while my friends are here.</p></div>') +
    panel('7. 练习', '<p><b>A. 写出复数。</b> family。</p>' + answer('step5-plural','查看参考答案','<p>families。</p>') +
      '<p><b>B. 把句子改为将来时。</b></p><div class="lesson-examples"><p>She makes a meal for the family.</p><p>The woman and her friend get some books at the store.</p><p>The porter has a flag in his hand.</p></div>' +
      answer('step5-future','查看参考答案','<p>She will make a meal for the family.</p><p>The woman and her friend will get some books at the store.</p><p>The porter will have a flag in his hand.</p>') +
      '<p><b>C. 用否定形式改写。</b></p><div class="lesson-examples"><p>They make wide roads.</p><p>She has a bag under her arm.</p><p>The family will go to the country.</p></div>' +
      answer('step5-negative','查看参考答案','<p>They do not make wide roads.</p><p>She has not a bag under her arm.（按本课原文所教的 have 否定结构）</p><p>The family will not go to the country.</p>') +
      writingBox('step5-writing','Write five sentences. Use some, have, make, do, will, may, before, after, for, when or while.') +
      answer('step5-model','查看参考句','<p>Some food is on the table.</p><p>They will have a meal after work.</p><p>She may come before the meal.</p><p>I do work while my friends are here.</p>'));

  lessonHTML[6] =
    panel('1. 本课词汇', '<p>本课通过一个家庭的日常生活，把家庭成员、时间和日常活动放进连续阅读中。</p>' +
      vocab([['day','白天；一天'],['morning','早晨'],['night','夜晚'],['fire','火；炉火'],['potato','土豆'],['father','父亲'],['mother','母亲'],['daughter','女儿'],['son','儿子'],['manager','经理'],['brother','兄弟'],['sister','姐妹'],['great','大的；很好的'],['small','小的'],['married','已婚的']])) +
    panel('2. 阅读：An English Family', '<p class="lesson-instruction">以下是依据原版故事人物和情节编写的简化阅读，不是原文逐字抄录。重点是观察已学词汇如何组成连续句子。</p>' +
      '<div class="lesson-passage"><p>The family has a small house with white curtains and boxes of flowers at the windows. The father is the manager of a small store. The mother does the work of the house. They have a daughter in the country. Their other daughter is with them. She makes cushions and curtains in the work room of a great store. Their sons are not married. A son is in the office and the other is in the store with his father.</p>' +
      '<p class="lesson-translation">这个家庭有一所小房子，窗户旁有白色窗帘和装着花的盒子。父亲是一家小商店的经理。母亲做家务。他们有一个女儿住在乡村，另一个女儿和他们住在一起。她在一家大商店的工作间里制作靠垫和窗帘。他们的儿子都没有结婚。一个儿子在办公室，另一个和父亲一起在商店工作。</p>' +
      '<p>In the morning, the daughter goes to work and takes some food with her. The men do not take food with them. The mother gets food for the meal at night. When the family comes in, she puts potatoes and meat on the table.</p>' +
      '<p class="lesson-translation">早晨，女儿去上班，并带一些食物。男人们不带食物。母亲准备晚餐。家人回来时，她把土豆和肉放在桌子上。</p>' +
      '<p>After the meal, the father takes a book and goes to the place by the fire. The daughter and her mother take the plates off the table. The sons may go out with their friends. On some nights, the family goes to the pictures. The father does not go to the pictures.</p>' +
      '<p class="lesson-translation">晚饭后，父亲拿起一本书，去炉火旁边。女儿和母亲把盘子从桌上拿走。儿子们可能和朋友外出。有些晚上，全家会去看电影。父亲不去看电影。</p></div>') +
    panel('3. 阅读中的表达', '<div class="lesson-rule"><b>full of flowers</b><p>full 后面用 of 指出里面装着什么：boxes full of flowers（装满花的盒子）。</p></div>' +
      '<div class="lesson-rule"><b>形容词 + 后置补充</b><p>当形容词后面还有介词短语等补充时，形容词可以放在名词后面，例如 a box full of flowers。</p></div>' +
      '<div class="lesson-rule"><b>时间表达</b><p>in the morning；at night；on the days / on the nights。注意这几个搭配不能简单互换。</p></div>' +
      '<div class="lesson-rule"><b>have a meal</b><p>have 与 food / meal 等词搭配时，可以表达吃饭。</p></div>' +
      '<div class="lesson-rule"><b>come in / go out</b><p>come in 可以表示回到屋内；go out 可以表示离开家外出。</p></div>' +
      '<div class="lesson-rule"><b>the pictures</b><p>在本课语境中，the pictures 指电影或电影院活动。</p></div>' +
      '<div class="lesson-rule"><b>day / night</b><p>day 可以指 24 小时的一天，也可以指有日光的白天；night 可以指黑暗时段，也可以在本课语境中指傍晚。</p></div>') +
    panel('4. 语法练习', '<p><b>A. 写出复数。</b></p><div class="lesson-examples"><p>family · potato · woman · day · box · shelf</p></div>' +
      answer('step6-plurals','查看参考答案','<p>families；potatoes；women；days；boxes；shelves。</p>') +
      '<p><b>B. 选择时间或位置介词。</b></p><div class="lesson-examples"><p>He goes to this bedroom _____ night.</p><p>_____ the day when my daughter comes from the country, I will not go out.</p><p>She has a pot _____ food in her hand.</p><p>The manager goes to his office _____ the morning.</p></div>' +
      answer('step6-preps','查看参考答案','<p>at；On；of；in。</p>') +
      '<p><b>C. 使用 or、but、while 各造一个句子。</b></p>' +
      writingBox('step6-writing','Write three sentences: one with or, one with but, and one with while.') +
      '<p><b>D. 阅读理解。</b></p><div class="lesson-examples"><p>1. What does the daughter take with her when she goes to work?</p><p>2. Where do the sons work?</p><p>3. What does the other daughter make?</p><p>4. Where do the sons sometimes go with their friends?</p><p>5. What does the father do after his meal?</p></div>' +
      answer('step6-reading','查看参考答案','<p>1. She takes some food with her.</p><p>2. A son works in the office; the other works in the store with his father.</p><p>3. She makes cushions and curtains.</p><p>4. They go out with their friends.</p><p>5. He takes a book and goes to the place by the fire.</p>'));

  lessonHTML[9] =
    panel('1. 本课词汇', '<p>本课学习人物、自然环境和位置关系词。</p>' +
      vocab([['boy','男孩'],['girl','女孩'],['bridge','桥'],['river','河流'],['tree','树'],['middle','中间'],['part','部分'],['thing','东西'],['young','年轻的'],['old','年老的；旧的'],['new','新的'],['see','看见'],['very','非常'],['because','因为'],['till','直到'],['yes','是；对']])) +
    panel('2. what：表示“……的东西”', '<p>本课把 <b>what</b> 用作连接词，表达“……的东西 / ……的事物”，意思接近 that which。</p>' +
      '<div class="lesson-examples"><p>The boy takes what the man gives him to his mother.</p><p>What I have I will keep.</p></div>' +
      '<p>第一句中 what the man gives him = 男人给他的东西；第二句中 what I have = 我所拥有的东西。</p>') +
    panel('3. old、young、new', '<p><b>old</b> 有两种常见对比：它既可以与 young（年龄）相对，也可以与 new（新旧）相对。</p>' +
      '<div class="lesson-examples"><p>a young man ↔ an old man</p><p>a new bag ↔ an old bag</p></div>') +
    panel('4. see 的形式', '<div class="lesson-table"><div><b>原形</b><b>过去</b><b>现在</b><b>将来</b></div><div><span>see</span><span>saw</span><span>see / sees</span><span>will see</span></div></div>' +
      '<p>第三人称单数现在时使用 sees。</p><div class="lesson-examples"><p>The building which you see is not a store.</p><p>You will see the things when they are ready.</p></div>') +
    panel('5. 命令句', '<p>直接使用 operator 原形，不写主语：</p><div class="lesson-examples"><p>Come with me.</p><p>Put that thing in the river.</p><p>Go to the store and take the girl with you.</p><p>Be quick!</p></div>' +
      '<p>否定命令使用 <b>Do not + operator 原形</b>。即使 operator 是 be 或 have，否定命令也使用 do not。</p>' +
      '<div class="lesson-examples"><p>Do not put the food on the floor.</p><p>Do not be slow.</p><p>Do not have a house in the country.</p></div>') +
    panel('6. be + -ing：动作正在进行', '<p>operator 加 -ing 形式，放在 be 后面，可以表示动作正在进行、尚未完成。</p>' +
      '<div class="lesson-examples"><p>The train is going across the bridge.</p><p>These men are making things for the new building.</p><p>The boy is not coming here.</p><p>I am putting the apples where you will see them.</p></div>' +
      '<p>拼写变化：giving、having、making、taking 去掉词尾 e；getting、letting、putting 双写 t。</p>' +
      '<p>表示持续状态的 have（拥有）、be、seem、see 通常不使用进行式；但 have 表示吃饭这一动作时，可以使用进行式：The boy is having a meal.</p>' +
      '<p>when / while 从句与主句主语相同时，可以省略从句中的主语和 be：When going across the bridge, you will see the boys in the river.</p>') +
    panel('7. till、very、-ly 和 because', '<div class="lesson-rule"><b>till</b><p>本课把 till 作为时间介词学习，表示“直到”。not ... till 表示“直到某时才……”。</p><p>He will be here till the morning.</p></div>' +
      '<div class="lesson-rule"><b>very</b><p>very 修饰形容词或副词，放在它们前面；不用于 out 或介词的副词用法。</p><p>This wall is part of a very old building.</p></div>' +
      '<div class="lesson-rule"><b>-ly</b><p>一些形容词加 -ly 形成副词，说明动作怎样进行。</p><p>The men are making the bridge slowly.</p><p>She does this work very quickly.</p></div>' +
      '<div class="lesson-rule"><b>because</b><p>because 引出原因从句，说明主句为什么成立。</p><p>Go to the river with the boy because he is young.</p></div>') +
    panel('8. 一般疑问句与简短回答', '<p>由 be、have、will、may 构成的一般疑问句，把 operator 或助动词放到主语前面。</p>' +
      '<div class="lesson-examples"><p>The girl is in the river. → Is the girl in the river?</p><p>You are ready. → Are you ready?</p><p>He will be ready. → Will he be ready?</p><p>Your friend has a book. → Has your friend a book?</p></div>' +
      '<p>回答时可以只重复主语和 operator / 助动词；否定回答再加 not。</p><div class="lesson-examples"><p>Will he be ready? — Yes, he will.</p><p>Is this the middle of the room? — No, it is not.</p></div>') +
    panel('9. 练习', '<p><b>A. 把句子改成进行时（动作确实正在发生时）。</b></p>' +
      '<div class="lesson-examples"><p>The train goes across the bridge.</p><p>The men make things for the new building.</p><p>The boy does not come here.</p></div>' +
      answer('step9-continuous','查看参考答案','<p>The train is going across the bridge.</p><p>The men are making things for the new building.</p><p>The boy is not coming here.</p>') +
      '<p><b>B. 把陈述句改成一般疑问句。</b></p><div class="lesson-examples"><p>All the bridges are new.</p><p>They will be ready before you see them.</p><p>The girls are going across the river.</p><p>I have a part of the branch in my hand.</p><p>The train may not go.</p></div>' +
      answer('step9-questions','查看参考答案','<p>Are all the bridges new?</p><p>Will they be ready before you see them?</p><p>Are the girls going across the river?</p><p>Have I a part of the branch in my hand?</p><p>May the train not go?</p>') +
      writingBox('step9-writing','Write three orders: one negative order with let, one with be, and one with come.') +
      answer('step9-orders','查看参考答案','<p>Do not let the girl go.</p><p>Be quick.</p><p>Come with me.</p>'));

  lessonHTML[10] =
    panel('1. 本课词汇', '<p>本课通过城镇里的建筑和街道学习新名词，以及 high / low。</p>' +
      vocab([['arch','拱门'],['glass','玻璃'],['roof','屋顶'],['time','时间'],['church','教堂'],['hospital','医院'],['library','图书馆'],['market','市场'],['prison','监狱'],['school','学校'],['advertisement','广告'],['light','光；灯光'],['pleasure','愉快'],['steel','钢'],['view','景色；视野'],['high','高的'],['low','低的']])) +
    panel('2. 阅读：A Town', '<p class="lesson-instruction">以下是依据原版 Step 10 的城镇导览内容改写的 Basic English 阅读，不是原文逐字抄录。</p>' +
      '<div class="lesson-passage"><p>Come into the town with me. I will take you to see some of our buildings. My train does not go till the end of the morning. The time will go quickly if I am with you. The station is in the middle of the town. We come out of the station into a street of stores and offices.</p>' +
      '<p class="lesson-translation">和我一起进城吧。我带你去看一些建筑。我的火车要到上午快结束时才开。如果我和你在一起，时间会过得很快。车站在城镇的中心。我们从车站出来，进入一条有商店和办公室的街道。</p>' +
      '<p>Some high buildings are made of glass and steel. They have steel frames. A building between the stores is a hospital. A young woman is on her back. The wide street has great stores with bright advertisements. The old town is near the river. The buildings across the river are in another town.</p>' +
      '<p class="lesson-translation">一些高楼由玻璃和钢建成，并有钢制框架。商店之间的一栋建筑是医院。一位年轻女子仰面躺着。宽阔的街道上有大型商店和明亮的广告。老城在河边。河对岸的建筑属于另一座城镇。</p>' +
      '<p>The library is a low building with trees in front of it. The church is in the old part of the town. Men and women come to the market from the country with bags of fruit and food. The market has almost everything for the house. The streets are narrow and the houses are low. The windows are small, so the rooms get almost no light. A high building with almost no windows is a prison.</p>' +
      '<p class="lesson-translation">图书馆是一栋低矮的建筑，前面有树。教堂在城镇的老城区。男人和女人从乡村来到市场，带着装有水果和食物的袋子。市场里几乎有所有家用物品。街道狭窄，房屋低矮。窗户很小，所以房间里几乎没有光。一栋几乎没有窗户的高楼是监狱。</p>' +
      '<p>Workmen are making a new arch on the bridge. We will not go over the bridge. I will go back to the station before my train goes.</p>' +
      '<p class="lesson-translation">工人们正在桥上建造一座新拱门。我们不从桥上走过去。火车开走之前，我会返回车站。</p></div>') +
    panel('3. 阅读中的表达', '<div class="lesson-rule"><b>in the middle of the town</b><p>middle 可以表示数学意义上的中心，也可以表示一个较宽泛的中心区域；表示城镇中心区域时使用 in the middle。</p></div>' +
      '<div class="lesson-rule"><b>made of glass and steel</b><p>of 可以指出某物由什么材料构成；名词也可以放在另一个名词前表示材料，例如 steel frames。</p></div>' +
      '<div class="lesson-rule"><b>on her back</b><p>back 在这里指人的背部；on her back 表示身体背部接触支撑面，即仰面躺着。</p></div>' +
      '<div class="lesson-rule"><b>high / low</b><p>既可以描述建筑物从底部到顶部的高度，也可以描述人或物所处的位置高低。</p></div>' +
      '<div class="lesson-rule"><b>get a view of</b><p>get 在这里表示获得、看到某种景色或视野。</p></div>' +
      '<div class="lesson-rule"><b>in front of / outside / inside</b><p>in front of 表示在某物前面；outside 是外部，inside 是内部。</p></div>' +
      '<div class="lesson-rule"><b>go over / go back</b><p>over 在这里表示越过；back 作副词时表示朝来时的方向或回到原处。</p></div>' +
      '<div class="lesson-rule"><b>early / late</b><p>可以表示一天中的早晚，也可以表示是否早于或晚于正确时间。</p></div>') +
    panel('4. 复数与复合词', '<p>本课要求注意以下复数拼写：</p><div class="lesson-examples"><p>library → libraries</p><p>boy → boys</p><p>arch → arches</p><p>glass → glasses</p><p>roof → roofs</p><p>church → churches</p></div>' +
      '<p>roof 的复数是 roofs，不按部分 f / fe 结尾名词的规则变成 -ves。</p>' +
      '<p>本课还介绍 inside、everything、workman 等复合形式。它们由已学词组合而成，但整体意义需要结合使用场景理解。</p>') +
    panel('5. 练习', '<p><b>A. 写出复数。</b> library、boy、arch、glass、roof、church。</p>' +
      answer('step10-plurals','查看参考答案','<p>libraries；boys；arches；glasses；roofs；churches。</p>') +
      '<p><b>B. 写出五个可以放入句子的词。</b></p><div class="lesson-examples"><p>Some of the _____ is here.</p></div>' +
      answer('step10-substance','查看参考答案','<p>food；meat；glass；steel；sugar。</p>') +
      '<p><b>C. 用 inside、everything、workman 各造一个句子。</b></p>' +
      writingBox('step10-writing','Write three sentences, one with inside, one with everything, and one with workman.') +
      answer('step10-model','查看参考句','<p>The inside of the house is dark.</p><p>Almost everything is in the market.</p><p>The workman is making an arch.</p>') +
      '<p><b>D. 阅读理解。</b></p><div class="lesson-examples"><p>1. Are all the new buildings made of glass and steel?</p><p>2. Is the church in the old part of the town?</p><p>3. What does Mr. B see on the other side of the river?</p><p>4. Who is on her back by the hospital?</p><p>5. What are the workmen making on the bridge?</p><p>6. Why are the rooms in the old town dark?</p></div>' +
      answer('step10-reading','查看参考答案','<p>1. No. Some are made of glass and steel.</p><p>2. Yes, it is.</p><p>3. He sees buildings in another town.</p><p>4. A young woman.</p><p>5. A new arch.</p><p>6. The streets are narrow and the windows are small, so the rooms get almost no light.</p>'));


  lessonHTML[12] =
    panel('1. 本课词汇', '<p>本课词汇来自浴室、洗澡、声音和情绪等场景。</p>' +
      vocab([['basin','洗脸盆'],['bath','浴缸；洗澡'],['drain','排水口'],['drop','水滴'],['ear','耳朵'],['kick','踢'],['laugh','笑'],['soap','肥皂'],['sponge','海绵'],['steam','蒸汽'],['waste','浪费'],['water','水'],['argument','争论'],['blow','吹；一击'],['competition','竞争'],['hour','小时'],['minute','分钟'],['song','歌曲'],['sound','声音'],['voice','嗓音'],['angry','生气的'],['quiet','安静的'],['loud','响亮的'],['waiting','等待中的'],['warm','温暖的'],['cold','寒冷的']])) +
    panel('2. 前置知识：one / ones', '<div class="course-note">原版 Step 12 使用了 Step 11 已介绍的数词 one。Step 11 的中文改编尚未完成，建议先打开原版 Step 11，再学习本节。</div>' +
      '<button class="course-primary" onclick="BE.course.openOriginal(11)">打开原版 Step 11：Trouble with a Tooth</button>' +
      '<p>one / ones 可以代替前面已经出现、而且可以计数的名词，避免重复。</p>' +
      '<div class="lesson-examples"><p>This building is a school and that one is a hospital.</p><p>Are these girls the ones with the beautiful voices?</p><p>Take another one.</p><p>Do not take my sponge. It is the one in the basin.</p></div>' +
      '<p>one 用于单数，ones 用于复数。它们可以与 a / an、no、some 等限定词，以及形容词组合：a new one、an old one、no red ones、some green ones。</p>' +
      '<p>one 也可以代替 a / an 加名词；that / those 可以代替前面提到的名词，尤其用于 of 前表示所属关系：The voice is that of my mother. My hands are warm but those of my sister are cold.</p>') +
    panel('3. do 代替前面出现过的 operator', '<p>do 除了作 operator 和构成否定句，还可以代替前面已经说过的 operator 或整个动作短语，避免重复。</p>' +
      '<div class="lesson-examples"><p>Make no sound till I do.（do = make a sound）</p><p>My son will go if the others do.（do = go）</p></div>' +
      '<p>do 不能代替 be。</p>') +
    panel('4. only、still、why、again', '<div class="lesson-rule"><b>only</b><p>only 放在它所限定的部分前面，不只可以限定副词，也可以限定名词或代词。</p><p>There is only water in the pot.</p><p>The house has only one door.</p></div>' +
      '<div class="lesson-rule"><b>still</b><p>普通 operator 前：The water still seems cold.</p><p>be 后：He is still here.</p><p>助动词后、完成 operator 前：Your friend will still be waiting.</p><p>疑问句主语后：Is she still angry?</p><p>注意否定位置会改变意思：He is not still here = 他已经不在这里；He is still not here = 他到现在还没来。</p></div>' +
      '<div class="lesson-rule"><b>why</b><p>why 可以表示“……的原因”，引出原因相关的说明：That is why the room is full of steam.</p></div>' +
      '<div class="lesson-rule"><b>again</b><p>again 通常放在它所修饰的陈述句末尾：You will not see that advertisement again.</p></div>') +
    panel('5. high / low / early / late 作副词', '<p>表示空间或时间位置的形容词，可以不加 -ly，直接作副词使用。</p>' +
      '<div class="lesson-examples"><p>Do not go very high.</p><p>The birds will not come low.</p><p>She has her meal early.</p><p>The trains go from this station quite late.</p></div>') +
    panel('6. 时间介词：at / in / on', '<p>英语用 at、in、on 表达时间时，与空间位置的思路相似：at 表示时间点，on 表示时间线上的某一天或某个具体时段，in 表示一段时间范围。</p>' +
      '<div class="lesson-rule"><b>at：时间点</b><p>at this minute；at that time。</p></div>' +
      '<div class="lesson-rule"><b>in：一段时间范围</b><p>in the morning；in the day。in the night 特指夜晚中间的时段。</p></div>' +
      '<div class="lesson-rule"><b>on：某个具体的早晨、白天或夜晚</b><p>on dark nights；on some mornings；on that night。限定词已经明确时，on 有时可以省略。</p></div>' +
      '<p>记忆方法：时间点用 at，时间线上的某一天或某个具体时段用 on，一段时间范围用 in。</p>') +
    panel('7. 阅读：At the Bathroom Door', '<p class="lesson-instruction">以下按原版 Step 12 的人物关系和事件顺序改写，保留本课重点词汇与句型，不是原文逐字抄录。</p>' +
      '<div class="lesson-passage"><p>A man is waiting outside the bathroom door. The other man is in the bath. The man outside says, “Are you in the bath?” The other man says, “Yes.” The man outside says, “Please be quick. I am waiting. Do not take all the warm water.”</p>' +
      '<p class="lesson-translation">一个男人正在浴室门外等候。另一个男人正在洗澡。门外的男人问：“你在洗澡吗？”里面的男人回答：“是。”门外的男人说：“请快一点。我还在等。不要把温水都用完。”</p>' +
      '<p>The man in the bath says, “I am only letting in some cold water. The water is very warm this morning.” Some time goes by. The man outside is still waiting. The sound of a song comes from the bathroom. The man outside gives the door a blow.</p>' +
      '<p class="lesson-translation">浴缸里的男人说：“我只是在放进一些冷水。今天早晨的水很暖和。”过了一段时间。门外的男人仍在等待。浴室里传出歌声。门外的男人敲了一下门。</p>' +
      '<p>The man in the bath says, “Are you still there?” The man outside says, “I will be late for work again if I do not get my bath.” The man in the bath says, “You will get a bath before I do if you get up before I do.” The man outside says, “The water is not warm early in the morning. This competition for the bath makes me angry.”</p>' +
      '<p class="lesson-translation">浴缸里的男人说：“你还在外面吗？”门外的男人说：“如果我不能尽快洗澡，我上班又要迟到了。”浴缸里的男人说：“如果你比我早起，你就会比我先洗澡。”门外的男人说：“清晨的水不暖和。每天为了洗澡而竞争让我很生气。”</p>' +
      '<p>The man in the bath says, “This argument is a great waste of time. Be quiet for a minute. Go and get a new bit of soap while you are waiting.” The man outside goes to his room and gets soap. When he comes back, the other man is still in the bathroom. He gives the door a kick.</p>' +
      '<p class="lesson-translation">浴缸里的男人说：“这场争论真是浪费时间。安静一分钟。等着的时候去拿一块新肥皂。”门外的男人回房间拿肥皂。他回来时，另一个男人仍在浴室里。他踢了一下门。</p>' +
      '<p>The man in the bath lets the water out. The man outside gives the door a pull. The other man gives a push from the other side. The man outside goes down on his back. The other man comes out and gives a laugh. He says, “Your bath is ready. Be quick.” He gives a sponge and a bit of soap to the man.</p>' +
      '<p class="lesson-translation">浴缸里的男人把水放掉。门外的男人拉门，里面的男人从另一边推门。门外的男人仰面倒下。里面的男人出来后笑了。他说：“你的浴缸准备好了。快一点。”他把海绵和一块肥皂递给门外的男人。</p>' +
      '<p>The man goes into the bathroom. It is full of steam and water. He puts his hand in the bath. The water is almost cold. He lets out the water and has a wash.</p>' +
      '<p class="lesson-translation">门外的男人走进浴室。里面满是蒸汽和水。他把手伸进浴缸。水几乎是冷的。他把水放掉，然后洗了洗。</p></div>') +
    panel('8. 阅读中的 operator 搭配', '<div class="lesson-rule"><b>do work / give a blow / have a bath</b><p>英语常用 operator + 动作名词表达动作：do work、give a blow、have a bath。选择哪个 operator 取决于固定搭配和动作含义；原版给出的分类只是理解方向，不是可以机械套用的绝对规则。</p></div>' +
      '<div class="lesson-rule"><b>in a minute</b><p>in + a/an + 时间词，可以表示经过这段时间之后：I will be out in a minute。</p><p>have my bath in an hour 则可以表示洗澡这个过程需要一小时，具体意思由语境决定。</p></div>' +
      '<div class="lesson-rule"><b>go back to bed / get up</b><p>bed 表示睡觉、休息的状态时，可以不加 a / the；get up 可以表示从床上起来。</p></div>' +
      '<div class="lesson-rule"><b>angry with</b><p>angry 后面用 with 指出产生愤怒情绪的对象：angry with me。</p></div>' +
      '<div class="lesson-rule"><b>angrily</b><p>以辅音字母 + y 结尾的形容词加 -ly 时，y 改为 i：angry → angrily。</p></div>' +
      '<div class="lesson-rule"><b>take + 时间</b><p>take 可以表示占用或需要一段时间：The bath takes almost an hour。</p></div>' +
      '<div class="lesson-rule"><b>everywhere / somewhere / nowhere</b><p>这些复合副词分别表示每个地方、某个地方、没有任何地方。</p></div>') +
    panel('9. 练习', '<p><b>A. 用 one / ones 填空。</b></p><div class="lesson-examples"><p>1. This building is a school and that _____ is a hospital.</p><p>2. Are these girls the _____ with the beautiful voices?</p><p>3. Take another _____.</p><p>4. We have no red _____.</p></div>' +
      answer('step12-ones','查看参考答案','<p>one；ones；one；ones。</p>') +
      '<p><b>B. 用 do 代替重复的 operator。</b></p><div class="lesson-examples"><p>Make no sound till I make a sound.</p><p>My son will go if the others go.</p></div>' +
      answer('step12-do','查看参考答案','<p>Make no sound till I do.</p><p>My son will go if the others do.</p>') +
      '<p><b>C. 选择 at / in / on。</b></p><div class="lesson-examples"><p>1. I am in pain _____ this minute.</p><p>2. She does no work _____ the day.</p><p>3. My mother does not go out _____ dark nights.</p><p>4. _____ some mornings he is late.</p><p>5. The men may get out of the prison _____ the night.</p></div>' +
      answer('step12-time','查看参考答案','<p>at；in；on；On；in。</p>') +
      '<p><b>D. 用 only、still、again、why 造句。</b></p>' +
      writingBox('step12-writing','Write four sentences, one with each of these words: only, still, again, why.') +
      answer('step12-model','查看参考句','<p>There is only water in the pot.</p><p>He is still here.</p><p>You will not see that advertisement again.</p><p>That is why the room is full of steam.</p>') +
      '<p><b>E. 阅读理解。</b></p><div class="lesson-examples"><p>1. Why is the man outside the bathroom angry?</p><p>2. What does the man in the bath ask the other man to get?</p><p>3. What does the man outside do when he comes back?</p><p>4. What happens when one man pulls the door and the other pushes it?</p><p>5. What is the water like when the man puts his hand in the bath?</p></div>' +
      answer('step12-reading','查看参考答案','<p>1. The competition for the bath makes him angry.</p><p>2. He asks him to get a new bit of soap.</p><p>3. He gives the door a kick.</p><p>4. The man outside goes down on his back.</p><p>5. The water is almost cold.</p>'));


  function render() {
    const main = document.getElementById('main-content');
    if (main) main.innerHTML = courseShell();
  }

  function open(n) {
    const main = document.getElementById('main-content');
    if (!main) return;
    if (!lessonHTML[n]) return openOriginal(n);
    const step = steps.find(function (s) { return s.n === n; });
    const prerequisite = n === 12 ? '<div class="course-note">前置知识：本课会用到 Step 11 引入的数词 one。Step 11 尚未完成中文改编，请先查看原版课程。</div><button class="course-primary" onclick="BE.course.openOriginal(11)">打开原版 Step 11</button>' : '';
    main.innerHTML = '<section class="course-page">' +
      lessonHeader(n, step.en, step.title + ' · ' + step.kind) +
      '<div class="course-lesson-meta">本课是 45 步原版课程中的第 ' + n + ' 步。按顺序学习词汇、句型、阅读和练习。</div>' +
      prerequisite + lessonHTML[n] +
      '<button class="course-back" onclick="BE.course.render()">← 返回课程目录</button></section>';
    window.scrollTo(0, 0);
  }

  function say(word) {
    if (window.BE && window.BE.speak) window.BE.speak(word, 0.85);
  }

  function checkWriting(inputId, feedbackId) {
    const box = document.getElementById(inputId);
    const feedback = document.getElementById(feedbackId);
    if (!box || !feedback) return;
    const text = box.value.trim();
    if (!text) {
      feedback.textContent = '先写一句或几句英语，再检查。';
      feedback.classList.remove('is-ok');
      return;
    }
    const result = window.BE.validate(text);
    if (result && result.valid) {
      feedback.textContent = '词汇检查通过：没有发现超出当前 Basic 词汇规则的单词。语法和句意仍需自己核对。';
      feedback.classList.add('is-ok');
    } else {
      const bad = result && result.errors ? result.errors.map(function (item) { return item.word; }).join('、') : '无法识别的词';
      feedback.textContent = '发现不在词汇规则中的词：' + bad + '。请检查是否可以换成 850 词或允许的派生形式。';
      feedback.classList.remove('is-ok');
    }
  }

  function checkRoomMatch() {
    const expected = ['book','cover','curtain','cushion','drawer','floor','frame','picture','seat','wall'];
    let correct = 0;
    for (let i = 0; i < expected.length; i++) {
      const input = document.getElementById('room-match-' + (i + 1));
      if (input && input.value === expected[i]) correct++;
    }
    const feedback = document.getElementById('room-match-feedback');
    if (!feedback) return;
    feedback.textContent = '答对 ' + correct + ' / 10。' + (correct === 10 ? '全部正确！' : '再检查图中的编号与物品。');
    feedback.classList.toggle('is-ok', correct === 10);
  }

  window.BE = window.BE || {};
  window.BE.course = { render: render, open: open, openOriginal: openOriginal, say: say, checkWriting: checkWriting, checkRoomMatch: checkRoomMatch };
})();
