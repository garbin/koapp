import React from 'react'
import Signin from './signin'
import { Route, Switch } from 'react-router'
import Forbidden from './forbidden'
import Forget from './forget'
import Reset from './reset'

export default props => (
  <Switch>
    <Route path='/session/signin' component={Signin} />
    <Route path='/session/reset' component={Reset} />
    <Route path='/session/forget' component={Forget} />
    <Route path='/session/forbidden' component={Forbidden} />
  </Switch>
)
