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
import HTML from './lib/html'
import webpackIsomorphicTools from '../server'
import config from '../config'
import convert from 'koa-convert'
import serve from 'koa-static-server'

const app = new Koapi();

app.bodyparser();
app.compress();
if (process.env.NODE_ENV == 'development') {
  app.use(convert(require('koa-proxy')({
    host:'http://localhost:' + config.webpack_port,
    match: /^\/static\//
  })));
} else {
  app.use(convert(serve({
    rootDir: __dirname + '/../static',
    rootPath: '/static'
  })));
}

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

const server = app.listen(config.port);

export default server;
