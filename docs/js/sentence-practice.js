(function () {
  "use strict";

  const groups = [
    {
      title: "指认与描述",
      pattern: "This / That / These + be + 名词或形容词",
      explanation: "先说清楚对象是谁、是什么，再补充它的特征。be 后面可以接名词，也可以接形容词。",
      sentences: [
        ["This is my room.", "这是我的房间。"],
        ["That is the door of the house.", "那是房子的门。"],
        ["These are new books.", "这些是新书。"],
        ["The window is wide.", "窗户很宽。"],
        ["The table is between the beds.", "桌子在几张床之间。"],
        ["The house is old, but the garden is beautiful.", "房子很旧，但是花园很漂亮。"],
        ["My friend is a good man.", "我的朋友是个好人。"],
        ["The water is cold.", "水是冷的。"],
        ["The road is long and narrow.", "这条路又长又窄。"],
        ["The flowers are in the garden.", "花在花园里。"]
      ]
    },
    {
      title: "位置与方向",
      pattern: "be + 位置短语；go / come + 方向",
      explanation: "用 in、on、under、near、between、across、into、out of、through 等词说明事物的位置和移动方向。",
      sentences: [
        ["The book is on the table.", "书在桌子上。"],
        ["The cat is under the bed.", "猫在床底下。"],
        ["A bird is in the tree.", "一只鸟在树上。"],
        ["The man is at the door.", "男人在门边。"],
        ["The boat is near the river.", "小船在河边。"],
        ["The train goes across the bridge.", "火车穿过桥。"],
        ["The boys go into the room.", "男孩们走进房间。"],
        ["The woman comes out of the house.", "女人从房子里出来。"],
        ["The road goes through the town.", "这条路穿过城镇。"],
        ["The school is in front of the market.", "学校在市场前面。"]
      ]
    },
    {
      title: "have 与所属",
      pattern: "have / has + 名词；my / your / his / her / their",
      explanation: "have / has 表示拥有、具有或处于某种状态。物主限定词放在名词前，物主代词可以独立代替“物主词 + 名词”。",
      sentences: [
        ["I have a new book.", "我有一本新书。"],
        ["She has a letter from her mother.", "她有一封母亲寄来的信。"],
        ["We have some water for the boys.", "我们有一些水给男孩们喝。"],
        ["The boy has no money.", "这个男孩没有钱。"],
        ["This room has a wide window.", "这个房间有一扇宽窗户。"],
        ["The house has a garden with trees.", "这所房子有一个带树木的花园。"],
        ["My friend has a good idea.", "我的朋友有一个好主意。"],
        ["The man has his coat on.", "这个男人穿着外套。"],
        ["The boys have their books with them.", "男孩们把自己的书带在身边。"],
        ["Is this book yours?", "这本书是你的吗？"]
      ]
    },
    {
      title: "动作表达",
      pattern: "主语 + operator + 对象 + 方向或地点",
      explanation: "Basic 不靠大量复杂动词表达动作，而是用 come、go、put、take、give、get、keep、let、make、send 等 operator 组合出完整意思。",
      sentences: [
        ["I put the book on the table.", "我把书放在桌子上。"],
        ["She gives the boy a glass of water.", "她给男孩一杯水。"],
        ["The man takes the letter from the table.", "男人从桌子上拿起那封信。"],
        ["We have an idea for the day.", "我们对今天有一个想法。"],
        ["The woman sends a letter to her friend.", "女人给朋友寄了一封信。"],
        ["The boys play in the garden.", "男孩们在花园里玩。"],
        ["The boy makes a hole in the earth.", "男孩在地上挖了一个洞。"],
        ["The man gets a drink from the market.", "男人从市场买了一杯饮料。"],
        ["I keep my books in this room.", "我把书放在这个房间里。"],
        ["The mother lets the boy go out.", "母亲让男孩出去。"]
      ]
    },
    {
      title: "时间与习惯",
      pattern: "主语 + operator + 时间表达",
      explanation: "时间短语可以放在句首或句尾。in the morning、at night、every day、before the end of the day 等表达能说明动作发生的时间。",
      sentences: [
        ["I go to school in the morning.", "我早上去学校。"],
        ["He works in the town every day.", "他每天在镇上工作。"],
        ["We have our meal at the end of the morning.", "我们在上午快结束时吃饭。"],
        ["The train comes before the end of the day.", "火车在当天结束前到达。"],
        ["The woman is reading a book at night.", "这个女人晚上正在读书。"],
        ["The boys are in bed early.", "男孩们很早就上床了。"],
        ["My father comes to the house late.", "我父亲很晚才到家。"],
        ["We will go to the market tomorrow.", "我们明天去市场。"],
        ["The man is here all morning.", "这个男人整个上午都在这里。"],
        ["I saw my friend yesterday.", "我昨天见到了朋友。"]
      ]
    },
    {
      title: "疑问句",
      pattern: "疑问词 + operator / be / 助动词 + 主语",
      explanation: "be、will、may 等可以放到主语前面。一般现在时中，其他 operator 构成一般疑问句时使用 do / does。",
      sentences: [
        ["Where is my book?", "我的书在哪里？"],
        ["Who has the key?", "谁有钥匙？"],
        ["What is in the box?", "盒子里有什么？"],
        ["Which road goes to the river?", "哪条路通向河边？"],
        ["Why is the boy sad?", "这个男孩为什么难过？"],
        ["When will the train come?", "火车什么时候来？"],
        ["How do you get to the market?", "你怎样到市场？"],
        ["Do you see the bird in the tree?", "你看见树上的鸟了吗？"],
        ["Does the woman have a letter?", "这个女人有一封信吗？"],
        ["Is the room clean?", "房间干净吗？"]
      ]
    },
    {
      title: "否定与请求",
      pattern: "do not + operator；be + not；operator 原形开头的祈使句",
      explanation: "一般现在时和一般过去时的否定句使用 do not / does not / did not；be 直接加 not。命令或请求通常使用 operator 原形。",
      sentences: [
        ["I do not see the man.", "我没有看见那个男人。"],
        ["The door is not open.", "门没有打开。"],
        ["Do not put the glass on the floor.", "不要把玻璃杯放在地板上。"],
        ["Please give me the book.", "请把书给我。"],
        ["Let us go to the market.", "我们一起去市场吧。"],
        ["Keep the window shut.", "让窗户保持关闭。"],
        ["Do not make a noise.", "不要发出噪声。"],
        ["The boy is not ready.", "这个男孩还没有准备好。"],
        ["The woman will not come this morning.", "这个女人今天上午不会来。"],
        ["We may not go out at night.", "我们晚上可能不能出去。"]
      ]
    },
    {
      title: "比较与程度",
      pattern: "as ... as；more / most；better / best",
      explanation: "可以用 as ... as 表示相等，用 more ... than 表示不等比较，也可以使用 most 表示最高程度。good 的比较形式是 better / best。",
      sentences: [
        ["This room is more beautiful than that room.", "这个房间比那个房间漂亮。"],
        ["The river is as wide as the road.", "这条河和这条路一样宽。"],
        ["My new book is better than the old one.", "我的新书比旧书好。"],
        ["This is the most important part.", "这是最重要的部分。"],
        ["The water is as cold as ice.", "水和冰一样冷。"],
        ["The red flower is more beautiful than the white one.", "红花比白花漂亮。"],
        ["The boat is not as quick as the train.", "小船没有火车快。"],
        ["This house is not as high as that building.", "这所房子没有那栋建筑高。"],
        ["The garden is the quietest place in the town.", "花园是镇上最安静的地方。"],
        ["The day is warmer than the night.", "白天比夜晚暖和。"]
      ]
    },
    {
      title: "时态与被动",
      pattern: "be + -ing；have + 过去分词；be + 过去分词",
      explanation: "be + -ing 表示动作正在进行；have + 过去分词构成完成时；be + 过去分词表示被动关系或动作完成后的状态。",
      sentences: [
        ["The man is reading a letter.", "男人正在读一封信。"],
        ["The boys are playing with a ball.", "男孩们正在玩球。"],
        ["The woman was making a meal.", "女人当时正在做饭。"],
        ["The boys were going to the river.", "男孩们当时正要去河边。"],
        ["I will be waiting at the station.", "我将在车站等候。"],
        ["The door has been opened.", "门已经被打开了。"],
        ["The letter was sent yesterday.", "这封信昨天寄出了。"],
        ["The books are kept in a box.", "这些书被放在一个盒子里。"],
        ["The man has taken the key.", "男人已经拿走了钥匙。"],
        ["The woman will give an answer.", "女人将给出答复。"]
      ]
    },
    {
      title: "连接句子",
      pattern: "that；because；if；so；where；why",
      explanation: "连接词可以把两个意思组织成一个完整句子。先说主要信息，再补充内容、原因、条件、结果、地点或原因。",
      sentences: [
        ["I see that the man is right.", "我看出这个男人是对的。"],
        ["She says that her mother will come.", "她说她母亲会来。"],
        ["The boy is happy because he has a new book.", "男孩很高兴，因为他有一本新书。"],
        ["If the weather is good, we will go out.", "如果天气好，我们就出去。"],
        ["The man is tired, so he will go to bed.", "男人累了，所以他要去睡觉。"],
        ["The woman is pleased with the flowers.", "女人对这些花很满意。"],
        ["The boys are not happy with the dog.", "男孩们不喜欢这只狗。"],
        ["The man is responsible for the work.", "这个男人负责这项工作。"],
        ["This is the place where we have a meeting.", "这就是我们开会的地方。"],
        ["I am not certain why the train is late.", "我不确定火车为什么晚点。"]
      ]
    }
  ];

  let activeGroup = 0;
  const visible = new Set();

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch];
    });
  }

  function render(container) {
    const target = container || document.getElementById("main-content");
    if (!target) return;

    const group = groups[activeGroup];
    const tabs = groups.map(function (item, index) {
      return '<button class="sentence-tab' + (index === activeGroup ? ' active' : '') +
        '" onclick="BE.sentences.selectGroup(' + index + ')">' +
        (index + 1) + '. ' + escapeHtml(item.title) + '</button>';
    }).join("");

    const cards = group.sentences.map(function (sentence, index) {
      const key = activeGroup + "-" + index;
      const isVisible = visible.has(key);
      return '<article class="sentence-card">' +
        '<div class="sentence-number">例句 ' + (index + 1) + '</div>' +
        '<div class="sentence-english">' + escapeHtml(sentence[0]) + '</div>' +
        (isVisible ? '<div class="sentence-chinese">' + escapeHtml(sentence[1]) + '</div>' : '') +
        '<button class="sentence-reveal" onclick="BE.sentences.toggle(' + index + ')">' +
        (isVisible ? '隐藏中文' : '显示中文') + '</button>' +
        '</article>';
    }).join("");

    target.innerHTML =
      '<section class="sentence-page">' +
        '<header class="sentence-hero">' +
          '<div class="sentence-kicker">BASIC ENGLISH · SENTENCE PRACTICE</div>' +
          '<h1>用 850 个基础词组织完整句子</h1>' +
          '<p>100 个例句，分为 10 组。先读英文，试着理解句子结构，再打开中文对照。</p>' +
          '<p class="sentence-hero-note">例句已逐句通过本项目的 Basic 词汇检查器。它们是配套练习，不冒充 Ogden 原版 45 课的原文。</p>' +
        '</header>' +
        '<nav class="sentence-tabs">' + tabs + '</nav>' +
        '<section class="sentence-pattern">' +
          '<div class="sentence-pattern-label">本组句型</div>' +
          '<h2>' + escapeHtml(group.pattern) + '</h2>' +
          '<p>' + escapeHtml(group.explanation) + '</p>' +
        '</section>' +
        '<div class="sentence-actions">' +
          '<span>本组 ' + group.sentences.length + ' 句</span>' +
          '<div><button onclick="BE.sentences.showAll()">显示全部中文</button>' +
          '<button onclick="BE.sentences.hideAll()">隐藏全部中文</button></div>' +
        '</div>' +
        '<div class="sentence-list">' + cards + '</div>' +
      '</section>';
  }

  function selectGroup(index) {
    if (index < 0 || index >= groups.length) return;
    activeGroup = index;
    render();
  }

  function toggle(index) {
    const key = activeGroup + "-" + index;
    if (visible.has(key)) visible.delete(key);
    else visible.add(key);
    render();
  }

  function showAll() {
    groups[activeGroup].sentences.forEach(function (_, index) {
      visible.add(activeGroup + "-" + index);
    });
    render();
  }

  function hideAll() {
    groups[activeGroup].sentences.forEach(function (_, index) {
      visible.delete(activeGroup + "-" + index);
    });
    render();
  }

  window.BE = window.BE || {};
  window.BE.sentences = {
    render: render,
    selectGroup: selectGroup,
    toggle: toggle,
    showAll: showAll,
    hideAll: hideAll,
    count: function () { return groups.reduce(function (sum, group) { return sum + group.sentences.length; }, 0); }
  };
})();
