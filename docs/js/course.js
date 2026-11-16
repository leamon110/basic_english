// ============================================================
// BASIC ENGLISH COURSE — Chinese-guided lessons
// The 45-step sequence follows the public 1930 Ogden course index.
// Step 2 lesson content is transcribed/adapted from the public course.
// ============================================================

(function () {
  const steps = [
    ["词汇与结构", "Vocabulary and Structure"],
    ["我的房间", "My Room"],
    ["词汇与结构", "Vocabulary and Structure"],
    ["在车站", "At the Station"],
    ["词汇与结构", "Vocabulary and Structure"],
    ["一个英国家庭", "An English Family"],
    ["词汇与结构", "Vocabulary and Structure"],
    ["在花园里", "In the Garden"],
    ["词汇与结构", "Vocabulary and Structure"],
    ["一座城镇", "A Town"],
    ["牙齿的问题", "Trouble with a Tooth"],
    ["浴室的门", "Bathroom Door"],
    ["词汇与结构", "Vocabulary and Structure"],
    ["一艘船进港", "A Ship Comes In"],
    ["词汇与结构", "Vocabulary and Structure"],
    ["火车上的谈话", "A Talk in the Train"],
    ["词汇与结构", "Vocabulary and Structure"],
    ["一天结束时", "At the End of the Day"],
    ["老朋友的消息", "News of Old Friends"],
    ["谈论天气", "A Talk about the Weather"],
    ["夏日时光", "Summer Time"],
    ["词汇与结构", "Vocabulary and Structure"],
    ["起床前的最后一分钟", "The Last Minute in Bed"],
    ["请一位新厨师", "Getting a New Cook"],
    ["在办公室", "At the Office"],
    ["看一所房子", "Looking at a House"],
    ["税", "Taxes"],
    ["拍照", "Getting One's Picture Taken"],
    ["裁缝店", "The Dressmaker"],
    ["钓鱼", "Fishing"],
    ["家务", "Housework"],
    ["搬家", "Moving In"],
    ["人与机器", "Men and Machines"],
    ["看图", "Looking at Pictures"],
    ["战争与和平", "War and Peace"],
    ["一个贫困家庭", "A Poor Family"],
    ["收音机", "The Radio"],
    ["城里的一天", "A Day in Town"],
    ["电话交谈", "A Talk on the Telephone"],
    ["给朋友的一封信", "A Letter to a Friend"],
    ["购物", "Goes Marketing"],
    ["日常所需的 Basic English", "Basic for Everyday Needs"],
    ["去看电影", "Going to the Pictures"],
    ["撞击", "The Smash"],
    ["关于英国的一些笔记", "Some Notes about England"]
  ];

  function courseShell() {
    const cards = steps.map((s, i) => {
      const n = i + 1;
      const ready = n === 2;
      return '<button class="course-step ' + (ready ? 'course-step-ready' : '') + '" ' +
        (ready ? 'onclick="BE.course.open(2)"' : 'onclick="BE.course.openOriginal(' + n + ')"') + '>' +
        '<span class="course-step-no">Step ' + n + '</span>' +
        '<span class="course-step-cn">' + s[0] + '</span>' +
        '<span class="course-step-en">' + s[1] + '</span>' +
        '<span class="course-step-state">' + (ready ? '进入课程 →' : '查看原课程 ↗') + '</span></button>';
    }).join('');

    return '<section class="course-page">' +
      '<header class="course-hero"><p class="course-kicker">C. K. Ogden · 1930 原版课程顺序</p>' +
      '<h1>循序渐进地学会使用 850 个词</h1>' +
      '<p>不只记单词。每一步都围绕词汇、句子结构、阅读和自己造句展开。</p>' +
      '<div class="course-note">课程目录按原版 45 Steps 整理。目前已制作可交互的 Step 2 示范课；其他步骤先链接原课程，尚未全部改编完成。</div></header>' +
      '<div class="course-progress"><strong>45 个步骤</strong><span>已制作：Step 2 示范课</span></div>' +
      '<div class="course-grid">' + cards + '</div></section>';
  }

  function openOriginal(n) {
    window.open('https://basicenglish.org/step-' + n + '/index.html', '_blank', 'noopener');
  }

  function open(n) {
    if (n !== 2) return openOriginal(n);
    const main = document.getElementById('main-content');
    if (!main) return;
    main.innerHTML = '<section class="course-page"><button class="course-back" onclick="BE.course.render()">← 返回 45 步课程</button>' +
      '<header class="course-hero"><p class="course-kicker">STEP 2 · VOCABULARY AND READING</p>' +
      '<h1>My Room · 我的房间</h1><p>本课学习如何描述房间里的物品，以及物品之间的位置关系。</p></header>' +
      '<section class="lesson-panel"><h2>1. 本课词汇</h2><p>先认读这些词，再看它们如何进入句子。</p>' +
      '<div class="lesson-words">' +
      [['book','书'],['cover','覆盖物；床罩'],['curtain','窗帘'],['cushion','靠垫'],['drawer','抽屉'],['floor','地板'],['frame','框；画框'],['picture','图画'],['seat','座位'],['wall','墙'],['black','黑色的'],['white','白色的']].map(w =>
        '<button class="lesson-word" onclick="BE.course.say(\'' + w[0] + '\')"><b>' + w[0] + '</b><span>' + w[1] + '</span><small>▶ 发音</small></button>'
      ).join('') + '</div></section>' +
      '<section class="lesson-panel"><h2>2. 阅读：My Room</h2>' +
      '<p class="lesson-instruction">先读英文，再看中文意思。注意每句话如何描述物品和位置。</p>' +
      '<div class="lesson-passage"><p>My room is in this white house. My bed is against this wall. It is under the wide window. My books are on that narrow, black table between the bed and the door.</p>' +
      '<p>我的房间在这栋白色房子里。我的床靠着这面墙，在宽窗户下面。我的书在那张黑色的窄桌子上，桌子在床和门之间。</p>' +
      '<p>A picture in a frame is on the wall over the books. The curtains over the bed are black. A cover and cushions are on the bed.</p>' +
      '<p>一幅装在画框里的图画挂在书上方的墙上。床上方的窗帘是黑色的。床上有床罩和靠垫。</p>' +
      '<p>I take the white flower off the floor and put it in the pot.</p>' +
      '<p>我把地板上的白花拿起来，放进花盆里。</p></div></section>' +
      '<section class="lesson-panel"><h2>3. 句子拆解</h2>' +
      '<div class="lesson-rule"><b>My bed is against this wall.</b><p>My bed（主语）+ is（be 动词）+ against this wall（位置）。</p><p><b>against</b> 表示贴着、靠着某个面。</p></div>' +
      '<div class="lesson-rule"><b>My books are on that table.</b><p>My books 是复数，所以使用 are；on 表示在某个表面上，不限于水平表面。</p></div>' +
      '<div class="lesson-rule"><b>I take the flower off the floor and put it in the pot.</b><p>同一个主语 I 连续执行 take 和 put 两个动作，因此第二个动作前不必重复 I。take ... off 表示从某处拿走；put ... in 表示放进某处。</p></div>' +
      '<div class="lesson-rule"><b>That narrow, black table.</b><p>名词前有两个描述性形容词时，可以用逗号隔开。形容词放在名词前。</p></div></section>' +
      '<section class="lesson-panel"><h2>4. 替换练习：自己组合句子</h2><p>观察句型：<b>The book is on the table.</b> 把地点换成下面的词，读出新句子。</p>' +
      '<div class="lesson-pattern"><span>The book is</span><b>on</b><span>the table.</span></div>' +
      '<div class="lesson-chips"><span>under the table</span><span>by the bed</span><span>in the drawer</span><span>between the bed and the door</span></div>' +
      '<p>再看动作句型：<b>I put the book in the drawer.</b></p><p>替换物品或地点，就能表达新的意思。</p></section>' +
      '<section class="lesson-panel"><h2>5. 轮到你造句</h2><p>请用本课词汇和位置词，写出三个描述房间的英语句子。可以先模仿上面的例句。</p>' +
      '<textarea id="course-answer" rows="4" placeholder="例如：My book is on the table."></textarea>' +
      '<button class="course-primary" onclick="BE.course.checkWriting()">检查是否只使用 Basic 词汇</button><div id="course-feedback" class="course-feedback" aria-live="polite"></div>' +
      '<p class="lesson-instruction">自动检查只核对词汇是否属于本项目的 Basic 词汇/规则形式，不判断句子语法和表达是否自然。</p></section>' +
      '<button class="course-back" onclick="BE.course.render()">← 返回课程目录</button></section>';
  }

  function say(word) {
    if (window.BE && window.BE.speak) window.BE.speak(word, 0.85);
  }

  function checkWriting() {
    const box = document.getElementById('course-answer');
    const feedback = document.getElementById('course-feedback');
    if (!box || !feedback) return;
    const text = box.value.trim();
    if (!text) { feedback.textContent = '先写一句英语，再检查。'; return; }
    const result = window.BE.validator.validateText(text);
    if (result && result.valid) {
      feedback.textContent = '词汇检查通过：句子中的词都能在当前 Basic 词汇规则中找到。语法仍需自己核对。';
      feedback.classList.add('is-ok');
    } else {
      const bad = result && result.invalid ? result.invalid.join(', ') : '无法识别的词';
      feedback.textContent = '发现不在词汇规则中的词：' + bad + '。请尝试换成 850 词或允许的派生形式。';
      feedback.classList.remove('is-ok');
    }
  }

  function render() {
    const main = document.getElementById('main-content');
    if (main) main.innerHTML = courseShell();
  }

  window.BE = window.BE || {};
  window.BE.course = { render, open, openOriginal, say, checkWriting };
})();
