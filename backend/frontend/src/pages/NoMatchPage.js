import React from "react";
import Message from "../components/Message";
import { Container } from "react-bootstrap";
import BackButton from "../components/BackButton";

function NoMatchPage() {
  return (
    <Container fluid>
      <Message variant="danger">
        Unfortunately there was a network error because go back and try again.
        <BackButton toLink="/products">Go Back</BackButton>
      </Message>
    </Container>
  );
}

export default NoMatchPage;
