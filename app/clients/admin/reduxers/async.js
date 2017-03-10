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
    const status = (loading, loaded, error = null) => ({loading, loaded, error})
    const reg = suffix => new RegExp(`(.*?)(_GET)_${suffix}`)
    if (reg('PENDING').test(type)) {
      return {...state, [type.match(reg('PENDING'))[1].toLowerCase()]: status(true, false)}
    }
    if (reg('REJECTED').test(type)) {
      return {...state, [type.match(reg('REJECTED'))[1].toLowerCase()]: status(false, false, action.payload.data || action.payload.toString())}
    }
    if (reg('FULFILLED').test(type)) {
      return {...state, [type.match(reg('FULFILLED'))[1].toLowerCase()]: status(false, true, null)}
    }
    return state
  }
}
