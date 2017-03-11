import React from 'react'
import { Provider, Header, Body } from 'reactabular-table'
import _ from 'lodash'

export function column (property, label, definition) {
  const base = {property, header: { label }}
  return _.merge(base, definition)
}

export default class extends React.Component {
  render () {
    const { data, columns, components, rowKey, ...others } = this.props
    const { loading, error, data: rows } = data || {}
    return (
      <Provider columns={columns} components={components} {...others}>
        <Header />
        {(loading || error) ? <Body error={error} loading={loading} rows={[]} /> : <Body rows={rows || []} rowKey={rowKey || 'id'} />}
      </Provider>
    )
  }
}