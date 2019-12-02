import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

class NavBar extends Component {
  render() {
    let favoritesList = this.props.favorites.map(favorite => {
      favorite = favorite.charAt(0).toUpperCase() + favorite.slice(1);

      return (
        <NavDropdown.Item
          onClick={() => {
            this.props.clickFavorite(favorite);
          }}
        >
          {favorite}
        </NavDropdown.Item>
      );
    });

    return (
      <div>
        <Navbar pullRight expand="md">
          <Navbar.Brand href="#home">Narwhal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {this.props.isLoggedIn && (
                <Nav.Link onClick={this.props.handleRandom}>Random</Nav.Link>
              )}
              {this.props.isLoggedIn && (
                <NavDropdown title="Favorites">{favoritesList}</NavDropdown>
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
