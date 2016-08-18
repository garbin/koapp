import {api} from '../lib/helper'
import { createAction } from 'redux-actions'


export const submit = createAction('SUBMIT', payload => new Promise((resolve, reject) => {
  setTimeout(function(){
    resolve(payload);
  }, 300);
}));
