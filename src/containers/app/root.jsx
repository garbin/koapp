import React from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default class Root extends React.Component {
  render(){
    // return (
    //   <div>{this.props.children}</div>
    // );
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Koapp</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <li><Link to="/counter">Counter</Link></li>
            <li><Link to="/async">Async</Link></li>
            <li><Link to="/auth">Auth</Link></li>
            <li><Link to="/form">Form</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </Nav>
        </Navbar>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
