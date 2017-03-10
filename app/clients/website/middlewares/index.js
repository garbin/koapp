import effects from 'redux-effects'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

export default [
  effects,
  thunk,
  promiseMiddleware()
]
