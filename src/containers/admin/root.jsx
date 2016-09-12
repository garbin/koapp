import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import classnames from 'classnames'
import BodyClassname from 'react-body-classname'

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

export class Root extends React.Component {
  render(){
    if (__SERVER__) {
      BodyClassname.rewind();
    }

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
                    <div className="header-block header-block-buttons">
                        <a href="https://github.com/modularcode/modular-admin-html" className="btn btn-oval btn-sm rounded-s header-btn"> <i className="fa fa-github-alt"></i> View on GitHub </a>
                        <a href="https://github.com/modularcode/modular-admin-html/releases/download/v1.0.1/modular-admin-html-1.0.1.zip" className="btn btn-oval btn-sm rounded-s header-btn"> <i className="fa fa-cloud-download"></i> Download .zip </a>
                    </div>
                    <div className="header-block header-block-nav">
                        <ul className="nav-profile">
                            <li className="notifications new">
                                <a href="" data-toggle="dropdown"> <i className="fa fa-bell-o"></i> <sup>
    			      <span className="counter">8</span>
    			    </sup> </a>
                                <div className="dropdown-menu notifications-dropdown-menu">
                                    <ul className="notifications-container">
                                        <li>
                                            <a href="" className="notification-item">
                                                <div className="img-col">
                                                    <div className="img"></div>
                                                </div>
                                                <div className="body-col">
                                                    <p> <span className="accent">Zack Alien</span> pushed new commit: <span className="accent">Fix page load performance issue</span>. </p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="" className="notification-item">
                                                <div className="img-col">
                                                    <div className="img"></div>
                                                </div>
                                                <div className="body-col">
                                                    <p> <span className="accent">Amaya Hatsumi</span> started new task: <span className="accent">Dashboard UI design.</span>. </p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="" className="notification-item">
                                                <div className="img-col">
                                                    <div className="img"></div>
                                                </div>
                                                <div className="body-col">
                                                    <p> <span className="accent">Andy Nouman</span> deployed new version of <span className="accent">NodeJS REST Api V3</span> </p>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                    <footer>
                                        <ul>
                                            <li> <a href="">
    			            View All
    			          </a> </li>
                                        </ul>
                                    </footer>
                                </div>
                            </li>
                            <li className="profile dropdown">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                    <div className="img"></div> <span className="name">
    			      John Doe
    			    </span> </a>
                                <div className="dropdown-menu profile-dropdown-menu" aria-labelledby="dropdownMenu1">
                                    <a className="dropdown-item" href="#"> <i className="fa fa-user icon"></i> Profile </a>
                                    <a className="dropdown-item" href="#"> <i className="fa fa-bell icon"></i> Notifications </a>
                                    <a className="dropdown-item" href="#"> <i className="fa fa-gear icon"></i> Settings </a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="login.html"> <i className="fa fa-power-off icon"></i> Logout </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </header>
                <aside className="sidebar">
                    <div className="sidebar-container">
                        <div className="sidebar-header">
                            <div className="brand">
                                <div className="logo"> <span className="l l1"></span> <span className="l l2"></span> <span className="l l3"></span> <span className="l l4"></span> <span className="l l5"></span> </div> Modular Admin </div>
                        </div>
                        <Sidemenu menu={menu} />
                    </div>
                </aside>
                <div className="sidebar-overlay" id="sidebar-overlay"></div>
                <article className="content dashboard-page">
                    <section className="section">
                    </section>
                    <section className="section">
                    </section>
                    <section className="section map-tasks">
                    </section>
                </article>
                <footer className="footer">
                    <div className="footer-block author">
                        <ul>
                            <li> created by <a href="https://github.com/modularcode">ModularCode</a> </li>
                            <li> <a href="https://github.com/modularcode/modular-admin-html#get-in-touch">get in touch</a> </li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
      </BodyClassname>
    );
  }
}

export default connect(state => ({oauth:state.oauth}))(Root);
