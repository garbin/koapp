import { api } from '../../lib/helper'
import { createAction } from 'redux-actions'

export default {
  get (type, config = {}) {
    return createAction(`API_GET_${type.toUpperCase()}`, (resource, config = {}) => {
      return api.get(resource, config)
    })
  },
  list (type, config = {perPage: 10}) {
    return createAction(`API_LIST_${type.toUpperCase()}`, (resource, requestConfig = {}) => {
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
  post (type, config = {}) {
    return createAction(`API_POST_${type.toUpperCase()}`, (resource, data, config = {}) => {
      return api.post(resource, data, config)
    })
  },
  patch (type, config = {}) {
    return createAction(`API_PATCH_${type.toUpperCase()}`, (resource, data, config = {}) => {
      return api.patch(resource, data, config)
    })
  },
  destroy (type) {
    return createAction(`API_DESTROY_${type.toUpperCase()}`, (resource, config = {}) => {
      return api.delete(resource, config)
    })
  },
  clear (type) {
    return createAction(`API_CLEAR_${type.toUpperCase()}_FULFILLED`)
  }
}
