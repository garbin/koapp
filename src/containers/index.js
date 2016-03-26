import Counter from './counter';
import Signup from './signup';
import Index from './index/index';
import React from 'react';
import { Router, Route} from 'react-router';

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={Index} />
      <Route path="/counter" component={Counter} />
      <Route path="/signup" component={Signup} />
    </Router>
  )
}
