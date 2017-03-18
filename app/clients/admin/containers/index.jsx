import React from 'react'
import { connect } from 'react-redux'
import TreeModel from 'tree-model'
import { OAuthSignout } from 'react-redux-oauth2'
import classnames from 'classnames'
import ClickOutside from 'react-click-outside'
import { push } from 'react-router-redux'
import { Route, Switch, Redirect, withRouter } from 'react-router'
import LoadingBar from 'react-redux-loading-bar'
import { injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import Dashboard from './dashboard'
import Unauthorizated from './unauthorizated'
import Signin from './signin'
import ReduxToastr from 'react-redux-toastr'
import Menu from '../components/menu.jsx'
import { actions } from '../reduxers/common'
import style from '../styles'
import Users from './users'
import Roles from './roles'
import Files from './files'
import Profile from './profile'
import Settings from './settings'

const Index = connect(state => ({
  menu: state.menu,
  oauth: state.oauth}))(injectIntl(withRouter(
    class extends React.Component {
      constructor () {
        super()
        this.state = { sidebar_open: false, dropdown_open: false }
      }
      toggleSidebar (toggle = true) {
        if (toggle) {
          this.setState({sidebar_open: !this.state.sidebar_open})
        } else {
          if (this.state.sidebar_open) this.setState({sidebar_open: false})
        }
      }
      toggleDropdown (toggle = true) {
        if (toggle) {
          this.setState({dropdown_open: !this.state.dropdown_open})
        } else {
          if (this.state.dropdown_open) this.setState({dropdown_open: false})
        }
      }
      componentWillMount () {
        const { oauth, dispatch } = this.props
        if (!oauth.user) {
          dispatch(push('/signin'))
        } else {
          this.updateMenu(this.props)
        }
      }
      componentWillReceiveProps (props) {
        if (this.props.location.pathname !== props.location.pathname) {
          this.updateMenu(props)
        }
      }
      updateMenu (props) {
        const tree = new TreeModel()
        const menu = tree.parse({ children: this.props.menu })
        const { location } = props
        let current = menu.first(item => {
          if (item.model.href) {
            return item.model.href === location.pathname
          }
        })
        if (current) {
          this.props.dispatch(actions.changeMenu(current.model))
        }
      }
      render () {
        const { menu, oauth, intl } = this.props
        const SignoutButton = OAuthSignout(props => (
          <a className='dropdown-item' href='#' {...props}> <i className='fa fa-power-off icon' />{intl.formatMessage({id: 'signout'})} </a>
        ))
        return (
          <div>
            <div className='main-wrapper'>
              <div className={classnames('app header-fixed sidebar-fixed', {'sidebar-open': this.state.sidebar_open})} id='app'>
                <header className='header'>
                  <div className='header-block header-block-collapse hidden-lg-up'>
                    <button onClick={this.toggleSidebar.bind(this)} className='collapse-btn' id='sidebar-collapse-btn'>
                      <i className='fa fa-bars' />
                    </button>
                  </div>
                  <div className='header-block header-block-search hidden-sm-down'>
                    <form role='search'>
                      <div className='input-container'> <i className='fa fa-search' /><input type='search' placeholder='Search' />
                        <div className='underline' />
                      </div>
                    </form>
                  </div>
                  {/*
                  <div className='header-block header-block-buttons'>
                    <a href='https://github.com/modularcode/modular-admin-html' className='btn btn-sm header-btn'> <i className='fa fa-github-alt' /> <span>View on GitHub</span> </a>
                    <a href='https://github.com/modularcode/modular-admin-html/stargazers' className='btn btn-sm header-btn'> <i className='fa fa-star' /> <span>Star Us</span> </a>
                    <a href='https://github.com/modularcode/modular-admin-html/releases/download/v1.0.1/modular-admin-html-1.0.1.zip' className='btn btn-sm header-btn'> <i className='fa fa-cloud-download' /> <span>Download .zip</span> </a>
                  </div>
                    */}
                  <div className='header-block header-block-nav'>
                    <ul className='nav-profile'>
                      <li className='profile dropdown'>
                        <a className='nav-link dropdown-toggle' href='javascript:;' onClick={this.toggleDropdown.bind(this)} role='button'>
                          <div className='img' style={{backgroundImage: `url(${oauth.user.avatar})`}} /><span className='name'>
                            {oauth.user.username}
                          </span> </a>
                        <ClickOutside onClickOutside={this.toggleDropdown.bind(this, false)}>
                          <div className='dropdown-menu profile-dropdown-menu' style={{display: this.state.dropdown_open ? 'block' : 'none'}}>
                            <Link to='/home/profile' className='dropdown-item'>
                              <i className='fa fa-user icon' /> {intl.formatMessage({id: 'profile'})}
                            </Link>
                            <div className='dropdown-divider' />
                            <SignoutButton />
                          </div>
                        </ClickOutside>
                      </li>
                    </ul>
                  </div>
                </header>
                <ClickOutside onClickOutside={this.toggleSidebar.bind(this, false)}>
                  <aside className='sidebar'>
                    <div className='sidebar-container'>
                      <div className='sidebar-header'>
                        <div className='brand'>
                          <div className='logo'> <span className='l l1' /><span className='l l2' /><span className='l l3' /> <span className='l l4' /> <span className='l l5' /> </div> Koapp </div>
                      </div>
                      <Menu items={menu} onClick={item => this.props.dispatch(actions.changeMenu(item))} />
                    </div>
                  </aside>
                </ClickOutside>
                <div className='sidebar-overlay' id='sidebar-overlay' />
                {this.props.children}
                <footer className='footer'>
                  <div className='footer-block buttons' />
                  <div className='footer-block author'>
                    <ul>
                      <li> Credits <a href='https://github.com/modularcode'> ModularCode</a> </li>
                    </ul>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        )
      }
})))

const PrivateRoute = connect(state => ({oauth: state.oauth}))(props => {
  const { oauth, ...others } = props
  if (!oauth.user) {
    return <Redirect to={{pathname: '/signin'}} />
  } else {
    return <Route {...others} />
  }
})

export default props => (
  <div>
    <ReduxToastr position='bottom-right' />
    <LoadingBar style={{zIndex: 9999, backgroundColor: style.primaryColor}} />
    <Switch>
      <Route path='/signin' exact component={Signin} />
      <PrivateRoute path='/'>
        <Index>
          <Switch>
            <Route path='/unauthorizated' component={Unauthorizated} />
            <Route path='/users' component={Users} />
            <Route path='/roles' component={Roles} />
            <Route path='/files' component={Files} />
            <Route path='/settings' component={Settings} />
            <Route component={Dashboard} />
          </Switch>
          <Route path='/home/profile' component={Profile} />
        </Index>
      </PrivateRoute>
    </Switch>
  </div>
)
