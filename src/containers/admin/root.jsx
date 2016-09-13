import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import classnames from 'classnames'
import BodyClassname from 'react-body-classname'
import Dropdown from 'react-aria-menubutton'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { OAuthSignout } from 'react-redux-oauth2'

class Sidemenu extends React.Component {
  static defaultProps = {menu:[]}
  static contextTypes = {
    router: React.PropTypes.object
  }
  componentDidMount(){
    if (__CLIENT__) {
      $(function () {
        $('#sidebar-menu').metisMenu({
          activeClass: 'open'
        });
        $('#sidebar-collapse-btn').on('click', function(event){
          event.preventDefault();

          $("#app").toggleClass("sidebar-open");
        });

        $("#sidebar-overlay").on('click', function() {
          $("#app").removeClass("sidebar-open");
        });
      });
    }
  }
  render(){
    let {menu} = this.props;

    return (
      <nav className="menu">
        <ul className="nav metismenu" id="sidebar-menu">
          {menu.map(item => {
            let active = classnames({active:this.context.router.isActive(item.href)});
              return item.children ? (
                <li key={item.key} className={active}>
                  <a href="javascript:;">
                    <i className={item.icon}></i>
                    {item.label}
                    <i className="fa arrow"></i>
                  </a>
                  <ul className={classnames({collapse:!this.context.router.isActive(item.href)})}>
                    {item.children.map(sub => (
                      <li key={sub.key} className={active}>
                        <Link to={sub.href}>
                          <i className={sub.icon}></i>
                          &nbsp;&nbsp;
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ):(
                <li key={item.key} className={active}>
                  <Link to={item.href}><i className={item.icon}></i>{item.label}</Link>
                </li>
              );
            }
          )}
        </ul>
      </nav>
    );
  }
}

export default class Root extends React.Component {
  render(){
    if (__SERVER__) {
      BodyClassname.rewind();
    }

    let {authData} = this.props;

    // let menu = [
    //   { icon: 'dashboard', label: '控制台', to: '/admin' },
    //   { icon: 'table', label: '菜单', content: [
    //         { icon: 'table', label: '列表', to: '/admin/table' },
    //         { icon: 'pencil-square-o', label: '表单', to: '/admin/form' }
    //     ]
    //   }
    // ];
    let menu = [
      {key:"dashboard", label:'控制台', icon: 'fa fa-dashboard', href: '/admin'},
      {key:"resource", label:'菜单', href:"/admin/table", icon: 'fa fa-file', children:[
        {key:"resource_table", label:'列表', icon: 'fa fa-table', href: '/admin/table'},
        {key:"resource_form", label:'表单', icon: 'fa fa-pencil-square-o', href: '/admin/form'},
      ]},
      {key:"resource1", label:'菜单', href:"/admin/table", icon: 'fa fa-file', children:[
        {key:"resource_table1", label:'列表', icon: 'fa fa-table', href: '/admin/table'},
        {key:"resource_form1", label:'表单', icon: 'fa fa-pencil-square-o', href: '/admin/form'},
      ]},
    ];
    let SignoutLink  = OAuthSignout(props => <a {...props} />);
    return (
      <BodyClassname className="loaded">
        <div className="main-wrapper">
            <div className="app" id="app">
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
                        <Sidemenu menu={menu} />
                    </div>
                </aside>
                <div className="sidebar-overlay" id="sidebar-overlay"></div>
                <article className="content dashboard-page">
                    <section className="section">
                    </section>
                </article>
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
