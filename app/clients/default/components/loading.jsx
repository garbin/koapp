import React from 'react'
import Loading from 'react-loading'
import style from '../styles'

export default props => {
  const { resource = {}, children, loadingProps = {} } = props
  const { status, response } = resource
  return status === 'pending'
    ? <Loading delay={0} type='cylon' color={style.primaryColor} {...loadingProps} />
  : (children ? children(response) : '')
}
