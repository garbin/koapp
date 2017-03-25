import { createAction } from 'redux-actions'
import { api } from '../lib/helper'
import contentRange from 'content-range'

export const actions = {
  list (type, config = {perPage: 10}) {
    return createAction(`${type.toUpperCase()}_LIST`, (resource, requestConfig = {}) => {
      const { headers, params, ...otherConfig } = requestConfig
      const { perPage } = config
      const queryHeaders = {}
      let { page, ...others } = params || {}
      page = page || 1
      const offsetStart = perPage * (page - 1)
      const offsetEnd = offsetStart + perPage - 1
      queryHeaders['Range'] = `items=${offsetStart}-${offsetEnd}`
      return api.get(resource, {
        ...otherConfig,
        params: others,
        headers: Object.assign({}, queryHeaders, headers)
      })
    })
  },
  get (type, config = {}) {
    return createAction(`${type.toUpperCase()}_GET`, (resource, config = {}) => {
      return api.get(resource, config)
    })
  },
  post (type, config = {}) {
    return createAction(`${type.toUpperCase()}_POST`, (resource, data, config = {}) => {
      return api.post(resource, data, config)
    })
  },
  patch (type, config = {}) {
    return createAction(`${type.toUpperCase()}_PATCH`, (resource, data, config = {}) => {
      return api.patch(resource, data, config)
    })
  },
  destroy (type) {
    return createAction(`${type.toUpperCase()}_DESTROY`, (resource, config = {}) => {
      return api.delete(resource, config)
    })
  },
  clear (type) {
    return createAction(`${type.toUpperCase()}_CLEAR_FULFILLED`)
  }
}

export const reducer = {
  async: (state = {}, action) => {
    const { type } = action
    const reg = new RegExp(`(.*?)_(GET|LIST|CLEAR|PATCH|POST|DESTROY)_(PENDING|REJECTED|FULFILLED)$`)
    if (reg.test(type)) {
      const match = type.match(reg)
      const name = match[1].toLowerCase()
      if (['CLEAR', 'DESTROY'].includes(match[2]) && match[3] === 'FULFILLED') {
        let newState = { ...state }
        delete newState[name]
        return newState
      } else {
        let response = {
          status: match[3].toLowerCase(),
          response: action.payload && (action.payload.data || action.payload)
        }
        if (action.payload &&
          action.payload.headers &&
          action.payload.headers['content-range']) {
          response.range = contentRange.parse(action.payload.headers['content-range'])
        }
        return {...state, [name]: response}
      }
    }
    return state
  }
}
