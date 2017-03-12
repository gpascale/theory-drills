const _ = require('underscore');

const SpeechUtils = {
  prepareForTextToSpeech: function(questionText) {
    const degreeRegex = /^(x|bb|\#|b?)([0-9]+)([^a-zA-Z_0-9]*?)$/;
    const pitchRegex = /^(A|B|C|D|E|F|G)(x|bb|\#|b?)([^a-zA-Z_0-9]*?)$/;
    const tokens = questionText.split(/\s/);
    const fixedTokens = _.map(tokens, (token) => {
      // First, see if it is a degree.
      var degree = degreeRegex.exec(token);
      if (degree) {
        var accidental = degree[1] ? _fixAccidental(degree[1]) : null;
        var number = degree[2];
        var extra = degree[3];
        return (accidental ? (accidental + ' ' + number) : number) + extra;
      }
      // Next, see if it is a pitch.
      var pitch = pitchRegex.exec(token);
      if (pitch) {
        var letter = _fixLetter(pitch[1]);
        var accidental = pitch[2] ? _fixAccidental(pitch[2]) : null;
        var extra = pitch[3];
        return (accidental ? (letter + ' ' + accidental) : letter) + extra;
      }
      // If neither, leave the token unchanged.
      else {
        return token;
      }
    });
    return fixedTokens.join(' ');
  }
}

function _fixLetter(pitch) {
  pitch = pitch.toUpperCase();
  var pitchFixes = {
    'A': 'Eh',
    'B': 'Bee',
    'C': 'See',
    'D': 'Dee',
    'E': 'ee',
    'F': 'Eff',
    'G': 'Gee'
  };
  return pitchFixes[pitch] || pitch;
}

function _fixAccidental(accidental) {
  accidental = accidental.toLowerCase();
  switch(accidental) {
    case '#':
      return 'Sharp';
    case 'b':
      return 'Flat';
    case 'x':
      return 'Double Sharp';
    case 'bb':
      return 'Double Flat'
  }
  return accidental;
}

export default SpeechUtils;