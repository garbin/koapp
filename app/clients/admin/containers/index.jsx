import React from 'react'
import { connect } from 'react-redux'
import Menu from '../components/menu.jsx'
import { actions } from '../reduxers/admin'
import TreeModel from 'tree-model'
import { OAuthSignout } from 'react-redux-oauth2'

export class Root extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  componentWillMount () {
    this.updateMenu()
  }
  componentWillReceiveProps (props) {
    if (this.props.location.pathname !== props.location.pathname) {
      this.updateMenu()
    }
  }
  updateMenu () {
    const tree = new TreeModel()
    const menu = tree.parse({ children: this.props.menu })
    let current = menu.first(item => {
      if (item.model.href) {
        return this.context.router.isActive(item.model.href, true)
      }
    })
    this.props.dispatch(actions.changeMenu(current.model))
  }
  render () {
    const { menu, oauth } = this.props
    const SignoutButton = OAuthSignout(props => (
      <a className='dropdown-item' href='#' {...props}> <i className='fa fa-power-off icon' />Sign-Out </a>
    ))
    return (
      <div>
        <div className='main-wrapper'>
          <div className='app header-fixed sidebar-fixed' id='app'>
            <header className='header'>
              <div className='header-block header-block-collapse hidden-lg-up'> <button className='collapse-btn' id='sidebar-collapse-btn'>
                <i className='fa fa-bars' />
              </button> </div>
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
                  <li className='notifications new'>
                    <a href='' data-toggle='dropdown' aria-expanded='false'> <i className='fa fa-bell-o' /><sup>
                      <span className='counter'>8</span>
                    </sup> </a>
                    <div className='dropdown-menu notifications-dropdown-menu'>
                      <ul className='notifications-container'>
                        <li>
                          <a href='' className='notification-item'>
                            <div className='img-col' />
                            <div className='body-col'>
                              <p> <span className='accent'>Zack Alien</span> pushed new commit: <span className='accent'>Fix page load performance issue</span>. </p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href='' className='notification-item'>
                            <div className='img-col' />
                            <div className='body-col'>
                              <p> <span className='accent'>Amaya Hatsumi</span> started new task: <span className='accent'>Dashboard UI design.</span>. </p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href='' className='notification-item'>
                            <div className='img-col' />
                            <div className='body-col'>
                              <p> <span className='accent'>Andy Nouman</span> deployed new version of <span className='accent'>NodeJS REST Api V3</span> </p>
                            </div>
                          </a>
                        </li>
                      </ul>
                      <footer>
                        <ul>
                          <li> <a href=''>
                            View All
                          </a> </li>
                        </ul>
                      </footer>
                    </div>
                  </li>
                  <li className='profile dropdown'>
                    <a className='nav-link dropdown-toggle' data-toggle='dropdown' href='#' role='button'>
                      <div className='img' style={{backgroundImage: 'url(https://avatars3.githubusercontent.com/u/3959008?v=3&s=40)'}} /><span className='name'>
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
            <aside className='sidebar'>
              <div className='sidebar-container'>
                <div className='sidebar-header'>
                  <div className='brand'>
                    <div className='logo'> <span className='l l1' /><span className='l l2' /><span className='l l3' /> <span className='l l4' /> <span className='l l5' /> </div> Koapp </div>
                </div>
                <Menu items={menu} onClick={item => this.props.dispatch(actions.changeMenu(item))} />
              </div>
            </aside>
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
}

export default connect(state => ({menu: state.menu, oauth: state.oauth}))(Root)
