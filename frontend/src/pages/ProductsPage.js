import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Nav } from "react-bootstrap";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  loadingProducts,
  selectProduct,
} from "../features/Products/productsSlice";
import { useParams } from "react-router-dom";

function ProductsPage() {
  // React Router Hooks
  const { category } = useParams();

  // Redux Global Store State
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { allProducts, isLoading, error } = products;

  // Local State
  const [selectedCategory, setSelectedCategory] = useState("bundles");

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

    console.log("CATEGORY", category);
  }, [dispatch, category]);

  return (
    <Container>
      <Row className="my-1 px-0 ">
        <h1>All Products</h1>
        <Nav className="ps-auto" variant="tabs" defaultActiveKey="/home">
          {/* <Nav.Item className="pe-3">
            <Nav.Link eventKey="disabled" disabled>
              <strong>All Products</strong>
            </Nav.Link>
          </Nav.Item> */}

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
      <Row className="mt-3">
        {/* <Col md={3}>
          <Table hover>
            <thead>
              <th>All Products</th>
            </thead>
            <tbody>
              <tr onClick={() => handleSelectCategory("bundles")}>
                <td className="ps-0">Bundles</td>
              </tr>
              <tr onClick={() => handleSelectCategory("candles")}>
                <td className="ps-0">Candles</td>
              </tr>
              <tr onClick={() => handleSelectCategory("books")}>
                <td className="ps-0">Books</td>
              </tr>
            </tbody>
          </Table>
        </Col> */}
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
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          ) : selectedCategory === "books" ? (
            <Row>
              {books.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <Row>
              {bundles.map((product) => (
                <Col key={product.id}>
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
