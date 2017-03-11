import { createAction } from 'redux-actions'
import { api } from '../lib/helper'

export const actions = {
  get (type) {
    return createAction(`${type.toUpperCase()}_GET`, resource => api.get(resource))
  }
}

export const reducer = {
  async: (state = {}, action) => {
    const { type } = action
    const status = (loading, loaded, error = null, data) => ({loading, loaded, error, data})
    const reg = new RegExp(`(.*?)(_GET)_(PENDING|REJECTED|FULFILLED)$`)
    if (reg.test(type)) {
      const match = type.match(reg)
      const name = match[1].toLowerCase()
      switch (match[3]) {
        case 'PENDING':
          return {...state, [name]: status(true, false)}
        case 'REJECTED':
          return {...state, [name]: status(false, false, action.payload.data || action.payload.toString())}
        case 'FULFILLED':
          return {...state, [name]: status(false, false, null, action.payload.data)}
      }
    }
    return state
  }
}
