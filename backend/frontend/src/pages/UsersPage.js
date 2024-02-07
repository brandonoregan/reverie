import React from "react";
import {
  Button,
  Container,
  Card,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  FormGroup,
  FormLabel,
  FormCheck,
} from "react-bootstrap";

function UsersPage() {
  return (
    <Container fluid style={{ padding: 0, height: "50vh" }}>
      {" "}
      {/* Set the height to 50% of the viewport */}
      <div
        className="p-5"
        style={{
          backgroundColor: "#ece7db",
          height: "100%", // Fill the container
          backgroundSize: "cover",
        }}
      ></div>
      {/* Position the card at the bottom center of the container */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "0",
          width: "100%",
        }}
      >
        <Card
          className="mx-auto p-5"
          style={{
            maxWidth: "50vw",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)",
            marginBottom: "-15rem", // Shift upwards by half the card's height
          }}
        >
          <Card.Body className="text-center">
            <h2 className="fw-bold mb-5">Sign up now</h2>

            <Row>
              <Col md={6}>
                <FormGroup className="mb-4">
                  <FormLabel>First name</FormLabel>
                  <FormControl type="text" />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup className="mb-4">
                  <FormLabel>Last name</FormLabel>
                  <FormControl type="text" />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup className="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl type="email" />
            </FormGroup>

            <FormGroup className="mb-4">
              <FormLabel>Password</FormLabel>
              <FormControl type="password" />
            </FormGroup>

            <FormCheck
              type="checkbox"
              label="Subscribe to our newsletter"
              className="mb-4"
            />

            <Button variant="primary" className="w-100 mb-4">
              Sign up
            </Button>

            <div className="text-center">
              <p>or sign up with:</p>

              <Button variant="outline-primary" className="mx-2">
                <i className="fab fa-facebook-f" />
              </Button>

              <Button variant="outline-primary" className="mx-2">
                <i className="fab fa-twitter" />
              </Button>

              <Button variant="outline-primary" className="mx-2">
                <i className="fab fa-google" />
              </Button>

              <Button variant="outline-primary" className="mx-2">
                <i className="fab fa-github" />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default UsersPage;
