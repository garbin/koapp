import Counter from './counter';
import Form from './form';
import Async from './async';
import Auth from './auth';
import Default from './default';
import * as Admin from './admin'
import React from 'react';
import { Router, Route} from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth.get('user').toJS().attributes, // how to get the user state
  // redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  failureRedirectPath: '/auth',
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})
const Authenticated = UserIsAuthenticated(props => props.children);

export default function (history) {
  return (
    <Router render={props => <ReduxAsyncConnect {...props}/>} history={history}>
      <Route component={Authenticated}>
        <Route path="/admin" component={Admin.Dashboard} />
      </Route>
      <Route path="/counter" component={Counter} />
      <Route path="/async" component={Async} />
      <Route path="/auth" component={Auth} />
      <Route path="/form" component={Form} />
      <Route path="/" component={Default} />
    </Router>
  )
}
