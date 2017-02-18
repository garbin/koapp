import { createAction, handleActions } from 'redux-actions'

export const actions = {
  sidebarToggle: createAction('SIDEBAR_TOGGLE', e => e)
}

export const reducer = {
  sidebar_open: handleActions({
    SIDEBAR_TOGGLE: (state, action) => {
      console.log(action)
      if (state === false) {
        return true
      }
      return false
    }
  }, false)
}
