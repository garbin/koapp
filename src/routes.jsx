import React from 'react';
import { Router, Route} from 'react-router'
import App from './components/app'

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  )
}
