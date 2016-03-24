import {INCREASE, DECREASE} from '../constants';
import {client} from '../lib/fetch';
export default function update(state = 0, action) {
  if (action.type == INCREASE) {
    return state + action.amount;
  } else if (action.type == DECREASE) {
    return state - action.amount;
  } else if(action.type == 'FETCH'){
    console.log(client.read('/apps'))
    return state;
  } else {
    return state;
  }
}
