import Counter from './counter';
import Form from './form';
import Async from './async';
import Auth from './auth';
import Default from './default';
import React from 'react';
import { Router, Route} from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect'

export default function (history) {
  return (
    <Router render={(props) => <ReduxAsyncConnect {...props}/>} history={history}>
      <Route path="/counter" component={Counter} />
      <Route path="/async" component={Async} />
      <Route path="/auth" component={Auth} />
      <Route path="/form" component={Form} />
      <Route path="/" component={Default} />
    </Router>
  )
}
