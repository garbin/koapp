import React from 'react'
import { Provider, Header, Body } from 'reactabular-table'
import { components as defaultComponents } from './presets/responsive'
import { merge } from 'lodash'

export function column (property, label, definition) {
  const base = {property, header: { label }}
  return merge(base, definition)
}

export default class extends React.Component {
  render () {
    const {
      loading,
      error,
      rows = [],
      columns,
      components = defaultComponents,
      rowKey,
      ...others } = this.props
    return (
      <Provider columns={columns} components={components} {...others}>
        <Header />
        {(loading || error)
          ? <Body error={error} loading={loading} rows={[]} />
          : <Body rows={rows} empty={rows.length === 0} rowKey={rowKey || 'id'} />}
      </Provider>
    )
  }
}
