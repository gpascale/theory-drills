import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import _ from 'underscore';

import { Constants, DegreeQuestions } from 'music-theory-quiz';
import SpeechUtils from '../../js/speechUtils';
import CheckboxGroup from '../checkboxGroup/CheckboxGroup';

const checkboxStyle = {
  maxWidth: 80,
  display: 'inline-block'
};

class Quiz extends Component {

  // --------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      keys: Constants.Keys,
      degrees: Constants.Degrees.map(degree => degree.name)
    }
    this.degreeQuestions = new DegreeQuestions({ keys: this.state.keys,
                                                 degrees: this.state.degrees });
  }

  // --------------------------------------------------------------------------
  componentWillUpdate(nextProps, nextState) {
    this.degreeQuestions.setDegrees(nextState.degrees);
    this.degreeQuestions.setKeys(nextState.keys);
  }

  // --------------------------------------------------------------------------
  render() {
    var self = this;
    return (
      <div className="quiz">
        <div className="keySelectors">
          <p>Keys</p>
          <CheckboxGroup items={Constants.Keys}
                         onChange={(checkedSet) => {
                           self.setState({ keys: checkedSet })
                         }} />
        </div>
        <div className="degreeSelectors">
          <p>Degrees</p>
          <CheckboxGroup items={Constants.Degrees.map(degree => degree.name)}
                         onChange={(checkedSet) => {
                           self.setState({ degrees: checkedSet })
                         }} />
        </div>
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

  // --------------------------------------------------------------------------
  // Start the question asking loop
  // --------------------------------------------------------------------------
  play() {
    var self = this;

    // This is necessary to trick iOS into letting us use the Speech Synthesis API
    // It seems the initial speech call must be made in response to a user action (e.g. button press)
    speak('');

    var playing = setInterval(askOne, this.props.questionTime + this.props.answerTime);
    this.setState({ playing: playing });
    askOne();

    function askOne(callback) {
      try {
        var q = self.degreeQuestions.generate();
        var answer = q.answer.name().toUpperCase() + q.answer.accidental();
        // Ask the question
        speak(q.questionText);
        self.setState({
          question: q.questionText,
          answer: null
        });
        setTimeout(() => {
          // Tell the answer
          speak('It is ' + answer);
          self.setState({
            answer: answer
          });
        }, self.props.questionTime);
      }
      catch(e) {
        alert(e);
        self.stop();
      }
    }
  }

  // --------------------------------------------------------------------------
  // Stop the question asking loop
  // --------------------------------------------------------------------------
  stop() {
    clearInterval(this.state.playing);
    this.setState({
      playing: false
    });
  }
}

Quiz.propTypes = {
  questionTime: PropTypes.number,
  answerTime: PropTypes.number,
  className: PropTypes.string,
  playing: PropTypes.bool,
};

Quiz.defaultProps = {
  questionTime: 4000,
  answerTime: 2000,
  playing: false
}

function speak(text) {
  var preparedText = SpeechUtils.prepareForTextToSpeech(text);
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(preparedText));
}

export default Quiz;
