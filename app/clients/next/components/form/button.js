import React from 'react'
import { Button } from 'reactstrap'

export default props => {
  const { loading, loadingText, children, ...others } = props
  return (
    <Button disabled={loading || false} {...others}>
      {loading
        ? <span><i className='fa fa-cog fa-spin fa-fw' />&nbsp;{loadingText || 'Loading...'}</span>
        : children}
    </Button>
  )
}
