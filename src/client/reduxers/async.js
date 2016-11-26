import { createAction, handleActions } from 'redux-actions';
import { api, asyncState } from '../lib/helper';

export const actions = {
  fetch: createAction('FETCH', payload => api.get('/posts').then(res => { throw new Error('haha'); })),
};

export const reducer = {
  async: handleActions({
    FETCH_FULFILLED: (state, action) => asyncState(action.payload.data, true),
    FETCH_REJECTED: (state, action) => asyncState(action.payload.data || action.payload.toString(), false),
    FETCH_PENDING: (state, action) => asyncState(null, false, true),
  }, asyncState()),
};
