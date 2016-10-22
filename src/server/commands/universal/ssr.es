import { authOnServer } from 'react-redux-oauth2'
import {Provider} from 'react-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import routes from '../../../client/containers/routes';
import HTML from '../../../client/components/html'
import createStore from '../../../client/store'

export default function (webpackIsomorphicTools) {
  return async (ctx, next) => {
    if (process.env.NODE_ENV == 'development') {
      webpackIsomorphicTools.refresh();
    }

    try {
      const memoryHistory = createHistory(ctx.request.url);
      let store = createStore(memoryHistory);
      const history = syncHistoryWithStore(memoryHistory, store);

      try {
        var { redirectLocation, renderProps } = await new Promise((resolve, reject)=>{
          match({ history, routes: routes(history).props.children, location: ctx.request.url }, (error, redirectLocation, renderProps) => {
            if (error) {
              reject(error);
            } else {
              resolve({redirectLocation, renderProps});
            }
          });
        });
      } catch (e) {
        console.log(e);
        await next();
        // return ctx.throw(e, 404);
      }
      if (redirectLocation) {
        ctx.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        try {
          await loadOnServer({ ...renderProps, store });
          await authOnServer(ctx.req.headers.cookie, store);
        } catch (e) { }
        let component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );
        ctx.body = `
        <!doctype html>
        ${ReactDOM.renderToStaticMarkup(
          <HTML assets={webpackIsomorphicTools.assets()}
          component={component}
          store={store} />)}`;
        return;
      }
    } catch (e) {
      console.log(e);
      return await next();
    }
    return await next();
  }
}
