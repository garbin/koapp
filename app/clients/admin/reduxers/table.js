import { createAction, handleActions } from 'redux-actions'

export const actions = {
  fetch: createAction('TABLE_FETCH', p => [
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
  ]),
  checkAll: createAction('TABLE_CHECK_ALL'),
  checkItem: createAction('TABLE_CHECK_ITEM', (id, checked) => ({id, checked}))
}

export const reducer = {
  checkedItems: handleActions({
    TABLE_FETCH (state, action) {
      return action.payload.reduce((result, item) => {
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
    }
  }, {}),
  items: handleActions({
    TABLE_FETCH (state, action) {
      return action.payload
    }
  }, [])
}
