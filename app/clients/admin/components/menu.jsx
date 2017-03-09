import React from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

export default class Menu extends React.Component {
  renderChildren (children, open) {
    return (
      <ul className={classnames('collapse', { in: open })}>
        {children.map((child, idx) => this.renderItem(child, idx))}
      </ul>
    )
  }
  renderItem (item, idx) {
    let hasActive = (item.children || []).filter(child => child.active).length > 0
    let open = item.open
    return item.children ? (
      <li key={item.id || idx} className={classnames({ active: item.active || hasActive, open })}>
        <a href='javascript:;' onClick={e => this.props.onClick(item)}>
          {item.icon && (<i className={item.icon} />)} {item.label} <i className='fa arrow' />
        </a>
        {this.renderChildren(item.children, open)}
      </li>
    ) : (
      <li key={item.id || idx} className={classnames({ active: item.active || hasActive })}>
        <Link to={item.href} onClick={e => { this.props.onClick(item) }}>
          {item.icon && (<i className={item.icon} />)} {item.label}
        </Link>
      </li>
    )
  }
  render () {
    const { items } = this.props
    return (
      <nav className='menu'>
        <ul className='nav metismenu'>
          {items.map((item, idx) => this.renderItem(item, idx))}
        </ul>
      </nav>
    )
  }
}
