import {INCREASE, DECREASE, CHANGEAMOUNT} from '../constants'
import {api} from '../lib/fetch'
import json from 'fetch-plus-json'
export function counter(state = 0, action) {
  switch (action.type) {
    case INCREASE:
      return state + action.amount;
      break;
    case DECREASE:
      return state - action.amount;
      break;
  }
  return state;
}
