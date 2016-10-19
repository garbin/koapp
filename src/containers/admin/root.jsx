import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import classnames from 'classnames'
import BodyClassname from 'react-body-classname'
import Dropdown from 'react-aria-menubutton'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { OAuthSignout } from 'react-redux-oauth2'
import Metismenu from 'react-metismenu'
import RouterLink from 'react-metismenu-router-link'

const menu = [
  {label:'控制台', icon: 'fa fa-dashboard', to: '/admin'},
  { label:'菜单', icon: 'fa fa-file', content:[
    { label:'列表', icon: 'fa fa-file', to: '/admin/list' },
    { label:'表单', icon: 'fa fa-file',to: '/admin/form' },
  ]},
  {label:'test', icon: 'fa fa-file', content:[
    {label:'Test', icon: 'fa fa-table', to: '/admin/test'},
  ]},
];

export default class Root extends React.Component {
  render(){
    if (__SERVER__) {
      BodyClassname.rewind();
    }

    let {authData} = this.props;

    // let menu = [
    //   {key:"dashboard", label:'控制台', icon: 'fa fa-dashboard', href: '/admin'},
    //   {key:"resource", label:'菜单', href:"/admin/list", icon: 'fa fa-file', children:[
    //     {key:"resource_table", label:'列表', icon: 'fa fa-table', href: '/admin/list'},
    //     {key:"resource_form", label:'表单', icon: 'fa fa-pencil-square-o', href: '/admin/form'},
    //   ]},
    //   {key:"resource1", label:'菜单', href:"/admin/table", icon: 'fa fa-file', children:[
    //     {key:"resource_table1", label:'列表', icon: 'fa fa-table', href: '/admin/table'},
    //     {key:"resource_form1", label:'表单', icon: 'fa fa-pencil-square-o', href: '/admin/form'},
    //   ]},
    // ];
    let SignoutLink  = OAuthSignout(props => <a {...props} />);
    return (
      <BodyClassname className="loaded">
        <div className="main-wrapper">
            <div className="app header-fixed sidebar-fixed" id="app">
                <header className="header">
                    <div className="header-block header-block-collapse hidden-lg-up">
                      <button className="collapse-btn" id="sidebar-collapse-btn">
                        <i className="fa fa-bars"></i>
                      </button>
                    </div>
                    <div className="header-block header-block-search hidden-sm-down">
                        <form role="search">
                            <div className="input-container">
                                <i className="fa fa-search"></i>
                                <input type="search" placeholder="Search" />
                                <div className="underline"></div>
                            </div>
                        </form>
                    </div>
                    <div className="header-block header-block-nav">
                        <ul className="nav-profile">
                            <Dropdown.Wrapper tag="li" className="profile dropdown open" onSelection={function(){}}>
                              <Dropdown.Button tag="a" className='nav-link dropdown-toggle' href="javascript:;">
                                <div className="img"></div>
                                <span className="name">
                                  {authData.username}
                                </span>
                              </Dropdown.Button>
                                <Dropdown.Menu className='dropdown-menu profile-dropdown-menu'>
                                  <a className="dropdown-item" href="#"> <i className="fa fa-user icon"></i> Profile </a>
                                  <a className="dropdown-item" href="#"> <i className="fa fa-bell icon"></i> Notifications </a>
                                  <a className="dropdown-item" href="#"> <i className="fa fa-gear icon"></i> Settings </a>
                                  <div className="dropdown-divider"></div>
                                  <SignoutLink className="dropdown-item" href="javascript:;">
                                    <i className="fa fa-power-off icon"></i>
                                    Signout
                                  </SignoutLink>
                                </Dropdown.Menu>
                            </Dropdown.Wrapper>
                        </ul>
                    </div>
                </header>
                  <aside className="sidebar">
                    <div className="sidebar-container">
                      <div className="sidebar-header">
                        <div className="brand">
                          <div className="logo"></div>
                          Ko<strong>app</strong>
                      </div>
                    </div>
                    <Metismenu content={menu}
                               noBuiltInClassNames={true}
                               className="menu"
                               classNameContainer="nav metismenu"
                               classNameContainerVisible="in"
                               classNameItemHasActiveChild="active"
                               classNameItemHasVisibleChild="open"
                               classNameItemActive="active"
                               iconNamePrefix=" "
                               LinkComponent={RouterLink}
                               iconNameStateHidden="fa arrow"
                               iconNameStateVisible="fa arrow" />
                  </div>
                </aside>
                <div className="sidebar-overlay" id="sidebar-overlay"></div>
                {this.props.children}
                <footer className="footer" style={{width:'100%'}}>
                    <div className="footer-block author text-xs-right">
                        <ul>
                            <li> created by <a href="https://github.com/garbinh">Garbin Huang</a> </li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
      </BodyClassname>
    );
  }
}

                            // <Dropdown.Wrapper tag="li" className="notifications new open" onSelection={function(){}}>
                            //   <Dropdown.Button tag="a" href="#">
                            //     <i className="fa fa-bell-o"></i>
                            //     <sup>
                            //       <span className="counter">8</span>
                            //     </sup>
                            //   </Dropdown.Button>
                            //   <Dropdown.Menu className='dropdown-menu notifications-dropdown-menu'>
                            //     <ul className="notifications-container">
                            //       <li>
                            //         <a href="" className="notification-item">
                            //           <div className="img-col">
                            //             <div className="img"></div>
                            //           </div>
                            //           <div className="body-col">
                            //             <p> <span className="accent">Zack Alien</span> pushed new commit: <span className="accent">Fix page load performance issue</span>. </p>
                            //           </div>
                            //         </a>
                            //       </li>
                            //       <li>
                            //         <a href="" className="notification-item">
                            //           <div className="img-col">
                            //             <div className="img"></div>
                            //           </div>
                            //           <div className="body-col">
                            //             <p> <span className="accent">Amaya Hatsumi</span> started new task: <span className="accent">Dashboard UI design.</span>. </p>
                            //           </div>
                            //         </a>
                            //       </li>
                            //       <li>
                            //         <a href="" className="notification-item">
                            //           <div className="img-col">
                            //             <div className="img"></div>
                            //           </div>
                            //           <div className="body-col">
                            //             <p> <span className="accent">Andy Nouman</span> deployed new version of <span className="accent">NodeJS REST Api V3</span> </p>
                            //           </div>
                            //         </a>
                            //       </li>
                            //     </ul>
                            //     <footer>
                            //       <ul>
                            //         <li> <a href="">
                            //           View All
                            //         </a> </li>
                            //       </ul>
                            //     </footer>
                            //   </Dropdown.Menu>
                            // </Dropdown.Wrapper>
