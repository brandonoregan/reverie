import { Card, Button, Col, Row, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Card className="my-2" style={{ width: "18rem" }}>
      <LinkContainer to={`product/${product.id}`}>
        <Card.Img
          className="productImage"
          variant="top"
          src={`http://localhost:8000${product.image}`}
          alt={product.name}
        />
      </LinkContainer>

      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        {/* <Card.Text>{product.description}</Card.Text> */}
        <Row>
          <Col>Price: {product.price}</Col>
          <Col>Rating: {product.rating}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
