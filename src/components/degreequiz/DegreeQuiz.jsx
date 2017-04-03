import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'underscore';
const Chance = require('chance');
const chance = new Chance();

import Quiz from '../quiz/Quiz';
import { Constants, DegreeQuestions } from 'music-theory-quiz';
import SpeechUtils from '../../js/speechUtils';
import CheckboxGroup from '../checkboxGroup/CheckboxGroup';
import DelaySelector from '../delayselector/DelaySelector';

const checkboxStyle = {
  maxWidth: 80,
  display: 'inline-block'
};

class DegreeQuiz extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      keys: Constants.Keys,
      degrees: Constants.Degrees.map(degree => degree.name),
    };
    this.degreeQuestions = new DegreeQuestions({ keys: this.state.keys,
                                                 degrees: this.state.degrees });
  }

  // --------------------------------------------------------------------------
  componentWillUpdate(nextProps, nextState) {
    this.degreeQuestions.setDegrees(nextState.degrees);
    this.degreeQuestions.setKeys(nextState.keys);
  }

  render() {
    var options = (
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
    );
    return (
      <div className="degreeQuiz">
        <Quiz options={options} generateQuestion={() => this.degreeQuestions.generate()}/>
      </div>
    );
  }
}

export default DegreeQuiz;