import {api} from '../lib/helper'
import {async_state} from '../lib/helper'
import { createAction, handleActions } from 'redux-actions'

export const actions = {
  increase: createAction('INCREASE', e => 1),
  decrease: createAction('DECREASE', e => 1)
}

export const reducer = {
  counter: handleActions({
    INCREASE: (state, action) => {
      return state + action.payload;
    },
    DECREASE: (state, action) => {
      return state - action.payload;
    }
  }, 0)
}
