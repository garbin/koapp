import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { connect, Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect } from 'redux-connect'
import { NProgress } from 'redux-nprogress'
import Notifications from 'react-notification-system-redux'
import * as Containers from './containers'
import createStore from './store'

const store = createStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

const ReduxNotifications = connect(
  state => ({ notifications: state.notifications })
)(Notifications)

ReactDOM.render((
  <Provider store={store}>
    <Router render={props => <ReduxAsyncConnect {...props} />} history={history}>
      <Route component={props => <div><NProgress /><ReduxNotifications />{props.children}</div>}>
        <Route path='/' component={Containers.Root}>
          <IndexRoute component={Containers.Index} />
          <Route path='counter' component={Containers.Counter} />
          <Route path='async' component={Containers.Async} />
          <Route path='auth' component={Containers.Auth} />
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('koapp'))
