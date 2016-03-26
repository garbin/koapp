import {SUBMIT, SUBMIT_DONE} from '../constants'
import {api} from '../lib/fetch'
export function submit (data) {
  return dispatch => {
    api.read('/apps').then(
      apps => dispatch(submit_done(apps)),
      err  => dispatch(submit_error(err)),
    );
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
