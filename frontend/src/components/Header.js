import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logoutUser } from "../features/Auth/authSlice";
import styles from "./Header.module.css";

function Header() {
  const dispatch = useDispatch();
  const { loggedIn, isAdmin } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <Navbar
      expand="md"
      className="bg-body-primary ps-3 pe-3"
      style={{ fontFamily: "Judson" }}
    >
      <LinkContainer to="/">
        <Navbar.Brand>
          <span
            style={{
              fontSize: "1.7rem",
              fontWeight: 700,
            }}
          >
            Reverie Reading
          </span>
        </Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse style={{ fontSize: "1.3rem" }} id="basic-navbar-nav">
        <Nav className="w-100 d-flex justify-content-around ">
          {!isAdmin && (
            <>
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/products">
                <Nav.Link>Products</Nav.Link>
              </LinkContainer>
            </>
          )}

          {loggedIn && !isAdmin && (
            <LinkContainer to="/profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
          )}

          {!loggedIn && (
            <>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </>
          )}

          {/* {loggedIn && isAdmin && (
            <>
              <LinkContainer to="/users">
                <Nav.Link>Users</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin">
                <Nav.Link>Admin</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/orders">
                <Nav.Link>Orders</Nav.Link>
              </LinkContainer>
            </>
          )} */}

          {loggedIn && (
            <LinkContainer
              className={`${isAdmin ? "ms-auto" : ""}`}
              onClick={() => handleLogout()}
              to="/login"
            >
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
          )}

          {!isAdmin && (
            <LinkContainer to="/cart">
              <Nav.Link>
                <div style={{ position: "relative" }}>
                  <i
                    style={{ fontSize: "1" }}
                    className="fas fa-shopping-cart"
                  ></i>
                  <span className={styles.cartStyle}>
                    {cartItems.length > 0 && cartItems.length}
                  </span>
                </div>
              </Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
