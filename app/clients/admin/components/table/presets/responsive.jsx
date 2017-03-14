import React from 'react'
import classnames from 'classnames'
import { Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import _ from 'lodash'
import Loading from 'react-loading'

export const formatters = {
  header (name) {
    return (<div><span>{name}</span></div>)
  },
  text (value, extra) {
    return (<div><div className='item-heading'>{extra.column.header.label}</div>{value}</div>)
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
        <label className='item-check'>
          <Input type='checkbox'
            onChange={extra.column.onCheckAll}
            className='checkbox' />
          <span />
        </label>)
    } else {
      return (value, extra) => (
        <label className='item-check'>
          <input type='checkbox'
            value={value}
            onChange={extra.column.onCheckItem.bind(null, value)}
            checked={extra.column.checklist[value] || false}
            className='checkbox' />
          <span />
        </label>)
    }
  },
  image (value, extra) {
    if (extra.column.cell.href) {
      return (extra.column.cell.href({
        row: extra.rowData,
        children: <div className='item-img rounded' style={{backgroundImage: `url(${value})`}} />
      }))
    } else {
      return (<div className='item-img rounded' style={{backgroundImage: `url(${value})`}} />)
    }
  },
  actions (value, extra) {
    return (
      <div>
        <ButtonDropdown group toggle={e => e}>
          {extra.column.cell.actions.primary(value, extra)}
          <DropdownToggle caret color='primary' size='sm' />
          {extra.column.cell.actions.dropdown(extra.rowData)}
        </ButtonDropdown>
      </div>
    )
  }
}

export const components = {
  table: props => <ul {...props} className={classnames('item-list striped', props.className)} />,
  header: {
    wrapper: props => <li {...props} className={classnames('item item-list-header hidden-sm-down', props.className)} />,
    row: props => <div {...props} className={classnames('item-row', props.className)} />,
    cell: props => <div {...props} className={classnames('item-col', props.className)} />
  },
  body: {
    wrapper: props => {
      const {children, className, loading, empty, error, t, ...others} = props
      return (
        <li className='tbody'>
          <ul {...others} className={classnames('item-list striped tbody-wrapper', className)}>
            <li className='item' style={{display: 'none'}} />
            {(loading || error || empty) ? (
              <li className='item'>
                <div className='item-row'>
                  <div className='item-col' style={{justifyContent: 'center'}}>
                    {loading && <Loading delay={0} type='cylon' color='#4bcf99' />}
                    {error && error.toString()}
                    {empty && <span>list_empty</span>}
                  </div>
                </div>
              </li>
            ) : children}
          </ul>
        </li>
      )
    },
    row: props => <li className='item'><div {...props} className={classnames('item-row', props.className)} /></li>,
    cell: props => <div {...props} className={classnames('item-col', props.className)} />
  }
}

export const presets = {
  checkbox: {
    property: 'id',
    header: {
      label: 'ID',
      formatters: [ formatters.checkbox('header') ],
      props: {
        className: 'fixed item-col-check'
      }
    },
    cell: {
      props: {
        className: 'fixed item-col-check'
      },
      formatters: [ formatters.checkbox('item') ]
    }
  },
  text: {
    header: {
      formatters: [ formatters.header ]
    },
    cell: {
      formatters: [ formatters.text ]
    }
  },
  link: {
    header: {
      formatters: [ formatters.header ],
      props: {
        className: 'item-col-header'
      }
    },
    cell: {
      formatters: [
        formatters.link,
        formatters.text
      ]
    }
  },
  image: {
    header: {
      formatters: [ formatters.header ],
      props: {
        className: 'item-col-header fixed item-col-img md'
      }
    },
    cell: {
      props: {
        className: 'fixed item-col-img md'
      },
      formatters: [ formatters.image ],
      href: data => 'haha'
    }
  },
  actions: {
    property: 'id',
    header: {
      label: 'Action',
      props: {
        className: 'item-col-header item-col-actions-dropdown'
      },
      formatters: [ formatters.header ]
    },
    cell: {
      props: {
        className: 'item-col-actions-dropdown'
      },
      formatters: [ formatters.actions ],
      actions: {
        label: '编辑',
        dropdown: item => (
          <DropdownMenu>
            <DropdownItem>删除</DropdownItem>
          </DropdownMenu>
        )
      }
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
