import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import StockTable from "../components/StockTable";
import UsersTable from "../components/UsersTable";
import OrdersTable from "../components/OrdersTable";

import { getProducts } from "../features/Products/productsSlice";
import EditProductForm from "../components/EditProductForm";
import EditUserForm from "../components/EditProductForm";

function AdminPage() {
  // Redux Global Store State
  const dispatch = useDispatch();
  const { allProducts, isLoading, error } = useSelector(
    (state) => state.products
  );

  // Local State
  const [tab, setTab] = useState("stock");

  // Event Handler Functions
  function handleSelectedTab(tab) {
    setTab(tab);
  }

  // React Hooks
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container>
      <Row className=" px-0 text-center">
        <h1 className="text-center mt-5 mb-4">Admin</h1>
        <Nav
          fill
          style={{ fontSize: "1.3rem", fontWeight: 700 }}
          className="ps-auto"
          variant="tabs"
          defaultActiveKey="/home"
        >
          <Nav.Item style={{ color: "black" }}>
            <Nav.Link
              className="mb-0 text-black ms-auto"
              onClick={() => handleSelectedTab("stock")}
            >
              Stock
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              className="text-black"
              onClick={() => handleSelectedTab("users")}
              eventKey="link-1"
            >
              Users
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              className="text-black"
              onClick={() => handleSelectedTab("orders")}
              eventKey="link-2"
            >
              Orders
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      <Row>
        <Col md={12}>
          {isLoading ? (
            <div className="d-flex vh-100 align-content-center justify-content-center ">
              <Loader size={"200px"} />
            </div>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : tab === "stock" ? (
            <Row>
              <StockTable allProducts={allProducts} setTab={setTab} />
            </Row>
          ) : tab === "users" ? (
            <Row>
              <UsersTable setTab={setTab} />
            </Row>
          ) : tab === "orders" ? (
            <Row>
              <OrdersTable />
            </Row>
          ) : tab === "editProduct" ? (
            <Row>
              <EditProductForm />
            </Row>
          ) : (
            <Row>
              <EditUserForm />
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;
