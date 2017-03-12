import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import configureOauth2, { reducer as oauthReducer } from 'react-redux-oauth2'
import { reducer as toastr } from 'react-redux-toastr'
import middlewares from './middlewares'
import reduxers from './reduxers'
import config from '../../../config/client'

export function configure (reducers, initial, history) {
  const reactRouter = routerMiddleware(history)
  const store = createStore(reducers, initial,
    compose(
    applyMiddleware.apply(this, [...middlewares, reactRouter]),
    (!process.env.__SERVER__ && window.devToolsExtension) ? window.devToolsExtension() : f => f
  ))

  return store
}
export default function (history) {
  configureOauth2(config.oauth)

  return configure(combineReducers({
    ...reduxers.reducer,
    ...oauthReducer,
    toastr,
    router: routerReducer,
    form: formReducer
  }), !process.env.__SERVER__ ? window.__INITIAL_STATE__ : {}, history)
}
