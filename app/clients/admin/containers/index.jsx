import React from 'react'
import { connect } from 'react-redux'
import Dashboard from './dashboard'
import * as User from './users'
import Signin from './signin'
import ReduxToastr from 'react-redux-toastr'
import { Route, Switch, Redirect, withRouter } from 'react-router'
import Menu from '../components/menu.jsx'
import { actions } from '../reduxers/common'
import TreeModel from 'tree-model'
import { OAuthSignout } from 'react-redux-oauth2'
import classnames from 'classnames'
import ClickOutside from 'react-click-outside'
import { push } from 'react-router-redux'
import '../styles'

const Index = connect(state => ({
  modal: state.modal,
  menu: state.menu,
  oauth: state.oauth}))(withRouter(
    class extends React.Component {
      constructor () {
        super()
        this.state = { sidebar_open: false }
      }
      toggleSidebar (toggle = true) {
        if (toggle) {
          this.setState({sidebar_open: !this.state.sidebar_open})
        } else {
          if (this.state.sidebar_open) this.setState({sidebar_open: false})
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
        const { menu, oauth } = this.props
        const SignoutButton = OAuthSignout(props => (
          <a className='dropdown-item' href='#' {...props}> <i className='fa fa-power-off icon' />Sign-Out </a>
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
                        <a className='nav-link dropdown-toggle' data-toggle='dropdown' href='#' role='button'>
                          <div className='img' style={{backgroundImage: `url(${oauth.user.avatar})`}} /><span className='name'>
                            {oauth.user.username}
                          </span> </a>
                        <div className='dropdown-menu profile-dropdown-menu'>
                          <a className='dropdown-item' href='#'> <i className='fa fa-user icon' /> Profile </a>
                          <a className='dropdown-item' href='#'> <i className='fa fa-bell icon' /> Notifications </a>
                          <a className='dropdown-item' href='#'> <i className='fa fa-gear icon' /> Settings </a>
                          <div className='dropdown-divider' />
                          <SignoutButton />
                        </div>
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
}))

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
    <Switch>
      <Route path='/signin' exact component={Signin} />
      <PrivateRoute path='/'>
        <Index>
          <Switch>
            <Route path='/users'>
              <User.List>
                <Route path='/users/:id/edit' component={User.Form} />
                <Route path='/users/create' component={User.Form} />
              </User.List>
            </Route>
            <Route component={Dashboard} />
          </Switch>
        </Index>
      </PrivateRoute>
    </Switch>
  </div>
)
