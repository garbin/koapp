import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { combineReducers} from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form';
import * as reducers from './reducers'
import routes from './containers';
import configure, {renderAuthApp} from './store';
import {authStateReducer} from 'redux-auth'

var store = configure(combineReducers({
  ...reducers,
  routing: routerReducer,
  auth: authStateReducer,
  form: formReducer
}));

const history = syncHistoryWithStore(browserHistory, store)

renderAuthApp({store}).then(p => {
  ReactDOM.render((
    <Provider store={store}>
      {routes(history)}
    </Provider>
  ), document.getElementById('koapp'));
})
