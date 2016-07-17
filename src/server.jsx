import Koapi, { Router } from 'koapi'
import React from 'react';
import { combineReducers } from 'redux'
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import configure from './store';
import * as reducers from './reducers'
import routes from './containers';
import HTML from './lib/html';

global.window = {};


const app = new Koapi();

app.bodyparser();
app.compress();
app.serve({ root: __dirname + '/../build' });

app.use(async (ctx, next) => {
  if (process.env.NODE_ENV == 'development') {
    webpackIsomorphicTools.refresh();
  }
  const memoryHistory = createHistory(ctx.request.url);
  const store = configure(combineReducers({
    ...reducers,
    routing: routerReducer,
    form: formReducer
  }));
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes: routes(history).props.children, location: ctx.request.url }, async (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', error);
      ctx.throw(500);
    } else if (renderProps) {
      let component = (
        <Provider store={store} key="provider">
          <RouterContext {...renderProps} />
        </Provider>
      );
      ctx.body = `
        <!doctype html>
          ${ReactDOM.renderToString(
            <HTML assets={webpackIsomorphicTools.assets()}
                  component={component}
                  store={store} />)}`;
    } else {
      ctx.throw(404);
    }
  });
});

const server = app.listen(5000);

export default server;
