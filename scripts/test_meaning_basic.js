const assert = require('node:assert/strict');

global.window = { BE: {} };
require('../docs/js/data.js');
require('../docs/js/validator.js');
require('../docs/js/meaning-basic.js');

const checker = window.BE.meaningBasic;
assert.ok(checker, 'Meaning-to-Basic module should register');
assert.equal(Object.keys(checker.questions).length, 18, 'eighteen exercises should be registered');

const accepted = [
  ['mb01','He puts the paper into the box.','at_house'],['mb01','He puts the paper in the box.','at_house'],
  ['mb02','He takes the paper out of the box.','at_house'],['mb02','He takes the paper from the box.','at_house'],
  ['mb03','She gives the money to the man.','at_house'],['mb03','She gives the man the money.','at_house'],
  ['mb04','He makes a table from wood.','at_house'],['mb04','He makes the wood into a table.','at_house'],
  ['mb05','The man is coming to the house.','at_house'],['mb05','The man is going to the house.','elsewhere'],
  ['mb06','He makes the light go out.','at_house'],
  ['mb07','They take food.','at_house'],['mb07','They have a meal.','at_house'],
  ['mb08','They give it their attention.','at_house'],['mb09','The music comes to the ears.','at_house'],
  ['mb10','He puts his views into writing.','at_house'],['mb10','He puts them down on paper.','at_house'],
  ['mb11','He sends the ball across the river.','at_house'],['mb12','He gets it in the hand.','at_house'],
  ['mb13','He gets a grip of it.','at_house'],['mb13','He keeps it.','at_house'],['mb13','He has it in the hand.','at_house'],
  ['mb14','She gives thought to the question.','at_house'],
  ['mb15','He keeps it in mind.','at_house'],['mb15','He has a memory of it.','at_house'],
  ['mb16','He puts it out of the mind.','at_house'],['mb16','He has no memory of it.','at_house'],
  ['mb17','She has a desire for it.','at_house'],['mb18','He is in need of it.','at_house']
];

for (const [id, sentence, perspective] of accepted) {
  const vocabulary = window.BE.validate(sentence);
  assert.equal(vocabulary.valid, true, 'accepted answer should pass vocabulary: ' + sentence);
  const result = checker.analyzeAnswer(id, sentence, perspective);
  assert.equal(result.grammar, 'pass', 'accepted answer should pass structure: ' + sentence);
  assert.equal(result.meaning, 'pass', 'accepted answer should preserve meaning: ' + sentence);
}

const knownMeaningErrors = [
  ['mb01','He takes the paper out of the box.'],['mb02','He puts the paper into the box.'],['mb02','He puts the paper in the box.'],
  ['mb03','The man gives the money to her.'],['mb03','The man gives her the money.'],
  ['mb04','He makes a table from paper.'],['mb04','He makes the paper into a table.'],
  ['mb05','The man is going from the house.'],['mb06','The light goes out.'],['mb06','He makes the light go on.'],
  ['mb07','They make a meal.'],['mb08','They give it their food.'],['mb09','The ears come to the music.'],
  ['mb11','He sends the ball from the river.'],['mb12','He gets it out of the hand.'],['mb13','He puts it in the hand.'],
  ['mb15','He puts it out of the mind.'],['mb16','He keeps it in mind.'],
  ['mb17','She has no desire for it.'],['mb18','He has a desire for it.']
];

for (const [id, sentence] of knownMeaningErrors) {
  const vocabulary = window.BE.validate(sentence);
  assert.equal(vocabulary.valid, true, 'known meaning-error example should still pass vocabulary: ' + sentence);
  const result = checker.analyzeAnswer(id, sentence, 'at_house');
  assert.equal(result.grammar, 'pass', 'known example should pass structure: ' + sentence);
  assert.equal(result.meaning, 'fail', 'known example should fail meaning: ' + sentence);
}

const wrongView1 = checker.analyzeAnswer('mb05', 'The man is coming to the house.', 'elsewhere');
const wrongView2 = checker.analyzeAnswer('mb05', 'The man is going to the house.', 'at_house');
assert.equal(wrongView1.grammar, 'pass');
assert.equal(wrongView1.meaning, 'fail');
assert.equal(wrongView2.grammar, 'pass');
assert.equal(wrongView2.meaning, 'fail');

const unsupportedSentence = 'He puts paper into box.';
assert.equal(window.BE.validate(unsupportedSentence).valid, true);
const unsupported = checker.analyzeAnswer('mb01', unsupportedSentence, 'at_house');
assert.equal(unsupported.grammar, 'unsupported');
assert.equal(unsupported.meaning, 'unsupported');

const punctuationCase = checker.analyzeAnswer('mb01', 'HE PUTS THE PAPER INTO THE BOX!', 'at_house');
assert.equal(punctuationCase.grammar, 'pass');
assert.equal(punctuationCase.meaning, 'pass');

console.log('Meaning-to-Basic tests passed: ' + accepted.length + ' accepted patterns, ' +
  knownMeaningErrors.length + ' known semantic mismatches, 2 viewpoint mismatches, 1 unsupported boundary, 1 punctuation case.');
