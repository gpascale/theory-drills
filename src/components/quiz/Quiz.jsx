import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/checkbox';
import _ from 'underscore';

import { Constants, DegreeQuestions } from 'music-theory-quiz';
import SpeechUtils from '../../js/speechUtils';

console.dir(Constants);

const checkboxStyle = {
  maxWidth: 80,
  display: 'inline-block'
};

class Quiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      keys: new Set(Constants.Keys),
      degrees: new Set(Constants.Degrees.map(degree => degree.name))
    }
    this.degreeQuestions = new DegreeQuestions({ keys: this.state.keys,
                                                 degrees: this.state.degrees });
  }

  componentWillUpdate(nextProps, nextState) {
    this.degreeQuestions.setDegrees(nextState.degrees);
    this.degreeQuestions.setKeys(nextState.keys);
  }

  render() {
    var self = this;
    console.dir(this.state);
    return (
      <div className="quiz">
        <div className="keySelectors">
          <p>Keys</p>
          <ul>
            {Constants.Keys.map((key, i) => {
              return (<Checkbox key={i} label={key} style={checkboxStyle}
                                checked={self.state.keys.has(key)}
                                onCheck={(e, isChecked) => {
                                  var newKeys = new Set(self.state.keys);
                                  if (isChecked)
                                    newKeys.add(key);
                                  else
                                    newKeys.delete(key);
                                  self.setState({ keys: newKeys });
                                }} />);
            })}
          </ul>
        </div>
        <div className="degreeSelectors">
          <p>Degrees</p>
          <ul>
            {Constants.Degrees.map((degree, i) => {
              return (<Checkbox key={i} label={degree.name} style={checkboxStyle}
                                checked={self.state.degrees.has(degree.name)}
                                onCheck={(e, isChecked) => {
                                  var newDegrees = new Set(self.state.degrees);
                                  if (isChecked)
                                    newDegrees.add(degree.name);
                                  else
                                    newDegrees.delete(degree.name);
                                  self.setState({ degrees: newDegrees });
                                }} />);
            })}
          </ul>
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

  play() {
    var playing = setInterval(() => {
      var q = this.degreeQuestions.generate();
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
