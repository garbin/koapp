import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import configureOauth2 from 'react-redux-oauth2'
import middlewares from './middlewares'
import * as reducers from './reducers'
import config from '../config'

export function configure (reducers, initial, history) {
  const reactRouter = routerMiddleware(history)
  const { devToolsExtension } = global.window || {}
  return createStore(
    reducers,
    initial,
    compose(
      applyMiddleware(...middlewares, reactRouter),
      devToolsExtension ? devToolsExtension() : f => f
  ))
}
export default function (history, initial = {}) {
  configureOauth2(config.oauth)

  return configure(combineReducers(reducers), initial, history)
}
