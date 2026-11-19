const assert = require('node:assert/strict');
const store = new Map();
global.window = { BE:{}, localStorage:{getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)} };
global.localStorage = window.localStorage;
require('../docs/js/data.js');
require('../docs/js/validator.js');
require('../docs/js/teaching.js');
require('../docs/js/rule-learning.js');
const app=window.BE.ruleLearning;
assert.ok(app,'rule-learning module should register');
assert.equal(app.units.length,13);
assert.equal(app.operators.length,16);
assert.equal(app.directives.length,20);
const ids=new Set();let count=0;
for(const unit of app.units){
 assert.ok(unit.id&&!ids.has(unit.id));ids.add(unit.id);
 assert.ok(unit.sections.length>=2);assert.ok(unit.questions.length>=2);
 for(const question of unit.questions){
  count++;assert.ok(question.id&&question.prompt&&question.options.length>=2);
  assert.equal(app.evaluateQuestion(question,question.answers).correct,true,question.id+' expected answer set');
  for(const option of question.options){if(!question.answers.includes(option[0]))assert.equal(app.evaluateQuestion(question,[option[0]]).correct,false,question.id+' distractor');}
 }
 for(const phrase of unit.basicExamples||[]){const result=window.BE.validate(phrase);assert.equal(result.valid,true,unit.id+' Basic example: '+phrase+' / '+(result.errors||[]).map(x=>x.word).join(','));}
}
assert.ok(count>=40,'at least forty rule questions');
assert.equal(window.BE.validate('simply').valid,true,'simple should form simply');
assert.equal(window.BE.validate('truly').valid,true,'true should form truly');
const first=app.nextSchedule(null,true,1000);assert.equal(first.level,1);assert.equal(first.nextReviewAt,1000+86400000);
let state=null;for(let i=0;i<6;i++)state=app.nextSchedule(state,true,5000+i*86400000);
assert.equal(state.level,6);assert.equal(state.nextReviewAt,5000+5*86400000+30*86400000);
const reset=app.nextSchedule(state,false,5000);assert.equal(reset.level,0);assert.equal(reset.nextReviewAt,5000+86400000);assert.equal(reset.wrongCount,1);assert.equal(reset.correctCount,6);
console.log('Teaching rule tests passed: '+app.units.length+' rule units, '+count+' questions, '+app.operators.length+' Operators, '+app.directives.length+' Directives; Basic examples and spaced schedule verified.');
