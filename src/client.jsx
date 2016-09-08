import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './containers/routes';
import createStore from './store';

const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    {routes(history)}
  </Provider>
), document.getElementById('koapp'));
