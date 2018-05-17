import React from 'react'
import { compose } from 'recompose'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import provider from '../redux'
import Link from 'next/link'
import page from '../components/page'

const query = gql`
  query {
    hello {
      name
    }
  }
`

export class Index extends React.Component {
  render () {
    const { t } = this.props
    return (
      <Query query={query}>
        {({ loading, data }) =>
          (loading
            ? <span>loading...</span>
            : <div>
              <div> Next App </div>
              <div>{t('username')}: {data.hello.name}</div>
              <p>
                <Link prefetch href='/about'><a>About</a></Link>
              </p>
            </div>)}
      </Query>
    )
  }
}

export default compose(
  provider(),
  page(props => ({
    title: 'Welcome to our Store'
  }))
)(Index)
