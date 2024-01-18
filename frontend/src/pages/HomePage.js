import React, { useState, useEffect } from "react";
import { Card, Container, Button, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";

const products = [
  {
    id: 8,
    name: "Peter Pan",
    image: "http://127.0.0.1:8000/media/images/peter-pan.webp",
    category: "books",
    description:
      "When Peter Pan flies into the Darlings' room one dusky evening, he convinces Wendy and her brothers to come with him to the magical world of Neverland, where children never grow old.",
    rating: "4.50",
    review_count: 11,
    price: "15.99",
    stock_count: 6,
    createdAt: "2024-01-16T09:47:49.460088Z",
    user: 1,
  },
  {
    id: 10,
    name: "Star Crossed Lovers",
    image: "http://127.0.0.1:8000/media/images/star-crossed-lovers.webp",
    category: "candles",
    description:
      "A soothing combination of coconut milk, soft florals, thrift & sea salt. Perfect for a relaxing Sunday night.",
    rating: "4.00",
    review_count: 16,
    price: "19.99",
    stock_count: 11,
    createdAt: "2024-01-16T09:53:39.021046Z",
    user: 1,
  },
];

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
  const [user, setUser] = useState([]);

  // useEffect(() => {
  //   async function getHello() {
  //     try {
  //       const res = await fetch("http://127.0.0.1:8000/api/get-user");

  //       if (!res.ok) {
  //         throw new Error(res.status);
  //       }

  //       const data = await res.json();

  //       console.log("DATA: ", data);

  //       setUser(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getHello();
  // }, []);

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
                <Link to="products">
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
