import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { toastr } from 'react-redux-toastr'
import { Button,
  DropdownMenu,
  DropdownItem } from 'reactstrap'
import { withProps } from 'recompose'
import { compose, graphql } from 'react-apollo'
import { mutations } from 'react-apollo-compose'
import { get } from 'lodash'
import List, { list } from '../../components/resource/list'
import { withLoading } from '../../components/utils'
import { RoleInfo } from '../../graphql/fragments'
import { removeRole } from '../../graphql/mutations'
import gql from 'graphql-tag'

export class RoleList extends List {}

export default compose(
  withProps({ limit: 10 }),
  graphql(gql`
    query Roles($limit: Int!, $offset: String, $keyword: String) {
      roles: search(first: $limit, after: $offset, keyword: $keyword, type: ROLE) {
        total
        edges {
          node {
            ... on Role {
              ...RoleInfo
            }
          }
        }
      }
    }
    ${RoleInfo}
  `, {
    options: props => ({
      variables: {
        limit: props.limit
      },
      fetchPolicy: 'cache-and-network'
    })
  }),
  mutations({ remove: removeRole }),
  withLoading(),
  list({
    props: {
      name: 'roles',
      title: <FormattedMessage id='list_title_roles' />,
      description: <FormattedMessage id='list_brief_roles' />,
      resourceUrl: '/roles',
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
    },
    checklist: props => get(props, 'data.roles.edges', []).reduce((result, edge) => {
      result[edge.node.id] = false
      return result
    }, {})
  })
)(RoleList)
