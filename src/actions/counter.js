import { createAction } from 'redux-actions'

export const increase = createAction('INCREASE', e => 1);
export const decrease = createAction('DECREASE', e => 1);
