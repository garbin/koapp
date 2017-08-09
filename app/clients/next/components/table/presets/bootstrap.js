import React from 'react'
import { Table } from 'reactstrap'
import _ from 'lodash'
import moment from 'moment'
import Loading from 'react-loading'
import i18next from 'i18next'

export const formatters = {
  header (name) {
    return (<div><span>{name}</span></div>)
  },
  text (value, extra) {
    return <div>{value}</div>
  },
  time (value, extra) {
    return moment(value).fromNow()
  },
  link (value, extra) {
    return (
      <div>
        {extra.column.cell.href({
          row: extra.rowData,
          children: <h4 className='item-title'> {value} </h4>
        })}
      </div>
    )
  },
  checkbox (type = 'item') {
    if (type === 'header') {
      return (value, extra) => (
        <input type='checkbox'
          onChange={extra.column.onCheckAll}
          className='checkbox' />
      )
    } else {
      return (value, extra) => (
        <input type='checkbox'
          value={value}
          onChange={extra.column.onCheckItem.bind(null, value)}
          checked={extra.column.checklist[value] || false}
          className='checkbox' />
      )
    }
  },
  image (value, extra) {
    if (extra.column.cell.href) {
      return (extra.column.cell.href({
        row: extra.rowData,
        children: <img className='img-thumbnail' src={value} />
      }))
    } else {
      return (<img className='img-thumbnail' src={value} />)
    }
  }
}

export const components = {
  table: props => <Table {...props} />,
  body: {
    wrapper: props => {
      const {children, loading, empty, error, ...others} = props
      return (
        <tbody {...others}>
          {(loading || error || empty) ? (
            <tr>
              <td colSpan={100} style={{textAlign: 'center'}}>
                {loading && <Loading className='loading-indicator' delay={0} type='cylon' />}
                {error && error.toString()}
                {empty && i18next.t('empty')}
              </td>
            </tr>
          ) : children}
        </tbody>
      )
    }
  }
}

export const presets = {
  checkbox: {
    property: 'id',
    header: {
      label: 'ID',
      formatters: [ formatters.checkbox('header') ]
    },
    cell: { formatters: [ formatters.checkbox('item') ] }
  },
  text: {
    header: { formatters: [ formatters.header ] },
    cell: { formatters: [ formatters.text ] }
  },
  time: {
    header: { formatters: [ formatters.header ] },
    cell: { formatters: [ formatters.time, formatters.text ] }
  },
  link: {
    header: { formatters: [ formatters.header ] },
    cell: {
      formatters: [
        formatters.link,
        formatters.text
      ]
    }
  },
  image: {
    header: {
      formatters: [ formatters.header ]
    },
    cell: {
      formatters: [ formatters.image ]
    }
  }
}

function merge (base, definition, override = false) {
  if (override) return {...base, ...definition}
  return _.mergeWith({}, base, definition, (obj, src) => {
    if (_.isArray(obj)) return src.concat(obj)
  })
}

function preset (type) {
  return (definition, override = false) => {
    return merge(presets[type], definition, override)
  }
}

export default Object.entries(presets).reduce((result, [type]) => ({...result, [type]: preset(type)}), {})
