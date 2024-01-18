import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function LoginPage() {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`token/`, {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        navigate("/");
        console.log("Response", res);
        console.log("Response-Data: ", res.data);
      });
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <Form className="registerForm m-3">
            <h3>Login</h3>

            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChange}
                name="username"
                type="text"
                placeholder="Username"
                required
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <Button onClick={handleSubmit} variant="secondary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
