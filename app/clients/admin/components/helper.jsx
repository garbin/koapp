import React from 'react'

export function loading (Component) {
  return props => {
    const { loading, text, children, ...others } = props
    return <Component disabled={loading || false} {...others}>{loading ? text : children}</Component>
  }
}
