import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/Auth/authSlice";

import { loginSchema } from "../schemas";
import { useFormik } from "formik";

function LoginPage() {
  const navigate = useNavigate();

  // Redux Hooks
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { error, isLoading } = auth;

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
      if (!error) {
        navigate(-1);
        actions.resetForm();
      } else {
        console.log(error);
      }
    },
  });

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          {error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="registerForm m-3"
            >
              <h3>Login</h3>

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

              <Button disabled={isSubmitting} variant="secondary" type="submit">
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
