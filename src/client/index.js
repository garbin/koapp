import 'babel-polyfill'
import {AppContainer} from 'react-hot-loader';
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import App from './app'
import createStore from './store';

const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store)

const render = () => (
  ReactDOM.render((
    <AppContainer>
      <Provider store={store}>
        <App history={history} store={store} />
      </Provider>
    </AppContainer>
  ), document.getElementById('koapp'))
);

render();

if (module.hot) module.hot.accept('./app', render);
