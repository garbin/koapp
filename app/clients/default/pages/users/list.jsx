import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { withProps } from 'recompose'
import { compose, graphql, gql } from 'react-apollo'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import { FormattedMessage, injectIntl } from 'react-intl'
import List from '../../components/resource/list'
import { withChecklist, withLoading } from '../../components/utils'
import { UserInfo } from '../../graphql/fragments'

export class UserList extends List {
  get name () { return 'users' }
  get title () { return <FormattedMessage id='user.list_title' /> }
  get description () { return <FormattedMessage id='user.list_brief' /> }
  get columns () {
    return [
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
  }
}

export default compose(
  connect(),
  withProps({ limit: 10 }),
  withRouter,
  injectIntl,
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
  withLoading(),
  withChecklist(props => {
    return get(props, 'data.users.edges', []).reduce((result, edge) => {
      result[edge.node.id] = false
      return result
    }, {})
  })
)(UserList)
