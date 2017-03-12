import React from 'react'
import Paginate from 'react-paginate'

export default class Pagination extends React.Component {
  render () {
    return (
      <Paginate containerClassName='pagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        activeClassName='active'
        previousLabel='上一页'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        breakClassName='page-item'
        breakLabel={<a className='page-link'>...</a>}
        nextLabel='下一页'
        nextClassName='page-item'
        disableInitialCallback
        nextLinkClassName='page-link' {...this.props} />
    )
  }
}
