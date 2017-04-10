import React from 'react'
import { Link } from 'react-router-dom'
import list from '../../components/resource/list'
import { FormattedMessage } from 'react-intl'

export default list({
  perPage: 10,
  resource: 'user',
  listTitle: <FormattedMessage id='user.list_title' />,
  listBrief: <FormattedMessage id='user.list_brief' />,
  columns: [
    { preset: 'checkbox' },
    { preset: 'image',
      property: 'avatar',
      label: <FormattedMessage id='user.avatar' />,
      href: props => <Link to={`/users/${props.row.id}/edit`}>{props.children}</Link> },
    { preset: 'link',
      property: 'username',
      label: <FormattedMessage id='user.name' />,
      className: 'item-col-title item-col-3',
      href: props => <Link to={`/users/${props.row.id}/edit`}>{props.children}</Link> },
    { preset: 'text',
      property: 'email',
      className: 'item-col-3 text-xs-left',
      label: 'EMail' },
    { preset: 'time',
      property: 'created_at',
      className: 'item-col-date item-col-2',
      label: <FormattedMessage id='user.created_at' /> },
    { preset: 'actions' }
  ]
})
