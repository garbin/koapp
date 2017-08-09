import React from 'react'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { withProps } from 'recompose'
import { compose, graphql, gql } from 'react-apollo'
import { mutations } from 'react-apollo-compose'
import List, { list } from '../../components/resource/list'
import { withLoading } from '../../components/utils'
import { UserInfo } from '../../graphql/fragments'
import { removeUser } from '../../graphql/mutations'

export class UserList extends List { }

export default compose(
  withProps({ limit: 10 }),
  graphql(gql`
    query Users($limit: Int!, $offset: String, $keyword: String) {
      users: search(first: $limit, after: $offset, keyword: $keyword, type: USER) {
        total
        edges {
          node {
            ... on User {
              ...UserInfo
            }
          }
        }
      }
    }
    ${UserInfo}
  `, {
    options: props => ({
      variables: {
        limit: props.limit
      },
      fetchPolicy: 'cache-and-network'
    })
  }),
  mutations({ remove: removeUser }),
  withLoading(),
  list({
    props: {
      name: 'users',
      title: <FormattedMessage id='user.list_title' />,
      description: <FormattedMessage id='user.list_brief' />,
      resourceUrl: '/users',
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
    },
    checklist: props => get(props, 'data.users.edges', []).reduce((result, edge) => {
      result[edge.node.id] = false
      return result
    }, {})
  })
)(UserList)
