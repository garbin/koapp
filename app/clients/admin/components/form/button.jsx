import React from 'react'
import { Button } from 'reactstrap'

export default props => {
  const { loading, loadingText, children, ...others } = props
  return (
    <Button disabled={loading || false} {...others}>
      {loading ? (loadingText || 'Hold on...') : children}
    </Button>
  )
}
