import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  ListGroup,
  Form,
  Image,
  Card,
  Container,
} from "react-bootstrap";

import Rating from "../components/Rating";
import BackButton from "../components/BackButton";

// const product = {
//   id: 8,
//   name: "Peter Pan",
//   image: "/media/images/peter-pan.webp",
//   category: "books",
//   description:
//     "When Peter Pan flies into the Darlings' room one dusky evening, he convinces Wendy and her brothers to come with him to the magical world of Neverland, where children never grow old.",
//   rating: "4.50",
//   review_count: 11,
//   price: "15.99",
//   stock_count: 6,
//   createdAt: "2024-01-16T09:47:49.460088Z",
//   user: 1,
// };

function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const addToCartHandler = () => {
    navigate(`/cart/${id} ? qantity=${quantity}`);
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products");

        if (!res.ok) {
          throw new Error(res.status);
        }

        const data = await res.json();

        console.log("DATA: ", data);
        console.log("ID: ", typeof id);

        setProducts(data);

        const productDetail = data.filter(
          (product) => String(product.id) === id
        );
        setProduct(productDetail[0]);

        console.log(productDetail);
      } catch (error) {
        console.log("CAUGHT ERROR: ", error);
      }
    }

    console.log(id);

    getProducts();
  }, [id]);

  return (
    <Container style={{ fontSize: "1.3rem" }}>
      <BackButton toLink="/products" className="btn btn-light my-3">
        Go Back
      </BackButton>
      <Row className="d-flex justify-content-center ">
        <Col md={6}>
          <Image
            src={`http://127.0.0.1:8000/${product.image}`}
            alt={product.name}
            fluid
          />
        </Col>

        <Col md={4} className="d-flex flex-column ">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3 style={{ fontWeight: "bolder" }}>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={` ${product.review_count} reviews`}
                color={"black"}
                size={"1.5rem"}
              />
            </ListGroup.Item>

            <ListGroup.Item className="d-flex">
              <span className="productSubHeading me-auto">Price:</span>
              <span>${product.price}</span>
            </ListGroup.Item>

            <ListGroup.Item>
              <span className="productSubHeading me-auto d-block">
                Description:
              </span>
              <span style={{ fontSize: "1.1rem" }}>{product.description}</span>
            </ListGroup.Item>
          </ListGroup>
          <Card className="mt-auto">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col className="d-flex justify-content-end">
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col className="d-flex justify-content-end">
                    {product.stock_count > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.stock_count > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity:</Col>
                    <Col xs="auto" className="my-1">
                      <Form.Control
                        as="select"
                        className="form-select"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      >
                        {[...Array(product.stock_count).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item className="d-flex justify-content-end ">
                <Button
                  onClick={addToCartHandler}
                  style={{ fontSize: "1.4rem" }}
                  disabled={product.stock_count === 0}
                  type="button"
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailPage;
