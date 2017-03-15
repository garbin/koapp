import React from 'react'
import { Link } from 'react-router-dom'
import list from '../../components/resource/list'
import { FormattedMessage } from 'react-intl'

export default list({
  perPage: 10,
  resource: 'role',
  listTitle: <FormattedMessage id='list_title_roles' />,
  listBrief: <FormattedMessage id='list_brief_roles' />,
  columns: [
    { preset: 'checkbox' },
    { preset: 'link',
      property: 'name',
      label: <FormattedMessage id='name' />,
      href: props => <Link to={`/roles/${props.row.id}/edit`}>{props.children}</Link> },
    { preset: 'text',
      property: 'desc',
      label: <FormattedMessage id='desc' /> },
    { preset: 'text',
      property: 'permissions',
      label: <FormattedMessage id='permissions' /> },
    { preset: 'actions' }
  ]
})
