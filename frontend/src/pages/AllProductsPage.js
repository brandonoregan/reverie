import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

function AllProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products");

        if (!res.ok) {
          throw new Error(res.status);
        }

        const data = await res.json();

        console.log("DATA: ", data);

        setProducts(data);
      } catch (error) {
        console.log("CAUGHT ERROR: ", error);
      }
    }

    getProducts();
  }, []);

  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AllProductsPage;
