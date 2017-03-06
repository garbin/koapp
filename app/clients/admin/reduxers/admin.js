import { createAction, handleActions } from 'redux-actions'
import TreeModel from 'tree-model'

const tree = new TreeModel()

export const actions = {
  changeMenu: createAction('MENU_CHANGE')
}

export const reducer = {
  menu: handleActions({
    MENU_CHANGE: (menu, action) => {
      let current = menu.first(node => node.model.id === action.payload.id)
      if (current.hasChildren()) {
        current.model.open = !current.model.open
      } else {
        let actives = menu.all(node => node.model.active)
        actives.forEach(node => {
          node.model.active = false
          node.model.open = false
        })
        current.model.active = true
      }
      return tree.parse(menu.model)
    }
  }, tree.parse({
    children: [
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
        ]
      }))
}
