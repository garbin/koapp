import React from 'react'
import { bindActionCreators } from 'redux'
import { connect as reduxConnect } from 'react-redux'
import _ from 'lodash'
import config from '../config'
import axios from 'axios'
import reactCookie from 'react-cookie'

export const api = axios.create({
  baseURL: config.api,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})

api.interceptors.request.use(config => {
  try {
    const { access_token: accessToken } = reactCookie.load('redux_oauth2')
    config.headers.Authorization = `Bearer ${accessToken}`
  } catch (e) { }
  return config
  // Do something before request is sent
}, error =>
  // Do something with request error
   Promise.reject(error))

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

export function convertJoiError (joiErrors) {
  const errors = {}
  _(joiErrors).forEach(error => {
    errors[error.path] = error.message
  })

  return errors
}

export function asyncState (payload = null, result = undefined, loading = false) {
  return {
    loading,
    loaded: result !== undefined,
    data: result ? payload : null,
    error: result ? null : payload
  }
}

export const table = {
  column (property, label, options) {
    const col = {
      property,
      header: {
        props: {},
        label
      },
      cell: {
        props: {}
      }
    }
    let { checked, checkable, onCheck, style } = options
    if (checkable) {
      style = Object.assign(style || {}, {
        flex: '0 0 30px'
      })
      col.header.format = name => (
        <label htmlFor className='item-check' id='select-all-items'>
          <input type='checkbox' className='checkbox' />
          <span />
        </label>
      )
      col.cell.format = value => (
        <label htmlFor className='item-check'>
          <input type='checkbox' checked={_.includes(checked, value)} onChange={onCheck} value={value} className='checkbox' />
          <span />
        </label>
      )
    }
    col.cell.props.style = col.header.props.style = style
    return col
  },
  list: {
    table: props => (
      <div className='card items'>
        <ul className='item-list striped'>{props.children}</ul>
      </div>
    ),
    header: {
      wrapper: props => (
        <li className='item item-list-header hidden-sm-down'>
          {props.children}
        </li>),
      row: props => {
        const { children, className, ...rest } = props
        let cls = className || 'item-row'
        return (
          <div className={cls} {...rest}>{children}</div>
        )
      },
      cell: props => {
        let { className, children, ...rest } = props
        className = className || 'item-col item-col-header'
        return (
          <div className={className} {...rest}>
            <span>{children}</span>
          </div>
        )
      }
    },
    body: {
      wrapper: props => (
        <li>
          <ul className='item-list striped'>
            <li style={{ display: 'none' }} />
            {props.children}
          </ul>
        </li>
      ),
      row: props => {
        let { children, className, ...rest } = props
        className = className || 'item'
        return (
          <li className={className} {...rest}>
            <div className='item-row'>{children}</div>
          </li>
        )
      },
      cell: class extends React.Component {
        render () {
          let { className, children, ...rest } = this.props
          className = className || 'item-col'
          if (children instanceof Date) {
            children = children.toString()
          }
          return (
            <div className={className} {...rest}>{children}</div>
          )
        }
      }
    }
  }
}
