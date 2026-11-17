(function () {
  const TERMS = [
    ['head','人的头部','事物较圆的顶部','形状／位置'],
    ['foot','人的脚','底部、基座','位置／支撑'],
    ['arm','人的手臂','处于相应位置的分支或杆状部分','形状／位置'],
    ['leg','人的腿','座椅或床的支撑部分','支撑作用'],
    ['chest','人的胸部','箱状物；原书举 chest of drawers','形状／结构'],
    ['mouth','人的嘴','开口','功能／结构'],
    ['lip','人的嘴唇','弯曲的出口或边缘','形状／位置'],
    ['neck','人的脖子','瓶子、小提琴等较窄的连接部分','形状／位置'],
    ['tail','动物的尾巴','事物的后端','位置'],
    ['tooth','人的牙齿','尖的部分','形状'],
    ['face','人的脸','事物朝前、在眼前的一侧','位置／朝向']
  ];
  const QUESTIONS = [
    ['e2-01','the neck of a bottle 中的 neck 指什么？',['瓶子较窄的连接部分','瓶子的底部','瓶子的开口'],0,'人的 neck 是较窄的连接部分；bottle 的 neck 延伸了这一形状和位置关系。'],
    ['e2-02','the leg of a bed 中的 leg 指什么？',['床的支撑部分','床上的被子','床头'],0,'人的腿支撑身体；床的 leg 支撑床体。'],
    ['e2-03','the mouth of a bottle 中的 mouth 指什么？',['瓶子的开口','瓶子的窄颈','瓶子的底部'],0,'原书把 mouth 的扩展意义列为 opening；完整短语是本项目的组合例句。'],
    ['e2-04','the foot of a table 中的 foot 指什么？',['桌子的底部或基座','桌子的边缘','桌面中央'],0,'foot 的扩展意义包括底部、基座；完整短语是本项目的组合例句。'],
    ['e2-05','原书列出的 tooth 扩展意义是什么？',['像牙齿一样尖的部分','事物的后端','事物的正面'],0,'tooth 从牙齿的尖形延伸到其他事物中尖的部分。'],
    ['e2-06','原书列出的 face 扩展意义是什么？',['事物朝前、在眼前的一侧','事物较圆的顶部','事物的支撑部分'],0,'face 的扩展与朝向和前面的位置有关。'],
    ['e2-07','bitter taste → bitter experience，体现什么联系？',['味觉感受延伸到经历带来的感受','从内部向外移动','复数词尾变化'],0,'原书指出性质词的扩展也会涉及人的感受和反应。'],
    ['e2-08','《The ABC》p.156 所说的 special use 在本章中指什么？',['意义收窄到较具体的用法','意义必然扩大','任意创造新的比喻义'],0,'这里的 special use 与 expansion 不同，重点是把意义限制到较窄范围。'],
    ['e2-09','head 的扩展意义是什么？',['事物较圆的顶部','事物的后端','弯曲的出口'],0,'原书把 head 的扩展与事物较圆的顶部相联系。'],
    ['e2-10','tail 的扩展意义是什么？',['事物的后端','事物的开口','事物的支撑部分'],0,'tail 可从动物尾巴扩展到事物的后端。']
  ];
  const KEY='BE_EXPR_LESSON_02_PROGRESS';
  const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function progress(){try{return JSON.parse(window.localStorage.getItem(KEY)||'{"attempts":0,"correct":0}')}catch(e){return {attempts:0,correct:0}}}
  function save(p){try{window.localStorage.setItem(KEY,JSON.stringify(p))}catch(e){}}
  function render(container){
    const page=container&&container.querySelector('.expression-page');
    if(!page||page.querySelector('.expression-lesson02'))return;
    const host=document.createElement('section');host.className='expression-lesson02';
    host.innerHTML='<div class="e2-heading"><span class="expression-step-label">LESSON 02 · 已集成</span><h2>身体部位名称怎样扩展到其他事物</h2><p>学习同一个词怎样从人的身体部位，延伸到其他事物中形状、位置或结构相近的部分。这里训练的是有依据的词义联系，不是任意联想。</p></div>'+
      '<div class="e2-objectives"><strong>本课目标</strong><ul><li>区分根本意义和扩展意义；</li><li>说明两种意义之间的形状、位置或结构联系；</li><li>结合上下文判断一个词当前指什么；</li><li>区分意义扩展与意义收窄的 special use。</li></ul></div>'+
      '<div class="e2-term-table-wrap"><table class="e2-term-table"><thead><tr><th>词</th><th>身体部位的根本意义</th><th>原书列出的扩展意义</th><th>关系归纳</th></tr></thead><tbody>'+
      TERMS.map(t=>'<tr><td><strong>'+esc(t[0])+'</strong></td><td>'+esc(t[1])+'</td><td>'+esc(t[2])+'</td><td>'+esc(t[3])+'</td></tr>').join('')+
      '</tbody></table></div><p class="e2-source-note">“形状／位置／结构／支撑作用”等标签是本项目的教学归纳，不是原作者在该页给出的正式分类。词义依据：Ogden, The ABC of Basic English, “Expansions: Names of Things and Qualities”, p.148。</p>'+
      '<div class="e2-example-grid"><article><span>例子 1</span><h3>the neck of a bottle</h3><p>瓶子较窄的连接部分，不是瓶子真的有人的脖子。</p><strong>形状与位置联系</strong></article><article><span>例子 2</span><h3>the leg of a bed</h3><p>床的支撑部分，不是床长着人的腿。</p><strong>支撑作用联系</strong></article></div>'+
      '<section class="e2-quiz"><div class="e2-quiz-heading"><span class="expression-step-label">CHECK YOUR UNDERSTANDING</span><h3>练习：判断扩展意义</h3><p>共 '+QUESTIONS.length+' 题。答题后会解释正确原因。</p><p class="e2-score" id="e2-score"></p></div><div id="e2-question"></div></section>'+
      '<section class="e2-independent"><span class="expression-step-label">MAKE YOUR OWN EXPLANATION</span><h3>独立说明一个词义扩展</h3><p>选择一个词，先写出根本意义、扩展意义和两者联系。自由回答不会被伪装成自动语义评分。</p><label for="e2-term">选择一个词</label><select id="e2-term">'+TERMS.map(t=>'<option value="'+esc(t[0])+'">'+esc(t[0])+'</option>').join('')+'</select><textarea id="e2-writing" rows="3" placeholder="Explain the root meaning, expanded meaning and their connection..."></textarea><button type="button" class="expression-secondary" id="e2-show-model">查看本词的参考说明</button><div class="e2-model" id="e2-model" hidden></div></section>'+
      '<p class="e2-boundary">自动检查只覆盖上面的 10 道选择题。自由说明由学习者对照参考内容自行检查；本课没有通用语法或语义解析器。</p>';
    const before=page.querySelector('.expression-next')||page.querySelector('.expression-source');if(before)page.insertBefore(host,before);else page.appendChild(host);
    let index=0,selected=-1,checked=false,score=0;const qHost=host.querySelector('#e2-question'),scoreNode=host.querySelector('#e2-score');
    function draw(){
      if(index>=QUESTIONS.length){const p=progress();qHost.innerHTML='<div class="e2-result"><h4>本课选择题完成</h4><p>本轮答对 '+score+' / '+QUESTIONS.length+' 题。</p><p>累计答题 '+(p.attempts||0)+' 次，累计答对 '+(p.correct||0)+' 次。</p><button type="button" class="expression-primary" id="e2-retry">重新练习</button></div>';qHost.querySelector('#e2-retry').addEventListener('click',()=>{index=0;selected=-1;checked=false;score=0;draw()});return;}
      const q=QUESTIONS[index];selected=-1;checked=false;
      qHost.innerHTML='<div class="e2-question-card"><p class="e2-question-count">第 '+(index+1)+' / '+QUESTIONS.length+' 题</p><h4>'+esc(q[1])+'</h4><div class="e2-options">'+q[2].map((x,i)=>'<button type="button" class="e2-option" data-option="'+i+'" aria-pressed="false">'+esc(x)+'</button>').join('')+'</div><div class="e2-feedback" id="e2-feedback" aria-live="polite"></div><div class="e2-actions"><button type="button" class="expression-primary" id="e2-check">检查答案</button><button type="button" class="expression-secondary" id="e2-next" hidden>下一题</button></div></div>';
      qHost.querySelectorAll('.e2-option').forEach(b=>b.addEventListener('click',()=>{if(checked)return;selected=Number(b.dataset.option);qHost.querySelectorAll('.e2-option').forEach(peer=>{const active=Number(peer.dataset.option)===selected;peer.classList.toggle('is-selected',active);peer.setAttribute('aria-pressed',active?'true':'false')})}));
      qHost.querySelector('#e2-check').addEventListener('click',()=>{if(checked)return;const f=qHost.querySelector('#e2-feedback');if(selected<0){f.textContent='请先选择一个答案。';f.className='e2-feedback is-pending';return;}checked=true;const ok=selected===q[3];if(ok)score++;const p=progress();p.attempts=(p.attempts||0)+1;if(ok)p.correct=(p.correct||0)+1;save(p);qHost.querySelectorAll('.e2-option').forEach((b,i)=>{b.disabled=true;if(i===q[3])b.classList.add('is-answer');if(i===selected&&!ok)b.classList.add('is-wrong')});f.textContent=(ok?'回答正确。':'这次没有答对。')+q[4];f.className='e2-feedback '+(ok?'is-correct':'is-wrong');scoreNode.textContent='本轮答对 '+score+' 题 · 累计答题 '+p.attempts+' 次';qHost.querySelector('#e2-check').disabled=true;qHost.querySelector('#e2-next').hidden=false});
      qHost.querySelector('#e2-next').addEventListener('click',()=>{if(!checked)return;index++;draw()});
    }
    const select=host.querySelector('#e2-term'),model=host.querySelector('#e2-model');
    host.querySelector('#e2-show-model').addEventListener('click',()=>{const t=TERMS.find(x=>x[0]===select.value);if(!t)return;model.hidden=false;model.innerHTML='<strong>'+esc(t[0])+'</strong><p>根本意义：'+esc(t[1])+'</p><p>扩展意义：'+esc(t[2])+'</p><p>联系归纳：'+esc(t[3])+'</p><p>依据状态：原书列出的词义扩展；关系标签为项目归纳。</p>'});
    select.addEventListener('change',()=>{model.hidden=true;model.textContent=''});
    const p=progress();scoreNode.textContent='累计答题 '+(p.attempts||0)+' 次 · 累计答对 '+(p.correct||0)+' 次';draw();
  }
  window.BE=window.BE||{};window.BE.expressionCurriculum={render,terms:TERMS,questions:QUESTIONS};
})();