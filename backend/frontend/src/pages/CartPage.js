import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Message from "../components/Message";
import BackButton from "../components/BackButton";
import { Row, Button, Form, Container, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteCartItem,
  createOrder,
  deleteOrder,
} from "../features/Cart/cartSlice";
import { LinkContainer } from "react-router-bootstrap";

import { checkout } from "../features/Payment/paymentSlice";

function CartPage() {
  // React Router Hooks/Functions
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quantity = searchParams.has("quantity")
    ? Number(searchParams.get("quantity"))
    : 1;
  const canceled = searchParams.get("canceled") === "true";

  // Redux Hooks
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Event handlers
  function handleDeleteItem(id) {
    dispatch(deleteCartItem(id));
  }

  function handleCheckout() {
    dispatch(checkout(cartItems)).then((checkout_url) => {
      if (checkout_url) {
        window.location.href = checkout_url; // Redirect to Stripe Checkout
      } else {
        // Handle error or notify the user
        console.error("Checkout URL not received");
      }
    });

    dispatch(createOrder());
  }

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity));
    }

    if (canceled) {
      dispatch(deleteOrder());
    }
  }, [canceled, dispatch, id, quantity]);

  return (
    <>
      {canceled && <Message>Your checkout was successfully canceled.</Message>}
      <Row
        className="px-0"
        style={{
          textAlign: "center",
          borderRadius: "0 0 1rem 1rem",
          maxHeight: "25rem",
          objectFit: "contain",
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)),url("https://reverie-bucket.s3.amazonaws.com/static/images/cover-bookshop.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1
          style={{
            padding: "3rem",
            color: "black",
            fontWeight: 900,
            fontFamily: "Judson",
            fontSize: "5rem",
            letterSpacing: "2px",
          }}
        >
          Your Cart
        </h1>
      </Row>
      <Container fluid>
        <Row className="">
          {cartItems.length === 0 ? (
            <Message className="d-flex justify-content-center  ms-auto">
              Your cart is empty.{" "}
              <BackButton className="ms-1 me-auto" toLink="/products">
                Shop now
              </BackButton>
            </Message>
          ) : (
            <Table className="text-center scrollable-table" hover>
              <thead style={{ backgroundColor: "#ece7db" }}>
                <tr
                  style={{
                    fontSize: "1.3rem",
                    backgroundColor: "#ece7db",
                    fontWeight: 700,
                  }}
                >
                  <th colSpan={2}>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Remove Item</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product_id} className="align-middle">
                    <td>
                      <Image
                        src={item.image}
                        style={{ height: "150px", width: "150px" }}
                      ></Image>
                    </td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <Form.Control
                        as="select"
                        className="form-select"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product_id, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.stock_count).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      {/* TODO: Add delete button logic */}
                      <Button
                        onClick={() => handleDeleteItem(item.product_id)}
                        type="button"
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr className="align-middle">
                  <td style={{ fontSize: "1.3rem" }} colSpan={2}>
                    <strong>Total</strong>
                  </td>
                  <td></td>
                  <td></td>
                  <td style={{ fontSize: "1.3rem" }}>
                    <strong>
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </strong>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          )}
        </Row>
        {cartItems.length > 0 && (
          <Row className="d-flex justify-content-around ">
            <LinkContainer
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                padding: ".5rem",
              }}
              to="/products"
            >
              <Button variant="secondary" className="w-25">
                Continue Shopping
              </Button>
            </LinkContainer>
            <Button
              onClick={() => handleCheckout(cartItems)}
              variant="secondary"
              className="w-25"
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                padding: ".5rem",
              }}
            >
              Proceed to Checkout
            </Button>
          </Row>
        )}
      </Container>
    </>
  );
}

export default CartPage;
