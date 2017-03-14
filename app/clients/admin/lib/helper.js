import React from 'react'
import { bindActionCreators } from 'redux'
import { connect as reduxConnect } from 'react-redux'
import _ from 'lodash'
import config from '../../../../config/client'
import axios from 'axios'
import reactCookie from 'react-cookie'
import i18next from 'i18next'
import i18nextXHR from 'i18next-xhr-backend'

export const api = axios.create({
  baseURL: config.api,
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
})

api.interceptors.request.use(config => {
  try {
    const { access_token: accessToken } = reactCookie.load('redux_oauth2')
    config.headers.Authorization = `Bearer ${accessToken}`
  } catch (e) { }
  return config
  // Do something before request is sent
}, error => Promise.reject(error))

export function reduxers (rxs) {
  const actions = _.mapValues(rxs, reduxer => reduxer.actions)
  const reducer = _.transform(rxs, (result = {}, reduxer) => Object.assign(result, reduxer.reducer))

  return {actions, reducer}
}

export function connect (mapState, actions) {
  const mapActions = dispatch => {
    if (actions) {
      return { actions: bindActionCreators(actions, dispatch) }
    }
    return { actions }
  }
  return reduxConnect(mapState, mapActions)
}

export function actionProps (actions) {
  return dispatch => ({ actions: bindActionCreators(actions, dispatch) })
}

export function i18n (options = {}) {
  return i18next.use(i18nextXHR).init({
    fallbackLng: 'zh-CN',
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: true,
    saveMissing: true,
    backend: {
      loadPath: `${config.admin.basename}/locales/{{lng}}/{{ns}}.json`,
      addPath: '/api/locales/{{lng}}/{{ns}}',
    },
    ...options
  })
}
