import React from 'react'
import Loading from 'react-loading'

export default props => {
  const { resource = {}, children, loadingProps = {} } = props
  const { status, response } = resource
  return status === 'pending'
    ? <Loading delay={0} type='cylon' color='#000' {...loadingProps} />
  : (children ? children(response) : '')
}
