import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import StockTable from "../components/StockTable";
import UsersTable from "../components/UsersTable";
import OrdersTable from "../components/OrdersTable";
import OrderDetail from "../components/OrderDetail";

import { getProducts } from "../features/Products/productsSlice";
import EditProductForm from "../components/EditProductForm";
import EditUserForm from "../components/EditUserForm";

function AdminPage() {
  // Redux Global Store State
  const dispatch = useDispatch();
  const { allProducts, isLoading, error } = useSelector(
    (state) => state.products
  );

  // Local State
  const [tab, setTab] = useState("stock");
  const [id, setId] = useState();
  const [message, setMessage] = useState("");

  // Event Handler Functions
  function handleSelectedTab(tab) {
    setTab(tab);
  }

  // React Hooks
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <Row
        className="px-0"
        style={{
          textAlign: "center",
          borderRadius: "0 0 1rem 1rem",
          maxHeight: "25rem",
          objectFit: "contain",
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)),url("static/images/cover-admin.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1
          style={{
            padding: "3rem",
            color: "black",
            fontWeight: 900,
            fontFamily: "Judson",
            fontSize: "5rem",
            letterSpacing: "2px",
          }}
        >
          Admin
        </h1>
      </Row>
      <Container>
        {message && <Message variant="success">{message}</Message>}
        <Row className=" px-0 text-center">
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
                <StockTable
                  allProducts={allProducts}
                  setTab={setTab}
                  setId={setId}
                  setMessage={setMessage}
                />
              </Row>
            ) : tab === "users" ? (
              <Row>
                <UsersTable
                  setMessage={setMessage}
                  setTab={setTab}
                  setId={setId}
                />
              </Row>
            ) : tab === "orders" ? (
              <Row>
                <OrdersTable
                  setTab={setTab}
                  setId={setId}
                  setMessage={setMessage}
                />
              </Row>
            ) : tab === "editProduct" ? (
              <Row>
                <EditProductForm
                  setMessage={setMessage}
                  setTab={setTab}
                  productId={id}
                />
              </Row>
            ) : tab === "editUser" ? (
              <Row>
                <EditUserForm
                  setTab={setTab}
                  userId={id}
                  setMessage={setMessage}
                />
              </Row>
            ) : (
              <Row>
                <OrderDetail
                  orderId={id}
                  setMessage={setMessage}
                  setTab={setTab}
                />
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminPage;
