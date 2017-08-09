import React from 'react'
import { compose } from 'recompose'
import provider from '../redux'
import Link from 'next/link'
import page from '../components/page'

export class Index extends React.Component {
  render () {
    return (
      <div>
        <div> Next App </div>
        <p>
          <Link href='/about'><a>About</a></Link>
        </p>
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
