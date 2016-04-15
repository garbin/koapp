import {FETCH, FETCHED, UNFETCHED} from '../constants';
import {api} from '../lib/fetch'
export function fetch() {
  return dispatch => {
    return api.read("apps")
              .then(
                apps => dispatch(fetched(apps)),
                err  => dispatch(unfetched(err))
              );
  }
}
export function fetched (data) {
  return {
    type: FETCHED,
    payload: data,
  }
}

export function unfetched (err) {
  return {
    type: UNFETCHED,
    payload: err
  }
}
