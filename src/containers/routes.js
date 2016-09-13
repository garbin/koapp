import React from 'react';
import { Router, Route, IndexRoute } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { OAuthComponent } from 'react-redux-oauth2'
import { NProgress } from 'redux-nprogress'
import * as Public from './public'
import * as Admin from './admin'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.oauth.user, // how to get the user state
  failureRedirectPath: '/admin/signin',
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})
// const Authenticated = UserIsAuthenticated(props => props.children);

export default function (history) {
  return (
    <Router render={props => <ReduxAsyncConnect {...props}/>} history={history}>
      <Route component={props => <div><NProgress />{props.children}</div>}>
        <Route path="/" component={OAuthComponent(Public.Root)}>
          <IndexRoute component={Public.Index} />
          <Route path="counter" component={Public.Counter} />
          <Route path="async" component={Public.Async} />
          <Route path="auth" component={Public.Auth} />
        </Route>
        <Route path="/admin/signin" component={Admin.Signin} />
        <Route path="/admin" component={UserIsAuthenticated(OAuthComponent(Admin.Root))}>
          <IndexRoute component={Admin.Index} />
        </Route>
      </Route>
    </Router>
  )
}
