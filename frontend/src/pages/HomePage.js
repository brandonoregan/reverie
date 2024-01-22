import React, { useState, useEffect } from "react";
import { Card, Container, Button, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";

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
        <Row className="d-flex justify-content-center mt-4">
          {categories.map((cat) => (
            <Col key={cat.category} className="d-flex justify-content-center">
              <Card style={{ width: "18rem", height: "18rem" }}>
                <Image
                  style={{
                    position: "relative",
                    maxHeight: "18rem",
                    objectFit: "cover",
                    opacity: 0.7,
                  }}
                  src={cat.image}
                />
                <Link to={`products/${cat.category}`}>
                  <p
                    className="shopNowBtn"
                    style={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "white",
                      position: "absolute",
                      bottom: 50,
                      left: 40,
                      right: 40,
                      textAlign: "center",
                      zIndex: 99,
                    }}
                  >
                    Shop{" "}
                    {cat.category.charAt(0).toUpperCase() +
                      cat.category.slice(1)}
                  </p>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
