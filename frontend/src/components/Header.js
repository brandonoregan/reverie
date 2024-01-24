import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logoutUser } from "../features/Auth/authSlice";

function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { loggedIn } = auth;

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <Navbar
      expand="md"
      className="bg-body-primary"
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
            {/* <LinkContainer to="/profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer> */}

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
              {!loggedIn && (
                <>
                  <LinkContainer to="/login">
                    <NavDropdown.Item>Login</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <NavDropdown.Item>Register</NavDropdown.Item>
                  </LinkContainer>
                </>
              )}

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

              {loggedIn && (
                <>
                  <NavDropdown.Divider />
                  <LinkContainer onClick={() => handleLogout()} to="/login">
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </LinkContainer>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
