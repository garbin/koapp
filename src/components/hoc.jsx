import React from 'react'
import { connect } from 'react-redux'

export function loadable(Component) {
  return props => {
    let { loading, loadingSpinner, children, ...rest } = props;
    loadingSpinner = loadingSpinner || 'loading...';

    return (<Component {...rest}>{loading ? loadingSpinner : children}</Component>)
  }
}
