import { combineReducers } from 'redux';

// const rootReducer = combineReducers({
//   state: (state = {}) => state,
// });

// export default rootReducer;

/** Copyright (c) 2016, salesforce.com, inc. All rights reserved. */

'use strict';

import { TOGGLE_SOUND } from '../actions';

const initialState = {
  soundOn: true
};

export default function (state = initialState, action) {
  const payload = action.payload || {};
  console.log("toggleSOund reducer", action, state);
  switch (action.type) {
    case TOGGLE_SOUND:
      return {
        ...state,
        soundOn: payload.on,
      }
    default:
      return state;
  }
}
