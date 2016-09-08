import React from 'react';
import { Router, Route, IndexRoute } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { OAuthComponent } from 'react-redux-oauth2'
import * as App from './app'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.oauth.user, // how to get the user state
  // redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  failureRedirectPath: '/auth',
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})
const Authenticated = UserIsAuthenticated(props => props.children);

export default function (history) {
  return (
    <Router render={props => <ReduxAsyncConnect {...props}/>} history={history}>
      <Route path="/" component={OAuthComponent(App.Root)}>
        <IndexRoute component={App.Index} />
        <Route path="counter" component={App.Counter} />
        <Route path="async" component={App.Async} />
        <Route path="auth" component={App.Auth} />
      </Route>
    </Router>
  )
}

      // <Route component={Authenticated}>
      //   <Route path="/admin" component={Admin.Frame}>
      //     <IndexRoute component={Admin.Dashboard} />
      //     <Route path="list" component={Admin.List} />
      //   </Route>
      // </Route>
      // <Route path="/" component={Root}>
      //   <IndexRoute component={Index} />
      //   <Route path="counter" component={Counter} />
      //   <Route path="async" component={Async} />
      //   <Route path="auth" component={Auth} />
      //   <Route path="form" component={Form} />
      // </Route>
