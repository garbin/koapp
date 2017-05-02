import { handleActions } from 'redux-actions'
export default handleActions({
  UPDATE_RESULT (state, action) {
    const {name, result} = action.payload
    return {...state, [name]: result}
  },
  CLEAR_RESULT (state, action) {
    const newState = {...state}
    delete newState[action.payload.name]
    return newState
  }
}, {})
