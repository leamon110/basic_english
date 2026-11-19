(function () {
  const DATA = window.BE && window.BE.expressionCourseData;
  const CONTENT = window.BE && window.BE.expressionCourseContent;
  if (!DATA || !CONTENT) { console.error('[Expression Course] Missing local course data.'); return; }
  const esc = function (v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]); }); };
  function readProgress() {
    try { const p=JSON.parse(window.localStorage.getItem(DATA.progressKey)||'{}'); if(!p||typeof p!=='object'||Array.isArray(p))return {version:1,lessons:{}}; if(!p.lessons||typeof p.lessons!=='object')p.lessons={}; p.version=1; return p; }
    catch(e){return {version:1,lessons:{}};}
  }
  function writeProgress(p){try{window.localStorage.setItem(DATA.progressKey,JSON.stringify(p));return true;}catch(e){return false;}}
  function updateProgress(id,fn){
    if(!DATA.modules.some(m=>m.lessons.some(l=>l.id===id)))return null;
    const p=readProgress(),s=p.lessons[id]||{views:0,attempts:0,correct:0,completedAt:null,lastViewedAt:null};
    fn(s);p.lessons[id]=s;p.updatedAt=Date.now();writeProgress(p);return s;
  }
  function markViewed(id){return updateProgress(id,s=>{s.views=(s.views||0)+1;s.lastViewedAt=Date.now();});}
  function recordPractice(id,ok){return updateProgress(id,s=>{s.attempts=(s.attempts||0)+1;if(ok)s.correct=(s.correct||0)+1;});}
  function markComplete(id){return updateProgress(id,s=>{if(!s.completedAt)s.completedAt=Date.now();});}
  function getProgressSummary(){
    const p=readProgress();let completed=0,attempts=0,correct=0;
    DATA.modules.forEach(m=>m.lessons.forEach(l=>{const s=p.lessons[l.id]||{};if(s.completedAt)completed++;attempts+=s.attempts||0;correct+=s.correct||0;}));
    return {completed,total:15,attempts,correct};
  }
  function getLesson(id){for(const m of DATA.modules){const l=m.lessons.find(x=>x.id===id);if(l)return {module:m,lesson:l};}return null;}
  function lessonLabel(l){const f=getLesson(l.id);return f?'Module '+f.module.number+' · Lesson '+f.lesson.number:'';}
  function destinationLabel(id){if(!id)return '基础教学 / 参考资料';const f=getLesson(id);return f?'Module '+f.module.number+' · Lesson '+f.lesson.number:'基础教学 / 参考资料';}
  function candidateLabel(candidate){const n=Number(String(candidate).slice(1));if(!Number.isFinite(n)||n<1||n>15)return '';return destinationLabel(n<=12?'m2-l'+n:'m1-l'+(n-12));}

  function render(container){
    if(!container)return;
    container.innerHTML='<div class="expression-course"><header class="ec-header"><div><span class="expression-kicker">OGDEN BASIC ENGLISH · EXPRESSION SYSTEM</span><h1>表达系统 <span>Expression System</span></h1><p>从真实意思出发，判断语境和关系，再选择或组合 Basic 词汇表达。</p></div><div class="ec-header-note"><strong>独立学习区域</strong><span>与原版 45 Steps、850 词卡及真人发音保持分开。</span></div></header><nav class="ec-top-nav"><button type="button" data-ec-action="overview">课程首页</button><button type="button" data-ec-action="reference">250 固定词组参考</button></nav><main class="ec-view" id="ec-view"></main></div>';
    const root=container.querySelector('.expression-course');
    root.addEventListener('click',function(e){
      const b=e.target.closest('[data-ec-action]');if(!b)return;
      const a=b.dataset.ecAction;
      if(a==='overview')renderOverview(root);
      else if(a==='reference')renderReference(root);
      else if(a==='module')renderModule(root,b.dataset.moduleId);
      else if(a==='lesson')renderLesson(root,b.dataset.lessonId);
      else if(a==='complete'){markComplete(b.dataset.lessonId);renderLesson(root,b.dataset.lessonId);}
    });
    renderOverview(root);
  }

  function renderOverview(root){
    const view=root.querySelector('#ec-view'),p=getProgressSummary(),progress=readProgress();
    const cards=DATA.modules.map(m=>{
      const done=m.lessons.filter(l=>(progress.lessons[l.id]||{}).completedAt).length;
      return '<article class="ec-module-card"><div class="ec-module-top"><span>MODULE '+m.number+'</span><strong>'+m.lessons.length+' 课</strong></div><h2>'+esc(m.title)+'</h2><p>'+esc(m.objective)+'</p><div class="ec-progress-line"><span style="width:'+Math.round(done/m.lessons.length*100)+'%"></span></div><small>已标记完成 '+done+' / '+m.lessons.length+' 课</small><button type="button" class="expression-primary" data-ec-action="module" data-module-id="'+esc(m.id)+'">进入 Module '+m.number+'</button></article>';
    }).join('');
    view.innerHTML='<section class="ec-overview"><div class="ec-overview-intro"><span class="expression-step-label">2 MODULES · 15 LESSONS</span><h2>学习结构</h2><p>两个 Module 解决两种不同的任务：理解 Basic 词本身的意义，以及用 Basic English 表达普通英语中的具体意思。</p><div class="ec-principle"><span>学习过程</span><strong>真实意思 → 语境判断 → Basic 结构 → 意思核对</strong></div></div><div class="ec-total-progress"><strong>'+p.completed+' / 15</strong><span>已标记完成课程</span><small>练习 '+p.attempts+' 次 · 答对 '+p.correct+' 次</small></div></section><section class="ec-module-grid">'+cards+'</section><section class="ec-reference-card"><div><span class="expression-step-label">CROSS-CUTTING REFERENCE</span><h2>250 Fixed Word-Groups</h2><p>固定词组按完整组合学习，不能只凭单词字面意思推导。250 项按主要意义关联到相应课程；50 Most Necessary 是其中的优先子集。</p></div><button type="button" class="expression-secondary" data-ec-action="reference">打开固定词组参考</button></section><p class="ec-numbering-note">学习界面只使用 Module / Lesson 编号。原版 45 Steps 不属于这两个 Module。</p>';
  }

  function renderModule(root,id){
    const m=DATA.modules.find(x=>x.id===id);if(!m)return renderOverview(root);
    const view=root.querySelector('#ec-view'),p=readProgress();
    const cards=m.lessons.map(l=>{
      const s=p.lessons[l.id]||{},status=s.completedAt?'<span class="ec-status is-done">已标记完成</span>':'<span class="ec-status">未完成</span>';
      const score=s.attempts?'<small>练习 '+s.attempts+' 次 · 答对 '+(s.correct||0)+' 次</small>':'<small>尚无练习记录</small>';
      return '<button type="button" class="ec-lesson-card" data-ec-action="lesson" data-lesson-id="'+esc(l.id)+'"><span class="ec-lesson-number">Module '+m.number+' · Lesson '+l.number+'</span><strong>'+esc(l.title)+'</strong><span class="ec-lesson-objective">'+esc(l.objective)+'</span><span class="ec-lesson-card-bottom">'+status+score+'</span></button>';
    }).join('');
    view.innerHTML='<div class="ec-page-heading"><button type="button" class="expression-secondary" data-ec-action="overview">← 返回课程首页</button><span class="expression-step-label">MODULE '+m.number+' · '+m.lessons.length+' LESSONS</span><h2>'+esc(m.title)+'</h2><p>'+esc(m.objective)+'</p></div><div class="ec-lesson-grid">'+cards+'</div>';
  }

  function renderLesson(root,id){
    const f=getLesson(id);if(!f)return renderOverview(root);
    const m=f.module,l=f.lesson;markViewed(id);
    const s=readProgress().lessons[id]||{},html=CONTENT[id]||'<p>本课内容尚未加载。</p>';
    const groups=DATA.fixedWordGroups.items.filter(x=>x.lessonId===id);
    const fixed=groups.length?'<details class="ec-fixed-lesson"><summary>本课关联的固定词组项目 · '+groups.length+' 项</summary><p>以下为原书项目的中文意义摘要，不是原书英文例句的逐字转录。</p><ul>'+groups.map(x=>'<li><strong>'+esc(x.id)+' · '+esc(x.group)+'</strong> — '+esc(x.summary)+'</li>').join('')+'</ul><button type="button" class="expression-secondary" data-ec-action="reference">查看完整 250 项索引</button></details>':'';
    root.querySelector('#ec-view').innerHTML='<div class="ec-page-heading"><button type="button" class="expression-secondary" data-ec-action="module" data-module-id="'+esc(m.id)+'">← 返回 Module '+m.number+'</button><span class="expression-step-label">'+lessonLabel(l)+'</span><h2>'+esc(l.title)+'</h2><p>'+esc(l.objective)+'</p><div class="ec-lesson-meta"><span>'+esc(l.source)+'</span><span>'+(s.completedAt?'已标记完成':'学习中')+'</span></div></div><article class="ec-lesson-content">'+html+'</article><section class="ec-practice-area" id="ec-practice-area"></section>'+fixed+'<section class="ec-completion"><div><strong>本课学习记录</strong><p>完成阅读和练习后，可以自行标记本课完成。此记录只写入新的课程进度，不改动旧原型进度。</p></div><button type="button" class="'+(s.completedAt?'expression-secondary':'expression-primary')+'" data-ec-action="complete" data-lesson-id="'+esc(id)+'">'+(s.completedAt?'已完成 · 再次确认':'标记本课完成')+'</button></section>';
    const practice=root.querySelector('#ec-practice-area');
    if(id==='m1-l1'||id==='m1-l2'||id==='m1-l3')renderLegacyQualityQuiz(practice,id);
    if(id==='m2-l1')renderSpeakPrototype(practice,id);
    renderMeaningBasic(practice,id);
  }

  function renderLegacyQualityQuiz(host,lessonId){
    const bank=window.BE.expressionCurriculum;if(!bank||!Array.isArray(bank.questions))return;
    const map=DATA.legacyPrototypeMap.oldLesson02.questionDestinations;
    const qs=bank.questions.filter(q=>map[q[0]]===lessonId);if(!qs.length)return;
    const title=lessonId==='m1-l1'?'从旧原型迁入的 Names of Things 检查题':lessonId==='m1-l2'?'从旧原型迁入的 Quality 扩展检查题':'从旧原型迁入的 Special Use 检查题';
    const section=document.createElement('section');section.className='ec-prototype-quiz';host.appendChild(section);
    renderChoiceQuiz(section,lessonId,title,qs.map(q=>({id:q[0],prompt:q[1],options:q[2],answer:q[3],explanation:q[4]})));
  }

  function renderSpeakPrototype(host,lessonId){
    const bank=window.BE.expression;if(!bank||!Array.isArray(bank.quiz))return;
    const section=document.createElement('section');section.className='ec-prototype-quiz';host.appendChild(section);
    renderChoiceQuiz(section,lessonId,'speak 的三个语境（整合自旧原型）',bank.quiz.map(q=>({id:q.id,prompt:q.question+' — '+q.prompt,options:q.options.map(o=>o.label),answer:q.options.findIndex(o=>o.value===q.answer),explanation:q.explanation})));
    renderSpeakChecker(section,lessonId);
  }

  function renderChoiceQuiz(host,lessonId,title,questions){
    host.innerHTML+='<div class="ec-quiz-heading"><span class="expression-step-label">GUIDED PRACTICE</span><h3>'+esc(title)+'</h3></div><div class="ec-choice-quiz">'+questions.map((q,i)=>'<article class="ec-choice-question" data-ec-q="'+esc(q.id)+'"><p class="ec-question-number">第 '+(i+1)+' 题</p><h4>'+esc(q.prompt)+'</h4><div class="ec-choice-options">'+q.options.map((o,j)=>'<button type="button" class="ec-choice-option" data-choice="'+j+'">'+esc(o)+'</button>').join('')+'</div><p class="ec-choice-feedback" aria-live="polite"></p><button type="button" class="expression-secondary ec-choice-check">检查答案</button></article>').join('')+'</div>';
    questions.forEach(q=>{
      const card=host.querySelector('[data-ec-q="'+q.id+'"]');if(!card)return;let selected=-1,checked=false;
      card.querySelectorAll('.ec-choice-option').forEach(b=>b.addEventListener('click',()=>{if(checked)return;selected=Number(b.dataset.choice);card.querySelectorAll('.ec-choice-option').forEach((peer,i)=>{peer.classList.toggle('is-selected',i===selected);peer.setAttribute('aria-pressed',i===selected?'true':'false');});}));
      card.querySelector('.ec-choice-check').addEventListener('click',()=>{if(checked)return;const feedback=card.querySelector('.ec-choice-feedback');if(selected<0){feedback.textContent='请先选择一个答案。';feedback.className='ec-choice-feedback is-pending';return;}checked=true;const ok=selected===q.answer;card.querySelectorAll('.ec-choice-option').forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add('is-answer');if(i===selected&&!ok)b.classList.add('is-wrong');});feedback.textContent=(ok?'回答正确。':'这次没有答对。')+(q.explanation||'');feedback.className='ec-choice-feedback '+(ok?'is-correct':'is-wrong');card.querySelector('.ec-choice-check').disabled=true;if(lessonId)recordPractice(lessonId,ok);});
    });
  }

  function renderSpeakChecker(host,lessonId){
    const section=document.createElement('section');section.className='ec-writing-checker';
    section.innerHTML='<div class="ec-quiz-heading"><span class="expression-step-label">FINITE WRITING CHECKER</span><h3>写出 Basic 表达：I say something to him.</h3><p>只检查本课已登记的一个五部分句型，不是通用语法或语义解析器。</p></div><textarea class="ec-writing-input" rows="3" placeholder="I say something to him."></textarea><div class="ec-writing-actions"><button type="button" class="expression-primary" data-stage="vocabulary">① 检查词汇</button><button type="button" class="expression-primary" data-stage="grammar" disabled>② 检查句型</button><button type="button" class="expression-primary" data-stage="meaning" disabled>③ 检查意思</button></div><p class="ec-stage-feedback" data-feedback="vocabulary" aria-live="polite"></p><p class="ec-stage-feedback" data-feedback="grammar" aria-live="polite"></p><p class="ec-stage-feedback" data-feedback="meaning" aria-live="polite"></p>';
    host.appendChild(section);
    const input=section.querySelector('.ec-writing-input'),buttons={v:section.querySelector('[data-stage="vocabulary"]'),g:section.querySelector('[data-stage="grammar"]'),m:section.querySelector('[data-stage="meaning"]')};
    let vocab=false,grammar=false,last=null;
    function reset(){vocab=false;grammar=false;last=null;buttons.g.disabled=true;buttons.m.disabled=true;section.querySelectorAll('.ec-stage-feedback').forEach(n=>{n.textContent='';n.className='ec-stage-feedback';});}
    input.addEventListener('input',reset);
    buttons.v.addEventListener('click',()=>{reset();const f=section.querySelector('[data-feedback="vocabulary"]');if(!input.value.trim()){f.textContent='请先写一句 Basic English。';f.className='ec-stage-feedback is-wrong';return;}const r=window.BE.expression.inspectVocabulary(input.value),bad=r.words.filter(w=>!w.ok);f.textContent=r.valid?'词汇检查通过：'+r.totalWordCount+' 次词语出现，'+r.uniqueWordCount+' 个不同词项。':'词汇检查未通过：'+bad.map(w=>w.word).join('、');f.className='ec-stage-feedback '+(r.valid?'is-correct':'is-wrong');if(r.valid){vocab=true;buttons.g.disabled=false;}});
    buttons.g.addEventListener('click',()=>{if(!vocab)return;last=window.BE.expression.analyzeSpeakAnswer(input.value);const f=section.querySelector('[data-feedback="grammar"]');if(last.grammar.status==='pass'){grammar=true;buttons.m.disabled=false;f.textContent='句型检查通过：符合本课登记的 say/says + 内容 + to + 接受者结构。';f.className='ec-stage-feedback is-correct';}else{grammar=false;buttons.m.disabled=true;f.textContent=last.grammar.status==='error'?'句型检查未通过：'+last.grammar.message:'暂时无法判断：'+last.grammar.message+'这不等于句子一定错误。';f.className='ec-stage-feedback '+(last.grammar.status==='error'?'is-wrong':'is-pending');}});
    buttons.m.addEventListener('click',()=>{if(!grammar)return;last=window.BE.expression.analyzeSpeakAnswer(input.value);const f=section.querySelector('[data-feedback="meaning"]');f.textContent=last.meaning.message;f.className='ec-stage-feedback '+(last.meaning.status==='pass'?'is-correct':'is-wrong');recordPractice(lessonId,last.meaning.status==='pass');buttons.m.disabled=true;});
  }

  function renderMeaningBasic(host,lessonId){
    const checker=window.BE.meaningBasic;if(!checker||!checker.questions)return;
    const ids=Object.keys(DATA.meaningBasicDestinations).filter(id=>DATA.meaningBasicDestinations[id]===lessonId).sort((a,b)=>Number(a.slice(2))-Number(b.slice(2)));
    if(!ids.length)return;
    const section=document.createElement('section');section.className='ec-meaning-basic';
    section.innerHTML='<div class="ec-quiz-heading"><span class="expression-step-label">MEANING → BASIC · REGISTERED CHECKER</span><h3>把本课意思写成 Basic 表达</h3><p>本课有 '+ids.length+' 道已登记检查题。只检查这些题目明确支持的句型和语义角色；未登记的表达会显示“暂时无法判断”。</p></div><label class="ec-field-label">选择练习</label><select class="ec-mb-select">'+ids.map(id=>'<option value="'+id+'">'+esc(checker.questions[id].title)+'</option>').join('')+'</select><div class="ec-mb-prompt"><strong>要表达的意思</strong><p class="ec-mb-prompt-text"></p><p class="ec-mb-roles"></p><div class="ec-mb-perspective" hidden><label>说话者／观察者的位置</label><select class="ec-mb-perspective-select"><option value="at_house">说话者在房子附近（使用 come）</option><option value="elsewhere">说话者在其他地方（使用 go）</option></select></div><p class="ec-mb-hint"></p></div><label class="ec-field-label">写出你的 Basic 表达</label><textarea class="ec-mb-answer" rows="3" placeholder="Write your Basic English sentence here..."></textarea><div class="ec-writing-actions"><button type="button" class="expression-primary" data-mb-stage="vocabulary">① 检查词汇</button><button type="button" class="expression-primary" data-mb-stage="grammar" disabled>② 检查句型</button><button type="button" class="expression-primary" data-mb-stage="meaning" disabled>③ 检查意思</button></div><p class="ec-stage-feedback" data-mb-feedback="vocabulary" aria-live="polite"></p><p class="ec-stage-feedback" data-mb-feedback="grammar" aria-live="polite"></p><p class="ec-stage-feedback" data-mb-feedback="meaning" aria-live="polite"></p><p class="ec-checker-limit">词汇通过不代表句型和意思通过。本检查器只覆盖已登记的 27 道题及其有限规则，不是通用语法解析器或通用语义理解器。</p>';
    host.appendChild(section);
    const select=section.querySelector('.ec-mb-select'),perspective=section.querySelector('.ec-mb-perspective-select'),wrap=section.querySelector('.ec-mb-perspective'),prompt=section.querySelector('.ec-mb-prompt-text'),roles=section.querySelector('.ec-mb-roles'),hint=section.querySelector('.ec-mb-hint'),answer=section.querySelector('.ec-mb-answer');
    const buttons={v:section.querySelector('[data-mb-stage="vocabulary"]'),g:section.querySelector('[data-mb-stage="grammar"]'),m:section.querySelector('[data-mb-stage="meaning"]')};let vocab=false,grammar=false;
    function reset(){vocab=false;grammar=false;buttons.g.disabled=true;buttons.m.disabled=true;section.querySelectorAll('.ec-stage-feedback').forEach(n=>{n.textContent='';n.className='ec-stage-feedback';});}
    function update(){const q=checker.questions[select.value];prompt.textContent=q.prompt;roles.textContent='需要保留：'+q.roles;hint.textContent=q.hint;wrap.hidden=select.value!=='mb05';if(select.value==='mb05')roles.textContent+=' 当前视角：'+(perspective.value==='elsewhere'?'说话者在其他地方，房子是目的地。':'说话者在房子附近，男人朝说话者走来。');answer.value='';reset();}
    select.addEventListener('change',update);perspective.addEventListener('change',update);answer.addEventListener('input',reset);
    buttons.v.addEventListener('click',()=>{reset();const f=section.querySelector('[data-mb-feedback="vocabulary"]');if(!answer.value.trim()){f.textContent='请先写一句 Basic English。';f.className='ec-stage-feedback is-wrong';return;}const r=window.BE.validate(answer.value);if(!r.valid){f.textContent='词汇检查未通过：'+(r.errors||[]).map(x=>x.word).join('、');f.className='ec-stage-feedback is-wrong';return;}vocab=true;f.textContent='词汇检查通过。这里只说明词项符合当前词汇规则，不代表句型和意思已经通过。';f.className='ec-stage-feedback is-correct';buttons.g.disabled=false;});
    buttons.g.addEventListener('click',()=>{if(!vocab)return;const r=checker.analyzeAnswer(select.value,answer.value,perspective.value),f=section.querySelector('[data-mb-feedback="grammar"]');if(r.grammar==='pass'){grammar=true;f.textContent='句型检查通过：符合本题已登记的结构。下一步请检查意思。';f.className='ec-stage-feedback is-correct';buttons.m.disabled=false;}else{grammar=false;buttons.m.disabled=true;f.textContent='暂时无法判断：'+r.reason+'这不等于句子一定错误。';f.className='ec-stage-feedback is-pending';}});
    buttons.m.addEventListener('click',()=>{if(!grammar)return;const r=checker.analyzeAnswer(select.value,answer.value,perspective.value),f=section.querySelector('[data-mb-feedback="meaning"]');if(r.meaning==='pass'){f.textContent='意思检查通过：'+(r.note||'');f.className='ec-stage-feedback is-correct';recordPractice(lessonId,true);buttons.m.disabled=true;}else if(r.meaning==='fail'){f.textContent='意思检查未通过：'+r.reason;f.className='ec-stage-feedback is-wrong';recordPractice(lessonId,false);buttons.m.disabled=true;}else{f.textContent='暂时无法判断：'+r.reason+'这不等于句子一定错误。';f.className='ec-stage-feedback is-pending';}});
    update();
  }

  function renderReference(root){
    const view=root.querySelector('#ec-view'),items=DATA.fixedWordGroups.items,priority=DATA.fixedWordGroups.priority;
    const e4=window.BE.expressionMoreLessons&&window.BE.expressionMoreLessons.lessons.find(x=>x.id==='e4');
    view.innerHTML='<div class="ec-page-heading"><button type="button" class="expression-secondary" data-ec-action="overview">← 返回课程首页</button><span class="expression-step-label">CROSS-CUTTING REFERENCE · 250 ITEMS</span><h2>250 Fixed Word-Groups</h2><p>这里展示原书 250 项的项目中文意义摘要和主要课程归属；摘要不是原书英文例句的逐字转录。</p></div><section class="ec-fixed-reference"><div class="ec-reference-controls"><label>搜索词项或意义<input type="search" class="ec-fixed-search" placeholder="搜索 Operator、关系词或中文意义"></label><label>主要归属<select class="ec-fixed-filter"><option value="all">全部 250 项</option><option value="lesson">Expression Lessons</option><option value="foundation">基础教学</option></select></label></div><p class="ec-reference-count">共 '+items.length+' 项；50 Most Necessary 为优先子集，不额外增加总数。</p><div class="ec-fixed-results" aria-live="polite"></div></section><details class="ec-priority-list"><summary>50 Most Necessary Fixed Word-Groups（优先子集）</summary><ol>'+priority.map(x=>'<li><code>'+esc(x.phrase)+'</code></li>').join('')+'</ol></details><section class="ec-prototype-quiz" id="ec-fixed-quiz"></section>';
    const search=view.querySelector('.ec-fixed-search'),filter=view.querySelector('.ec-fixed-filter'),results=view.querySelector('.ec-fixed-results');
    function draw(){const q=search.value.trim().toLowerCase(),kind=filter.value;const found=items.filter(x=>(!q||(x.group+' '+x.category+' '+x.summary+' '+x.destination+' '+x.id).toLowerCase().includes(q))&&(kind==='all'||x.destinationKind===kind));results.innerHTML='<p>显示 '+found.length+' / '+items.length+' 项</p><ol>'+found.map(x=>'<li class="ec-fixed-item"><span class="ec-fixed-id">'+esc(x.id)+' · '+esc(x.group)+'</span><span>'+esc(x.summary)+'</span><small>主要归属：'+esc(destinationLabel(x.lessonId))+(x.relatedCandidates.length?'；交叉关联：'+esc(x.relatedCandidates.map(candidateLabel).join('、')):'')+'</small></li>').join('')+'</ol>';}
    search.addEventListener('input',draw);filter.addEventListener('change',draw);draw();
    if(e4&&e4.questions)renderChoiceQuiz(view.querySelector('#ec-fixed-quiz'),null,'固定词组学习边界检查',e4.questions.map(q=>({id:q[0],prompt:q[1],options:q[2],answer:q[3],explanation:q[4]})));
  }

  window.BE=window.BE||{};
  window.BE.expressionCourse={render:render,modules:DATA.modules,data:DATA,getProgress:readProgress,getProgressSummary:getProgressSummary,markComplete:markComplete,markViewed:markViewed,recordPractice:recordPractice,getLesson:getLesson};
})();