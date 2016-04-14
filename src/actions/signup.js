import {SUBMIT, SUBMIT_DONE} from '../constants'
import {api} from '../lib/fetch'

export function submit (data) {
  return dispatch => {
    return new Promise((resolve, reject)=>{
      setTimeout(function(){
        resolve(dispatch(submit_done(data)));
      }, 300);
    });
  }
}

export function submit_done (data) {
  return {
    type: SUBMIT_DONE,
    payload: data
  };
}

export function submit_error (err) {
  return {
    type: SUBMIT_ERROR,
    payload: err
  };
}
