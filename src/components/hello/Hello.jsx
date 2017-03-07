import React from 'react';
const guy = require('assets/images/guy-fieri.jpg');
import { DegreeQuestions } from 'music-theory-quiz';

var Hello = React.createClass({
  render: () => {
    return (
      <div className="hello">
        Hello world!
      </div>
    );
  }
});

var dq = new DegreeQuestions();
setInterval(() => {
  var q = dq.generate();
  console.log(q.questionText);
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(q.questionText));
  setTimeout(() => {
    var msg = new SpeechSynthesisUtterance(q.answer.name().toUpperCase() + q.answer.accidental());
    window.speechSynthesis.speak(msg);
  }, 3000);
}, 5000);

export default Hello;