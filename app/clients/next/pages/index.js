import React from 'react'
import { compose } from 'recompose'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import provider from '../redux'
import Link from 'next/link'
import page from '../components/page'
import Header from '../components/header'

const query = gql`
  query {
    hello {
      name
    }
  }
`

export class Index extends React.Component {
  render () {
    return (
      <div>
        <Header />
      </div>
    )
  }
}

export default compose(
  provider(),
  page(props => ({
    title: 'Welcome to our Store'
  }))
)(Index)
