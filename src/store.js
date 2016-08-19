import middlewares from './middlewares';
import {compose, createStore, applyMiddleware, combineReducers} from 'redux';
import {configure as auth_configure} from 'redux-auth'
import * as reducers from './reducers'
import config from './config'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import {browserHistory} from 'react-router'
import {authStateReducer} from 'redux-auth'
import {reducer as formReducer} from 'redux-form'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import _ from 'lodash'
import Immutable from "immutable"

export default function configure(reducers, initial, history) {
  if (initial.auth) {
    initial.auth = Immutable.fromJS(initial.auth);
  }
  // middlewares.push(routerMiddleware(history));
  const store = createStore(reducers, initial,
    compose(
    applyMiddleware.apply(this, middlewares),
    (window && window.devToolsExtension) ? window.devToolsExtension() : f => f
  ));

  return store;
}
export default function (history) {
  return configure(combineReducers({
    ...reducers,
    reduxAsyncConnect,
    routing: routerReducer,
    auth: authStateReducer,
    form: formReducer
  }), __CLIENT__ ? window.__INITIAL_STATE__ : {}, history);
}

export function renderAuthApp({cookies, isServer, currentLocation, store, provider} = {}) {
  // configure redux-auth BEFORE rendering the page
  return store.dispatch(auth_configure(
    // use the FULL PATH to your API
    config.auth,
    {isServer, cookies, currentLocation, clientOnly:true}
  )).then(({redirectPath, blank} = {}) => {
    if (blank) {
      // if `blank` is true, this is an OAuth redirect and should not
      // be rendered
      return <noscript />;
    } else {
      return provider;
    }
  });
}
