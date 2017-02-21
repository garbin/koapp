import React from 'react'
import classnames from 'classnames'
import BodyClassname from 'react-body-classname'
import Dropdown from 'react-aria-menubutton'
import { OAuthSignout } from 'react-redux-oauth2'
import Metismenu from 'react-metismenu'
import RouterLink from 'react-metismenu-router-link'
import { connect } from '../../lib/helper'
import { actions } from '../../reduxers/website'

const menu = [
  { label: '控制台', icon: 'fa fa-dashboard', to: '/admin' },
  { label: '菜单',
    icon: 'fa fa-file',
    content: [
    { label: '列表', icon: 'fa fa-file', to: '/admin/list' },
    { label: '表单', icon: 'fa fa-file', to: '/admin/form' }
    ] },
  { label: 'test',
    icon: 'fa fa-file',
    content: [
      { label: 'Test', icon: 'fa fa-table', to: '/admin/test' }
    ] }
]

export class Root extends React.Component {
  render () {
    if (process.env.__SERVER__) {
      BodyClassname.rewind()
    }

    const { authData, actions, sidebar_open } = this.props

    const SignoutLink = OAuthSignout(props => <a href='#' {...props} />)
    return (
      <BodyClassname className='loaded'>
        <div className='main-wrapper'>
          <div className={classnames('app header-fixed sidebar-fixed', { 'sidebar-open': sidebar_open })} id='app'>
            <header className='header'>
              <div className='header-block header-block-collapse hidden-lg-up'>
                <button className='collapse-btn' id='sidebar-collapse-btn' onClick={() => actions.sidebarToggle()}>
                  <i className='fa fa-bars' />
                </button>
              </div>
              <div className='header-block header-block-search hidden-sm-down'>
                <form role='search'>
                  <div className='input-container'>
                    <i className='fa fa-search' />
                    <input type='search' placeholder='Search' />
                    <div className='underline' />
                  </div>
                </form>
              </div>
              <div className='header-block header-block-nav'>
                <ul className='nav-profile'>
                  <Dropdown.Wrapper tag='li' className='profile dropdown open'>
                    <Dropdown.Button tag='a' className='nav-link dropdown-toggle' href='#'>
                      <div className='img' />
                      <span className='name'>
                        {authData.username}
                      </span>
                    </Dropdown.Button>
                    <Dropdown.Menu className='dropdown-menu profile-dropdown-menu'>
                      <a href='#' className='dropdown-item'> <i className='fa fa-user icon' /> Profile </a>
                      <a className='dropdown-item'> <i className='fa fa-bell icon' /> Notifications </a>
                      <a className='dropdown-item'> <i className='fa fa-gear icon' /> Settings </a>
                      <div className='dropdown-divider' />
                      <SignoutLink className='dropdown-item' href='#'>
                        <i className='fa fa-power-off icon' />
                        Signout
                      </SignoutLink>
                    </Dropdown.Menu>
                  </Dropdown.Wrapper>
                </ul>
              </div>
            </header>
            <aside className='sidebar'>
              <div className='sidebar-container'>
                <div className='sidebar-header'>
                  <div className='brand'>
                    <div className='logo' />
                    Ko<strong>app</strong>
                  </div>
                </div>
                <Metismenu
                  content={menu}
                  noBuiltInClassNames
                  className='menu'
                  classNameContainer='nav metismenu'
                  classNameContainerVisible='in'
                  classNameItemHasActiveChild='active'
                  classNameItemHasVisibleChild='open'
                  classNameItemActive='active'
                  iconNamePrefix=' '
                  LinkComponent={RouterLink}
                  iconNameStateHidden='fa arrow'
                  iconNameStateVisible='fa arrow'
                />
              </div>
            </aside>
            <div className='sidebar-overlay' onClick={actions.sidebarToggle} id='sidebar-overlay' />
            {this.props.children}
            <footer className='footer' style={{ width: '100%' }}>
              <div className='footer-block author text-xs-right'>
                <ul>
                  <li> created by <a href='https://github.com/garbinh'>Garbin Huang</a> </li>
                </ul>
              </div>
            </footer>
          </div>
        </div>
      </BodyClassname>
    )
  }
}

export default connect(state => ({ sidebar_open: state.sidebar_open }), actions)(Root)
