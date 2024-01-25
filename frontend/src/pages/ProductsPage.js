import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { getProducts } from "../features/Products/productsSlice";

import styles from "./ProductsPage.module.css";

function ProductsPage() {
  // React Router Hooks
  const { category } = useParams();

  // Redux Global Store State
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { allProducts, isLoading, error } = products;

  // Local State
  const [selectedCategory, setSelectedCategory] = useState("bundles");
  const [message, setMessage] = useState();

  // Derived State
  const books = allProducts.filter(
    (allProducts) => allProducts.category === "books"
  );
  const candles = allProducts.filter(
    (allProducts) => allProducts.category === "candles"
  );
  const bundles = allProducts.filter(
    (allProducts) => allProducts.category === "bundles"
  );

  // Event Handler Functions
  function handleSelectCategory(category) {
    setSelectedCategory(category);
  }

  // React Hooks
  useEffect(() => {
    dispatch(getProducts());

    if (category) {
      console.log("CATEGORY", category);
      setSelectedCategory(category);
    }

    // Handle success message StripeAPI
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Your purchase was successful.");
    } else {
      setMessage();
    }
  }, [dispatch, category]);

  return (
    <Container>
      <Row className="my-1 px-0 ">
        {message && <Message variant="success">{message}</Message>}
        <h1>All Products</h1>
        <Nav className="ps-auto" variant="tabs" defaultActiveKey="/home">
          <Nav.Item style={{ color: "black" }}>
            <Nav.Link
              className="mb-0 text-black ms-auto"
              onClick={() => handleSelectCategory("bundles")}
            >
              Bundles
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              className="text-black"
              onClick={() => handleSelectCategory("candles")}
              eventKey="link-1"
            >
              Candles
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              className="text-black"
              onClick={() => handleSelectCategory("books")}
              eventKey="link-2"
            >
              Books
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      <Row>
        <Col md={12}>
          {isLoading ? (
            <div className="d-flex vh-100 align-content-center">
              <Loader size={"200px"} />
            </div>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : selectedCategory === "candles" ? (
            <Row>
              {candles.map((product) => (
                <Col md="auto" key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          ) : selectedCategory === "books" ? (
            <Row>
              {books.map((product) => (
                <Col md="auto" key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <Row>
              {bundles.map((product) => (
                <Col md="auto" key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProductsPage;
