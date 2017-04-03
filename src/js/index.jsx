import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import QuizPage from '../components/quizPage/QuizPage';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import reducers from '../redux/reducers';
const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

require('../scss/bundle.scss');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  appBar: {
    height: 40,
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
        <Route path="/">
          <IndexRoute component={() => (<QuizPage type="Chords"/>)}/>
          <Route path="/chords" component={() => (<QuizPage type="Chords"/>)} />
          <Route path="/degrees" component={() => (<QuizPage type="Degrees"/>)} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('react-root'));