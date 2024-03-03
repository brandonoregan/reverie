import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "../components/Slider";
import CategoryCard from "../components/CategoryCard";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/Cart/cartSlice";
import Message from "../components/Message";

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
  // Local State
  const [message, setMessage] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    // Handle success message StripeAPI
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Your purchase was successful.");

      dispatch(clearCart());
    } else {
      setMessage();
    }
  }, [dispatch]);

  return (
    <div>
      <Slider />
      <Container>
        {message && <Message variant="success">{message}</Message>}
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
