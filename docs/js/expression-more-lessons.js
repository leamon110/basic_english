(function () {
  const LESSONS = [
    {
      id:'e3',label:'LESSON 03',title:'Names of Acts：同一个动作，按语境重新表达',
      summary:'普通英语动作词不是一对一替换。先判断动作的具体含义，再选择 Basic 的 Operator、Name 和关系结构。',
      source:'BASIC_ENGLISH_NAMES_OF_ACTS.md；Ogden, The ABC of Basic English, Names of Acts 与 Some Common Needs。',
      examples:[
        ['tell a story','give it','把讲述看作把故事内容给予听者'],
        ['sing','give a song','把歌唱作为给出一首歌'],
        ['touch something','put a hand / finger on it; give it a touch','说明接触动作或接触结果'],
        ['hit something hard','give it a blow','用 blow 这个动作名称表达击打'],
        ['catch a ball','get it in the hand','强调球进入手中的结果'],
        ['hold a ball','get a grip of it; keep it; have it in the hand','分别强调抓牢、保持和手中持有'],
        ['run quickly','go quickly','强调快速移动'],
        ['run for health','take a run','强调以跑步作为一项活动'],
        ['think','give thought to','把思考作为动作名称表达'],
        ['understand an argument','see the point of the argument','强调看出论点的要点'],
        ['remember / forget','keep it in mind / put it out of the mind','按记住或忘记选择相反的关系']
      ],
      questions:[
        ['e3-01','tell a story 在原作者例子中怎样表达？',['make a story','give it','take a story'],1,'原书把 tell a story 对应为 give it；it 指故事内容。'],
        ['e3-02','sing 在原作者例子中怎样表达？',['take a song','make a song','give a song'],2,'原书用 give a song 表达 sing。'],
        ['e3-03','touch something 可以怎样表达？',['put a hand on it','send it away','make a statement'],0,'put a hand on it 直接说明手与对象发生接触。'],
        ['e3-04','hit something hard 可以怎样表达？',['give it a touch','give it a blow','take a look'],1,'give it a blow 用动作名称 blow 表达一次击打。'],
        ['e3-05','catch a ball 在原作者例子中怎样表达？',['keep it in mind','put it out of the mind','get it in the hand'],2,'get it in the hand 强调球进入手中的结果。'],
        ['e3-06','run quickly 与 run for health 的表达如何区分？',['二者都用 take a run','run quickly → go quickly；run for health → take a run','run quickly → give a run；run for health → go quickly'],1,'前者强调快速移动；后者把跑步作为一项活动。'],
        ['e3-07','think about a question 可以怎样表达？',['give thought to the question','make a question','send thought from the question'],0,'give thought to 是原书列出的 think 表达方式。'],
        ['e3-08','understand an argument 在原作者例子中怎样表达？',['give a talk about the argument','see the point of the argument','take the argument away'],1,'see the point of the argument 强调理解其中的要点。'],
        ['e3-09','remember something 可以怎样表达？',['put it out of the mind','keep it in mind','give it away'],1,'keep it in mind 表示记住；put it out of the mind 对应 forget。'],
        ['e3-10','forget something 可以怎样表达？',['put it out of the mind','keep it in mind','give thought to it'],0,'put it out of the mind 表达把内容从头脑中排除。']
      ]
    },
    {
      id:'e4',label:'LESSON 04',title:'250 Fixed Word-Groups：为什么不能逐词推导',
      summary:'固定词组要作为完整组合学习。单词本身属于 850 词，并不代表任意组合都成立。',
      source:'BASIC_ENGLISH_250_FIXED_WORD_GROUPS.md；Ogden, The ABC of Basic English, The 250 Fixed Word-Groups, pp.212–242。',
      examples:[
        ['come to a stop','固定组合','不能把每个词的字面意义简单相加'],
        ['keep a government in','固定组合','需要按完整用法学习'],
        ['put up with','固定组合','不能只根据 put、up、with 的独立词义猜测'],
        ['250 项数量结构','50 + 80 + 20 + 100','原书 p.214 的四部分计数'],
        ['形成原因','attraction / omission / old picture','用法吸引、省略、历史意象']
      ],
      questions:[
        ['e4-01','原书 250 Fixed Word-Groups 的数量结构是哪一项？',['50 + 80 + 20 + 100','100 + 100 + 50','250 个 Operator 组合'],0,'原书 p.214 给出 50、80、20、100 四部分，总计 250。'],
        ['e4-02','下面哪一个是原书固定词组部分的例子？',['neck of a bottle','put up with','the leg of a bed'],1,'put up with 属于固定词组；neck of a bottle 和 leg of a bed 属于事物名称的意义扩展。'],
        ['e4-03','原书提出的固定词组形成原因包括哪些？',['用法吸引、省略、历史意象','只由复数词尾形成','只由 Operator + Directive 形成'],0,'原书 p.212 讨论 attraction、omission 和 old picture。'],
        ['e4-04','为什么不能只凭每个词的字面意思推导固定词组？',['固定组合可能来自历史用法或省略，整体意义不完全透明','因为固定词组不使用 850 词','因为每个词都没有独立意义'],0,'原书说明固定词组有历史形成原因，需要通过完整用法熟悉。'],
        ['e4-05','一个句子中的所有词都通过 850 词检查，是否足以证明整个短语正确？',['足以，词汇通过就代表短语正确','不足以，还要检查固定搭配和整体意义','只需要检查标点'],1,'词汇检查只检查词项；固定词组需要在组合层级判断。']
      ]
    },
    {
      id:'e5',label:'LESSON 05',title:'Some Common Needs：常见意思怎样用 Basic 表达',
      summary:'原作者专门讨论 850 词表没有直接覆盖的常见意思，说明如何用基础词和结构表达。',
      source:'BASIC_ENGLISH_NAMES_OF_ACTS.md；Ogden, The ABC of Basic English, Some Common Needs。',
      examples:[
        ['can','be able to / it is possible for someone to','能力或可能性，按句意选择'],
        ['ought','it is right / wise for someone to','应当、合宜或明智'],
        ['unless','if ... not','把 unless 的条件关系展开'],
        ['busy','has much to do / is working hard','有许多事要做或正在努力工作'],
        ['deaf','whose hearing is bad','从听觉能力说明 deaf'],
        ['home','the place where one is living / with one’s family','按居住地点或家庭语境理解'],
        ['world','earth / everyone / things / conditions','必须根据具体语境选择，不固定替换'],
        ['finish','有些普通词可以直接使用','不是每个普通英语词都必须改写']
      ],
      questions:[
        ['e5-01','unless 的 Basic 展开关系是什么？',['if ... not','because ...','after ...'],0,'unless 表示条件否定，可展开为 if ... not。'],
        ['e5-02','busy 可以怎样说明？',['has much to do / is working hard','has no work','is at home'],0,'原作者从有许多事要做或正在努力工作来说明 busy。'],
        ['e5-03','deaf 可以怎样说明？',['whose hearing is bad','whose eyes are bad','who is not at home'],0,'deaf 与 hearing（听觉）有关。'],
        ['e5-04','can 在表示能力时可以怎样表达？',['be able to','be in need of','give attention to'],0,'be able to 表示有能力做某事。'],
        ['e5-05','ought 可以怎样展开？',['it is right / wise for someone to','it is impossible for someone to','someone has no memory of'],0,'原作者用 right、wise 等结构表达 ought 的意思。'],
        ['e5-06','world 在不同语境中是否只有一个固定 Basic 替换？',['是，永远只用 earth','不是，可能指 earth、everyone、things 或 conditions','只用 people'],1,'原作者按语境区分 world 的不同用法，不能机械一对一替换。'],
        ['e5-07','home 的意思应怎样判断？',['结合居住地点或家庭语境','永远只表示建筑物','永远只表示家人'],0,'home 的表达取决于它指居住地点还是家庭生活。'],
        ['e5-08','是否每个普通英语词都必须改写成更长的 Basic 短语？',['是，所有词都必须改写','不是，有些词可以直接使用','只有名词可以直接使用'],1,'Common Needs 是为未直接覆盖的常见意思准备表达，不是要求所有普通词都改写。']
      ]
    }
  ];
  const KEY='BE_EXPR_MORE_LESSONS_PROGRESS';
  const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function load(){try{return JSON.parse(window.localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
  function save(p){try{window.localStorage.setItem(KEY,JSON.stringify(p))}catch(e){}}
  function render(container){
    const page=container&&container.querySelector('.expression-page');
    if(!page||page.querySelector('.expression-more-lessons'))return;
    const host=document.createElement('section');host.className='expression-more-lessons';
    const progress=load();
    host.innerHTML='<div class="e3-course-heading"><span class="expression-step-label">EXPRESSION SYSTEM · CONTINUED</span><h2>从动作、固定词组到日常需要</h2><p>这三课把原作者的 Names of Acts、250 Fixed Word-Groups 和 Some Common Needs 研究索引转成可练习的课程。项目新增的解释与例句会明确标为教学整理。</p></div>'+
      LESSONS.map((lesson,index)=>'<details class="e3-lesson" '+(index===0?'open':'')+'><summary><span class="expression-step-label">'+esc(lesson.label)+'</span><strong>'+esc(lesson.title)+'</strong><small>'+esc(lesson.summary)+'</small></summary><div class="e3-lesson-body"><p class="e3-source">'+esc(lesson.source)+'</p><h4>核心例子</h4><div class="e3-examples">'+lesson.examples.map(row=>'<div class="e3-example"><strong>'+esc(row[0])+'</strong><span>'+esc(row[1])+'</span><small>'+esc(row[2])+'</small></div>').join('')+'</div><div class="e3-quiz-heading"><h4>检查理解 · '+lesson.questions.length+' 题</h4><span class="e3-progress" data-progress="'+lesson.id+'">累计答题 '+((progress[lesson.id]||{}).attempts||0)+' 次</span></div><div class="e3-questions">'+lesson.questions.map((q,i)=>'<article class="e3-question" data-question="'+q[0]+'"><p>第 '+(i+1)+' 题</p><h5>'+esc(q[1])+'</h5><div class="e3-options">'+q[2].map((o,j)=>'<button type="button" class="e3-option" data-option="'+j+'" aria-pressed="false">'+esc(o)+'</button>').join('')+'</div><div class="e3-feedback" aria-live="polite"></div><button type="button" class="expression-secondary e3-check">检查答案</button></article>').join('')+'</div></div></details>').join('');
    const before=page.querySelector('.expression-next')||page.querySelector('.expression-source');if(before)page.insertBefore(host,before);else page.appendChild(host);
    LESSONS.forEach(lesson=>lesson.questions.forEach(q=>{
      const card=host.querySelector('[data-question="'+q[0]+'"]');if(!card)return;
      let selected=-1,checked=false;
      card.querySelectorAll('.e3-option').forEach(button=>button.addEventListener('click',()=>{if(checked)return;selected=Number(button.dataset.option);card.querySelectorAll('.e3-option').forEach(peer=>{const active=Number(peer.dataset.option)===selected;peer.classList.toggle('is-selected',active);peer.setAttribute('aria-pressed',active?'true':'false')})}));
      card.querySelector('.e3-check').addEventListener('click',()=>{
        if(checked)return;const feedback=card.querySelector('.e3-feedback');if(selected<0){feedback.textContent='请先选择一个答案。';feedback.className='e3-feedback is-pending';return;}
        checked=true;const ok=selected===q[3];const p=load(),state=p[lesson.id]||{attempts:0,correct:0};state.attempts++;if(ok)state.correct++;p[lesson.id]=state;save(p);
        card.querySelectorAll('.e3-option').forEach((button,i)=>{button.disabled=true;if(i===q[3])button.classList.add('is-answer');if(i===selected&&!ok)button.classList.add('is-wrong')});
        feedback.textContent=(ok?'回答正确。':'这次没有答对。')+q[4];feedback.className='e3-feedback '+(ok?'is-correct':'is-wrong');
        card.querySelector('.e3-check').disabled=true;const counter=host.querySelector('[data-progress="'+lesson.id+'"]');if(counter)counter.textContent='累计答题 '+state.attempts+' 次 · 答对 '+state.correct+' 次';
      });
    }));
  }
  window.BE=window.BE||{};window.BE.expressionMoreLessons={lessons:LESSONS,render};
})();