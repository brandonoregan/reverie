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
        <div>
          <img
            src="https://reverie-bucket.s3.amazonaws.com/static/images/logo.jpg"
            alt="Reverie Logo"
            className="imageStyle"
          ></img>
          {/* <img
            src={"http://127.0.0.1:8000/media/static/images/logo.jpg"}
            alt="Reverie Logo"
            className="imageStyle"
          ></img> */}
        </div>
        <Carousel.Caption>
          <LinkContainer to="/products">
            <Button variant="outline-dark">View Products</Button>
          </LinkContainer>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://images.pexels.com/photos/194096/pexels-photo-194096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Reverie Logo"
          className="d-block w-100"
          style={imageStyle}
        ></img>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://images.pexels.com/photos/7265312/pexels-photo-7265312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Reverie Logo"
          className="d-block w-100"
          style={imageStyle}
        ></img>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
