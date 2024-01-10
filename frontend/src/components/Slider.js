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
      <Carousel.Item>
        <img
          src="https://images.pexels.com/photos/7583935/pexels-photo-7583935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Reverie Logo"
          className="d-block w-100 mh-100"
          style={imageStyle}
        ></img>
        <Carousel.Caption>
          <p>Find somethiing you'll love</p>
          <LinkContainer to="/products">
            <Button variant="secondary">View Products</Button>
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
