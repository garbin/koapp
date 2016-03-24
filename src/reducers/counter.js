import {INCREASE, DECREASE, CHANGEAMOUNT} from '../constants'
import {api} from '../lib/fetch'
import json from 'fetch-plus-json'
export default function update(state = 0, action) {
  if (action.type == INCREASE) {
    return state + action.amount;
  } else if (action.type == DECREASE) {
    return state - action.amount;
  } else if(action.type == 'FETCH'){
    api.read(['apps', 1]).then(apps=>console.log(apps));
    return state;
  } else {
    return state;
  }
}
