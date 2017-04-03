import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'underscore';
const Chance = require('chance');
const chance = new Chance();

import Quiz from '../quiz/Quiz';
import { Constants, ChordQuestions } from 'music-theory-quiz';
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
      keys: Constants.Keys,
      degrees: Constants.Degrees.map(degree => degree.name),
    };
    this.chordQuestions = new ChordQuestions({ keys: this.state.keys, degrees: this.state.degrees });
  }

  // --------------------------------------------------------------------------
  componentWillUpdate(nextProps, nextState) {
    this.chordQuestions.setKeys(nextState.keys);
  }

  render() {
    return (
      <div className="degreeQuiz">
        <Quiz options={null} generateQuestion={() => this.chordQuestions.generate()}/>
      </div>
    );
  }
}

export default ChordSpellingQuiz;