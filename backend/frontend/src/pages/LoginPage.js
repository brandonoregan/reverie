import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/Auth/authSlice";
import { loginSchema } from "../schemas/index";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

function LoginPage() {
  // Redux Hooks
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { error } = auth;

  const [loginError, setLoginError] = useState("");

  useEffect(
    function () {
      setLoginError(localStorage.getItem("loginError"));
    },
    [setLoginError]
  );

  const { handleSubmit, values, errors, handleBlur, handleChange, touched } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values, actions) => {
        dispatch(loginUser(values.username, values.password));
        actions.resetForm();
      },
    });

  return (
    <>
      <Container fluid style={{ position: "relative" }}>
        <Row style={{ height: "20rem", backgroundColor: "#ece7db" }}>
          <Col className="d-flex justify-content-center">
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
                  src="/static/images/logo.jpg"
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
                  <p className="ps-1  " style={{ color: "red" }}>
                    {loginError}
                  </p>
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
                  <div className="w-100 text-center black">
                    <Link to="/register">
                      <p style={{ color: "black", textDecoration: "none" }}>
                        Don't have an account?
                      </p>
                    </Link>
                  </div>
                  <div className="w-100 text-center ">
                    <Button
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
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginPage;
