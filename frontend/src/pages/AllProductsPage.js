import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [bookProducts, setBookProducts] = useState([]);
  const [candleProducts, setCandleProducts] = useState([]);
  const [bundleProducts, setBundleProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("bundles");

  function handleSelectCategory(category) {
    setSelectedCategory(category);
  }

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products");

        if (!res.ok) {
          throw new Error(res.status);
        }

        const data = await res.json();

        // console.log("DATA: ", data);

        setProducts(data);

        const books = data.filter((product) => product.category === "books");
        setBookProducts(books);

        const candles = data.filter(
          (product) => product.category === "candles"
        );
        setCandleProducts(candles);

        const bundles = data.filter(
          (product) => product.category === "bundles"
        );
        setBundleProducts(bundles);
      } catch (error) {
        console.log("CAUGHT ERROR: ", error);
      }
    }

    getProducts();
  }, []);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <Table hover>
            <thead className="">
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
        </Col>
        <Col md={9}>
          {selectedCategory === "candles" ? (
            <Row>
              <h1>Candles</h1>
              {candleProducts.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          ) : selectedCategory === "books" ? (
            <Row>
              <h1>Books</h1>
              {bookProducts.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <Row>
              <h1>Bundles</h1>
              {bundleProducts.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
      {/* 
      <Row>
        <h1>Candles</h1>
        {candleProducts.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <Row>
        <h1>Books</h1>
        {bookProducts.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row> */}
    </Container>
  );
}

export default AllProductsPage;
