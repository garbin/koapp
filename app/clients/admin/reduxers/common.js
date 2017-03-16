import React from 'react'
import { createAction, handleActions } from 'redux-actions'
import TreeModel from 'tree-model'
import { FormattedMessage } from 'react-intl'

export const actions = {
  changeMenu: createAction('MENU_CHANGE'),
  openModal: createAction('MODAL_OPEN'),
  hideModal: createAction('MODAL_HIDE')
}

export const reducer = {
  modal: handleActions({
    MODAL_OPEN (state, action) {
      const { title, content, buttons } = action.payload
      return {open: true, title, content, buttons}
    },
    MODAL_HIDE (state, action) {
      return {open: false, title: '', content: '', buttons: []}
    }
  }, {
    open: false,
    title: '',
    content: '',
    buttons: []
  }),
  menu: handleActions({
    MENU_CHANGE: (state, action) => {
      let tree = new TreeModel()
      let menu = tree.parse({children: state})
      let current = menu.first(node => node.model.id === action.payload.id)
      let opens = menu.all(item => item.model.children && item.model.open && item.model.id !== action.payload.id)
      opens.forEach(item => {
        item.model.open = false
      })
      if (current.hasChildren()) {
        current.model.open = !current.model.open
      } else {
        let actives = menu.all(node => node.model.active)
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
    { id: 'files', icon: 'fa fa-file', label: <FormattedMessage id='menu.files' />, href: '/files' },
    { id: 'users',
      icon: 'fa fa-users',
      label: <FormattedMessage id='menu.users' />,
      children: [
      { id: 'user_list', label: <FormattedMessage id='menu.user_list' />, href: '/users' },
      { id: 'role_list', label: <FormattedMessage id='menu.role_list' />, href: '/roles' } ] },
    { id: 'system',
      icon: 'fa fa-gear',
      label: <FormattedMessage id='menu.system' />,
      children: [
        { id: 'settings_global', label: <FormattedMessage id='menu.settings_global' />, href: '/settings/global' }
      ]}
  ])
}
