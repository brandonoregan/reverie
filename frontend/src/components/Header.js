import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <Navbar
      expand="md"
      className="bg-body-tertiary"
      style={{ fontFamily: "Judson" }}
    >
      <Container style={{ fontSize: "1.3rem" }}>
        <LinkContainer to="/">
          <Navbar.Brand>
            <span style={{ fontSize: "1.7rem", fontWeight: 700 }}>
              Reverie Reading
            </span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/products">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>

            {/* TODO: On Condition */}
            <LinkContainer to="/profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/cart">
              <Nav.Link>
                <i
                  style={{ fontSize: "1" }}
                  className="fas fa-shopping-cart"
                ></i>
              </Nav.Link>
            </LinkContainer>

            {/* TODO: Change title to user username or admin depending */}
            <NavDropdown title="Account" id="basic-nav-dropdown">
              {/* TODO: Conditionlly display login */}
              <LinkContainer to="/login">
                <NavDropdown.Item>Login</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/register">
                <NavDropdown.Item>Register</NavDropdown.Item>
              </LinkContainer>

              {/* TODO: Conditionally display for admin */}
              <LinkContainer to="/users">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/stock">
                <NavDropdown.Item>Stock</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/orders">
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>

              {/* TODO: Conditionally display logout if logged in  */}
              <NavDropdown.Divider />
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
