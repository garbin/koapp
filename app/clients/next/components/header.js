import React from 'react'
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap'
export default class extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = { isOpen: false }
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render () {
    return (
      <Navbar dark color='primary' expand='lg'>
        <Container>
          <NavbarBrand href='#'>Garbin</NavbarBrand>
          <NavbarToggler onClick={this.toggle.bind(this)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className='mr-auto'>
              <NavItem active>
                <NavLink href='#'>Timeline
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='#'>Friends
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='#'>Networks
                </NavLink>
              </NavItem>
            </Nav>
            <Nav navbar className='ml-auto'>
              <NavItem active>
                <NavLink href='#'>Signin
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}
