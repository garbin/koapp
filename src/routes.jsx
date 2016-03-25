import React from 'react';
import { Router, Route} from 'react-router'
import App from './containers/counter'
import Form from './containers/form'

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="form" component={Form} />
      </Route>
    </Router>
  )
}
