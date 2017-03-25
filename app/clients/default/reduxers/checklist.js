import { createAction, handleActions } from 'redux-actions'

export const actions = {
  init: createAction('CHECK_INIT'),
  all: createAction('CHECK_ALL'),
  one: createAction('CHECK_ITEM', (id, checked) => ({id, checked})),
  clear: createAction('CHECK_CLEAR')
}

export const reducer = {
  checklist: handleActions({
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
}
