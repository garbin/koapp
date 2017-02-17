const { storeInitialize } = require('react-redux-oauth2')
const { Provider } = require('react-redux')
const { ReduxAsyncConnect, loadOnServer } = require('redux-connect')
const React = require('react')
const ReactDOM = require('react-dom/server')
const { match } = require('react-router')
const { syncHistoryWithStore } = require('react-router-redux')
const createHistory = require('react-router/lib/createMemoryHistory')
const {default: routes} = require('../../client/containers/routes')
const {default: HTML} = require('../../client/components/html')
const {default: createStore} = require('../../client/store')

exports.default =  function (webpackIsomorphicTools) {
  return async (ctx, next) => {
    if (process.env.NODE_ENV === 'development') {
      webpackIsomorphicTools.refresh()
    }

    try {
      const memoryHistory = createHistory(ctx.request.url)
      let store = createStore(memoryHistory)
      const history = syncHistoryWithStore(memoryHistory, store)
      try {
        await storeInitialize(ctx.req.headers.cookie || '', store)
      } catch (e) {}

      let { redirectLocation, renderProps } = await new Promise((resolve, reject) => {
        match({ history, routes: routes(history, store).props.children, location: ctx.request.url }, (error, redirectLocation, renderProps) => {
          if (error) {
            reject(error)
          } else {
            resolve({ redirectLocation, renderProps })
          }
        })
      })
      if (redirectLocation) {
        ctx.redirect(redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        try {
          await loadOnServer({ ...renderProps, store })
        } catch (e) { }
        let component = (
          <Provider store={store} key='provider'>
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        )
        ctx.body = `
        <!doctype html>
        ${ReactDOM.renderToStaticMarkup(
          <HTML
            assets={webpackIsomorphicTools.assets()}
            component={component}
            store={store}
          />)}`
        return
      }
    } catch (e) {
      console.log(e)
    }
    await next()
  }
}
