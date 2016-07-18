import { handleActions } from 'redux-actions'

export const counter = handleActions({
  INCREASE: (state, action) => {
    return state + action.payload;
  },
  DECREASE: (state, action) => {
    return state - action.payload;
  }
}, 0);
