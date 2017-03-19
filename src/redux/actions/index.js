/** Copyright (c) 2016, salesforce.com, inc. All rights reserved. */

'use strict';

export const TOGGLE_SOUND = 'TOGGLE_SOUND';
export const toggle_sound = (onOrOff) => {
  return(dispatch, getState) => {
    console.log("toggle_sound ACTION " + onOrOff);
    dispatch({
      type: TOGGLE_SOUND,
      payload: {
        on: onOrOff,
      }
    });
  };
}
