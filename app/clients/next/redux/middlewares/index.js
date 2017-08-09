import error from './error'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import apolloLoading from './apollo_loading'
export default [
  thunkMiddleware,
  promiseMiddleware(),
  loadingBarMiddleware(),
  apolloLoading,
  error
]
