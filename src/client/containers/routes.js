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

function component(promise, resolve) {
  return async function (s, cb) {
    try {
      cb(null, resolve(await promise(s)));
    } catch (e) {
      console.error(e);
    }
  }
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
        </div> }>
        <Route getChildRoutes={component(Public, Public => [
          <Route path="/" component={Public.Root}>
            <IndexRoute component={Public.Index} />
            <Route path="counter" component={Public.Counter} />
            <Route path="async" component={Public.Async} />
            <Route path="auth" component={Public.Auth} />
          </Route>
        ])} />
        <Route getChildRoutes={component(Admin, Admin => [
          <Route path="/admin/signin" component={Admin.Signin} />,
          <Route path="/admin"
                 component={UserIsAuthenticated(Admin.Root)}
                 onEnter={store_initialize(store)}>
            <IndexRoute component={Admin.Index} />
            <Route path="test" component={Admin.Test} />
            <Route path="list" component={Admin.List} />
            <Route path="form" component={Admin.Form} />
          </Route>
        ])} />
      </Route>
    </Router>
  )
}
