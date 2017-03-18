import effects from 'redux-effects'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import error from './error'

export default [
  effects,
  thunk,
  promiseMiddleware(),
  loadingBarMiddleware(),
  error
]
