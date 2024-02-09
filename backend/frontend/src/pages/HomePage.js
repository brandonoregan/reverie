import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "../components/Slider";
import CategoryCard from "../components/CategoryCard";

const categories = [
  {
    image: "static/images/hamper-1.jpg",
    category: "bundles",
  },
  {
    image: "static/images/emerald-city.webp",
    category: "candles",
  },
  {
    image: "static/images/little-women.webp",
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
