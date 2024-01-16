import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [bookProducts, setBookProducts] = useState([]);
  const [candleProducts, setCandleProducts] = useState([]);
  const [bundleProducts, setBundleProducts] = useState([]);

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
      <Row>
        <h1>Experiences</h1>
        {bundleProducts.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
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
      </Row>
    </Container>
  );
}

export default AllProductsPage;
