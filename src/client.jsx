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
import {AuthGlobals} from 'redux-auth/bootstrap-theme'

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
      <div>
        <AuthGlobals />
        {routes(history)}
      </div>
    </Provider>
  ), document.getElementById('koapp'));
})
