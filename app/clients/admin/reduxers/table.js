import { createAction, handleActions } from 'redux-actions'
import * as select from 'selectabular'

export const actions = {
  checkAll: createAction('TABLE_CHECK_ALL'),
  checkItem: createAction('TABLE_CHECK_ITEM', (item, checked) => ({item, checked}))
}

export const reducer = {
  items: handleActions({
    TABLE_CHECK_ALL: (state, action) => {
      return action.payload ? [...select.all(state)] : [...select.none(state)]
    },
    TABLE_CHECK_ITEM: (state, action) => {
      return state
    }
  }, [
    {
      id: 1,
      media: 'https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg',
      name: '12 Myths Uncovered About IT & Software',
      sales: '46323',
      stats: '',
      category: 'Software',
      author: 'Meadow Katheryne',
      created_at: '120129'
    },
    {
      id: 2,
      media: 'https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg',
      name: '12 Myths Uncovered About IT & Software',
      sales: '46323',
      stats: '',
      category: 'Software',
      author: 'Meadow Katheryne',
      created_at: '120129'
    },
    {
      id: 3,
      media: 'https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg',
      name: '12 Myths Uncovered About IT & Software',
      sales: '46323',
      stats: '',
      category: 'Software',
      author: 'Meadow Katheryne',
      created_at: '120129'
    }
  ])
}
