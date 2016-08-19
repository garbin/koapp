import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './containers';
import createStore, { renderAuthApp } from './store';
import {AuthGlobals} from 'redux-auth/bootstrap-theme'

const store = createStore(browserHistory);
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
