import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import QuizPage from '../components/quizPage/QuizPage';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

require('../scss/bundle.scss');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  appBar: {
    height: 40,
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path="/" component={QuizPage}>
      </Route>
    </Router>
  </MuiThemeProvider>
  , document.getElementById('react-root'));