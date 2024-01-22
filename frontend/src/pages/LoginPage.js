import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import loginUser from "../features/Auth/authSlice";

function LoginPage() {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  // Redux Hooks
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isLoading, error } = auth;

  // Local State
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
    console.log("FORM DATA", formData);

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

        console.log("LOGIN Response", res);
        console.log("LOGIN Response-Data: ", res.data);
      })
      .catch((error) => {
        console.log("LOGIN ERROR:", error);
        // setError(error.message);
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(loginUser(formData.username, formData.password))
  //     .then(() => {
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.log("LOGIN ERROR:", error);
  //     });
  // };
  //

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          {error ? (
            <Message variant="danger">{error}</Message>
          ) : (
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
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;

// WITHOUT REDUX
// const handleSubmit = (e) => {
//   e.preventDefault();
//   console.log("FORM DATA", formData);

//   axiosInstance
//     .post(`token/`, {
//       username: formData.username,
//       password: formData.password,
//     })
//     .then((res) => {
//       localStorage.setItem("access_token", res.data.access);
//       localStorage.setItem("refresh_token", res.data.refresh);

//       axiosInstance.defaults.headers["Authorization"] =
//         "JWT " + localStorage.getItem("access_token");
//       navigate("/");

//       console.log("LOGIN Response", res);
//       console.log("LOGIN Response-Data: ", res.data);
//     })
//     .catch((error) => {
//       console.log("LOGIN ERROR:", error);
//       setError(error.message);
//     });
// };
