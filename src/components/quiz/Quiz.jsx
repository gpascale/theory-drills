import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'underscore';
const Chance = require('chance');
const chance = new Chance();

import { Constants, DegreeQuestions } from 'music-theory-quiz';
import SpeechUtils from '../../js/speechUtils';
import CheckboxGroup from '../checkboxGroup/CheckboxGroup';
import DelaySelector from '../delayselector/DelaySelector';

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
      degrees: Constants.Degrees.map(degree => degree.name),
      questionDelay: 4000,
      answerDelay: 2000,
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
        <div className="quizOptions">
          <div className="keySelectors">
            <p className="selectorTitle">Keys</p>
            <CheckboxGroup items={Constants.Keys}
                           onChange={(checkedSet) => {
                             self.setState({ keys: checkedSet })
                           }} />
          </div>
          <div className="degreeSelectors">
            <p className="selectorTitle">Degrees</p>
            <CheckboxGroup items={Constants.Degrees.map(degree => degree.name)}
                           onChange={(checkedSet) => {
                             self.setState({ degrees: checkedSet })
                           }} />
          </div>
          <div className="delaySelectors">
            <DelaySelector title="Question Delay" className="questionDelaySelector"
                           minDelay={0.5} maxDelay={10.0} defaultDelay={4.0}
                           onChange={(newDelay) => self.setState({questionDelay: 1000 * newDelay})} />
            <DelaySelector title="Answer Delay" className="answerDelaySelector"
                           minDelay={0.5} maxDelay={10.0} defaultDelay={2.0}
                           onChange={(newDelay) => self.setState({answerDelay: 1000 * newDelay})} />
          </div>
        </div>
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

    var playing = setInterval(askOne, this.state.questionDelay + this.state.answerDelay);
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
          speak(chance.pickone(['It is', 'It\'s', '']) + ' ' + answer);
          self.setState({
            answer: answer
          });
        }, self.state.questionDelay);
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
      playing: false,
      question: null,
      answer: null
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
  playing: false
}

function speak(text) {
  var preparedText = SpeechUtils.prepareForTextToSpeech(text);
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(preparedText));
}

export default Quiz;
