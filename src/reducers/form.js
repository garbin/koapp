import {api} from '../lib/helper'
import {handleActions} from 'redux-actions'
export const form = handleActions({
  SUBMIT_FULFILLED: (state, action) => {
    alert(JSON.stringify(action.payload));
    return action.payload;
  }
}, {username:'', password:''});
