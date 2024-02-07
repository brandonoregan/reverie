import { Card, Col, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function ProductCard({ product }) {
  return (
    <Card className={`${styles.productCard} my-2`} style={{ width: "18rem" }}>
      <LinkContainer to={`product/${product.id}`}>
        <Card.Img
          className={styles.productImage}
          variant="top"
          src={product.image}
          alt={product.name}
        />
      </LinkContainer>

      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.productTitle}>{product.name}</Card.Title>
        {/* <Card.Text>{product.description}</Card.Text> */}
        <Row>
          <Col className={styles.priceCol}>
            <strong>Price:</strong>{" "}
            <span className={styles.price}>${product.price}</span>
          </Col>
          <Col className={styles.ratingCol}>
            <span>
              <Rating value={product.rating} color="black" />
            </span>
          </Col>
        </Row>
        <LinkContainer className="w-100" to={`product/${product.id}`}>
          <Button className={styles.moreButton} variant="dark">
            Product Details
          </Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
