import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

// const products = [];

function AllProductsPage() {
  // useEffect(() => {
  //   console.log(products);
  // });
  return (
    <Container>
      {/* <Row>
        {products.map((product) => (
          <Col>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row> */}
    </Container>
  );
}

export default AllProductsPage;
