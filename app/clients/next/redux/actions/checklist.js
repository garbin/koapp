import { createAction } from 'redux-actions'

export default {
  init: createAction('CHECK_INIT'),
  all: createAction('CHECK_ALL'),
  one: createAction('CHECK_ITEM', (id, checked) => ({id, checked})),
  clear: createAction('CHECK_CLEAR')
}
