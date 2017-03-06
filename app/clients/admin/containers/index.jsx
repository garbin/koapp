import React from 'react'
import { connect } from 'react-redux'
import Menu from '../components/menu.jsx'
import { actions } from '../reduxers/admin'

export class Root extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }
  componentDidMount () {
    require('../styles/js/app.exec.js')
    let current = this.props.menu.first(item => {
      if (item.model.href) {
        return this.context.router.isActive(item.model.href, true)
      }
    })
    this.props.dispatch(actions.changeMenu(current.model))
  }
  render () {
    const { menu } = this.props
    return (
      <div>
        <div className='main-wrapper'>
          <div className='app' id='app'>
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
              <div className='header-block header-block-buttons'>
                <a href='https://github.com/modularcode/modular-admin-html' className='btn btn-sm header-btn'> <i className='fa fa-github-alt' /> <span>View on GitHub</span> </a>
                <a href='https://github.com/modularcode/modular-admin-html/stargazers' className='btn btn-sm header-btn'> <i className='fa fa-star' /> <span>Star Us</span> </a>
                <a href='https://github.com/modularcode/modular-admin-html/releases/download/v1.0.1/modular-admin-html-1.0.1.zip' className='btn btn-sm header-btn'> <i className='fa fa-cloud-download' /> <span>Download .zip</span> </a>
              </div>
              <div className='header-block header-block-nav'>
                <ul className='nav-profile'>
                  <li className='notifications new'>
                    <a href='' data-toggle='dropdown'> <i className='fa fa-bell-o' /><sup>
                      <span className='counter'>8</span>
                    </sup> </a>
                    <div className='dropdown-menu notifications-dropdown-menu'>
                      <ul className='notifications-container'>
                        <li>
                          <a href='' className='notification-item'>
                            <div className='img-col'>
                              <div className='img' style={{backgroundImage: 'url("assets/faces/3.jpg")'}} />
                            </div>
                            <div className='body-col'>
                              <p> <span className='accent'>Zack Alien</span> pushed new commit: <span className='accent'>Fix page load performance issue</span>. </p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href='' className='notification-item'>
                            <div className='img-col'>
                              <div className='img' style={{backgroundImage: 'url(assets/faces/5.jpg)'}} />
                            </div>
                            <div className='body-col'>
                              <p> <span className='accent'>Amaya Hatsumi</span> started new task: <span className='accent'>Dashboard UI design.</span>. </p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href='' className='notification-item'>
                            <div className='img-col'>
                              <div className='img' style={{backgroundImage: 'url(assets/faces/8.jpg)'}} />
                            </div>
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
                    <a className='nav-link dropdown-toggle' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'>
                      <div className='img' style={{backgroundImage: 'url(https://avatars3.githubusercontent.com/u/3959008?v=3&s=40)'}} /><span className='name'>
                        John Doe
                      </span> </a>
                      <div className='dropdown-menu profile-dropdown-menu' aria-labelledby='dropdownMenu1'>
                        <a className='dropdown-item' href='#'> <i className='fa fa-user icon' /> Profile </a>
                        <a className='dropdown-item' href='#'> <i className='fa fa-bell icon' /> Notifications </a>
                        <a className='dropdown-item' href='#'> <i className='fa fa-gear icon' /> Settings </a>
                        <div className='dropdown-divider' />
                        <a className='dropdown-item' href='login.html'> <i className='fa fa-power-off icon' />Logout </a>
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
                    <Menu items={menu.model.children} onClick={item => this.props.dispatch(actions.changeMenu(item))} />
                  </div>
                  <footer className='sidebar-footer'>
                    <ul className='nav metismenu' id='customize-menu'>
                      <li>
                        <ul>
                          <li className='customize'>
                            <div className='customize-item'>
                              <div className='row customize-header'>
                                <div className='col-xs-4' />
                                <div className='col-xs-4'> <label className='title'>fixed</label> </div>
                                <div className='col-xs-4'> <label className='title'>static</label> </div>
                              </div>
                              <div className='row hidden-md-down'>
                                <div className='col-xs-4'> <label className='title'>Sidebar:</label> </div>
                                <div className='col-xs-4'> <label>
                                  <input className='radio' type='radio' name='sidebarPosition' value='sidebar-fixed' />
                                  <span />
                                </label> </div>
                                <div className='col-xs-4'> <label>
                                  <input className='radio' type='radio' name='sidebarPosition' value='' />
                                  <span />
                                </label> </div>
                              </div>
                              <div className='row'>
                                <div className='col-xs-4'> <label className='title'>Header:</label> </div>
                                <div className='col-xs-4'> <label>
                                  <input className='radio' type='radio' name='headerPosition' value='header-fixed' />
                                  <span />
                                </label> </div>
                                <div className='col-xs-4'> <label>
                                  <input className='radio' type='radio' name='headerPosition' value='' />
                                  <span />
                                </label> </div>
                              </div>
                              <div className='row'>
                                <div className='col-xs-4'> <label className='title'>Footer:</label> </div>
                                <div className='col-xs-4'> <label>
                                  <input className='radio' type='radio' name='footerPosition' value='footer-fixed' />
                                  <span />
                                </label> </div>
                                <div className='col-xs-4'> <label>
                                  <input className='radio' type='radio' name='footerPosition' value='' />
                                  <span />
                                </label> </div>
                              </div>
                            </div>
                            <div className='customize-item'>
                              <ul className='customize-colors'>
                                <li> <span className='color-item color-red' data-theme='red' /> </li>
                                <li> <span className='color-item color-orange' data-theme='orange' /> </li>
                                <li> <span className='color-item color-green active' data-theme='' /> </li>
                                <li> <span className='color-item color-seagreen' data-theme='seagreen' /> </li>
                                <li> <span className='color-item color-blue' data-theme='blue' /> </li>
                                <li> <span className='color-item color-purple' data-theme='purple' /> </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                        <a href=''> <i className='fa fa-cog' /> Customize </a>
                      </li>
                    </ul>
                  </footer>
                </aside>
                <div className='sidebar-overlay' id='sidebar-overlay' />
                <article className='content dashboard-page'>
                  {this.props.children}
                </article>
                <footer className='footer'>
                  <div className='footer-block buttons' />
                  <div className='footer-block author'>
                    <ul>
                      <li> created by <a href='https://github.com/modularcode'>ModularCode</a> </li>
                      <li> <a href='https://github.com/modularcode/modular-admin-html#get-in-touch'>get in touch</a> </li>
                    </ul>
                  </div>
                </footer>
                <div className='modal fade' id='modal-media'>
                  <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                      <div className='modal-header'> <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                        <span aria-hidden='true'>&times;</span>
                        <span className='sr-only'>Close</span>
                      </button>
                      <h4 className='modal-title'>Media Library</h4>
                    </div>
                    <div className='modal-body modal-tab-container'>
                      <ul className='nav nav-tabs modal-tabs' role='tablist'>
                        <li className='nav-item'> <a className='nav-link' href='#gallery' data-toggle='tab' role='tab'>Gallery</a> </li>
                        <li className='nav-item'> <a className='nav-link active' href='#upload' data-toggle='tab' role='tab'>Upload</a> </li>
                      </ul>
                      <div className='tab-content modal-tab-content'>
                        <div className='tab-pane fade' id='gallery' role='tabpanel'>
                          <div className='images-container'>
                            <div className='row' />
                          </div>
                        </div>
                        <div className='tab-pane fade active in' id='upload' role='tabpanel'>
                          <div className='upload-container'>
                            <div id='dropzone'>
                              <form action='/' method='POST' encType='multipart/form-data' className='dropzone needsclick dz-clickable' id='demo-upload'>
                                <div className='dz-message-block'>
                                  <div className='dz-message needsclick'> Drop files here or click to upload. </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='modal-footer'> <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button> <button type='button' className='btn btn-primary'>Insert Selected</button> </div>
                  </div>
                </div>
              </div>
              <div className='modal fade' id='confirm-modal'>
                <div className='modal-dialog' role='document'>
                  <div className='modal-content'>
                    <div className='modal-header'> <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>&times;</span>
                    </button>
                    <h4 className='modal-title'><i className='fa fa-warning' /> Alert</h4>
                  </div>
                  <div className='modal-body'>
                    <p>Are you sure want to do this?</p>
                  </div>
                  <div className='modal-footer'> <button type='button' className='btn btn-primary' data-dismiss='modal'>Yes</button> <button type='button' className='btn btn-secondary' data-dismiss='modal'>No</button> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='ref' id='ref'>
          <div className='color-primary' />
          <div className='chart'>
            <div className='color-primary' />
            <div className='color-secondary' />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({menu: state.menu}))(Root)
