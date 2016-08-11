import Koapi, { Router, Koa } from 'koapi'
import React from 'react';
import { combineReducers } from 'redux'
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import configure, {renderAuthApp} from './store';
import * as reducers from './reducers'
import routes from './containers';
import HTML from './components/html'
import config from '../config'
import convert from 'koa-convert'
import mount from 'koa-mount'
import serve from 'koa-static'
import logger from 'koapi/lib/logger'
import {authStateReducer} from 'redux-auth'


export default function server(webpackIsomorphicTools) {
  global.window = {};
  global.React = React;
  const app = new Koapi();

  logger.add(logger.transports.File, {
    name: 'koapi',
    json: false,
    filename: __dirname + '/../data/logs/koapp.log'
  });

  app.bodyparser();
  app.compress();
  if (process.env.NODE_ENV == 'development') {
    app.use(convert(require('koa-proxy')({
      host:'http://localhost:' + (config.port + 1),
      match: /^\/static\//
    })));
  } else {
    let static_server = new Koa();
    static_server.use(serve(__dirname + '/../static'));
    app.use(mount('/static', static_server));
  }

  app.use(async (ctx, next) => {
    if (process.env.NODE_ENV == 'development') {
      webpackIsomorphicTools.refresh();
    }

    try {
      const memoryHistory = createHistory(ctx.request.url);
      const store = configure(combineReducers({
        ...reducers,
        routing: routerReducer,
        auth: authStateReducer,
        form: formReducer
      }));

      const history = syncHistoryWithStore(memoryHistory, store);
      try {
        var { redirectLocation, renderProps } = await new Promise((resolve, reject)=>{
          match({ history, routes: routes(history).props.children, location: ctx.request.url }, async (error, redirectLocation, renderProps) => {
            if (error) {
              reject(error);
            } else {
              resolve({redirectLocation, renderProps});
            }
          });
        });
      } catch (e) {
        return ctx.throw(e, 404);
      }
      if (redirectLocation) {
        ctx.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        let component = (
          <Provider store={store} key="provider">
            <RouterContext {...renderProps} />
          </Provider>
        );
        component = await renderAuthApp({store, isServer:true, provider:component, cookies:{
          access_token: ctx.cookies.get('access_token')
        }, currentLocation: ctx.request.url});
        ctx.body = `
        <!doctype html>
        ${ReactDOM.renderToStaticMarkup(
          <HTML assets={webpackIsomorphicTools.assets()}
            component={component}
            store={store} />)}`;
      }
    } catch (e) {
      ctx.throw(e, 500);
    }
  });

  const server = app.listen(config.port, console.log.bind(null, `Server running on port ${config.port}`));

  return server;
}
