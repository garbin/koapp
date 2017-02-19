import React from 'react'

export function loadable (Component) {
  return props => {
    const { loading, loadingSpinner, children, ...rest } = props
    const spinner = loadingSpinner || 'loading...'

    return (<Component {...rest}>{loading ? spinner : children}</Component>)
  }
}
