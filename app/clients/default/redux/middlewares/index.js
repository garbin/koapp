import effects from 'redux-effects'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import apolloLoading from './apollo_loading'
import error from './error'

export default [
  effects,
  thunk,
  promiseMiddleware(),
  loadingBarMiddleware(),
  apolloLoading,
  error
]
