import React, { Component, PropTypes } from 'react';

import { DegreeQuestions } from 'music-theory-quiz';
import SpeechUtils from '../../js/speechUtils';

class Quiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false
    }
  }

  render() {
    var self = this;
    return (
      <div className="quiz">
        <button className="startStopButton"
                onClick={() => (self.state.playing ? self.stop : self.play).apply(self)}>
          {this.state.playing ? 'Stop' : 'Start'}
        </button>
        <p className="question">
          {this.state.question}
        </p>
        <p className="answer">
          {this.state.answer}
        </p>
      </div>
    );
  }

  play() {
    console.log('start');
    var dq = new DegreeQuestions();
    var playing = setInterval(() => {
      var q = dq.generate();
      var answer = q.answer.name().toUpperCase() + q.answer.accidental();
      
      // Ask the question
      speak(q.questionText);
      this.setState({
        question: q.questionText,
        answer: null
      })

      setTimeout(() => {
        // Tell the answer
        speak('It is ' + answer);
        this.setState({
          answer: answer
        });
      }, 3000);
    }, 5000);
    this.setState({
      playing: playing
    });
  }

  stop() {
    console.log('stop');
    clearInterval(this.state.playing);
    this.setState({
      playing: false
    });
  }

  
}

Quiz.propTypes = {
  className: PropTypes.string,
  playing: PropTypes.bool,
  question: PropTypes.string,
  answer: PropTypes.string
};

function speak(text) {
  var preparedText = SpeechUtils.prepareForTextToSpeech(text);
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(preparedText));
}

export default Quiz;
