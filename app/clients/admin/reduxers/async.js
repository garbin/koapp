import { createAction } from 'redux-actions'
import { api } from '../lib/helper'

export const actions = {
  list (type, config = {perPage: 20}) {
    return createAction(`${type.toUpperCase()}_LIST`, (resource, query, headers) => {
      const { perPage } = config
      const queryHeaders = {}
      let { page, ...others } = query || {}
      page = page || 1
      const offsetStart = perPage * (page - 1)
      const offsetEnd = perPage * page
      queryHeaders['Range'] = `items=${offsetStart}-${offsetEnd}`
      return api.get(resource, {
        params: others,
        headers: Object.assign({}, queryHeaders, headers)
      })
    })
  }
}

export const reducer = {
  async: (state = {}, action) => {
    const { type } = action
    const reg = new RegExp(`(.*?)_(GET|LIST)_(PENDING|REJECTED|FULFILLED)$`)
    if (reg.test(type)) {
      const match = type.match(reg)
      const name = match[1].toLowerCase()
      return {...state,
        [name]: {
          status: match[3].toLowerCase(),
          response: action.payload && (action.payload.data || action.payload)
        }}
    }
    return state
  }
}
