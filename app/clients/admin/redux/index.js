import React from 'react'
import { Provider } from 'react-redux'
import fetch from 'isomorphic-fetch'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient, InMemoryCache } from 'apollo-client-preset'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
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
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    token = token || window.localStorage.getItem('access_token')
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    }
  })
  const link = createHttpLink({ uri: config.graphql, opts: { credentials: 'same-origin' } })
  return new ApolloClient({
    link: authLink.concat(link),
    ssrMode: false,
    cache: new InMemoryCache()
  })
}

export function configure (reducers, initial, history) {
  const reactRouter = routerMiddleware(history)
  const { devToolsExtension } = global.window || {}
  return createStore(
    reducers,
    initial,
    compose(
      applyMiddleware(...middlewares, reactRouter),
      devToolsExtension ? devToolsExtension() : f => f
  ))
}
export function makeStore (history, initial = {}) {
  return configure(combineReducers(reducers), initial, history)
}

export async function initializeState ({store}) {
  store.dispatch(oauth.config(config.oauth))
  const accessToken = window.localStorage.getItem('access_token')
  if (accessToken) await store.dispatch(oauth.sync(accessToken))
}

export function render ({store, history, Component, mount, apollo}) {
  ReactDOM.render((
    <Provider store={store}>
      <IntlProvider>
        <ConnectedRouter history={history}>
          <ApolloProvider client={apollo}>
            <Component />
          </ApolloProvider>
        </ConnectedRouter>
      </IntlProvider>
    </Provider>
  ), mount)
}

export default function ({ history, mount }) {
  addLocaleData([...zhLocaleData])
  const apollo = createApollo()
  const store = makeStore(history, { intl: { locale: 'zh-CN', messages } })
  return async Component => {
    try {
      await initializeState({store})
      render({ store, history, Component, mount, apollo })
    } catch (e) {
      render({ store, history, Component, mount, apollo })
    }
  }
}
