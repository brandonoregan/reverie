import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import Message from "../components/Message";
import BackButton from "../components/BackButton";
import { Row, Button, Form, Container, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteCartItem } from "../features/Cart/cartSlice";

function CartPage() {
  // React Router Hooks/Functions
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quantity = searchParams.has("quantity")
    ? Number(searchParams.get("quantity"))
    : 1;

  console.log("QUANTITY:", quantity);

  // Local State
  const [selectedQuantity, setSelectedQuantity] = useState(null);

  // Redux Hooks
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;

  // Event handlers
  function handleDeleteItem(id) {
    dispatch(deleteCartItem(id));
  }

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity));
    }
  }, [dispatch, id, quantity]);

  return (
    <Container>
      <Row>
        <h1 className="text-center">Shopping Cart</h1>
        <BackButton
          // variant="outline-secondary"
          toLink="/products"
          className="btn btn-secondary w-25  ms-auto me-auto  "
        >
          Conitnue Shopping
        </BackButton>
      </Row>

      <Row className="d-flex justify-content-center">
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty{" "}
            <BackButton toLink="/products">Shop now</BackButton>
          </Message>
        ) : (
          <Table className="text-center" hover>
            <thead>
              <tr>
                <th>Product</th>
                <th></th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr className="align-middle">
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
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <strong>Total</strong>
                </td>
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
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td colSpan={2}>
                  <Button variant="secondary" className="w-100 ">
                    Proceed to Checkout
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </Row>
    </Container>
  );
}

export default CartPage;
