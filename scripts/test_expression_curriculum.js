const assert=require('node:assert/strict');
global.window={BE:{},localStorage:{getItem:()=>null,setItem:()=>{}}};
require('../docs/js/data.js');require('../docs/js/validator.js');require('../docs/js/expression-system.js');require('../docs/js/expression-curriculum.js');
const course=window.BE.expressionCurriculum;assert.ok(course);assert.equal(course.terms.length,11);assert.equal(course.questions.length,10);
const words=new Set();for(const t of course.terms){assert.ok(!words.has(t[0]));words.add(t[0]);assert.equal(window.BE.WORDS.ALL_850.has(t[0]),true,t[0]+' must be an 850 word');assert.ok(t[1]&&t[2]&&t[3]);}
const ids=new Set();for(const q of course.questions){assert.ok(!ids.has(q[0]));ids.add(q[0]);assert.ok(q[1]&&q[2].length>=3);assert.ok(q[3]>=0&&q[3]<q[2].length);assert.ok(q[4]);}
console.log('Expression Lesson 02 tests passed: '+course.terms.length+' source-indexed terms and '+course.questions.length+' questions.');
