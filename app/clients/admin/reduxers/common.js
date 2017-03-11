import { createAction, handleActions } from 'redux-actions'
import TreeModel from 'tree-model'

export const actions = {
  changeMenu: createAction('MENU_CHANGE'),
  openModal: createAction('MODAL_OPEN'),
  hideModal: createAction('MODAL_HIDE'),
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
    { id: 'list',
      icon: 'fa fa-th-large',
      label: '资源管理',
      children: [
      { id: 'list_table', label: '列表', href: '/resources' },
      { id: 'list_form', label: '表单', href: '/resources/create' } ] },
    { id: 'setting',
      icon: 'fa fa-gear',
      label: '设置',
      children: [
      { id: 'setting_gear', label: '设置', href: '/settings' },
      { id: 'setting_form', label: '表单', href: '/setting_form' } ] }
  ])
}
