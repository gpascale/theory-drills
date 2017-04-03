import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'underscore';
const Chance = require('chance');
const chance = new Chance();

import { Constants, DegreeQuestions } from 'music-theory-quiz';
import SpeechUtils from '../../js/speechUtils';


class Quiz extends Component {

  // --------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      questionDelay: 4000,
      answerDelay: 2000,
    }
  }

  

  // --------------------------------------------------------------------------
  render() {
    var self = this;
    return (
      <div className="quiz">
        {this.props.options}
        <RaisedButton label={this.state.playing ? 'STOP' : 'START'}
                      style={{ }}
                      labelColor={'#ffffff'}
                      backgroundColor={(this.state.playing ? 'red' : '#1AD11A')}
                      onClick={() => (self.state.playing ? self.stop : self.play).apply(self)}/>
        <p className="question">
          {this.state.question}
        </p>
        <p className="answer">
          {this.state.answer}
        </p>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Start the question asking loop
  // --------------------------------------------------------------------------
  play() {
    var self = this;

    // This is necessary to trick iOS into letting us use the Speech Synthesis API
    // It seems the initial speech call must be made in response to a user action (e.g. button press)
    speak('');

    function loop() {
      try {
        var q = self.props.generateQuestion();
        // Ask the question
        speak(q.questionText);
        self.setState({
          question: q.questionText,
          answer: null
        });
        setTimeout(() => {
          // Tell the answer
          speak(chance.pickone(['It is', 'It\'s', '']) + ' ' + q.answer);
          self.setState({
            answer: q.answer
          });
        }, self.state.questionDelay);
      }
      catch(e) {
        alert(e);
        self.stop();
      }
    }

    loop();
    var playing = setInterval(loop, this.state.questionDelay + this.state.answerDelay);

    this.setState({ playing: playing });
    
  }

  // --------------------------------------------------------------------------
  // Stop the question asking loop
  // --------------------------------------------------------------------------
  stop() {
    clearInterval(this.state.playing);
    this.setState({
      playing: false,
      question: null,
      answer: null
    });
  }
}

Quiz.propTypes = {
  questionTime: PropTypes.number,
  answerTime: PropTypes.number,
  generateQuestion: PropTypes.func,
  options: PropTypes.element,
  className: PropTypes.string,
  playing: PropTypes.bool,
};

Quiz.defaultProps = {
  playing: false
}

function speak(text) {
  var preparedText = SpeechUtils.prepareForTextToSpeech(text);
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(preparedText));
}

export default Quiz;
