import { Card, Button, Col, Row, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const products = useSelector((state) => state.products);
  const { selectedProduct } = products;

  return (
    <Card className="my-2" style={{ width: "18rem" }}>
      <LinkContainer to={`product/${selectedProduct.id}`}>
        <Card.Img
          className="productImage"
          variant="top"
          src={`http://localhost:8000${selectedProduct.image}`}
          alt={selectedProduct.name}
        />
      </LinkContainer>

      <Card.Body>
        <Card.Title>{selectedProduct.name}</Card.Title>
        {/* <Card.Text>{selectedProduct.description}</Card.Text> */}
        <Row>
          <Col>Price: {selectedProduct.price}</Col>
          <Col>Rating: {selectedProduct.rating}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
