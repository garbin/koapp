import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { storeInitialize } from 'react-redux-oauth2'
import { I18nextProvider } from 'react-i18next'
import { admin } from '../../../config/client'
import Containers from './containers'
import createStore from './store'
import { i18n } from './lib/helper'

const history = createHistory({ basename: admin.basename })
const store = createStore(history)

const app = user => {
  const locales = i18n({lng: 'zh-CN'})
  return ReactDOM.render((
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <I18nextProvider i18n={locales}>
          <Containers />
        </I18nextProvider>
      </ConnectedRouter>
    </Provider>
  ), document.getElementById('koapp'))
}

storeInitialize(document.cookie, store).then(app).catch(app)
