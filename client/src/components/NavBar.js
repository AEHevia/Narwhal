import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar pullRight expand="md">
          <Navbar.Brand href="#home">LOGO</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {this.props.isLoggedIn && (
                <Nav.Link onClick={this.props.handleRandom}>Random</Nav.Link>
              )}
              {this.props.isLoggedIn && (
                <Nav.Link href="#link">Favorites</Nav.Link>
              )}
              {this.props.isLoggedIn && (
                <Nav.Link onClick={this.props.handleLogout}>Logout</Nav.Link>
              )}
              {!this.props.isLoggedIn && (
                <Nav.Link variant="outline-success">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
