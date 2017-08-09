import React from 'react'
import Paginate from 'react-paginate'
import { translate } from 'react-i18next'

export default translate(['common'])(class Pagination extends React.Component {
  render () {
    const { t } = this.props
    return (
      <Paginate containerClassName='pagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        activeClassName='active'
        previousLabel={t('prev_page')}
        previousClassName='page-item'
        previousLinkClassName='page-link'
        breakClassName='page-item'
        breakLabel={<a className='page-link'>...</a>}
        nextLabel={t('next_page')}
        nextClassName='page-item'
        disableInitialCallback
        nextLinkClassName='page-link' {...this.props} />
    )
  }
})
