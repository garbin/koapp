import { handleActions } from 'redux-actions'
export const reducer = {
  items: handleActions({
    TABLE_GET_FULFILLED (state, action) {
      return action.payload.data
    }
  }, [])
}
