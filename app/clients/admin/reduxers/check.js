import { createAction, handleActions } from 'redux-actions'

export const actions = {
  all: createAction('TABLE_CHECK_ALL'),
  one: createAction('TABLE_CHECK_ITEM', (id, checked) => ({id, checked})),
  clear: createAction('TABLE_CHECK_CLEAR')
}

export const reducer = {
  check: handleActions({
    TABLE_GET_FULFILLED (state, action) {
      return action.payload.data.reduce((result, item) => {
        result[item.id] = false
        return result
      }, {})
    },
    TABLE_CHECK_ALL (state, action) {
      return Object.entries(state).reduce((result, [id]) => {
        result[id] = action.payload
        return result
      }, {})
    },
    TABLE_CHECK_ITEM (state, action) {
      const {id, checked} = action.payload
      return {...state, [id]: checked}
    },
    TABLE_CHECK_CLEAR (state, action) {
      return {}
    }
  }, {})
}
