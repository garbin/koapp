import middlewares from './middlewares';
import {compose, createStore, applyMiddleware} from 'redux';
import {configure as auth_configure} from 'redux-auth'
import config from './config'

export default function configure(reducers, initial) {
  const store = createStore(reducers, initial, compose(
    applyMiddleware.apply(this, middlewares),
    (window && window.devToolsExtension) ? window.devToolsExtension() : f => f
  ), (window && window.__data) ? window.__data : {});

  return store;
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
