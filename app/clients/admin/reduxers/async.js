import { createAction } from 'redux-actions'
import { api } from '../lib/helper'

export const actions = {
  get (type) {
    return createAction(`${type.toUpperCase()}_GET`, (resource) => api.get(resource))
  }
}

export const reducer = {
  async: (state = {}, action) => {
    const { type } = action
    const reg = new RegExp(`(.*?)(_GET)_(PENDING|REJECTED|FULFILLED)$`)
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
