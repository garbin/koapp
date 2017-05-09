import 'babel-polyfill'
import createHistory from 'history/createBrowserHistory'
import Pages from './pages'
import renderReduxApp from './redux'
import moment from 'moment'
import config from './config'

moment.locale('zh-CN')
renderReduxApp({
  history: createHistory({ basename: config.basename }),
  mount: document.getElementById('koapp')
})(Pages)
