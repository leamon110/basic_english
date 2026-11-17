// ============================================================
// EXPRESSION SYSTEM — Meaning to Basic English
// A supplementary learning track, separate from Ogden's original 45 Steps.
// ============================================================

(function () {
  const quiz = [
    {
      id: 'q1',
      question: 'I speak to him.',
      prompt: '这里的 speak 表达什么？',
      options: [
        { value: 'say', label: 'say something to him' },
        { value: 'talk', label: 'give a talk' },
        { value: 'knowledge', label: 'have a knowledge of it' }
      ],
      answer: 'say',
      explanation: '这里有明确的说话对象。Ogden 的表达是 say something to him。'
    },
    {
      id: 'q2',
      question: 'She speaks at a meeting.',
      prompt: '下面哪一项正确表达了这句话？',
      options: [
        { value: 'both', label: 'give a talk 或 make a statement' },
        { value: 'say', label: 'say something to him' },
        { value: 'knowledge', label: 'have a knowledge of it' }
      ],
      answer: 'both',
      explanation: '两种表达都来自原文：give a talk 强调进行讲话；make a statement 强调发表陈述。'
    },
    {
      id: 'q3',
      question: 'He speaks a language.',
      prompt: '这里的 speak 表达什么？',
      options: [
        { value: 'talk', label: 'give a talk' },
        { value: 'knowledge', label: 'have a knowledge of it' },
        { value: 'say', label: 'say something to him' }
      ],
      answer: 'knowledge',
      explanation: '这里表达的是具有某种语言知识或能力，不是某一次说话行为。'
    }
  ];

  function render(container) {
    if (!container) return;
    container.innerHTML = `
      <section class="expression-page">
        <header class="expression-hero">
          <p class="expression-kicker">SUPPLEMENTARY LEARNING TRACK · BASED ON OGDEN</p>
          <h1>表达系统 <span>Expression System</span></h1>
          <p>从你真正想表达的意思出发，学习怎样用850个基础词重新组织句子。</p>
          <div class="expression-track-note">
            <strong>这是新增的补充课程，不属于原版45 Steps。</strong>
            <span>原版45步课程、850词单词卡和已完成的发音功能均保持独立，不会被本课程替换。</span>
          </div>
        </header>

        <section class="expression-overview">
          <div>
            <span class="expression-step-label">LESSON 01 · 已上线</span>
            <h2>一个普通动词，三种不同意思：speak</h2>
            <p>同一个普通英语单词，在不同语境中承担不同意思。先判断意思，再选择 Basic 的表达结构。</p>
          </div>
          <div class="expression-principle">
            <span>学习流程</span>
            <strong>意思 → 结构 → 组合 → 表达</strong>
          </div>
        </section>

        <section class="expression-context-grid" aria-label="speak 的三个语境">
          <article class="expression-context-card">
            <span class="expression-context-no">01 · 对某人说话</span>
            <p class="expression-original">speak to a person</p>
            <div class="expression-arrow">↓</div>
            <p class="expression-basic">say something to him</p>
            <p class="expression-reason">重点：把内容说给某个接受者。</p>
          </article>
          <article class="expression-context-card">
            <span class="expression-context-no">02 · 在会议上讲话</span>
            <p class="expression-original">speak at a meeting</p>
            <div class="expression-arrow">↓</div>
            <p class="expression-basic">give a talk</p>
            <p class="expression-basic expression-alternative">make a statement</p>
            <p class="expression-reason">重点：进行一次讲话，或发表一项陈述。</p>
          </article>
          <article class="expression-context-card">
            <span class="expression-context-no">03 · 会说一种语言</span>
            <p class="expression-original">speak a language</p>
            <div class="expression-arrow">↓</div>
            <p class="expression-basic">have a knowledge of it</p>
            <p class="expression-reason">重点：具有某种语言知识或能力。</p>
          </article>
        </section>

        <section class="expression-analysis">
          <h2>为什么是这几种结构？</h2>
          <div class="expression-analysis-grid">
            <article>
              <h3>say something to him</h3>
              <p><b>say</b>：表达、说出</p>
              <p><b>something</b>：被说出的内容</p>
              <p><b>to him</b>：指出说话的接受者</p>
              <p class="expression-mini-note">something 是原书教授并由当前词汇检查器允许的课程构式，不是850个基础词条中的独立词条。</p>
            </article>
            <article>
              <h3>give a talk / make a statement</h3>
              <p><b>give / make</b>：承担不同的基本操作</p>
              <p><b>a talk / a statement</b>：把讲话或陈述作为一个动作名称表达</p>
            </article>
            <article>
              <h3>have a knowledge of it</h3>
              <p><b>have</b>：表示具有、拥有</p>
              <p><b>knowledge</b>：知识</p>
              <p><b>of it</b>：连接知识与其对象</p>
            </article>
          </div>
          <p class="expression-caution">注意：这里不是让你记住 speak = say / give / have。你必须先判断 speak 在当前句子中的意思。</p>
        </section>

        <section class="expression-quiz">
          <div class="expression-section-heading">
            <span class="expression-step-label">CHECK YOUR UNDERSTANDING</span>
            <h2>练习一：先判断语境</h2>
            <p>每道题只选一个最符合题目意思的表达。</p>
          </div>
          ${quiz.map(function (q, index) {
            return `
              <fieldset class="expression-question" data-question="${q.id}">
                <legend>${index + 1}. ${q.question}</legend>
                <p>${q.prompt}</p>
                <div class="expression-options">
                  ${q.options.map(function (option) {
                    return `
                      <label class="expression-option">
                        <input type="radio" name="expression-${q.id}" value="${option.value}">
                        <span>${option.label}</span>
                      </label>
                    `;
                  }).join('')}
                </div>
                <div class="expression-feedback" id="feedback-${q.id}" aria-live="polite"></div>
              </fieldset>
            `;
          }).join('')}
          <div class="expression-quiz-actions">
            <button type="button" class="expression-primary" id="expression-check">检查答案</button>
            <button type="button" class="expression-secondary" id="expression-reset">重新练习</button>
            <strong id="expression-score" aria-live="polite"></strong>
          </div>
        </section>

        <section class="expression-practice">
          <span class="expression-step-label">MAKE YOUR OWN SENTENCE</span>
          <h2>练习二：自己构造 Basic 表达</h2>
          <p>请用 Basic 表达“我向他表达一些内容”。先写完整句子，再依次完成词汇、语法结构和意思检查。</p>
          <textarea id="expression-writing" rows="3" placeholder="Write your Basic English sentence here..."></textarea>
          <p class="expression-check-intro">请按顺序完成三项检查。只有前一步通过后，下一步才会开放。</p>
          <div class="expression-writing-actions">
            <button type="button" class="expression-primary" id="expression-check-words">① 检查850词汇</button>
            <button type="button" class="expression-primary" id="expression-check-grammar" disabled>② 检查语法结构</button>
            <button type="button" class="expression-primary" id="expression-check-meaning" disabled>③ 检查意思</button>
            <button type="button" class="expression-secondary" id="expression-show-hint">显示提示</button>
          </div>
          <p class="expression-hint" id="expression-hint" hidden>提示：本课的原作者例子是 “say something to him”。请自己组织完整句子。</p>
          <div class="expression-writing-feedback" id="expression-vocabulary-feedback" aria-live="polite"></div>
          <div class="expression-writing-feedback" id="expression-grammar-feedback" aria-live="polite"></div>
          <div class="expression-writing-feedback" id="expression-meaning-feedback" aria-live="polite"></div>
          <p class="expression-limitation">自动检查范围：本题的目标句型是“主语 + say/says + something/nothing + to + 宾格代词”。其他句型暂不支持自动判断；未识别不等于语法错误。本功能不是通用英语语法或自然度检查。</p>
        </section>

        <section class="expression-reverse">
          <h2>练习三：反向理解</h2>
          <p>看到 Basic 表达，也要能理解它在当前语境中表示什么。</p>
          <div class="expression-reverse-grid">
            <div><b>say something to him</b><span>向他表达一些内容</span></div>
            <div><b>give a talk</b><span>进行一次讲话</span></div>
            <div><b>make a statement</b><span>发表一项陈述</span></div>
            <div><b>have a knowledge of it</b><span>具有关于它的知识；在原例中指掌握一种语言</span></div>
          </div>
          <p class="expression-caution">单独看到 have a knowledge of it，不能断定 it 一定指语言；原句语境决定具体含义。</p>
        </section>

        <section class="expression-next">
          <span class="expression-step-label">NEXT CONTENT · NOT YET IMPLEMENTED</span>
          <h2>接下来要学习的原作者例子</h2>
          <div class="expression-next-list">
            <span>tell a story → give it</span>
            <span>sing → give a song</span>
            <span>listen → give attention</span>
            <span>read carefully → go through it with care</span>
            <span>eat → take food / have a meal</span>
          </div>
          <p>这些内容已经完成原文研究，尚未制作成 App 课程。不会把研究文档冒充成已经上线的课程。</p>
        </section>

        <footer class="expression-source">
          <b>原作者依据</b>
          <p>C. K. Ogden, <i>The ABC of Basic English</i>, “Some Common Needs: Simple Acts”, pp.244–245.</p>
          <a href="https://upload.wikimedia.org/wikipedia/commons/d/d3/NLC511-023031404015268-27413_%E5%9F%BA%E6%9C%AC%E8%8B%B1%E8%AA%9E%E4%B9%8B%E5%88%9D%E6%AD%A5._%E4%B8%8B.pdf" target="_blank" rel="noopener noreferrer">查看原作者原书</a>
          <p class="expression-project-note">本课的原始表达来自 Ogden；结构拆解、互动练习和教学流程是本项目新增的教学设计。</p>
        </footer>
      </section>
    `;

    const checkButton = container.querySelector('#expression-check');
    const resetButton = container.querySelector('#expression-reset');
    const wordButton = container.querySelector('#expression-check-words');
    const grammarButton = container.querySelector('#expression-check-grammar');
    const meaningButton = container.querySelector('#expression-check-meaning');
    const writingInput = container.querySelector('#expression-writing');
    const hintButton = container.querySelector('#expression-show-hint');

    container.querySelectorAll('.expression-option input').forEach(function (input) {
      input.addEventListener('change', function () {
        container.querySelectorAll('input[name="' + input.name + '"]').forEach(function (peer) {
          const label = peer.closest('.expression-option');
          if (label) label.classList.toggle('is-selected', peer.checked);
        });
      });
    });

    if (checkButton) checkButton.addEventListener('click', function () { checkQuiz(container); });
    if (resetButton) resetButton.addEventListener('click', function () { resetQuiz(container); });
    if (wordButton) wordButton.addEventListener('click', function () { checkVocabulary(container); });
    if (grammarButton) grammarButton.addEventListener('click', function () { checkGrammar(container); });
    if (meaningButton) meaningButton.addEventListener('click', function () { checkMeaning(container); });
    if (writingInput) writingInput.addEventListener('input', function () { resetWritingChecks(container); });
    if (hintButton) hintButton.addEventListener('click', function () {
      const hint = container.querySelector('#expression-hint');
      if (hint) hint.hidden = !hint.hidden;
    });

    window.scrollTo(0, 0);
  }

  function checkQuiz(container) {
    let score = 0;
    let unanswered = 0;
    quiz.forEach(function (q) {
      const selected = container.querySelector('input[name="expression-' + q.id + '"]:checked');
      const feedback = container.querySelector('#feedback-' + q.id);
      if (!selected) {
        unanswered++;
        if (feedback) {
          feedback.textContent = '请先选择一个答案。';
          feedback.className = 'expression-feedback is-pending';
        }
        return;
      }
      const correct = selected.value === q.answer;
      if (correct) score++;
      if (feedback) {
        feedback.textContent = (correct ? '判断正确。' : '这次不正确。') + q.explanation;
        feedback.className = 'expression-feedback ' + (correct ? 'is-correct' : 'is-wrong');
      }
    });
    const scoreBox = container.querySelector('#expression-score');
    if (scoreBox) scoreBox.textContent = unanswered ? '已答 ' + (quiz.length - unanswered) + ' / ' + quiz.length + '；请完成剩余题目。' : '得分：' + score + ' / ' + quiz.length;
  }

  function resetQuiz(container) {
    container.querySelectorAll('input[name^="expression-"]').forEach(function (input) { input.checked = false; });
    container.querySelectorAll('.expression-option').forEach(function (label) { label.classList.remove('is-selected'); });
    container.querySelectorAll('.expression-feedback').forEach(function (feedback) {
      feedback.textContent = '';
      feedback.className = 'expression-feedback';
    });
    const scoreBox = container.querySelector('#expression-score');
    if (scoreBox) scoreBox.textContent = '';
  }

  function resetWritingChecks(container) {
    ['expression-vocabulary-feedback', 'expression-grammar-feedback', 'expression-meaning-feedback'].forEach(function (id) {
      const feedback = container.querySelector('#' + id);
      if (feedback) {
        feedback.textContent = '';
        feedback.className = 'expression-writing-feedback';
      }
    });
    const grammarButton = container.querySelector('#expression-check-grammar');
    const meaningButton = container.querySelector('#expression-check-meaning');
    if (grammarButton) grammarButton.disabled = true;
    if (meaningButton) meaningButton.disabled = true;
  }

  function checkVocabulary(container) {
    const input = container.querySelector('#expression-writing');
    const feedback = container.querySelector('#expression-vocabulary-feedback');
    const grammarButton = container.querySelector('#expression-check-grammar');
    if (!input || !feedback) return;
    resetWritingChecks(container);
    const text = input.value.trim();
    if (!text) {
      feedback.textContent = '请先写一句 Basic English。';
      feedback.className = 'expression-writing-feedback is-wrong';
      return;
    }
    if (!window.BE || typeof window.BE.validate !== 'function') {
      feedback.textContent = '当前无法调用词汇检查器，暂时不能继续。';
      feedback.className = 'expression-writing-feedback is-wrong';
      return;
    }
    const result = window.BE.validate(text);
    if (result && result.valid) {
      feedback.textContent = '词汇检查通过：未发现超出当前词汇规则的单词。下一步请点击“② 检查语法结构”。';
      feedback.className = 'expression-writing-feedback is-correct';
      if (grammarButton) grammarButton.disabled = false;
    } else {
      const bad = result && result.errors ? result.errors.map(function (item) { return item.word; }).join('、') : '无法识别的词';
      feedback.textContent = '词汇检查未通过：发现不符合当前词汇规则的词：' + bad + '。请修改后重新检查。';
      feedback.className = 'expression-writing-feedback is-wrong';
    }
  }

  function analyzeLessonSentence(text) {
    const subjectPronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
    const objectPronouns = ['me', 'you', 'him', 'her', 'it', 'us', 'them'];
    const contentWords = ['something', 'nothing'];
    const normalized = String(text || '').trim().toLowerCase()
      .replace(/[.!?;:,。！？；，]+$/g, '')
      .replace(/\s+/g, ' ');
    const tokens = normalized ? normalized.split(' ') : [];
    if (!tokens.length) return { status: 'error', message: '请先输入句子。' };

    const subject = tokens[0];
    const verb = tokens[1];

    if (tokens.length === 4 && subjectPronouns.includes(subject) &&
        ['say', 'says'].includes(verb) && contentWords.includes(tokens[2]) &&
        (objectPronouns.includes(tokens[3]) || subjectPronouns.includes(tokens[3]))) {
      return { status: 'error', message: 'say 后面的内容与接受者之间缺少 to。应使用：say + 内容 + to + 接受者。' };
    }
    if (tokens.length === 4 && subjectPronouns.includes(subject) &&
        ['say', 'says'].includes(verb) && objectPronouns.includes(tokens[2]) &&
        contentWords.includes(tokens[3])) {
      return { status: 'error', message: '本课结构的顺序是 say + 内容 + to + 接受者，不能把接受者直接放在内容前面。' };
    }
    if (tokens.length === 5 && subjectPronouns.includes(subject) &&
        ['say', 'says'].includes(verb) && tokens[2] === 'to' &&
        objectPronouns.includes(tokens[3]) && contentWords.includes(tokens[4])) {
      return { status: 'error', message: '词序不符合本课结构。应把表达内容放在 to 前面：say + something + to + him。' };
    }
    if (tokens.length !== 5) {
      return { status: 'unsupported', message: '本课自动检查目前只识别五部分句型：主语 + say/says + something/nothing + to + 宾格代词。其他长度的句子暂不在检查范围内。' };
    }

    const sentence = tokens;
    const s = sentence[0];
    const v = sentence[1];
    const content = sentence[2];
    const preposition = sentence[3];
    const recipient = sentence[4];

    if (!subjectPronouns.includes(s)) {
      return { status: 'unsupported', message: '本课自动检查目前要求句首使用人称代词（I、you、he、she、it、we、they）；其他主语暂不在检查范围内。' };
    }
    if (!['say', 'says'].includes(v)) {
      return { status: 'unsupported', message: '本课自动检查目前只检查 say/says 这一表达结构；其他动词结构暂不在检查范围内。' };
    }

    const requiredVerb = ['he', 'she', 'it'].includes(s) ? 'says' : 'say';
    if (v !== requiredVerb) {
      return {
        status: 'error',
        message: ['he', 'she', 'it'].includes(s)
          ? '主谓一致错误：主语是 he/she/it 时，本句型使用 says。'
          : '主谓一致错误：主语是 I/you/we/they 时，本句型使用 say。'
      };
    }
    if (!contentWords.includes(content)) {
      return { status: 'unsupported', message: '本课自动检查目前只识别 something 或 nothing 作为 say 后面的内容词；其他内容表达暂不在检查范围内。' };
    }
    if (preposition !== 'to') {
      return { status: 'error', message: '这里要指出说话内容的接受者，应使用介词 to。结构是 say + 内容 + to + 接受者。' };
    }
    if (!objectPronouns.includes(recipient)) {
      if (subjectPronouns.includes(recipient)) {
        return { status: 'error', message: 'to 后面需要宾格代词：例如 him，而不是 he；her，而不是 she。' };
      }
      return { status: 'unsupported', message: '本课自动检查目前只识别 me、you、him、her、it、us、them 作为 to 后面的接受者。' };
    }
    return { status: 'pass', subject: s, verb: v, content: content, recipient: recipient };
  }

  function checkGrammar(container) {
    const input = container.querySelector('#expression-writing');
    const feedback = container.querySelector('#expression-grammar-feedback');
    const meaningFeedback = container.querySelector('#expression-meaning-feedback');
    const meaningButton = container.querySelector('#expression-check-meaning');
    if (!input || !feedback) return;
    if (meaningFeedback) {
      meaningFeedback.textContent = '';
      meaningFeedback.className = 'expression-writing-feedback';
    }
    if (meaningButton) meaningButton.disabled = true;

    const result = analyzeLessonSentence(input.value);
    if (result.status === 'pass') {
      feedback.textContent = '语法结构检查通过：句子符合“主语 + say/says + 内容 + to + 接受者”的本课句型。下一步请点击“③ 检查意思”。注意：这只检查本课句型，不代表完整英语语法已全部检查。';
      feedback.className = 'expression-writing-feedback is-correct';
      if (meaningButton) meaningButton.disabled = false;
    } else if (result.status === 'error') {
      feedback.textContent = '语法结构检查未通过：' + result.message;
      feedback.className = 'expression-writing-feedback is-wrong';
    } else {
      feedback.textContent = '暂时无法判断：' + result.message + '这不等于你的句子一定有语法错误。';
      feedback.className = 'expression-writing-feedback is-pending';
    }
  }

  function checkMeaning(container) {
    const input = container.querySelector('#expression-writing');
    const feedback = container.querySelector('#expression-meaning-feedback');
    if (!input || !feedback) return;
    const parsed = analyzeLessonSentence(input.value);
    if (parsed.status !== 'pass') {
      feedback.textContent = '请先通过“② 检查语法结构”，再检查意思。';
      feedback.className = 'expression-writing-feedback is-pending';
      return;
    }

    const subjectNames = { i: '我', you: '你', he: '他', she: '她', it: '它', we: '我们', they: '他们' };
    const objectNames = { me: '我', you: '你', him: '他', her: '她', it: '它', us: '我们', them: '他们' };
    const mismatches = [];
    if (parsed.subject !== 'i') {
      mismatches.push('主语 ' + parsed.subject + ' 表示“' + subjectNames[parsed.subject] + '”，题目要求的是“我”。');
    }
    if (parsed.content !== 'something') {
      mismatches.push(parsed.content === 'nothing'
        ? 'nothing 表示“没有内容”，题目要求的是“一些内容”。'
        : '表达内容与题目不一致。');
    }
    if (parsed.recipient !== 'him') {
      mismatches.push('to ' + parsed.recipient + ' 表示“向' + objectNames[parsed.recipient] + '”，题目要求的是“向他”。');
    }

    if (mismatches.length === 0) {
      feedback.textContent = '意思检查通过：I = 我；say = 说出/表达；something = 一些内容；to him = 向他。句子保留了题目中的说话者、表达内容和接受者。';
      feedback.className = 'expression-writing-feedback is-correct';
    } else {
      feedback.textContent = '意思检查未通过：' + mismatches.join(' ');
      feedback.className = 'expression-writing-feedback is-wrong';
    }
  }

  window.BE = window.BE || {};
  window.BE.expression = { render: render };
})();
