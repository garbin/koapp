import Counter from './counter';
import Form from './form';
import Fetch from './fetch';
import Index from './index/index';
import React from 'react';
import { Router, Route} from 'react-router';

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={Index} />
      <Route path="/counter" component={Counter} />
      <Route path="/fetch" component={Fetch} />
      <Route path="/form" component={Form} />
    </Router>
  )
}
