import { Card, Button, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function ProductCard({ product }) {
  return (
    <Card style={{ width: "18rem" }}>
      <LinkContainer to="product/{product.id}">
        <Card.Img className="productImage" variant="top" src={product.image} />
      </LinkContainer>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Row>
          <Col>Price: {product.price}</Col>
          <Col>Rating: {product.rating}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
