import { createAction } from 'redux-actions'

export default {
  set (name) {
    return createAction('UPDATE_RESULT', payload => ({name, result: payload}))
  },
  clear (name) {
    return createAction('CLEAR_RESULT', payload => ({name}))
  }
}
