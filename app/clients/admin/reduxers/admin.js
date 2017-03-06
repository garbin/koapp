import { createAction, handleActions } from 'redux-actions'
import TreeModel from 'tree-model'

export const actions = {
  changeMenu: createAction('MENU_CHANGE')
}

export const reducer = {
  menu: handleActions({
    MENU_CHANGE: (state, action) => {
      let tree = new TreeModel()
      let menu = tree.parse({children: state})
      let current = menu.first(node => node.model.id === action.payload.id)
      if (current.hasChildren()) {
        let opens = menu.all(item => item.model.open && item.model.id !== action.payload.id)
        opens.forEach(item => {
          item.model.open = false
        })
        current.model.open = !current.model.open
      } else {
        let actives = menu.all(node => node.model.active)
        actives.forEach(node => {
          node.model.active = false
          node.model.open = false
        })
        current.model.active = true
      }
      return [...menu.model.children]
    }
  }, [
    { id: 'dashboard', icon: 'fa fa-home', label: 'Dashboard', href: '/' },
    { id: 'list',
      icon: 'fa fa-th-large',
      label: '资源管理',
      children: [
      { id: 'list_table', label: '列表', href: '/list' },
      { id: 'list_form', label: '表单', href: '/form' } ] },
    { id: 'setting',
      icon: 'fa fa-gear',
      label: '设置',
      children: [
      { id: 'setting_gear', label: '设置', href: '/settings' },
      { id: 'setting_form', label: '表单', href: '/setting_form' } ] }
  ])
}
