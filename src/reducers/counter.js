import {INCREASE, DECREASE} from '../constants';
import {api} from '../lib/fetch';
export default function update(state = 0, action) {
  if (action.type == INCREASE) {
    return state + action.amount;
  } else if (action.type == DECREASE) {
    return state - action.amount;
  } else if(action.type == 'FETCH'){
    var apps = api.read('/apps');
    console.log(apps);
    return state;
  } else {
    return state;
  }
}
