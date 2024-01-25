import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "../components/Slider";
import CategoryCard from "../components/CategoryCard";

const categories = [
  {
    image: "http://127.0.0.1:8000/media/images/hamper-2.jpg",
    category: "bundles",
  },
  {
    image: "http://127.0.0.1:8000/media/images/star-crossed-lovers.webp",
    category: "candles",
  },
  {
    image: "http://127.0.0.1:8000/media/images/peter-pan.webp",
    category: "books",
  },
];

function HomePage() {
  return (
    <div>
      <Slider />
      <Container>
        <Row className="d-flex justify-content-center my-4">
          {categories.map((cat) => (
            <Col
              key={cat.category}
              className="d-flex justify-content-center mb-4 "
            >
              <CategoryCard cat={cat} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
