import React from 'react'
import { compose } from 'recompose'
import page from '../components/page'
import Link from 'next/link'
import provider from '../redux'

export default compose(provider(), page({title: 'About'}))(props => (
  <div>
    <div> Next App </div>
    <p>
      <Link href='/'><a>Index</a></Link>
    </p>
  </div>
))
