import {SUBMIT, SUBMIT_DONE, SUBMIT_ERROR} from '../constants'
import {api} from '../lib/fetch'
export function signup(state = {username:'', password:''}, action) {
  if (action.type == SUBMIT_DONE) {
    console.log('Done', action);
    state = action.payload;
  }
  return state;
}
