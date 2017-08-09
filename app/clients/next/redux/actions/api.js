import axios from 'axios'
import config from '../../config'
import cookies from 'js-cookie'
import { createAction } from 'redux-actions'

export const api = createClient(arg => cookies.get('access_token'))

export function createClient (token = f => f) {
  const client = axios.create({ baseURL: config.api, timeout: 10000 })
  client.interceptors.request.use(config => {
    if (token()) config.headers.Authorization = `Bearer ${token()}`
    return config
  }, Promise.reject)
  return client
}

export default {
  get (type, options = {}) {
    options = Object.assign({client: api}, options)
    return createAction(`API_GET_${type.toUpperCase()}`, (resource, config = {}) => {
      return options.client.get(resource, config)
    })
  },
  list (type, options = {client: api, perPage: 10}) {
    options = Object.assign({client: api}, options)
    return createAction(`API_LIST_${type.toUpperCase()}`, (resource, requestConfig = {}) => {
      const { headers, params, ...otherConfig } = requestConfig
      const { perPage } = options
      const queryHeaders = {}
      let { page, ...others } = params || {}
      page = page || 1
      const offsetStart = perPage * (page - 1)
      const offsetEnd = offsetStart + perPage - 1
      queryHeaders['Range'] = `items=${offsetStart}-${offsetEnd}`
      return options.client.get(resource, {
        ...otherConfig,
        params: others,
        headers: Object.assign({}, queryHeaders, headers)
      })
    })
  },
  post (type, options = {client: api}) {
    options = Object.assign({client: api}, options)
    return createAction(`API_POST_${type.toUpperCase()}`, (resource, data, config = {}) => {
      return options.client.post(resource, data, config)
    })
  },
  patch (type, options = {client: api}) {
    options = Object.assign({client: api}, options)
    return createAction(`API_PATCH_${type.toUpperCase()}`, (resource, data, config = {}) => {
      return options.client.patch(resource, data, config)
    })
  },
  destroy (type, options = {client: api}) {
    options = Object.assign({client: api}, options)
    return createAction(`API_DESTROY_${type.toUpperCase()}`, (resource, config = {}) => {
      return options.client.delete(resource, config)
    })
  },
  clear (type) {
    return createAction(`API_CLEAR_${type.toUpperCase()}_FULFILLED`)
  }
}
