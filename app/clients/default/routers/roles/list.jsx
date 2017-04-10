import React from 'react'
import { Link } from 'react-router-dom'
import list from '../../components/resource/list'
import { FormattedMessage } from 'react-intl'
import { toastr } from 'react-redux-toastr'
import { Button,
         DropdownMenu,
         DropdownItem } from 'reactstrap'

export default list({
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
    { preset: 'actions',
      primary: function (value, extra) {
        return (
          <Button color='primary'
            onClick={e => this.gotoEdit(value)}
            disabled={extra.rowData.permissions === true}
            size='sm'>
            <span><i className='fa fa-pencil-square-o' /> 编辑 </span>
          </Button>
        )
      },
      dropdown: function (item) {
        return (
          <DropdownMenu>
            <DropdownItem disabled={item.id === 1} onClick={e => toastr.confirm('确定删除吗', {
              onOk: e => this.handleDestroy({[item.id]: true}),
              onCancel: e => console.log('cancel')
            })}>删除</DropdownItem>
          </DropdownMenu>
        )
      }
    }
  ]
})
