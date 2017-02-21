import effects from 'redux-effects'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { nprogressMiddleware } from 'redux-nprogress'

const nprogressTrueMiddleware = store => next => action => {
  if (action.payload instanceof Promise || action.promise instanceof Promise) {
    action.nprogress = true
  }
  next(action)
}

export default [
  effects,
  thunk,
  promiseMiddleware(),
  nprogressTrueMiddleware,
  nprogressMiddleware()
]
