import effects from 'redux-effects'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { nprogressMiddleware } from 'redux-nprogress'

export default [
  effects,
  thunk,
  nprogressMiddleware(),
  promiseMiddleware(),
];
