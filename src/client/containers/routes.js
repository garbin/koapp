import React from 'react';
import { connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { OAuthComponent, authOnServer } from 'react-redux-oauth2'
import { NProgress } from 'redux-nprogress'
import * as Public from './public'
import * as Admin from './admin'
import Notifications from 'react-notification-system-redux'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.oauth.user, // how to get the user state
  failureRedirectPath: '/admin/signin',
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

function init_store_user(store) {
  return function (n, r, cb) {
    let { oauth: { user } } = store.getState();
    if (!user) {
      authOnServer(document.cookie, store).then(data => cb()).catch(cb);
    } else {
      cb();
    }
  }
}

export default function (history, store) {
  let ReduxNotifications = connect(state => ({notifications:state.notifications}))(Notifications);
  return (
    <Router render={props => <ReduxAsyncConnect {...props}/>} history={history}>
      <Route component={props => <div><NProgress /><ReduxNotifications />{props.children}</div>} onEnter={init_store_user(store)}>
        <Route path="/" component={OAuthComponent(Public.Root)}>
          <IndexRoute component={Public.Index} />
          <Route path="counter" component={Public.Counter} />
          <Route path="async" component={Public.Async} />
          <Route path="auth" component={Public.Auth} />
        </Route>
        <Route path="/admin/signin" component={Admin.Signin} />
        <Route path="/admin" component={UserIsAuthenticated(OAuthComponent(Admin.Root))}>
          <IndexRoute component={Admin.Index} />
          <Route path="test" component={Admin.Test} />
          <Route path="list" component={Admin.List} />
          <Route path="form" component={Admin.Form} />
        </Route>
      </Route>
    </Router>
  )
}
