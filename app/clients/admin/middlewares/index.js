import effects from 'redux-effects'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import error from './error'

export default [
  effects,
  thunk,
  error,
  promiseMiddleware()
]
