import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  ListGroup,
  Form,
  Card,
  Container,
  Table,
  Image,
} from "react-bootstrap";

const products = [
  {
    id: 8,
    name: "Peter Pan",
    image: "http://127.0.0.1:8000/media/images/peter-pan.webp",
    category: "books",
    description:
      "When Peter Pan flies into the Darlings' room one dusky evening, he convinces Wendy and her brothers to come with him to the magical world of Neverland, where children never grow old.",
    rating: "4.50",
    review_count: 11,
    price: "15.99",
    stock_count: 6,
    createdAt: "2024-01-16T09:47:49.460088Z",
    user: 1,
  },
  {
    id: 10,
    name: "Star Crossed Lovers",
    image: "http://127.0.0.1:8000/media/images/star-crossed-lovers.webp",
    category: "candles",
    description:
      "A soothing combination of coconut milk, soft florals, thrift & sea salt. Perfect for a relaxing Sunday night.",
    rating: "4.00",
    review_count: 16,
    price: "19.99",
    stock_count: 11,
    createdAt: "2024-01-16T09:53:39.021046Z",
    user: 1,
  },
];

function CartPage() {
  const [cartItems, setCartItems] = useState(products);

  return (
    <Container>
      <Row>
        <h1>Shopping Cart</h1>
      </Row>

      <Row className="d-flex justify-content-center">
        {cartItems.length === 0 ? (
          <h1>Your cart is empty. Click here to shop.</h1>
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
                      value={1}
                      // onChange={(e) => setQuantity(e.target.value)}
                    >
                      {[...Array(item.stock_count).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    {/* TODO: Add delete button logic */}
                    <Button type="button" variant="light">
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
                  <strong>$35.98</strong>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td colSpan={2}>
                  <Button className="w-100">Proceed to Checkout</Button>
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
