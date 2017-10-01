import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'underscore';
const Chance = require('chance');
const chance = new Chance();

import Quiz from '../quiz/Quiz';
import { Constants, ChordQuestions } from 'music-theory-questions';
import SpeechUtils from '../../js/speechUtils';
import CheckboxGroup from '../checkboxGroup/CheckboxGroup';
import DelaySelector from '../delayselector/DelaySelector';

const checkboxStyle = {
  maxWidth: 80,
  display: 'inline-block'
};

class ChordSpellingQuiz extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      keys: Constants.MajorKeys,
      degrees: Constants.Degrees.map(degree => degree.name),
      questionDelay: 4000,
      answerDelay: 3000
    };
    this.chordQuestions = new ChordQuestions({ keys: this.state.keys,
                                               strategy: "diatonic" });
  }

  // --------------------------------------------------------------------------
  componentWillUpdate(nextProps, nextState) {
    this.chordQuestions.setKeys(nextState.keys);
  }

  // --------------------------------------------------------------------------
  render() {
    var self = this;
    var optionsComponent = (
      <div className="quizOptions">
        <div className="chordTypeSelectors">
         <p className="selectorTitle">Chord Types</p>
          <CheckboxGroup items={Constants.MajorKeys}
                         onChange={(checkedSet) => {
                           self.setState({ keys: checkedSet })
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
    );
    return (
      <div className="degreeQuiz">
        <Quiz optionsComponent={optionsComponent}
              generateQuestion={() => this.chordQuestions.generate()}
              questionDelay={this.state.questionDelay}
              answerDelay={this.state.answerDelay} />
      </div>
    );
  }
}

export default ChordSpellingQuiz;