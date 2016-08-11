import Counter from './counter';
import Form from './form';
import Async from './async';
import Auth from './auth';
import Default from './default';
import React from 'react';
import { Router, Route} from 'react-router';

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={Default} />
      <Route path="/counter" component={Counter} />
      <Route path="/async" component={Async} />
      <Route path="/auth" component={Auth} />
      <Route path="/form" component={Form} />
    </Router>
  )
}
