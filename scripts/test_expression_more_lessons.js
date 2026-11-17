const assert=require('node:assert/strict');
global.window={BE:{},localStorage:{getItem:()=>null,setItem:()=>{}}};
require('../docs/js/data.js');require('../docs/js/validator.js');require('../docs/js/expression-system.js');require('../docs/js/expression-curriculum.js');require('../docs/js/expression-more-lessons.js');
const more=window.BE.expressionMoreLessons;assert.ok(more);assert.equal(more.lessons.length,3);
const ids=new Set();let count=0;
for(const lesson of more.lessons){assert.ok(lesson.id&&lesson.title&&lesson.source);assert.ok(!ids.has(lesson.id));ids.add(lesson.id);assert.ok(lesson.examples.length>=5);assert.ok(lesson.questions.length>=5);for(const q of lesson.questions){count++;assert.ok(q[0]&&q[1]&&q[2].length>=3);assert.ok(q[3]>=0&&q[3]<q[2].length);assert.ok(q[4]);}}
assert.equal(count,23,'the three follow-on lessons should contain 23 questions');
console.log('Expression follow-on lessons passed: '+more.lessons.length+' lessons and '+count+' questions.');
