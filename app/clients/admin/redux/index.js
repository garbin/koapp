import React from 'react'
import { init } from '@rematch/core'
import { Provider } from 'react-redux'
import fetch from 'isomorphic-fetch'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
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
import * as models from './models'

global.fetch = fetch
export function createApollo (token) {
  return new ApolloClient({
    link: createHttpLink({ uri: config.graphql }),
    fetchOptions: {
      credentials: 'same-origin'
    },
    request: async operation => {
      token = token || window.localStorage.getItem('access_token')
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : null
        }
      })
    },
    cache: new InMemoryCache()
  })
}

export function configure (combineReducers, initial, history) {
  const reactRouter = routerMiddleware(history)
  return init({
    models,
    redux: {
      initialState: initial,
      reducers,
      middlewares: [...middlewares, reactRouter]
    }
  })
}
export function makeStore (history, initial = {}) {
  return configure(reducers, initial, history)
}

export async function initializeState ({ store }) {
  store.dispatch(oauth.config(config.oauth))
  const accessToken = window.localStorage.getItem('access_token')
  if (accessToken) await store.dispatch(oauth.sync(accessToken))
}

export function render ({ store, history, Component, mount, apollo }) {
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider>
        <ConnectedRouter history={history}>
          <ApolloProvider client={apollo}>
            <Component />
          </ApolloProvider>
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
    mount
  )
}

export default function ({ history, mount }) {
  addLocaleData([...zhLocaleData])
  const apollo = createApollo()
  const store = makeStore(history, { intl: { locale: 'zh-CN', messages } })
  return async Component => {
    try {
      await initializeState({ store })
      render({ store, history, Component, mount, apollo })
    } catch (e) {
      render({ store, history, Component, mount, apollo })
    }
  }
}
