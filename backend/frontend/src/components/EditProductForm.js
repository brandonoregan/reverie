import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { updateUserSchema } from "../schemas/index";
import { useFormik } from "formik";
import axiosInstance from "../utils/axios";
import { updateProductSchema } from "../schemas/index";

function EditForm({ productId, setTab, setMessage }) {
  // Local State
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const handleUpdate = async (values, actions) => {
    try {
      const response = await axiosInstance.put(
        `products/update/${productId}/`,
        values
      );
      console.log("Product updated:", response.data);

      setTab("stock");
      // setMessage("User has been successfully updated");
    } catch (error) {
      console.error("Update error:", error);
      setError(error);
    }
    actions.setSubmitting(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `products/delete/${productId}/`
      );
      console.log("Product deleted:", response.data);

      setTab("stock");
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
      name: "",
      // image: "",
      category: "",
      description: "",
      price: "",
      stock_count: "",
    },
    validationSchema: updateProductSchema,
    onSubmit: async (values, actions) => {
      handleUpdate(values, actions);
    },
  });

  useEffect(
    function () {
      async function getProduct(product_id) {
        try {
          const { data } = await axiosInstance.get(`products/${productId}`);

          setProduct(data);

          setValues({
            name: data.name,
            // image: data.image,
            category: data.category,
            description: data.description,
            price: data.price,
            stock_count: data.stock_count,
          });

          console.log("GET PRODUCT : ", data);
        } catch (error) {
          console.log("PRODUCT ID: ", product_id);
          console.log("GET PRODUCT ERROR: ", error);
          setError(error);
        }
      }

      getProduct(productId);
    },
    [productId, setValues]
  );

  return (
    <Container>
      <Row className="d-flex justify-content-center mw-50 mt-3">
        <Col>
          <Form onSubmit={handleSubmit} className="my-3">
            <h3 className="text-center mb-3">Product Details</h3>

            {/* Product Name */}
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.name && touched.name && (
                <Form.Text className="input-error">{errors.name}</Form.Text>
              )}
            </Form.Group>

            {/* Image Upload */}
            {/* <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={(event) => {
                  setValues({
                    ...values,
                    image: event.currentTarget.files[0],
                  });
                }}
              />
              {errors.image && touched.image && (
                <Form.Text className="input-error">{errors.image}</Form.Text>
              )}
            </Form.Group> */}

            {/* Category Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              >
                <option value="bundles">Bundles</option>
                <option value="candles">Candles</option>
                <option value="books">Books</option>
              </Form.Control>
              {errors.caterory && touched.caterory && (
                <Form.Text className="input-error">{errors.category}</Form.Text>
              )}
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.description && touched.description && (
                <Form.Text className="input-error">
                  {errors.description}
                </Form.Text>
              )}
            </Form.Group>

            {/* Price */}
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.price && touched.price && (
                <Form.Text className="input-error">{errors.price}</Form.Text>
              )}
            </Form.Group>

            {/* Stock Count */}
            <Form.Group className="mb-3">
              <Form.Label>Stock Count</Form.Label>
              <Form.Control
                type="number"
                name="stock_count"
                value={values.stock_count}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.stock_count && touched.stock_count && (
                <Form.Text className="input-error">
                  {errors.stock_count}
                </Form.Text>
              )}
            </Form.Group>

            <div className="w-100 mt-2 d-flex justify-content-between">
              <Button
                className="w-25"
                disabled={isSubmitting}
                variant="secondary"
                type="submit"
              >
                Save
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
                Delete Product
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditForm;
