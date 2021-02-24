import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';     // import component
import { Link } from 'react-router-dom';

// Menu Page

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};       // define variable
    this.toggle = this.toggle.bind(this);
  }

  toggle() {       // define function
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // <!-----Frontend start
  render() {
    return <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">The Warehouse</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink
              tag={Link} to="/">Product's List</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/articles">Article's List</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>;
  }
  // Frontend end -----!>
}