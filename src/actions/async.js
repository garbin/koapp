import {api} from '../lib/fetch'
import { createAction } from 'redux-actions'

export const fetch = createAction('FETCH', payload => api.get('/posts'));
