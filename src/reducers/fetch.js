import { handleActions } from 'redux-actions'
import {async_state} from '../lib/helper'

export const fetch = handleActions({
  FETCH_FULFILLED: (state, action) => async_state(action.payload.data, true),
  FETCH_REJECTED: (state, action) => async_state(action.payload.data, false),
  FETCH_PENDING: (state, action) => async_state(null, false, true)
}, async_state());
