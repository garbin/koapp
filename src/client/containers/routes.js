import React from 'react';
import { connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { OAuthComponent, storeInitialize } from 'react-redux-oauth2'
import { NProgress } from 'redux-nprogress'
import Notifications from 'react-notification-system-redux'

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


function load(promise, resolve) {
  return async function (s, cb) {
    try {
      cb(null, resolve(await promise(s)));
    } catch (e) {
      console.error(e);
    }
  }
}

const _public = s => System.import('./public')
const _admin = s => System.import('./admin')

export default function (history, store) {
  let ReduxNotifications = connect(state => ({notifications:state.notifications}))(Notifications);
  return (
    <Router render={props => <ReduxAsyncConnect {...props}/>} history={history}>
      <Route component={props => <div><NProgress /><ReduxNotifications />{props.children}</div>}>
        <Route path="/"
               getComponent={load(_public, Public => Public.Root)}
               getIndexRoute={load(_public, Public => ({component:Public.Index}))}
               getChildRoutes={load(_public, Public => [
                 <Route path="counter" component={Public.Counter} />,
                 <Route path="async" component={Public.Async} />,
                 <Route path="auth" component={Public.Auth} />
               ])}
               onEnter={store_initialize(store)}>
        </Route>
        <Route path="/admin/signin"
               getComponent={load(_admin, Admin => Admin.Signin)} />
        <Route path="/admin"
               getComponent={load(_admin, Admin => UserIsAuthenticated(Admin.Root))}
               getIndexRoute={load(_admin, Admin => ({component:Admin.Index}))}
               getChildRoutes={load(_admin, Admin => [
                 <Route path="test" component={Admin.Test} />,
                 <Route path="list" component={Admin.List} />,
                 <Route path="form" component={Admin.Form} />
               ])}
               onEnter={store_initialize(store)}>
        </Route>
      </Route>
    </Router>
  )
}
