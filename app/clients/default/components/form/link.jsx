import React from 'react'
import { toastr } from 'react-redux-toastr'

export const ConfirmLink = props => {
  const { confirm, onOk, onCancel, children, ...others } = props
  return (
    <a href='javascript:;' {...others} onClick={e => toastr.confirm(confirm, {
      onOk, onCancel
    })}>
      {children}
    </a>
  )
}
