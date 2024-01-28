import React from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/Auth/authSlice";

import { loginSchema } from "../schemas/index";
import { useFormik } from "formik";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function LoginPage() {
  // Redux Hooks
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { error } = auth;

  const {
    handleSubmit,
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, actions) => {
      dispatch(loginUser(values.username, values.password));
    },
  });

  return (
    <Container fluid style={{ position: "relative" }}>
      <Row style={{ height: "20rem", backgroundColor: "#ece7db" }}>
        <Col className="d-flex justify-content-center">
          {error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div
              style={{
                position: "absolute",
                top: "5rem",
                border: "1px solid",
                backgroundColor: "white",
                borderRadius: "1rem",
                display: "flex",
                maxWidth: "800px",
              }}
            >
              <div
                style={{
                  width: "50%",
                }}
              >
                <Image
                  src="http://127.0.0.1:8000/media/images/logo.jpg"
                  alt="Reverie Logo"
                  style={{
                    borderRadius: "1rem 0 0 1rem",
                    objectFit: "contain",
                    maxWidth: "100%",
                  }}
                ></Image>
              </div>
              <div
                style={{
                  flexGrow: 1,
                  dsiplay: "flex",
                  alignItems: "center",
                  height: "100%",
                  padding: "1rem",
                }}
                className="mt-auto mb-auto"
              >
                <Form
                  style={{}}
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="registerForm m-3"
                >
                  <h3 className="text-center mb-4">Welcome Back</h3>
                  <Form.Group className="mb-3">
                    <Form.Control
                      onChange={handleChange}
                      value={values.username}
                      onBlur={handleBlur}
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Username"
                      required
                      className={
                        errors.username && touched.username ? "input-error" : ""
                      }
                    />
                    {errors.username && touched.username && (
                      <Form.Text className="inputErrorMessage text-muted ">
                        {errors.username}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      onChange={handleChange}
                      value={values.password}
                      onBlur={handleBlur}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      required
                      className={
                        errors.password && touched.password ? "input-error" : ""
                      }
                    />
                  </Form.Group>
                  <div className="w-100 text-center ">
                    <Link to="/register">
                      <p style={{ color: "black", textDecoration: "none" }}>
                        Don't have an account?
                      </p>
                    </Link>
                  </div>
                  <div className="w-100 text-center ">
                    <Button
                      disabled={isSubmitting}
                      variant="secondary"
                      type="submit"
                      className="w-100 mt-2"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
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

// WORKING FINE WITH FORMIK
// onSubmit: (values, actions) => {
//   console.log("VALUES:", values);
//   console.log("USERNAME & PASSWORD:", values.username, values.password);

//   console.log("FORM DATA", values);

//   axiosInstance
//     .post(`token/`, {
//       username: values.username,
//       password: values.password,
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
//     });

//   actions.resetForm();
// },
// });
