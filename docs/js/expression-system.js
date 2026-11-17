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
          <p>请用 Basic 表达“我向他表达一些内容”。先自己写，再检查词汇是否符合当前850词规则。</p>
          <textarea id="expression-writing" rows="3" placeholder="Write your Basic English sentence here..."></textarea>
          <div class="expression-writing-actions">
            <button type="button" class="expression-primary" id="expression-check-words">检查850词汇</button>
            <button type="button" class="expression-secondary" id="expression-show-hint">显示提示</button>
          </div>
          <p class="expression-hint" id="expression-hint" hidden>提示：本课的原作者例子是 “say something to him”。请自己组织完整句子。</p>
          <div class="expression-writing-feedback" id="expression-writing-feedback" aria-live="polite"></div>
          <p class="expression-limitation">词汇检查只核对850词及项目允许的词形，不判断语法、语义是否正确，也不判断表达是否自然。</p>
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

  function checkVocabulary(container) {
    const input = container.querySelector('#expression-writing');
    const feedback = container.querySelector('#expression-writing-feedback');
    if (!input || !feedback) return;
    const text = input.value.trim();
    if (!text) {
      feedback.textContent = '请先写一句 Basic English。';
      feedback.className = 'expression-writing-feedback is-wrong';
      return;
    }
    if (!window.BE || typeof window.BE.validate !== 'function') {
      feedback.textContent = '当前无法调用词汇检查器。';
      feedback.className = 'expression-writing-feedback is-wrong';
      return;
    }
    const result = window.BE.validate(text);
    if (result && result.valid) {
      feedback.textContent = '词汇检查通过：未发现超出当前词汇规则的单词。请继续检查语法和意思是否准确。';
      feedback.className = 'expression-writing-feedback is-correct';
    } else {
      const bad = result && result.errors ? result.errors.map(function (item) { return item.word; }).join('、') : '无法识别的词';
      feedback.textContent = '发现不符合当前词汇规则的词：' + bad + '。请检查是否能换成850词或允许的词形。';
      feedback.className = 'expression-writing-feedback is-wrong';
    }
  }

  window.BE = window.BE || {};
  window.BE.expression = { render: render };
})();
