import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Navbar, ButtonDropdown, Button,
         DropdownMenu, DropdownItem,
         DropdownToggle, NavbarBrand,
         Nav, NavItem, NavLink } from 'reactstrap'
import { OAuthSignin, OAuthSignout, actions } from 'react-redux-oauth2'
import styles from './themes/default.scss'

export class Root extends React.Component {
  static contextTypes = { router: React.PropTypes.object };
  render(){
    let { oauth } = this.props;
    let navs = [
      { label: 'Counter', href: '/counter' },
      { label: 'Async', href: '/async' },
      { label: 'Admin', href: '/admin' }
    ];
    let SignoutLink = OAuthSignout(Button);
    return (
      <div>
        <Navbar dark full color="inverse" className={styles.navbar}>
          <div className="container">
            <NavbarBrand style={{marginRight:"30px"}} href="/">Koapp</NavbarBrand>
            <Nav navbar>
              {navs.map((item, k) => (
                <NavItem key={k}>
                  <NavLink active={this.context.router.isActive(item.href)}
                           tag={Link} to={item.href}>
                           {item.label}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <Nav navbar className="pull-xs-right">
              {oauth.user ? [
                <NavItem key="profile">
                  <NavLink tag={Link} to="/auth">
                    {oauth.user.username}
                  </NavLink>
                </NavItem>,
                <NavItem key="signout">
                  <NavLink tag={SignoutLink} color="link">
                    Signout
                  </NavLink>
                </NavItem>
              ] : (
                <NavItem>
                  <NavLink tag={Link} to="/auth">
                    Signin
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </div>
        </Navbar>
        <div className="container">
          <div className="jumbotron">
          {this.props.children}
          </div>
        </div>
        <footer className={styles.footer}>
          <div className="container">
            <ul className={styles.footer_links}>
              <li><a href="https://github.com/koapi/koapp">GitHub</a></li>
              <li><a href="https://twitter.com/garbinh">Twitter</a></li>
            </ul>
            <p>Designed and built with all the love in the world by <a href="https://twitter.com/garbinh" target="_blank">@garbinh</a></p>
          </div>
        </footer>
      </div>
    );
  }
}

export default connect(state => ({oauth:state.oauth}))(Root);
