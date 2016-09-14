import {api} from '../lib/helper'
import {async_state} from '../lib/helper'
import { createAction, handleActions } from 'redux-actions'

export const actions = {
  fetch: createAction('FETCH', payload => {
    return api.get('/posts').then(res => {throw new Error('haha')})
  })
}

export const reducer = {
  async: handleActions({
    FETCH_FULFILLED: (state, action) => async_state(action.payload.data, true),
    FETCH_REJECTED: (state, action) => async_state(action.payload.data || action.payload.toString(), false),
    FETCH_PENDING: (state, action) => async_state(null, false, true)
  }, async_state())
}
