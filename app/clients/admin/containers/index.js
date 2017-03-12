import React from 'react'
import { connect } from 'react-redux'
import Index from './index.jsx'
import Dashboard from './dashboard'
import * as Resource from './resources'
import Signin from './signin'
import Test from './test'
import ReduxToastr from 'react-redux-toastr'
import { Route, Switch, Redirect, withRouter } from 'react-router'
import '../styles'

const PrivateRoute = connect(state => ({oauth: state.oauth}))(props => {
  const { oauth, ...others } = props
  if (!oauth.user) {
    return <Redirect to={{pathname: '/signin'}} />
  } else {
    return <Route {...others} />
  }
})

export default props => (
  <div>
    <ReduxToastr position='bottom-right' />
    <Switch>
      <Route path='/signin' exact component={Signin} />
      <PrivateRoute path='/' children={props => (
        <div>
          <Route component={withRouter(Index)} />
          <Switch>
            <Route path='/resources' component={Resource.List} />
          </Switch>
        </div>
      )} />
    </Switch>
  </div>
)
