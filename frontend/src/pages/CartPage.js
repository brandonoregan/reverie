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
  }, [dispatch, id, quantity]);

  return (
    <Container fluid>
      <Row
        className="px-0 my-5"
        style={{ textAlign: "center", borderRadius: "0 0 1re 1rem" }}
      >
        <h1>Shopping Cart</h1>
      </Row>
      <Row className="d-flex justify-content-center">
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty.{" "}
            <BackButton toLink="/products">Shop now</BackButton>
          </Message>
        ) : (
          <Table className="text-center" hover>
            <thead>
              <tr style={{ fontSize: "1.2rem" }}>
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
                      src={`http://127.0.0.1:8000/${item.image}`}
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
                <td style={{ fontSize: "1.2rem" }} colSpan={2}>
                  <strong>Total</strong>
                </td>
                <td></td>
                <td></td>
                <td>
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
      <Row className="d-flex justify-content-around ">
        <LinkContainer to="/products">
          <Button
            variant="secondary"
            className="w-25"
            style={{
              fontSize: "1.2rem",
            }}
          >
            Continue Shopping
          </Button>
        </LinkContainer>
        <Button
          onClick={() => handleCheckout(cartItems)}
          variant="secondary"
          className="w-25"
          style={{
            fontSize: "1.2rem",
          }}
        >
          Proceed to Checkout
        </Button>
      </Row>
    </Container>
  );
}

export default CartPage;
