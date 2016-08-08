import {api} from '../lib/fetch'
import {handleActions} from 'redux-actions'
export const signup = handleActions({
  SUBMIT_FULFILLED: (state, action) => {
    alert(JSON.stringify(action.payload));
    return action.payload;
  }
}, {username:'', password:''});
