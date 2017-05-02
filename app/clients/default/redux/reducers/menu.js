import React from 'react'
import TreeModel from 'tree-model'
import { FormattedMessage } from 'react-intl'
import { handleActions } from 'redux-actions'

export default handleActions({
  MENU_CHANGE: (state, action) => {
    const tree = new TreeModel()
    const menu = tree.parse({children: state})
    const current = menu.first(node => node.model.id === action.payload.id)
    const opens = menu.all(item => item.model.children && item.model.open && item.model.id !== action.payload.id)
    opens.forEach(item => {
      item.model.open = false
    })
    if (current.hasChildren()) {
      current.model.open = !current.model.open
    } else {
      const actives = menu.all(node => node.model.active)
      actives.forEach(node => {
        node.model.active = false
        node.model.open = false
      })
      current.model.active = true
      current.getPath().forEach(parent => {
        parent.model.open = true
      })
    }
    return [...menu.model.children]
  }
}, [
  { id: 'dashboard', icon: 'fa fa-home', label: <FormattedMessage id='menu.dashboard' />, href: '/' },
  { id: 'files', icon: 'fa fa-files-o', label: <FormattedMessage id='menu.files' />, href: '/files' },
  { id: 'users',
    icon: 'fa fa-users',
    label: <FormattedMessage id='menu.users' />,
    children: [
      { id: 'user_list', label: <FormattedMessage id='menu.user_list' />, href: '/users' },
      { id: 'role_list', label: <FormattedMessage id='menu.role_list' />, href: '/roles' }
    ]
  },
  { id: 'system',
    icon: 'fa fa-gear',
    label: <FormattedMessage id='menu.system' />,
    children: [
      { id: 'settings_general', label: <FormattedMessage id='menu.settings_general' />, href: '/settings/general' }
    ]
  }
])
