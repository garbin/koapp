import { createAction, handleActions } from 'redux-actions'

export const actions = {
  increase: createAction('INCREASE', e => 1),
  decrease: createAction('DECREASE', e => 1)
}

export const reducer = {
  counter: handleActions({
    INCREASE: (state, action) => state + action.payload,
    DECREASE: (state, action) => state - action.payload
  }, 0)
}
