import {INCREASE, DECREASE, FETCH} from '../constants';
export function increase () {
  return {
    type: INCREASE,
    amount: 1,
  }
}
export function decrease () {
  return {
    type: DECREASE,
    amount: 1,
  }
}

export function remote() {
  return {
    type: FETCH
  }
}
