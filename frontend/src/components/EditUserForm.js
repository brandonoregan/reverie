import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { updateUserSchema } from "../schemas/index";
import { useFormik } from "formik";
import axiosInstance from "../utils/axios";

function EditUserForm({ userId, setTab, setMessage }) {
  // Local State
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleUpdate = async (values, actions) => {
    try {
      const response = await axiosInstance.put(
        `user/update/${userId}/`,
        values
      );
      console.log("User updated:", response.data);
      setTab("users");
      // setMessage("User has been successfully updated");
    } catch (error) {
      console.error("Update error:", error);
      setError(error);
    }
    actions.setSubmitting(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`user/delete/${userId}/`);
      console.log("User deleted:", response.data);

      setTab("users");
      // setMessage("User has been successfully deleted");
    } catch (error) {
      console.error("Delete error:", error);
      setError(error);
    }
  };

  const {
    handleSubmit,
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    isSubmitting,
    setValues,
  } = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      is_staff: false,
    },
    validationSchema: updateUserSchema,
    onSubmit: async (values, actions) => {
      handleUpdate(values, actions);
    },
  });

  useEffect(
    function () {
      async function getUser(user_id) {
        try {
          const { data } = await axiosInstance.get(`user/${user_id}`);

          setUser(data);

          setValues({
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            is_staff: data.is_staff,
          });

          console.log("GetUser: ", data);
        } catch (error) {
          console.log("Get User Error: ", error);
          setError(error);
        }
      }

      getUser(Number(userId));
    },
    [setValues, userId]
  );

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center mt-3">
          <Form
            style={{
              top: "5rem",
              // transform: "translate(-50%, -50%)",
              // border: "1px solid",
              // padding: "2rem",
              // backgroundColor: "white",
              // borderRadius: "1rem",
            }}
            onSubmit={handleSubmit}
            autoComplete="off"
            className="registerForm m-3"
          >
            <h3 className="text-center mb-3">Update User</h3>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>

              <Form.Control
                onChange={handleChange}
                value={values.username}
                onBlur={handleBlur}
                name="username"
                id="username"
                type="text"
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
              {/* {error && error.username && (
                <Form.Text className="inputErrorMessage text-muted ">
                  {error["username"]}
                </Form.Text>
              )} */}
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>First name</Form.Label>

                  <Form.Control
                    onChange={handleChange}
                    value={values.first_name}
                    onBlur={handleBlur}
                    id="first_name"
                    name="first_name"
                    type="text"
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
                  <Form.Label>Last name</Form.Label>

                  <Form.Control
                    onChange={handleChange}
                    value={values.last_name}
                    onBlur={handleBlur}
                    id="last_name"
                    name="last_name"
                    type="text"
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={values.email}
                onChange={handleChange}
                name="email"
                id="email"
                type="email"
                onBlur={handleBlur}
                required
                className={errors.email && touched.email ? "input-error" : ""}
              />

              {errors.email && touched.email && (
                <Form.Text className="inputErrorMessage text-muted ">
                  {errors.email}
                </Form.Text>
              )}

              {/* {error && error.email && (
                <Form.Text className="inputErrorMessage text-muted ">
                  {error.email}
                </Form.Text>
              )} */}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="is_staff"
                label="Is Staff?"
                checked={values.is_staff}
                onChange={handleChange}
                name="is_staff"
              />
            </Form.Group>

            <div className="w-100 mt-2 d-flex justify-content-between ">
              <Button
                className="w-25"
                disabled={isSubmitting}
                variant="secondary"
                type="submit"
              >
                Update
              </Button>
              <Button
                className="w-25 "
                disabled={isSubmitting}
                variant="danger"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
              >
                Delete User
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditUserForm;
