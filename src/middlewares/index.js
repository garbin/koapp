import effects from 'redux-effects'
import logger from './logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

export default [
  effects,
  thunk,
  promiseMiddleware(),
  // logger,
];
