import {FETCH, FETCHED, UNFETCHED} from '../constants'
export function fetch(state = {data:null, loaded:false, error:null}, action) {
  switch (action.type) {
    case FETCHED:
      return {
        data: action.payload,
        loaded:true,
        error:null
      }
      break;
    case UNFETCHED:
      return {
        error: action.payload,
        loaded:true,
        data:null
      }
      break;
  }

  return state;
}
