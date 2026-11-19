const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const store = new Map([
  ['BE_EXPR_LESSON_02_PROGRESS', JSON.stringify({ attempts: 17, correct: 9, marker: 'legacy-body-parts' })],
  ['BE_EXPR_MORE_LESSONS_PROGRESS', JSON.stringify({ attempts: 23, correct: 12, marker: 'legacy-more-lessons' })]
]);
global.window = {
  BE: {},
  localStorage: {
    getItem: key => store.has(key) ? store.get(key) : null,
    setItem: (key, value) => store.set(key, String(value))
  }
};

require('../docs/js/data.js');
require('../docs/js/validator.js');
require('../docs/js/expression-system.js');
require('../docs/js/expression-curriculum.js');
require('../docs/js/expression-more-lessons.js');
require('../docs/js/meaning-basic.js');
require('../docs/js/expression-course-data.js');
require('../docs/js/expression-course-content-m1.js');
require('../docs/js/expression-course-content-m2a.js');
require('../docs/js/expression-course-content-m2b.js');
require('../docs/js/expression-course.js');

const data = window.BE.expressionCourseData;
const course = window.BE.expressionCourse;
assert.ok(data && course, 'accepted course model and renderer should register');
assert.equal(data.modules.length, 2);
assert.equal(data.modules[0].lessons.length, 3);
assert.equal(data.modules[1].lessons.length, 12);
assert.equal(data.counts.lessons, 15);
assert.deepEqual(data.modules.map(m => m.number), [1, 2]);
assert.deepEqual(data.modules.map(m => m.lessons.map(l => l.number)), [[1,2,3],[1,2,3,4,5,6,7,8,9,10,11,12]]);

const lessonIds = data.modules.flatMap(m => m.lessons.map(l => l.id));
assert.equal(new Set(lessonIds).size, 15, 'lesson IDs must be unique');
assert.ok(lessonIds.includes('m1-l1') && lessonIds.includes('m1-l3') && lessonIds.includes('m2-l12'));
assert.ok(!lessonIds.some(id => ['e2','e3','e4','e5'].includes(id)), 'old prototype IDs must not become Lessons');
for (const m of data.modules) for (const l of m.lessons) {
  assert.ok(l.title && l.objective && l.source && l.candidate);
  assert.equal(typeof l.number, 'number');
}
assert.equal(course.modules.length, 2);
assert.equal(course.getLesson('m1-l1').module.number, 1);
assert.equal(course.getLesson('m2-l12').lesson.number, 12);

const content = window.BE.expressionCourseContent;
assert.equal(Object.keys(content).length, 15, 'all 15 authored lesson drafts must be bundled');
for (const id of lessonIds) {
  assert.ok(typeof content[id] === 'string' && content[id].length > 1000, id + ' lesson content missing');
  assert.ok(content[id].includes('<h'), id + ' should include rendered teaching sections');
  assert.ok(content[id].includes('expr-answer'), id + ' should keep answer keys in collapsible details');
}

const groups = data.fixedWordGroups.items;
assert.equal(groups.length, 250);
assert.equal(new Set(groups.map(x => x.id)).size, 250, 'all fixed-group item IDs must be unique');
assert.deepEqual(groups.reduce((o,x)=>(o[x.part]=(o[x.part]||0)+1,o),{}), { A:50, B:80, C:20, D:100 });
assert.equal(data.fixedWordGroups.priority.length, 50);
for (const item of groups) {
  assert.ok(item.summary && item.destination && item.id);
  assert.ok(['lesson','foundation','reference'].includes(item.destinationKind), item.id + ' has no primary destination');
  if (item.destinationKind === 'lesson') assert.ok(lessonIds.includes(item.lessonId), item.id + ' points to an unknown Lesson');
  else assert.equal(item.lessonId, null);
}
assert.equal(groups.filter(x => x.destinationKind === 'lesson').length, 249);
assert.equal(groups.filter(x => x.destinationKind === 'foundation').length, 1);

const mb = window.BE.meaningBasic;
assert.equal(Object.keys(mb.questions).length, 27);
assert.equal(Object.keys(data.meaningBasicDestinations).length, 27);
for (const id of Object.keys(mb.questions)) {
  assert.ok(data.meaningBasicDestinations[id], id + ' must have exactly one primary Lesson');
  assert.ok(lessonIds.includes(data.meaningBasicDestinations[id]), id + ' destination must exist');
}
const expectedMB = {
  mb01:'m2-l4',mb02:'m2-l4',mb03:'m2-l4',mb04:'m2-l3',mb05:'m2-l4',mb06:'m2-l8',
  mb07:'m2-l2',mb08:'m2-l1',mb09:'m2-l1',mb10:'m2-l1',mb11:'m2-l4',mb12:'m2-l4',mb13:'m2-l4',
  mb14:'m2-l5',mb15:'m2-l5',mb16:'m2-l5',mb17:'m2-l6',mb18:'m2-l6',mb19:'m2-l1',mb20:'m2-l2',
  mb21:'m2-l2',mb22:'m2-l4',mb23:'m2-l4',mb24:'m2-l8',mb25:'m2-l5',mb26:'m2-l5',mb27:'m2-l5'
};
assert.deepEqual(data.meaningBasicDestinations, expectedMB);

const legacy = data.legacyPrototypeMap;
assert.equal(legacy.oldLesson01.destination, 'm2-l1');
assert.equal(window.BE.expression.quiz.length, 3);
const q2 = legacy.oldLesson02.questionDestinations;
assert.equal(Object.keys(q2).length, 10);
assert.equal(Object.values(q2).filter(x => x === 'm1-l1').length, 8);
assert.equal(Object.values(q2).filter(x => x === 'm1-l2').length, 1);
assert.equal(Object.values(q2).filter(x => x === 'm1-l3').length, 1);
assert.equal(window.BE.expressionCurriculum.terms.length, 11);
assert.equal(window.BE.expressionCurriculum.questions.length, 10);
assert.equal(Object.keys(legacy.oldLesson03.questionDestinations).length, 10);
assert.equal(legacy.oldLesson04.destination, 'fixed-reference');
assert.equal(legacy.oldLesson04.questionIds.length, 5);
assert.equal(window.BE.expressionMoreLessons.lessons.length, 3);
assert.equal(window.BE.expressionMoreLessons.lessons.reduce((n,l)=>n+l.questions.length,0), 23);
const q5 = legacy.oldLesson05.questionDestinations;
assert.equal(Object.keys(q5).length, 8);
assert.equal(Object.values(q5).filter(x=>x==='foundation-conditional').length, 1);
assert.equal(Object.values(q5).filter(x=>x==='m2-l9').length, 2);
assert.equal(Object.values(q5).filter(x=>x==='m2-l12').length, 4);
assert.equal(Object.values(q5).filter(x=>x==='course-boundary').length, 1);

const speakGood = window.BE.expression.analyzeSpeakAnswer('I say something to him.');
assert.equal(speakGood.grammar.status, 'pass');
assert.equal(speakGood.meaning.status, 'pass');
const speakMeaningWrong = window.BE.expression.analyzeSpeakAnswer('I say nothing to him.');
assert.equal(speakMeaningWrong.grammar.status, 'pass');
assert.equal(speakMeaningWrong.meaning.status, 'fail');
const speakGrammarWrong = window.BE.expression.analyzeSpeakAnswer('He say something to him.');
assert.equal(speakGrammarWrong.grammar.status, 'error');
const speakUnsupported = window.BE.expression.analyzeSpeakAnswer('I say something to my friend.');
assert.equal(speakUnsupported.grammar.status, 'unsupported');
assert.equal(window.BE.validate('I say something to him.').valid, true);

const oldBodyParts = store.get('BE_EXPR_LESSON_02_PROGRESS');
const oldMore = store.get('BE_EXPR_MORE_LESSONS_PROGRESS');
course.markViewed('m1-l1');
course.recordPractice('m1-l1', true);
course.markComplete('m1-l1');
assert.equal(store.get('BE_EXPR_LESSON_02_PROGRESS'), oldBodyParts, 'legacy body-part progress must remain byte-for-byte unchanged');
assert.equal(store.get('BE_EXPR_MORE_LESSONS_PROGRESS'), oldMore, 'legacy prototype progress must remain byte-for-byte unchanged');
assert.equal(data.progressKey, 'BE_EXPR_COURSE_PROGRESS_V1');
const newProgress = JSON.parse(store.get(data.progressKey));
assert.equal(newProgress.lessons['m1-l1'].views, 1);
assert.equal(newProgress.lessons['m1-l1'].attempts, 1);
assert.equal(newProgress.lessons['m1-l1'].correct, 1);
assert.ok(newProgress.lessons['m1-l1'].completedAt);
assert.deepEqual(course.getProgressSummary(), { completed:1, total:15, attempts:1, correct:1 });

const index = fs.readFileSync(path.join(__dirname, '../docs/index.html'), 'utf8');
const sw = fs.readFileSync(path.join(__dirname, '../docs/sw.js'), 'utf8');
const courseJs = fs.readFileSync(path.join(__dirname, '../docs/js/expression-course.js'), 'utf8');
assert.ok(index.includes('css/expression-course.css'));
for (const file of ['expression-course-data.js','expression-course-content-m1.js','expression-course-content-m2a.js','expression-course-content-m2b.js','expression-course.js']) {
  assert.ok(index.includes('js/' + file), file + ' must be loaded by the app');
  assert.ok(sw.includes('./js/' + file), file + ' must be precached for offline use');
}
assert.ok(sw.includes('./css/expression-course.css'));
assert.ok(/basic-english-v39/.test(sw), 'service-worker cache version must change');
assert.ok(!/\bfetch\s*\(/.test(courseJs) && !/XMLHttpRequest|WebSocket/.test(courseJs), 'course UI must not add network dependencies');
assert.ok(index.includes("window.BE.expressionCourse") || fs.readFileSync(path.join(__dirname, '../docs/js/app.js'), 'utf8').includes('window.BE.expressionCourse.render(main)'));

console.log('Expression System migration tests passed: 2 Modules / 15 Lessons, 27 MB mappings, 250 fixed groups, 5 prototypes, offline assets, and isolated progress.');
