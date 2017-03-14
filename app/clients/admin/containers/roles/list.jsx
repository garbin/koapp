import React from 'react'
import { Link } from 'react-router-dom'
import list from '../../components/resource/list'

export default list({
  perPage: 10,
  resource: 'role',
  listTitle: '角色列表',
  listBrief: '角色资源管理',
  columns: [
    { preset: 'checkbox' },
    { preset: 'link',
      property: 'name',
      label: '名称',
      href: props => <Link to={`/roles/${props.row.id}/edit`}>{props.children}</Link> },
    { preset: 'text',
      property: 'desc',
      label: '描述' },
    { preset: 'text',
      property: 'permissions',
      label: '权限' },
    { preset: 'actions' }
  ]
})
