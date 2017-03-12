import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import Containers from './containers'
import createStore from './store'
import { storeInitialize } from 'react-redux-oauth2'
import { admin } from '../../../config/client'

const history = createHistory({ basename: admin.basename })
const store = createStore(history)

const app = props => ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Containers />
    </ConnectedRouter>
  </Provider>
), document.getElementById('koapp'))

storeInitialize(document.cookie, store).then(app).catch(app)

//     <Route
//       path='/'
//       onEnter={oauthInit(store)}
//       component={UserIsAuthenticated(Containers.Index)}>
//       <IndexRoute component={Containers.Dashboard} />
//       <Route path='resources' component={Containers.Resource.List}>
//         <Route path='edit' component={Containers.Resource.Modal} />
//       </Route>
//       <Route path='resources/create' component={Containers.Resource.Form} />
//     </Route>
