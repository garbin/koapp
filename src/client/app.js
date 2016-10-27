import React from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { OAuthComponent, storeInitialize } from 'react-redux-oauth2'
import { NProgress } from 'redux-nprogress'
import Notifications from 'react-notification-system-redux'
import Test from './containers/admin/test'
const Website = s => System.import('./containers/website')
const Admin = s => System.import('./containers/admin')

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.oauth.user, // how to get the user state
  failureRedirectPath: '/admin/signin',
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});

const ReduxNotifications = connect(
  state => ({notifications:state.notifications})
)(Notifications);

function store_initialize(store) {
  return function (n, r) {
    return new Promise((resolve, reject)=>{
      let { oauth: { user } } = store.getState();
      if (!user) {
        storeInitialize(document.cookie, store).then(resolve).catch(reject);
      } else {
        reject();
      }
    });
  }
}

function get(promise, resolve) {
  if (typeof resolve !== 'function') {
    let key = resolve;
    resolve = Module => Module[key];
  }
  return async s => resolve(await promise(s));
}

export default class App extends React.Component {
  render(){
    let { history, store } = this.props;
    return (
      <Router render={props => <ReduxAsyncConnect {...props}/>}
              history={history}>
        <Route component={props =>
          <div>
            <NProgress />
            <ReduxNotifications />
            {props.children}
          </div>}>
          <Route path="/test" component={Test} />
          <Route path="/" getComponent={get(Website, 'Root')}>
            <IndexRoute getComponent={get(Website, 'Index')} />
            <Route path="counter" getComponent={get(Website, 'Counter')} />
            <Route path="async" getComponent={get(Website, 'Async')} />
            <Route path="auth" getComponent={get(Website, 'Auth')} />
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
    );
  }
}
