(function () {
  const QUESTIONS = {
    mb01: {
      title: 'MB-01 · insert → put',
      prompt: '他把纸放进盒子里。',
      roles: '行为者 he；对象 paper；目标位置 box；方向是外部进入内部。',
      hint: 'into 明确表示进入方向；在 put 的这个语境中，in 也可以表达放入后的内部位置。',
      accepted: [
        { text: 'he puts the paper into the box', note: 'into 明确标出进入盒子的方向。' },
        { text: 'he puts the paper in the box', note: '在 put 的语境中，in 也能表达把纸放到盒子里面。' }
      ],
      wrong: [
        { text: 'he takes the paper out of the box', reason: '动作方向反了：这句话表示从盒子里取出纸。' }
      ]
    },
    mb02: {
      title: 'MB-02 · remove → take',
      prompt: '他从盒子里取出纸。',
      roles: '行为者 he；对象 paper；来源位置 box；方向是内部移到外部。',
      hint: 'out of 强调从内部移到外部；from 强调来源。在题目已说明纸原来位于盒内时，两者都可以接受。',
      accepted: [
        { text: 'he takes the paper out of the box', note: 'out of 明确表示从盒子内部移到外部。' },
        { text: 'he takes the paper from the box', note: 'from 标明盒子是纸原来的位置。' }
      ],
      wrong: [
        { text: 'he puts the paper into the box', reason: '动作方向反了：这句话表示把纸放进盒子。' },
        { text: 'he puts the paper in the box', reason: '动作方向反了：这句话表示把纸放进盒子。' }
      ]
    },
    mb03: {
      title: 'MB-03 · transfer → give',
      prompt: '她把钱交给那个男人（这里指实际交付，不是银行账户间转账）。',
      roles: '给予者 she；对象 money；接收者 the man。',
      hint: '英语可以把接收者放在 money 前面，也可以用 to 把接收者放在 money 后面；两种语序都保留同一组角色。',
      accepted: [
        { text: 'she gives the money to the man', note: 'to 引出接收者 the man。' },
        { text: 'she gives the man the money', note: '双宾语语序把接收者 the man 放在 money 前面。' }
      ],
      wrong: [
        { text: 'the man gives the money to her', reason: '给予者和接收者被交换了。' },
        { text: 'the man gives her the money', reason: '给予者和接收者被交换了。' }
      ]
    },
    mb04: {
      title: 'MB-04 · construct → make',
      prompt: '他用木头制成一张桌子。',
      roles: '行为者 he；材料 wood；动作 make；结果物 a table。',
      hint: '一种表达从结果物说明材料来源；另一种表达从材料说明变化后的结果。',
      accepted: [
        { text: 'he makes a table from wood', note: 'from wood 说明桌子的材料来源。' },
        { text: 'he makes the wood into a table', note: 'into a table 说明木头变化后的结果。' }
      ],
      wrong: [
        { text: 'he makes a table from paper', reason: '材料被改成 paper，不再保留题目中的 wood。' },
        { text: 'he makes the paper into a table', reason: '材料被改成 paper，不再保留题目中的 wood。' }
      ]
    },
    mb05: {
      title: 'MB-05 · approach → come / go',
      prompt: '那个男人正朝房子走近。',
      roles: '移动者 the man；目标 house；come / go 取决于说话者或观察者的位置。',
      hint: 'come / go 不能脱离观察视角判断。先选择说话者的位置，再检查动词。',
      accepted: [
        { text: 'the man is coming to the house', action: 'coming', note: '说话者在房子附近时，男人朝说话者所在的位置走来。' },
        { text: 'the man is going to the house', action: 'going', note: '说话者在其他地方时，房子是男人前往的目的地。' }
      ],
      wrong: [
        { text: 'the man is going from the house', reason: 'from 表示离开房子，方向与“朝房子走近”相反。' }
      ]
    },
    mb06: {
      title: 'MB-06 · extinguish → make + go',
      prompt: '他使灯熄灭。',
      roles: '行为者 he；对象 the light；结果是 light 不再发光；必须保留使役关系。',
      hint: 'make + object + bare infinitive：make 后面的 go 使用原形。',
      accepted: [
        { text: 'he makes the light go out', note: '句子保留了 he 造成 light 熄灭的因果关系。' }
      ],
      wrong: [
        { text: 'the light goes out', reason: '只说明灯自己熄灭，没有表达是 he 使它熄灭。' },
        { text: 'he makes the light go on', reason: 'go on 表示灯亮起，结果与题目相反。' }
      ]
    },
    mb07: {
      title: 'MB-07 · eat → take / have',
      prompt: '他们正在进餐。',
      roles: '行为者 they；动作是摄取食物或进行一顿饭；重点不是准备食物。',
      hint: '原作者列出 take food 和 have a meal。前者从摄取食物说明，后者把进餐作为一项活动说明。',
      accepted: [
        { text: 'they take food', note: 'take food 表达摄取食物。' },
        { text: 'they have a meal', note: 'have a meal 把进餐作为一项活动表达。' }
      ],
      wrong: [
        { text: 'they make a meal', reason: 'make a meal 表示制作或准备一顿饭，不是正在吃饭。' }
      ]
    },
    mb08: {
      title: 'MB-08 · listen → give attention',
      prompt: '他们专心听这段音乐。',
      roles: '行为者 they；对象 it（指这段音乐）；动作重点是把注意力给予声音。',
      hint: '原作者给出的表达是 give it their attention。',
      accepted: [
        { text: 'they give it their attention', note: '句子保留了听者、声音对象和给予注意力的关系。' }
      ],
      wrong: [
        { text: 'they give it their food', reason: 'food 不是题目中的注意力；对象意义发生变化。' }
      ]
    },
    mb09: {
      title: 'MB-09 · hear music → come to the ears',
      prompt: '音乐传入耳中。',
      roles: '对象 music；接收位置 ears；表达声音到达耳朵的关系。',
      hint: '原作者用 the music comes to the ears 表达 hear music。',
      accepted: [
        { text: 'the music comes to the ears', note: 'come to 表示声音到达耳朵。' }
      ],
      wrong: [
        { text: 'the ears come to the music', reason: '把声音与接收位置的角色颠倒了。' }
      ]
    },
    mb10: {
      title: 'MB-10 · write → put into writing / put down on paper',
      prompt: '他把自己的看法写下来。',
      roles: '行为者 he；内容 his views；结果是把这些看法转为书面表达。',
      hint: '原作者列出 put his views into writing 和 put them down on paper。',
      accepted: [
        { text: 'he puts his views into writing', note: 'into writing 表示把看法转成书面形式。' },
        { text: 'he puts them down on paper', note: 'down on paper 表示把内容写到纸上。' }
      ],
      wrong: []
    },
    mb11: {
      title: 'MB-11 · throw → send across',
      prompt: '他把球扔过河。',
      roles: '行为者 he；对象 ball；路径从河的一侧横越到另一侧。',
      hint: '原作者用 send the ball across the river 表达把球投过河。',
      accepted: [
        { text: 'he sends the ball across the river', note: 'across 保留了从一侧横越到另一侧的路径。' }
      ],
      wrong: [
        { text: 'he sends the ball from the river', reason: 'from 表示来源，不能表达球横越河流到另一侧。' }
      ]
    },
    mb12: {
      title: 'MB-12 · catch → get in the hand',
      prompt: '他接住了球。',
      roles: '行为者 he；对象 it（指球）；结果是球进入他的手中。',
      hint: '原作者用 get it in the hand 表达 catch a ball。',
      accepted: [
        { text: 'he gets it in the hand', note: 'in the hand 表示球被接到手中。' }
      ],
      wrong: [
        { text: 'he gets it out of the hand', reason: 'out of 表示从手中离开，方向与接住相反。' }
      ]
    },
    mb13: {
      title: 'MB-13 · hold → get a grip / keep / have',
      prompt: '他握住并拿着球。',
      roles: '行为者 he；对象 it（指球）；表达握持、保持或手中持有的关系。',
      hint: '原作者列出 get a grip of it、keep it、have it in the hand。三种说法强调的侧面不同。',
      accepted: [
        { text: 'he gets a grip of it', note: 'get a grip of it 强调握住、抓牢。' },
        { text: 'he keeps it', note: 'keep it 强调持续拿着、不放开。' },
        { text: 'he has it in the hand', note: 'have it in the hand 强调物体在手中。' }
      ],
      wrong: [
        { text: 'he puts it in the hand', reason: 'put it in the hand 表示把它放进手里，重点是放置动作，不是持续握持。' }
      ]
    },
    mb14: {
      title: 'MB-14 · think → give thought to',
      prompt: '她认真考虑这个问题。',
      roles: '行为者 she；对象 the question；动作是把思想用于考虑该问题。',
      hint: '原作者列出 give thought to 作为 think 的 Basic 表达。',
      accepted: [
        { text: 'she gives thought to the question', note: 'give thought to 把思考作为一个动作名称表达。' }
      ],
      wrong: []
    },
    mb15: {
      title: 'MB-15 · remember → keep in mind / have a memory',
      prompt: '他记住了这件事。',
      roles: '行为者 he；对象 it；信息仍保留在记忆中。',
      hint: '原作者列出 keep it in mind 和 have a memory of it。',
      accepted: [
        { text: 'he keeps it in mind', note: 'keep it in mind 强调把信息保留在心中。' },
        { text: 'he has a memory of it', note: 'have a memory of it 用 memory 这个名称表达记忆。' }
      ],
      wrong: [
        { text: 'he puts it out of the mind', reason: 'put it out of the mind 表达把它从头脑中排除，对应 forget，而不是 remember。' }
      ]
    },
    mb16: {
      title: 'MB-16 · forget → put out of mind / have no memory',
      prompt: '他忘记了这件事。',
      roles: '行为者 he；对象 it；表达记忆缺失或把内容从头脑中排除。',
      hint: '原作者列出 put it out of the mind 和 have no memory of it。',
      accepted: [
        { text: 'he puts it out of the mind', note: 'put it out of the mind 表达把内容从头脑中排除。' },
        { text: 'he has no memory of it', note: 'have no memory of it 表达没有关于它的记忆。' }
      ],
      wrong: [
        { text: 'he keeps it in mind', reason: 'keep it in mind 表达记住、保留在心中，与 forget 相反。' }
      ]
    },
    mb17: {
      title: 'MB-17 · want → have a desire',
      prompt: '她想要它。',
      roles: '行为者 she；对象 it；表达对对象有某种愿望。',
      hint: '原作者列出 have a desire for it。',
      accepted: [
        { text: 'she has a desire for it', note: 'have a desire for 把 want 表达为具有某种愿望。' }
      ],
      wrong: [
        { text: 'she has no desire for it', reason: 'no desire 表示没有愿望，意思与题目相反。' }
      ]
    },
    mb18: {
      title: 'MB-18 · need → be in need of',
      prompt: '他需要它。',
      roles: '行为者 he；对象 it；表达处于需要某物的状态。',
      hint: '原作者列出 be in need of it。',
      accepted: [
        { text: 'he is in need of it', note: 'be in need of 表达处于需要某物的状态。' }
      ],
      wrong: [
        { text: 'he has a desire for it', reason: 'have a desire for 表达愿望，不等于题目中的 need。' }
      ]
    },
    mb19: { title:'MB-19 · sing → give a song', prompt:'她唱了一首歌。', roles:'行为者 she；对象 a song；表达给出一首歌这一动作。', hint:'原作者列出 sing → give a song。', accepted:[{text:'she gives a song',note:'give a song 是原作者列出的 sing 表达。'}], wrong:[{text:'she makes a song',reason:'make a song 更接近创作一首歌，不是题目中的唱歌行为。'}] },
    mb20: { title:'MB-20 · touch → put a hand / give a touch', prompt:'他用手触碰这个盒子。', roles:'行为者 he；对象 the box；动作是手与盒子发生接触。', hint:'原作者列出 put a hand / finger on it 和 give it a touch。', accepted:[{text:'he puts a hand on the box',note:'put a hand on the box 直接说明手与盒子接触。'},{text:'he gives it a touch',note:'give it a touch 把接触作为一次动作表达。'}], wrong:[{text:'he gives it a blow',reason:'a blow 表示击打，不是轻触。'}] },
    mb21: { title:'MB-21 · hit hard → give a blow', prompt:'他用力打了一下盒子。', roles:'行为者 he；对象 it；动作是一次有力的击打。', hint:'原作者列出 give it a blow。', accepted:[{text:'he gives it a blow',note:'give it a blow 用 blow 这个动作名称表达击打。'}], wrong:[{text:'he gives it a touch',reason:'a touch 表示轻触，不能表达题目中的用力击打。'}] },
    mb22: { title:'MB-22 · run quickly → go quickly', prompt:'他快速跑过去。', roles:'行为者 he；移动方式强调快速；当前题目不强调锻炼或跑步活动。', hint:'原作者把 run quickly 表达为 go quickly。', accepted:[{text:'he goes quickly',note:'go quickly 强调快速移动。'}], wrong:[{text:'he takes a run',reason:'take a run 表示进行跑步活动，不能单独保留本题的快速移动重点。'}] },
    mb23: { title:'MB-23 · run for health → take a run', prompt:'他为了健康而跑步。', roles:'行为者 he；跑步被看作一项活动，目的为 health。', hint:'原作者把 run for health 表达为 take a run。', accepted:[{text:'he takes a run',note:'take a run 把跑步作为一项活动表达；健康目的由语境提供。'}], wrong:[{text:'he goes quickly',reason:'go quickly 只强调快速移动，不表达为了健康而跑步这项活动。'}] },
    mb24: { title:'MB-24 · begin → make a start', prompt:'他们开始了。', roles:'行为者 they；动作是开始某件事。', hint:'原作者列出 begin → make a start。', accepted:[{text:'they make a start',note:'make a start 把开始作为一个动作名称表达。'}], wrong:[] },
    mb25: { title:'MB-25 · understand → see the point', prompt:'他理解了这个论点。', roles:'行为者 he；对象 the argument；重点是看出论点中的要点。', hint:'原作者列出 see the point of the argument。', accepted:[{text:'he sees the point of the argument',note:'see the point of the argument 表达理解论点的要点。'}], wrong:[{text:'he gives thought to the argument',reason:'give thought to 表达思考这个论点，不等同于已经理解其中要点。'}] },
    mb26: { title:'MB-26 · know → have knowledge / be certain', prompt:'他知道这件事。', roles:'行为者 he；对象 it；表达具有相关知识或确定性。', hint:'原作者列出 have knowledge of it 和 be certain of it。', accepted:[{text:'he has knowledge of it',note:'have knowledge of it 表达具有关于它的知识。'},{text:'he is certain of it',note:'be certain of it 表达对它有确定认识。'}], wrong:[{text:'he gives thought to it',reason:'give thought to 表达思考它，不等同于知道或确定它。'}] },
    mb27: { title:'MB-27 · learn → get knowledge', prompt:'他学到了这件事。', roles:'行为者 he；对象 it；动作强调获得知识。', hint:'原作者列出 get knowledge of it。', accepted:[{text:'he gets knowledge of it',note:'get knowledge of it 强调获得关于它的知识。'}], wrong:[{text:'he gives knowledge of it',reason:'give knowledge of it 表示把知识给予别人，动作方向与 learn 不同。'}] }
  };

  function normalize(text) {
    return String(text || '').toLowerCase()
      .replace(/[.!?;:,，。！？；]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .filter(Boolean);
  }

  function matches(text, pattern) {
    const a = normalize(text);
    const b = normalize(pattern);
    return a.length === b.length && a.every(function (word, index) {
      return word === b[index];
    });
  }

  function analyzeAnswer(questionId, text, perspective) {
    const question = QUESTIONS[questionId];
    if (!question) {
      return { grammar: 'unsupported', meaning: 'unsupported', reason: '没有找到这道题的检查规则。' };
    }
    if (!normalize(text).length) {
      return { grammar: 'unsupported', meaning: 'unsupported', reason: '请先输入一个句子。' };
    }

    const accepted = question.accepted.find(function (item) { return matches(text, item.text); });
    if (accepted) {
      if (questionId === 'mb05') {
        const expectedAction = perspective === 'elsewhere' ? 'going' : 'coming';
        if (accepted.action !== expectedAction) {
          return {
            grammar: 'pass',
            meaning: 'fail',
            reason: perspective === 'elsewhere'
              ? '当前视角设为“说话者在其他地方”，应使用 go；come 与当前视角不一致。'
              : '当前视角设为“说话者在房子附近”，应使用 come；go 与当前视角不一致。'
          };
        }
      }
      return { grammar: 'pass', meaning: 'pass', note: accepted.note };
    }

    const wrong = question.wrong.find(function (item) { return matches(text, item.text); });
    if (wrong) {
      return { grammar: 'pass', meaning: 'fail', reason: wrong.reason };
    }

    return {
      grammar: 'unsupported',
      meaning: 'unsupported',
      reason: '这句话不属于当前题目已经实现的句型范围。暂时无法判断，不等于句子一定错误。'
    };
  }

  function render(container) {
    const page = container && container.querySelector('.expression-page');
    if (!page || page.querySelector('.meaning-basic-section')) return;

    const host = document.createElement('section');
    host.className = 'meaning-basic-section';
    host.innerHTML = [
      '<div class="mb-heading">',
      '<span class="expression-step-label">MEANING → BASIC · PRACTICE BANK · 27 TASKS</span>',
      '<h2>练习四：普通英语意思 → Basic 表达（27题）</h2>',
      '<p>先理解要表达的意思，再组织 Basic 句子。每道题都可能有多个正确表达；检查器会按本题已经登记的结构和语义角色判断。</p>',
      '</div>',
      '<div class="mb-controls">',
      '<label for="mb-question">选择题目</label>',
      '<select id="mb-question">',
      '<option value="mb01">MB-01 · insert → put</option>',
      '<option value="mb02">MB-02 · remove → take</option>',
      '<option value="mb03">MB-03 · transfer → give</option>',
      '<option value="mb04">MB-04 · construct → make</option>',
      '<option value="mb05">MB-05 · approach → come / go</option>',
      '<option value="mb06">MB-06 · extinguish → make + go</option>',
      '<option value="mb07">MB07 · eat → take / have</option>',
      '<option value="mb08">MB08 · listen → give attention</option>',
      '<option value="mb09">MB09 · hear music → come to the ears</option>',
      '<option value="mb10">MB10 · write → put into writing</option>',
      '<option value="mb11">MB11 · throw → send across</option>',
      '<option value="mb12">MB12 · catch → get in the hand</option>',
      '<option value="mb13">MB13 · hold → grip / keep / have</option>',
      '<option value="mb14">MB14 · think → give thought to</option>',
      '<option value="mb15">MB15 · remember → keep in mind</option>',
      '<option value="mb16">MB16 · forget → put out of mind</option>',
      '<option value="mb17">MB17 · want → have a desire</option>',
      '<option value="mb18">MB18 · need → be in need of</option>',
      '<option value="mb19">MB19 · sing → give a song</option>',
      '<option value="mb20">MB20 · touch → put a hand / give a touch</option>',
      '<option value="mb21">MB21 · hit → give a blow</option>',
      '<option value="mb22">MB22 · run quickly → go quickly</option>',
      '<option value="mb23">MB23 · run for health → take a run</option>',
      '<option value="mb24">MB24 · begin → make a start</option>',
      '<option value="mb25">MB25 · understand → see the point</option>',
      '<option value="mb26">MB26 · know → have knowledge</option>',
      '<option value="mb27">MB27 · learn → get knowledge</option>',

      '</select>',
      '</div>',
      '<div class="mb-prompt-card">',
      '<span>要表达的意思</span>',
      '<p id="mb-prompt"></p>',
      '<p class="mb-roles" id="mb-roles"></p>',
      '<div id="mb-perspective-wrap" hidden>',
      '<label for="mb-perspective">说话者／观察者的位置</label>',
      '<select id="mb-perspective">',
      '<option value="at_house">说话者在房子附近（使用 come）</option>',
      '<option value="elsewhere">说话者在其他地方（使用 go）</option>',
      '</select>',
      '</div>',
      '<p class="mb-hint" id="mb-hint"></p>',
      '</div>',
      '<label class="mb-answer-label" for="mb-answer">写出你的 Basic 表达</label>',
      '<textarea id="mb-answer" rows="3" placeholder="Write your Basic English sentence here..."></textarea>',
      '<div class="mb-actions">',
      '<button type="button" class="expression-primary" id="mb-check-vocabulary">① 检查词汇</button>',
      '<button type="button" class="expression-primary" id="mb-check-grammar" disabled>② 检查句型</button>',
      '<button type="button" class="expression-primary" id="mb-check-meaning" disabled>③ 检查意思</button>',
      '</div>',
      '<div class="mb-feedback" id="mb-vocabulary-feedback" aria-live="polite"></div>',
      '<div class="mb-feedback" id="mb-grammar-feedback" aria-live="polite"></div>',
      '<div class="mb-feedback" id="mb-meaning-feedback" aria-live="polite"></div>',
      '<p class="mb-limitation">检查范围：目前只识别这 27 道题列出的有限句型和已知语义反例。其他表达会显示“暂时无法判断”，不会自动判为错误。词汇通过不代表语法或意思通过；本功能不是通用英语语法解析器或通用语义理解器。</p>'
    ].join('');

    const sourceFooter = page.querySelector('.expression-source');
    if (sourceFooter) page.insertBefore(host, sourceFooter);
    else page.appendChild(host);

    const questionSelect = host.querySelector('#mb-question');
    const perspectiveSelect = host.querySelector('#mb-perspective');
    const perspectiveWrap = host.querySelector('#mb-perspective-wrap');
    const prompt = host.querySelector('#mb-prompt');
    const roles = host.querySelector('#mb-roles');
    const hint = host.querySelector('#mb-hint');
    const answer = host.querySelector('#mb-answer');
    const vocabularyButton = host.querySelector('#mb-check-vocabulary');
    const grammarButton = host.querySelector('#mb-check-grammar');
    const meaningButton = host.querySelector('#mb-check-meaning');
    const vocabularyFeedback = host.querySelector('#mb-vocabulary-feedback');
    const grammarFeedback = host.querySelector('#mb-grammar-feedback');
    const meaningFeedback = host.querySelector('#mb-meaning-feedback');

    let vocabularyPassed = false;
    let grammarPassed = false;
    let lastAnalysis = null;

    function resetChecks() {
      vocabularyPassed = false;
      grammarPassed = false;
      lastAnalysis = null;
      [vocabularyFeedback, grammarFeedback, meaningFeedback].forEach(function (node) {
        node.textContent = '';
        node.className = 'mb-feedback';
      });
      grammarButton.disabled = true;
      meaningButton.disabled = true;
    }

    function updatePrompt() {
      const question = QUESTIONS[questionSelect.value];
      prompt.textContent = question.prompt;
      roles.textContent = '需要保留：' + question.roles;
      hint.textContent = question.hint;
      perspectiveWrap.hidden = questionSelect.value !== 'mb05';
      if (questionSelect.value === 'mb05') {
        roles.textContent += perspectiveSelect.value === 'elsewhere'
          ? ' 当前视角：说话者在其他地方，房子是目的地。'
          : ' 当前视角：说话者在房子附近，男人朝说话者走来。';
      }
      resetChecks();
    }

    vocabularyButton.addEventListener('click', function () {
      resetChecks();
      const text = answer.value.trim();
      if (!text) {
        vocabularyFeedback.textContent = '请先写一句 Basic English。';
        vocabularyFeedback.className = 'mb-feedback is-fail';
        return;
      }
      if (!window.BE || typeof window.BE.validate !== 'function') {
        vocabularyFeedback.textContent = '当前无法调用词汇检查器，暂时不能继续。';
        vocabularyFeedback.className = 'mb-feedback is-fail';
        return;
      }
      const result = window.BE.validate(text);
      if (!result.valid) {
        const invalid = (result.errors || []).map(function (item) { return item.word; });
        vocabularyFeedback.textContent = '词汇检查未通过：' + invalid.join('、');
        vocabularyFeedback.className = 'mb-feedback is-fail';
        return;
      }
      vocabularyPassed = true;
      vocabularyFeedback.textContent = '词汇检查通过。这里只说明词项符合当前词汇规则，不代表句型和意思已经通过。';
      vocabularyFeedback.className = 'mb-feedback is-pass';
      grammarButton.disabled = false;
    });

    grammarButton.addEventListener('click', function () {
      if (!vocabularyPassed) return;
      lastAnalysis = analyzeAnswer(questionSelect.value, answer.value, perspectiveSelect.value);
      if (lastAnalysis.grammar === 'pass') {
        grammarPassed = true;
        grammarFeedback.textContent = '句型检查通过：这句话符合本题已经登记的结构。下一步请检查意思。';
        grammarFeedback.className = 'mb-feedback is-pass';
        meaningButton.disabled = false;
      } else {
        grammarPassed = false;
        meaningButton.disabled = true;
        grammarFeedback.textContent = '暂时无法判断：' + lastAnalysis.reason;
        grammarFeedback.className = 'mb-feedback is-pending';
      }
    });

    meaningButton.addEventListener('click', function () {
      if (!grammarPassed) return;
      lastAnalysis = analyzeAnswer(questionSelect.value, answer.value, perspectiveSelect.value);
      if (lastAnalysis.meaning === 'pass') {
        meaningFeedback.textContent = '意思检查通过：' + lastAnalysis.note;
        meaningFeedback.className = 'mb-feedback is-pass';
      } else if (lastAnalysis.meaning === 'fail') {
        meaningFeedback.textContent = '意思检查未通过：' + lastAnalysis.reason;
        meaningFeedback.className = 'mb-feedback is-fail';
      } else {
        meaningFeedback.textContent = '暂时无法判断：' + lastAnalysis.reason;
        meaningFeedback.className = 'mb-feedback is-pending';
      }
    });

    answer.addEventListener('input', resetChecks);
    questionSelect.addEventListener('change', updatePrompt);
    perspectiveSelect.addEventListener('change', updatePrompt);
    updatePrompt();
  }

  window.BE = window.BE || {};
  window.BE.meaningBasic = {
    render: render,
    analyzeAnswer: analyzeAnswer,
    questions: QUESTIONS
  };
})();
