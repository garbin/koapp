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
      href: props => <Link to={`/users/${props.row.id}/edit`}>{props.children}</Link> },
    { preset: 'text',
      property: 'email',
      label: 'EMail' },
    { preset: 'time',
      property: 'created_at',
      label: <FormattedMessage id='user.created_at' /> },
    { preset: 'actions' }
  ]
})
