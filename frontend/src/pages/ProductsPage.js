import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { getProducts } from "../features/Products/productsSlice";
import { clearCart } from "../features/Cart/cartSlice";

function ProductsPage() {
  // React Router Hooks
  const { category } = useParams();

  // Redux Global Store State
  const dispatch = useDispatch();
  const { allProducts, isLoading, error } = useSelector(
    (state) => state.products
  );

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

      dispatch(clearCart());
    } else {
      setMessage();
    }
  }, [dispatch, category]);

  return (
    <>
      <Row
        className="px-0"
        style={{
          textAlign: "center",
          borderRadius: "0 0 1rem 1rem",
          maxHeight: "25rem",
          objectFit: "contain",
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)),url("http://127.0.0.1:8000/media/images/cover-products.jpg")`,
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
          Products
        </h1>
      </Row>
      <Container>
        <Row className=" px-0 text-center">
          {message && <Message variant="success">{message}</Message>}

          <Nav
            fill
            className={`ps-auto ${
              selectedCategory === "bundles" ? "active" : ""
            }`}
            variant="tabs"
            style={{ fontSize: "1.3rem", fontWeight: 700 }}
          >
            <Nav.Item>
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
              >
                Candles
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="text-black"
                onClick={() => handleSelectCategory("books")}
              >
                Books
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          <Col>
            {isLoading ? (
              <div className="d-flex vh-100 align-content-center justify-content-center ">
                <Loader size={"200px"} />
              </div>
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : selectedCategory === "candles" ? (
              <Row className="d-flex justify-content-center">
                {candles.map((product, index) => (
                  <Col md="auto" key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            ) : selectedCategory === "books" ? (
              <Row className="d-flex justify-content-center">
                {books.map((product) => (
                  <Col md="auto" key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Row className="d-flex justify-content-center">
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
    </>
  );
}

export default ProductsPage;
