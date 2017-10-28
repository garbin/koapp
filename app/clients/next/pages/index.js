import React from 'react'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { get } from 'lodash'
import gql from 'graphql-tag'
import provider from '../redux'
import Link from 'next/link'
import page from '../components/page'

export class Index extends React.Component {
  render () {
    const name = get(this.props, 'data.hello.name')
    const { t } = this.props
    return (
      <div>
        <div> Next App </div>
        <div>{t('username')}: {name}</div>
        <p>
          <Link href='/about'><a>About</a></Link>
        </p>
      </div>
    )
  }
}

export default compose(
  provider(),
  graphql(gql`
    query {
      hello {
        name
      }
    }
  `),
  page(props => ({
    title: 'Welcome to our Store'
  }))
)(Index)
