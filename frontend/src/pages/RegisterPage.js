import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { registerSchema } from "../schemas";
import { useFormik } from "formik";
import { registerUser } from "../features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function RegisterPage() {
  const dispatch = useDispatch();
  const { registerError } = useSelector((state) => state.auth);

  const { handleSubmit, values, errors, handleBlur, handleChange, touched } =
    useFormik({
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
            values.password,
            values.confirmPassword
          )
        );
      },
    });

  return (
    <Container fluid style={{ position: "relative" }}>
      <Row style={{ height: "20rem", backgroundColor: "#ece7db" }}>
        <Col className="d-flex justify-content-center ">
          <Form
            style={{
              position: "absolute",
              top: "5rem",
              // transform: "translate(-50%, -50%)",
              border: "1px solid",
              padding: "2rem",
              backgroundColor: "white",
              borderRadius: "1rem",
            }}
            onSubmit={handleSubmit}
            autoComplete="off"
            className="registerForm m-3"
          >
            <h3 className="text-center mb-3">Join Reverie Today</h3>
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
                    <Form.Text className="inputErrorMessage  ">
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
                    <Form.Text className="inputErrorMessage  ">
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
                <Form.Text className="inputErrorMessage  ">
                  {errors.username.message}
                </Form.Text>
              )}
              {registerError && registerError.username && (
                <Form.Text className="inputErrorMessage  ">
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

              {errors.email && touched.email && (
                <Form.Text className="inputErrorMessage  ">
                  {errors.email}
                </Form.Text>
              )}

              {registerError && registerError.email && (
                <Form.Text className="inputErrorMessage  ">
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
              {registerError && registerError.username && (
                <Form.Text className="inputErrorMessage">
                  {registerError["password"]}
                  <br></br>
                </Form.Text>
              )}
              <Form.Text
                className={`${
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
                <Form.Text className="inputErrorMessage  ">
                  {errors.confirmPassword}
                </Form.Text>
              )}

              {/* Serverside validation check */}
              {registerError && registerError.passwordConfirm && (
                <Form.Text
                  style={{ color: "red" }}
                  className="inputErrorMessage "
                >
                  {registerError.passwordConfirm}
                </Form.Text>
              )}
            </Form.Group>
            <div className="w-100 text-center ">
              <Link to="/login">
                <p style={{ color: "black", textDecoration: "none" }}>
                  Already have an account?
                </p>
              </Link>
            </div>

            <div className="w-100 text-center ">
              <Button
                className="ms-auto w-100 mt-2"
                // disabled={isLoading}
                variant="secondary"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row></Row>
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
