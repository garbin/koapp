import { createAction, handleActions } from 'redux-actions'
import { api } from '../lib/helper'
import TreeModel from 'tree-model'

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
    { id: 'dashboard', icon: 'fa fa-home', label: 'Dashboard', href: '/' },
    { id: 'system',
      icon: 'fa fa-gear',
      label: '系统管理',
      children: [
      { id: 'system_users', label: '用户管理', href: '/users' },
      { id: 'system_roles', label: '角色管理', href: '/roles' } ] }
  ])
}
