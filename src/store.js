import middlewares from './middlewares';
import {compose, createStore, applyMiddleware} from 'redux';

export default function configure(reducers, initial) {
  const store = createStore(reducers, initial, compose(
    applyMiddleware.apply(this, middlewares),
    (window && window.devToolsExtension) ? window.devToolsExtension() : f => f
  ), (window && window.__data) ? window.__data : {});

  return store;
}
