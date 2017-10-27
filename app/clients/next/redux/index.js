import React from 'react'
import { compose as composeComponent } from 'recompose'
import { connect, Provider } from 'react-redux'
import { get } from 'lodash'
import { I18nextProvider, translate } from 'react-i18next'
import ReduxToastr from 'react-redux-toastr'
import cookies from 'js-cookie'
import axios from 'axios'
import i18next from 'i18next'
import moment from 'moment'
import numeral from 'numeral'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { result, oauth } from './actions'
import { createClient } from './actions/api'
import config from '../config'
import getApollo from './apollo'
import getStore from './store'

export { connect } from 'react-redux'

export function i18n (options) {
  return Component => {
    const ComposedComponent = composeComponent(
      connect(state => ({
        api: state.api,
        result: state.result,
        oauth: state.oauth,
        user: get(state, 'oauth.user')
      })),
      translate(['common'])
    )(Component)
    return connect(state => ({translactions: state.result.translactions}))(class extends React.Component {
      constructor (props) {
        super(props)
        const { translactions } = this.props
        this.i18n = i18next.init({
          fallbackLng: 'zh-CN',
          resources: translactions,
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
      render () {
        return (
          <I18nextProvider i18n={this.i18n}>
            <div>
              <ComposedComponent {...this.props} />
              <ReduxToastr
                timeOut={4000}
                preventDuplicates
                position='bottom-right' />
            </div>
          </I18nextProvider>
        )
      }
    })
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
        const apollo = getApollo(!process.browser ? req.cookies.get('access_token') : null)
        const store = getStore()
        store.dispatch(result.set('guest_id')(process.browser
          ? cookies.get('guest_id')
          : req.guest_id
        ))
        if (!process.browser) {
          const url = {query: ctx.query, pathname: ctx.pathname}
          const lang = 'zh-CN'
          const file = 'common'
          const translactions = await axios.get(`http://localhost:8000/static/locales/${lang}/${file}.json`)
          .then(res => {
            return {
              [lang]: {
                [file]: res.data
              }
            }
          })
          // i18n
          const test = await axios.get(`http://localhost:8000/static/locales/${lang}/test.json`)
          .then(res => res.data)
          translactions[lang].test = test
          store.dispatch(result.set('translactions')(translactions))
          await store.dispatch(oauth.config(config.oauth))
          options.client = createClient(arg => req.cookies.get('access_token'))
          if (req.cookies.get('access_token')) {
            await store.dispatch(oauth.sync(
              req.cookies.get('access_token')
            ))
          }
          const i18n = i18next.init({
            fallbackLng: 'zh-CN',
            resources: translactions,
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
          const app = (
            // No need to use the Redux Provider
            // because Apollo sets up the store for us
            <Provider store={store}>
              <I18nextProvider i18n={i18n}>
                <ApolloProvider client={apollo}>
                  <div>
                    <Component url={url} {...this.props} />
                    <ReduxToastr
                      timeOut={4000}
                      preventDuplicates
                      position='bottom-right' />
                  </div>
                </ApolloProvider>
              </I18nextProvider>
            </Provider>
          )
          await getDataFromTree(app)
          apolloState = apollo.cache.extract()
        }
        const composedInitialProps = await getInitialProps({...ctx, store, apollo})
        return {
          apolloState,
          options,
          ...composedInitialProps
        }
      }
      constructor (...props) {
        super(...props)
        this.apollo = getApollo(null, this.props.apolloState)
        this.store = getStore()
      }
      render () {
        return (
          <Provider store={this.store}>
            <ApolloProvider client={this.apollo}>
              <Component {...this.props} />
            </ApolloProvider>
          </Provider>
        )
      }
    }
  }
}
