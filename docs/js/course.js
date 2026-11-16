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

  const lessons = [1, 2, 3, 5, 6];

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
      '<div class="course-note">目前已完成 5 / 45 课的中文教学改编：Step 1、2、3、5、6。其余步骤保留原版入口，尚未改编的内容不会冒充已完成课程。</div></header>' +
      '<div class="course-progress"><strong>45 个原版步骤</strong><span>已改编：5 课 · 下一步：Step 4</span></div>' +
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
      '<p><b>C. 按句型造句。</b> 练习 put + against / between / by，take + off；再用 is / are + in / on / over / under。</p>' +
      writingBox('step2-writing-c','Write at least four sentences using the patterns above.') +
      answer('step2-models','查看参考句','<p>Put the cushion against the wall.</p><p>Put the seat between the table and the bed.</p><p>Put the book by the books.</p><p>I take the book off the table.</p><p>The books are on the table.</p><p>The flower is under the table.</p><p>The picture is over the books.</p><p>The flowers are in the pot.</p>') +
      '<p><b>D. 阅读理解。</b></p><div class="lesson-examples"><p>1. Which table are the seats by?</p><p>2. Where is the white flower?</p><p>3. Where are your books?</p><p>4. What do you do with the cover on your bed?</p><p>5. What color are the curtains?</p><p>6. Describe the pot on the table.</p></div>' +
      answer('step2-reading-answers','查看参考答案','<p>1. The round table.</p><p>2. It is on the floor under the table.</p><p>3. They are on the narrow, black table between the bed and the door.</p><p>4. I take it off my bed and put it on a seat.</p><p>5. They are black.</p><p>6. It is round and black.</p>'));

  lessonHTML[3] =
    panel('1. 本课词汇', '<p>本课增加与人物、物品、移动和交付有关的词。</p>' +
      vocab([['arm','手臂'],['box','盒子'],['hand','手'],['man','男人'],['office','办公室'],['pocket','口袋'],['shelf','架子'],['ticket','票'],['side','侧面'],['other','其他的'],['across','穿过']])) +
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
      '<div class="lesson-rule"><b>the pictures</b><p>在本课语境中，the pictures 指电影或电影院活动。</p></div>') +
    panel('4. 语法练习', '<p><b>A. 写出复数。</b></p><div class="lesson-examples"><p>family · potato · woman · day · box · shelf</p></div>' +
      answer('step6-plurals','查看参考答案','<p>families；potatoes；women；days；boxes；shelves。</p>') +
      '<p><b>B. 选择时间或位置介词。</b></p><div class="lesson-examples"><p>He goes to this bedroom _____ night.</p><p>_____ the day when my daughter comes from the country, I will not go out.</p><p>She has a pot _____ food in her hand.</p><p>The manager goes to his office _____ the morning.</p></div>' +
      answer('step6-preps','查看参考答案','<p>at；On；of；in。</p>') +
      '<p><b>C. 使用 or、but、while 各造一个句子。</b></p>' +
      writingBox('step6-writing','Write three sentences: one with or, one with but, and one with while.') +
      '<p><b>D. 阅读理解。</b></p><div class="lesson-examples"><p>1. What does Ellen take with her when she goes out to work?</p><p>2. Which bedroom do Tom and Fred have?</p><p>3. What work does Ellen do?</p><p>4. Where do Tom and Fred sometimes take their mother and sister?</p><p>5. What does Mr. Robinson do after his meal?</p></div>' +
      answer('step6-reading','查看参考答案','<p>1. She takes some food with her.</p><p>2. They have a bedroom at the back of the house.</p><p>3. She makes cushions and curtains in a store.</p><p>4. They take them to the pictures.</p><p>5. He takes a book and goes to the place by the fire.</p>'));

  function render() {
    const main = document.getElementById('main-content');
    if (main) main.innerHTML = courseShell();
  }

  function open(n) {
    const main = document.getElementById('main-content');
    if (!main) return;
    if (!lessonHTML[n]) return openOriginal(n);
    const step = steps.find(function (s) { return s.n === n; });
    main.innerHTML = '<section class="course-page">' +
      lessonHeader(n, step.en, step.title + ' · ' + step.kind) +
      '<div class="course-lesson-meta">本课是 45 步原版课程中的第 ' + n + ' 步。按顺序学习词汇、句型、阅读和练习。</div>' +
      lessonHTML[n] +
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
