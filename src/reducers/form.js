import {SUBMIT} from '../constants'
import {api} from '../lib/fetch'
export default function submit(state = {username:'', password:''}, action) {
  if (action.type == SUBMIT) {
    console.log(action);
    return state;
  }
  return state;
}
