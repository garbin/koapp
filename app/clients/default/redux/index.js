import React from 'react'
import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { routerMiddleware, ConnectedRouter } from 'react-router-redux'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { addLocaleData } from 'react-intl'
import zhLocaleData from 'react-intl/locale-data/zh'
import { IntlProvider } from 'react-intl-redux'
import cookies from 'js-cookie'
import messages from '../locales/zh-CN'
import middlewares from './middlewares'
import * as reducers from './reducers'
import { oauth } from './actions'
import config from '../config'

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
  const persist = window.localStorage.getItem('token')
  if (persist) {
    const token = JSON.parse(persist)
    await store.dispatch(oauth.sync(token))
  }
}

export function render ({store, history, Component, mount}) {
  ReactDOM.render((
    <Provider store={store}>
      <IntlProvider>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>
  ), mount)
}

export default function ({ history, mount }) {
  addLocaleData([...zhLocaleData])
  const store = makeStore(history, { intl: { locale: 'zh-CN', messages } })
  return async Component => {
    try {
      await initializeState({store})
      render({ store, history, Component, mount })
    } catch (e) {
      render({ store, history, Component, mount })
    }
  }
}
