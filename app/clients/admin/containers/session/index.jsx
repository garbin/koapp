import React from 'react'
import Signin from './signin'
import { Route, Switch } from 'react-router'
import Forbidden from './forbidden'
import Forget from './forget'

export default props => (
  <Switch>
    <Route path='/session/signin' component={Signin} />
    <Route path='/session/forget' component={Forget} />
    <Route path='/session/forbidden' component={Forbidden} />
  </Switch>
)
