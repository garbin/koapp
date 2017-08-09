import { handleActions } from 'redux-actions'
export default handleActions({
  CHECK_INIT (state, action) {
    return action.payload.reduce((result, item) => {
      result[item.id] = false
      return result
    }, {})
  },
  CHECK_ALL (state, action) {
    return Object.entries(state).reduce((result, [id]) => {
      result[id] = action.payload
      return result
    }, {})
  },
  CHECK_ITEM (state, action) {
    const {id, checked} = action.payload
    return {...state, [id]: checked}
  },
  CHECK_CLEAR (state, action) {
    return {}
  }
}, {})
