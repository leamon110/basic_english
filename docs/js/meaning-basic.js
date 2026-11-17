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
    }
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
      '<span class="expression-step-label">MEANING → BASIC · FIRST PRACTICE SET</span>',
      '<h2>练习四：普通英语意思 → Basic 表达</h2>',
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
      '<p class="mb-limitation">检查范围：目前只识别这六道题列出的有限句型和已知语义反例。其他表达会显示“暂时无法判断”，不会自动判为错误。词汇通过不代表语法或意思通过；本功能不是通用英语语法解析器或通用语义理解器。</p>'
    ].join('');

    page.appendChild(host);

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
