import {api} from '../lib/helper'
import { createAction } from 'redux-actions'

export const fetch = createAction('FETCH', payload => api.get('/posts'));
