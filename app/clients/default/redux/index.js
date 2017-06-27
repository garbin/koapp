import React from 'react'
import fetch from 'isomorphic-fetch'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { routerMiddleware, ConnectedRouter } from 'react-router-redux'
import ReactDOM from 'react-dom'
import { addLocaleData } from 'react-intl'
import zhLocaleData from 'react-intl/locale-data/zh'
import { IntlProvider } from 'react-intl-redux'
import messages from '../locales/zh-CN'
import middlewares from './middlewares'
import * as reducers from './reducers'
import { oauth } from './actions'
import config from '../config'

global.fetch = fetch
export function createApollo (token) {
  const networkInterface = createNetworkInterface({
    uri: config.graphql, // Server URL (must be absolute)
    opts: { // Additional fetch() options like `credentials` or `headers`
      credentials: 'same-origin'
    }
  })
  networkInterface.use([{
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}  // Create the header object if needed.
      }
      token = token || window.localStorage.getItem('access_token')
      if (token) {
        req.options.headers['authorization'] = `Bearer ${token}`
      }
      next()
    }
  }])
  return new ApolloClient({
    ssrMode: false, // Disables forceFetch on the server (so queries are only run once)
    networkInterface
  })
}

export function configure (reducers, initial, history, apollo) {
  const reactRouter = routerMiddleware(history)
  const { devToolsExtension } = global.window || {}
  return createStore(
    reducers,
    initial,
    compose(
      applyMiddleware(apollo.middleware(), ...middlewares, reactRouter),
      devToolsExtension ? devToolsExtension() : f => f
  ))
}
export function makeStore (history, initial = {}, apollo) {
  return configure(combineReducers({
    ...reducers,
    apollo: apollo.reducer()
  }), initial, history, apollo)
}

export async function initializeState ({store}) {
  store.dispatch(oauth.config(config.oauth))
  const accessToken = window.localStorage.getItem('access_token')
  if (accessToken) await store.dispatch(oauth.sync(accessToken))
}

export function render ({store, history, Component, mount, apollo}) {
  ReactDOM.render((
    <ApolloProvider store={store} client={apollo}>
      <IntlProvider>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </IntlProvider>
    </ApolloProvider>
  ), mount)
}

export default function ({ history, mount }) {
  addLocaleData([...zhLocaleData])
  const apollo = createApollo()
  const store = makeStore(history, { intl: { locale: 'zh-CN', messages } }, apollo)
  return async Component => {
    try {
      await initializeState({store})
      render({ store, history, Component, mount, apollo })
    } catch (e) {
      render({ store, history, Component, mount, apollo })
    }
  }
}
