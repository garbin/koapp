import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { storeInitialize } from 'react-redux-oauth2'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl-redux'
import { addLocaleData } from 'react-intl'
import messages from './locales/zh-CN'
import zhLocaleData from 'react-intl/locale-data/zh'
import Pages from './pages'
import createStore from './redux'
import moment from 'moment'
import config from './config'

addLocaleData([...zhLocaleData])
const history = createHistory({ basename: config.basename })
const store = createStore(history, { intl: { locale: 'zh-CN', messages } })
moment.locale('zh-CN')

const app = user => {
  return ReactDOM.render((
    <Provider store={store}>
      <IntlProvider>
        <ConnectedRouter history={history}>
          <Pages />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>
  ), document.getElementById('koapp'))
}

storeInitialize(document.cookie, store).then(app).catch(app)
