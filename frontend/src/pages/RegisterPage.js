import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import { registerSchema } from "../schemas";
import { useFormik } from "formik";
import { registerUser } from "../features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function RegisterPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error, registerError } = useSelector((state) => state.auth);

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
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values, actions) => {
      dispatch(
        registerUser(
          values.username,
          values.first_name,
          values.last_name,
          values.email,
          values.password
        )
      );
      actions.resetForm();
    },
  });

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <Form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="registerForm m-3"
          >
            <h3>Register</h3>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Control
                    onChange={handleChange}
                    value={values.first_name}
                    onBlur={handleBlur}
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="First name"
                    required
                    className={
                      errors.first_name && touched.first_name
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.first_name && touched.first_name && (
                    <Form.Text className="inputErrorMessage text-muted ">
                      {errors.first_name}
                    </Form.Text>
                  )}
                </Col>
                <Col>
                  <Form.Control
                    onChange={handleChange}
                    value={values.last_name}
                    onBlur={handleBlur}
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Last name"
                    required
                    className={
                      errors.last_name && touched.last_name ? "input-error" : ""
                    }
                  />

                  {errors.last_name && touched.last_name && (
                    <Form.Text className="inputErrorMessage text-muted ">
                      {errors.last_name}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChange}
                value={values.username}
                onBlur={handleBlur}
                name="username"
                id="username"
                type="text"
                placeholder="Username"
                required
                className={
                  errors.username && touched.username ? "input-error" : ""
                }
              />
              {errors.username && touched.username && (
                <Form.Text className="inputErrorMessage text-muted ">
                  {errors.username.message}
                </Form.Text>
              )}
              {registerError && registerError.username && (
                <Form.Text className="inputErrorMessage text-muted ">
                  {registerError["username"]}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                values={values.email}
                onChange={handleChange}
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                onBlur={handleBlur}
                required
                className={errors.email && touched.email ? "input-error" : ""}
              />

              {/* Client side validation check */}
              {errors.email && touched.email && (
                <Form.Text className="inputErrorMessage text-muted ">
                  {errors.email}
                </Form.Text>
              )}

              {/* Serverside validation check */}
              {registerError && registerError.email && (
                <Form.Text className="inputErrorMessage text-muted ">
                  {registerError.email}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                className={
                  errors.password && touched.password ? "input-error" : ""
                }
              />
              <Form.Text
                className={`text-muted ${
                  errors.password && touched.password ? "inputErrorMessage" : ""
                }`}
              >
                Password must be at least 7 characters long and include a
                number, an uppercase, and a lowercase letter.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? "input-error"
                    : ""
                }
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Form.Text className="inputErrorMessage text-muted ">
                  {errors.confirmPassword}
                </Form.Text>
              )}
            </Form.Group>
            <Button disabled={isSubmitting} variant="secondary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;

// const onSubmit = (e, values) => {
//   e.preventDefault();
//   console.log(formData);

//   axiosInstance
//     .post(`user/register/`, {
//       first_name: formData.first_name,
//       last_name: formData.last_name,
//       email: formData.email,
//       username: formData.username,
//       password: formData.password,
//     })
//     .then((res) => {
//       navigate("/");
//       console.log("REGISTER POST RESPONSE:", res);
//       console.log(res.data);
//     });
// };

// const handleChange = (e) => {
//   srtFormData({
//     ...formData,
//     // Trimming any whitespace
//     [e.target.name]: e.target.value.trim(),
//   });
// };

// const initialFormData = Object.freeze({
//   first_name: "",
//   last_name: "",
//   email: "",
//   username: "",
//   password: "",
// });
