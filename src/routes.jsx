import React from 'react';
import { Router, Route} from 'react-router'
import * as Containers from './containers'

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={Containers.Index} />
      <Route path="/counter" component={Containers.Counter} />
      <Route path="/signup" component={Containers.Signup} />
    </Router>
  )
}
