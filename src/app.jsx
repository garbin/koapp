import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { createStore, bindActionCreators, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import * as reducers from './reducers'
import routes from './routes';


var store = createStore(combineReducers({
  ...reducers,
  routing: routerReducer
}));

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((<Provider store={store}>{routes(history)}</Provider>), document.getElementById('main'));
