import React from 'react'
import Loading from 'react-loading'
import style from '../../styles'

export default ({loading, children}) => (
  loading ? <Loading delay={0} type='cylon' color={style.primaryColor} /> : children
)
