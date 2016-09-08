import {api} from '../lib/helper'
import { createAction } from 'redux-actions'

export const fetch = createAction('FETCH', payload => {
  return api.get('/posts').then(res => {throw new Error('haha')})
}
);
