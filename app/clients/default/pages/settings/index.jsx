import React from 'react'
import { Switch, Route } from 'react-router'
import General from './general'

export default props => {
  return (
    <Switch>
      <Route component={General} />
    </Switch>
  )
}
