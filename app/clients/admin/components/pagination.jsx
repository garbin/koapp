import React from 'react'
import Paginate from 'react-paginate'
import { FormattedMessage } from 'react-intl'

export default class Pagination extends React.Component {
  render () {
    return (
      <Paginate containerClassName='pagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        activeClassName='active'
        previousLabel={<FormattedMessage id='prev_page' />}
        previousClassName='page-item'
        previousLinkClassName='page-link'
        breakClassName='page-item'
        breakLabel={<a className='page-link'>...</a>}
        nextLabel={<FormattedMessage id='next_page' />}
        nextClassName='page-item'
        disableInitialCallback
        nextLinkClassName='page-link' {...this.props} />
    )
  }
}
