import { createAction, handleAction } from 'redux-actions'
import { api } from '../lib/helper'

export const actions = {
  fetch: createAction('FETCH', payload => api.get('/posts'))
}

export const reducer = {
  async: handleAction('FETCH_FULFILLED', (state, action) => action.payload.data, [])
}
