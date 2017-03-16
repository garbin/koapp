import React from 'react'
import { Link } from 'react-router-dom'
import list from '../../components/resource/list'
import { FormattedMessage } from 'react-intl'

export default list({
  perPage: 10,
  resource: 'user',
  listTitle: '用户列表',
  listBrief: '用户资源管理',
  columns: [
    { preset: 'checkbox' },
    { preset: 'image',
      property: 'avatar',
      label: '头像',
      href: props => <Link to={`/users/${props.row.id}/edit`}>{props.children}</Link> },
    { preset: 'link',
      property: 'username',
      label: <FormattedMessage id='user.name' />,
      href: props => <Link to={`/users/${props.row.id}/edit`}>{props.children}</Link> },
    { preset: 'text',
      property: 'email',
      label: 'EMail' },
    { preset: 'text',
      property: 'created_at',
      label: '注册时间' },
    { preset: 'actions' }
  ]
})
