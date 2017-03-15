import React from 'react'
import { bindActionCreators } from 'redux'
import { connect as reduxConnect } from 'react-redux'
import _ from 'lodash'
import config from '../../../../config/client'
import axios from 'axios'
import reactCookie from 'react-cookie'

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
