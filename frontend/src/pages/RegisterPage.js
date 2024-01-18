import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function RegisterPage() {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    first_name: "",
    last_name: "",
    email: "",
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
      .post(`user/register/`, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        navigate("/");
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <Form className="registerForm m-3">
            <h3>Register</h3>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Control
                    onChange={handleChange}
                    name="first_name"
                    type="text"
                    placeholder="First name"
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    onChange={handleChange}
                    name="last_name"
                    type="text"
                    placeholder="Last name"
                    required
                  />
                </Col>
              </Row>
            </Form.Group>
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
                name="email"
                type="email"
                placeholder="Email"
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

export default RegisterPage;
