import React from 'react'
import { compose as composeComponent } from 'recompose'
import { connect, Provider } from 'react-redux'
import { get } from 'lodash'
import { I18nextProvider, translate } from 'react-i18next'
import ReduxToastr from 'react-redux-toastr'
import cookies from 'js-cookie'
import i18next from 'i18next'
import moment from 'moment'
import numeral from 'numeral'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { oauth } from './actions'
import { createClient } from './actions/api'
import config from '../config'
import getApollo from './apollo'
import getStore from './store'

export { connect } from 'react-redux'

function renderApp (Component, store, apollo, props = {}) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apollo}>
        <Component {...props} />
      </ApolloProvider>
    </Provider>
  )
}

export function getI18n (files, ns = 'zh-CN') {
  return i18next.init({
    fallbackLng: ns,
    resources: files,
    ns: ['common'],
    defaultNS: 'common',
    debug: false,
    interpolation: {
      format (value, format, lng) {
        switch (typeof value) {
          case 'date':
            return moment(value).format(format)
          case 'number':
            return numeral(value).format('$0,0.00')
          default:
            return value
        }
      }
    }
  })
}

export function i18n (options) {
  return Component => {
    const ComposedComponent = composeComponent(
      connect(state => ({
        api: state.api,
        result: state.result,
        user: get(state, 'oauth.user')
      })),
      translate(['common'])
    )(Component)
    return connect(state => ({ translactions: state.translactions }))(
      class extends React.Component {
        constructor (props) {
          super(props)
          const { translactions } = this.props
          this.i18n = getI18n(translactions, 'zh-CN')
        }
        render () {
          return (
            <I18nextProvider i18n={this.i18n}>
              <div>
                <ComposedComponent {...this.props} />
                <ReduxToastr
                  timeOut={4000}
                  preventDuplicates
                  position='bottom-right'
                />
              </div>
            </I18nextProvider>
          )
        }
      }
    )
  }
}

export default function (getInitialProps = async () => ({})) {
  return RawComponent => {
    const Component = i18n()(RawComponent)
    return class extends React.Component {
      static async getInitialProps (ctx) {
        let apolloState = {}
        const { req } = ctx
        const options = {}
        const apollo = getApollo(
          !process.browser ? req.cookies.get('access_token') : null
        )
        const store = getStore()
        if (!process.browser) {
          const url = { query: ctx.query, pathname: ctx.pathname }
          const lang = 'zh-CN'
          const file = 'common'
          const translactions = {}
          translactions[lang] = {}
          translactions[lang][
            file
          ] = require(`../static/locales/${lang}/${file}`)
          store.dispatch.translactions.set(translactions)
          await store.dispatch(oauth.config(config.oauth))
          options.client = createClient(arg => req.cookies.get('access_token'))
          if (req.cookies.get('access_token')) {
            await store.dispatch(oauth.sync(req.cookies.get('access_token')))
          }
          const app = renderApp(Component, store, apollo, { url })
          await getDataFromTree(app)
          apolloState = apollo.cache.extract()
        }
        const composedInitialProps = await getInitialProps({
          ...ctx,
          store,
          apollo
        })
        return {
          apolloState,
          serverState: store.getState(),
          options,
          ...composedInitialProps
        }
      }
      constructor (...props) {
        super(...props)
        this.apollo = getApollo(null, this.props.apolloState)
        this.store = getStore(this.props.serverState)
      }
      render () {
        return renderApp(Component, this.store, this.apollo, this.props)
      }
    }
  }
}
