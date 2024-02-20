import React from "react";
import { Carousel, Button } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

const imageStyle = {
  height: "30rem",
  objectFit: "cover",
};

export default function Slider() {
  return (
    <Carousel slide={false} pause={"hover"} interval={null}>
      <Carousel.Item
        style={{
          objectFit: "contain",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#ece7db",
        }}
        className="carouselItem1"
      >
        <div className="heroText1">
          <h3>Find Reverie in every book.</h3>
        </div>
        <div className="logoSliderImage">
          <img
            src="static/images/logo.jpg"
            alt="Reverie Logo"
            className="imageStyle"
          ></img>
        </div>
        <Carousel.Caption>
          <LinkContainer to="/products">
            <Button variant="outline-dark">View Products</Button>
          </LinkContainer>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="static/images/cover-bookshop.jpg"
          alt="Reverie Logo"
          className="d-block w-100"
          style={imageStyle}
        ></img>
        <Carousel.Caption>
          <h3
            style={{
              fontFamily: "Judson",
              color: "ece7db",
              fontSize: "2.4rem",
              fontWeight: 700,
            }}
          >
            Take a look inside Reverie
          </h3>
          <LinkContainer to="/products/books">
            <Button variant="secondary">Shop now</Button>
          </LinkContainer>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="static/images/cover-products.jpg"
          alt="Reverie Logo"
          className="d-block w-100"
          style={imageStyle}
        ></img>
        <Carousel.Caption>
          <h3
            style={{
              fontFamily: "Judson",
              color: "ece7db",
              fontSize: "2.4rem",
              fontWeight: 700,
            }}
          >
            Reading is an experience
          </h3>
          <LinkContainer to="/products/books">
            <Button variant="secondary">Shop books</Button>
          </LinkContainer>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
