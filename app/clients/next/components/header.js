import React from 'react'
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
export default class extends React.Component {
  render () {
    return (
      <Navbar dark color='primary' expand='lg'>
        <Container>
          <NavbarBrand href='#'>Garbin</NavbarBrand>
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
        </Container>
      </Navbar>
    )
  }
}
