import React from 'react'
import { isFunction } from 'lodash'
import { compose, withState, withHandlers, branch } from 'recompose'
import Loadable from 'react-loading-overlay'
import numeral from 'numeral'

export const Formatters = {
  Price (props) {
    const { className = 'price', children, format = '$0,0.00', ...others } = props
    return (
      <span className={className} {...others}>{numeral(children).format(format)}</span>
    )
  }
}

export function renderLoading (newProps, loadingProps) {
  loadingProps = Object.assign({
    active: true,
    spinner: true,
    text: 'Loading...'
  }, loadingProps)
  const withProps = isFunction(newProps) ? newProps : (props) => newProps
  return Component => props => (
    <Loadable {...loadingProps}>
      <Component {...props} {...withProps(props)} />
    </Loadable>
  )
}

export function withLoading (right, options) {
  const { props, loading } = options || {}
  return branch(
    props => props.data.loading,
    renderLoading(props, loading),
    right
  )
}

export function withChecklist (initialState = {}) {
  return compose(
    withState('checkedItems', 'setCheckedItems', initialState),
    withHandlers({
      toggleAll: ({ setCheckedItems }) => status => setCheckedItems(checkedItems => {
        return Object.entries(checkedItems).reduce((result, [k, v]) => {
          result[k] = status
          return result
        }, {})
      }),
      checkItem: ({ setCheckedItems }) =>
        (id, status) =>
          setCheckedItems(checkedItems => ({...checkedItems, [id]: status}))
    })
  )
}
