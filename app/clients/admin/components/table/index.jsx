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
    const { status, response } = data || {}
    return (
      <Provider columns={columns} components={components} {...others}>
        <Header />
        {(['pending', 'rejected'].includes(status))
          ? <Body error={response} loading rows={[]} />
          : <Body rows={response || []} rowKey={rowKey || 'id'} />}
      </Provider>
    )
  }
}
