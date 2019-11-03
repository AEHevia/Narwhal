import React, { Component } from 'react';
import { Navbar } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <Navbar expand="md">
        <Navbar.Brand href="#home">LOGO</Navbar.Brand>
      </Navbar>
    )
  }
}

export default NavBar;
