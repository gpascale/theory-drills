import React, { Component } from 'react';
import PageLayout from '../pagelayout/PageLayout';
import Quiz from '../quiz/Quiz';

class QuizPage extends Component {
  render() {
    return (
      <PageLayout>
        <div className="quizPage">
          <Quiz />
        </div>
      </PageLayout>
    );
  }
}

export default QuizPage;