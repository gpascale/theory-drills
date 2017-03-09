var assert = require('assert');
import SpeechUtils from '../src/js/speechUtils';

describe('speechUtils', function() { 
  it('C', function() {
    var text = 'C'
    var actual = SpeechUtils.prepareForTextToSpeech(text);
    var expected = 'C';
    assert.equal(actual, expected);
  });
  it('D#', function() {
    var text = 'D#'
    var actual = SpeechUtils.prepareForTextToSpeech(text);
    var expected = 'D Sharp';
    assert.equal(actual, expected);
  });
  it('Ab', function() {
    var text = 'Ab'
    var actual = SpeechUtils.prepareForTextToSpeech(text);
    var expected = 'Ay Flat';
    assert.equal(actual, expected);
  });

  it('9', function() {
    var text = '9'
    var actual = SpeechUtils.prepareForTextToSpeech(text);
    var expected = '9';
    assert.equal(actual, expected);
  });
  it('#4', function() {
    var text = '#4'
    var actual = SpeechUtils.prepareForTextToSpeech(text);
    var expected = 'Sharp 4';
    assert.equal(actual, expected);
  });
  it('b13', function() {
    var text = 'b13'
    var actual = SpeechUtils.prepareForTextToSpeech(text);
    var expected = 'Flat 13';
    assert.equal(actual, expected);
  });

  it('What is b3 of Ab?', function() {
    var text = 'What is b3 of Ab?';
    var actual = SpeechUtils.prepareForTextToSpeech(text);
    var expected = 'What is Flat 3 of Ay Flat?';
    assert.equal(actual, expected);
  });
  it('Tell me #4 of D', function() {
    var text = 'Tell me #4 of D';
    var actual = SpeechUtils.prepareForTextToSpeech(text);
    var expected = 'Tell me Sharp 4 of D';
    assert.equal(actual, expected);
  });
  it('What is 9 of C#?', function() {
    var text = 'What is 9 of C#?';
    var actual = SpeechUtils.prepareForTextToSpeech(text);
    var expected = 'What is 9 of C Sharp?';
    assert.equal(actual, expected);
  });

  it('What is 9 of C#???', function() {
    var text = 'What is 9 of C#???';
    var actual = SpeechUtils.prepareForTextToSpeech(text);
    var expected = 'What is 9 of C Sharp???';
    assert.equal(actual, expected);
  });
});
