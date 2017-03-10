import React from 'react'
import classnames from 'classnames'
import { Input, ButtonDropdown, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import _ from 'lodash'

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
        <a href={extra.column.cell.href(extra.rowData)}>
          <h4 className='item-title'> {value} </h4>
        </a>
      </div>
    )
  },
  checkbox (value, extra) {
    const header = value === extra.column.header.label
    return (
      <label className='item-check'>
        <Input type='checkbox'
          onChange={header && extra.column.header.onCheckAll ? extra.column.header.onCheckAll : e => e}
          defaultChecked={extra.rowData && (extra.rowData.selected || false)}
          className='checkbox' />
        <span />
      </label>)
  },
  image (value, extra) {
    return (<a href={extra.column.cell.href(extra.rowData)}><div className='item-img rounded' style={{backgroundImage: `url(${value})`}} /></a>)
  },
  actions (value, extra) {
    let props = extra.column.cell.actions.props || {}
    return (
      <div>
        <ButtonDropdown group toggle={e => e}>
          <Button color='primary' size='sm' {...props}>{extra.column.cell.actions.label}</Button>
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
    wrapper: props => <li className='tbody'><ul {...props} className={classnames('item-list striped tbody-wrapper', props.className)} /></li>,
    row: props => <li className='item'><div {...props} className={classnames('item-row', props.className)} /></li>,
    cell: props => <div {...props} className={classnames('item-col', props.className)} />
  }
}

export const presets = {
  checkbox: {
    property: 'id',
    header: {
      label: 'ID',
      formatters: [ formatters.checkbox ],
      props: {
        className: 'fixed item-col-check'
      }
    },
    cell: {
      props: {
        className: 'fixed item-col-check'
      },
      formatters: [ formatters.checkbox ]
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
