import { handleActions } from 'redux-actions'

export const fetch = handleActions({
  FETCH_FULFILLED: (state, action) => {
    return {
      data: action.payload.data,
      loaded:true,
      error:null
    }
  },
  FETCH_REJECTED: (state, action) => {
    return {
      error: action.payload.data,
      loaded:true,
      data:null
    }
  }
}, {data:null, loaded:false, error:null});
