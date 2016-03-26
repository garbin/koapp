import {SUBMIT, SUBMIT_DONE} from '../constants'
import {api} from '../lib/fetch'

export function submit (data) {
  return dispatch => {
    setTimeout(function(){
      dispatch(submit_done(data))
    }, 1000);
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
