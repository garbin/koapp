import {INCREASE, DECREASE} from '../constants'

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
