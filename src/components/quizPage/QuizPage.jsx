import React, { Component } from 'react';
import PageLayout from '../pagelayout/PageLayout';
import DegreeQuiz from '../degreequiz/DegreeQuiz';
import ChordSpellingQuiz from '../chordspellingquiz/ChordSpellingQuiz';

class QuizPage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      type: props.type || "Degrees"
    }
  }

  render() {
    var quizComponent = "";
    switch(this.state.type) {
      case "Chords":
        quizComponent = (<ChordSpellingQuiz />);
        break;
      case "Degrees":
        quizComponent = (<DegreeQuiz/>);
        break;
    }

    return (
      <PageLayout>
        <div className="quizPage">
          {quizComponent}
        </div>
      </PageLayout>
    );
  }
}

export default QuizPage;
