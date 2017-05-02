import { handleActions } from 'redux-actions'
export default handleActions({
  TOGGLE_MODAL (state, action) {
    if (action.payload !== undefined) {
      return action.payload
    }
    return state
  }
}, false)
