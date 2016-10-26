import React from 'react';
import { connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { OAuthComponent, storeInitialize } from 'react-redux-oauth2'
import { NProgress } from 'redux-nprogress'
import Notifications from 'react-notification-system-redux'

const Public = s => System.import('./public')
const Admin = s => System.import('./admin')

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.oauth.user, // how to get the user state
  failureRedirectPath: '/admin/signin',
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

function store_initialize(store) {
  return function (n, r, cb) {
    if (!__SERVER__) {
      let { oauth: { user } } = store.getState();
      if (!user) {
        storeInitialize(document.cookie, store).then(data => cb()).catch(e => {
          console.error(e);
          cb();
        });
      } else {
        cb();
      }
    } else {
      cb();
    }
  }
}

function get(promise, resolve) {
  if (typeof resolve !== 'function') {
    let key = resolve;
    resolve = Module => Module[key];
  }
  return async s => resolve(await promise(s));
}

export default function (history, store) {
  let ReduxNotifications = connect(
    state => ({notifications:state.notifications})
  )(Notifications);

  return (
    <Router render={props => <ReduxAsyncConnect {...props}/>} history={history}>
      <Route component={props =>
        <div>
          <NProgress />
          <ReduxNotifications />
          {props.children}
        </div>}>
        <Route path="/" getComponent={get(Public, 'Root')}>
          <IndexRoute getComponent={get(Public, 'Index')} />
          <Route path="counter" getComponent={get(Public, 'Counter')} />
          <Route path="async" getComponent={get(Public, 'Async')} />
          <Route path="auth" getComponent={get(Public, 'Auth')} />
        </Route>
        <Route path="/admin/signin" getComponent={get(Admin, 'Signin')} />
        <Route path="/admin"
               onEnter={store_initialize(store)}
               getComponent={get(Admin, Admin => UserIsAuthenticated(Admin.Root))}>
         <IndexRoute getComponent={get(Admin, 'Index')} />
         <Route path="test" getComponent={get(Admin, 'Test')} />
         <Route path="list" getComponent={get(Admin, 'List')} />
         <Route path="form" getComponent={get(Admin, 'Form')} />
       </Route>
      </Route>
    </Router>
  )
}
