import {api} from '../lib/fetch'
import {handleActions} from 'redux-actions'
export const form = handleActions({
  SUBMIT_FULFILLED: (state, action) => {
    alert(JSON.stringify(action.payload));
    return action.payload;
  }
}, {username:'', password:''});
