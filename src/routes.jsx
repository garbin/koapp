import React from 'react';
import { Router, Route} from 'react-router'
import App from './containers/counter'
import Signup from './containers/signup'

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/signup" component={Signup} />
    </Router>
  )
}
