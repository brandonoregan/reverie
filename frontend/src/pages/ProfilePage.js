import { getUserOrders } from "../features/Order/orderSlice";
import React, { useEffect, useState } from "react";
import { Row, Button, Container, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function ProfilePage({ setTab, setId }) {
  const [showDetail, setShowDetail] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.order);

  function handleOrderDetails(order_id) {
    setShowDetail(true);
    setOrderId(order_id);
  }

  const orderDetail = userOrders.filter((order) => order.id === orderId);

  console.log("orderDetail: ", orderDetail);

  useEffect(
    function () {
      dispatch(getUserOrders());
    },
    [dispatch]
  );

  return (
    <>
      <Row
        className="px-0"
        style={{
          textAlign: "center",
          borderRadius: "0 0 1rem 1rem",
          maxHeight: "25rem",
          objectFit: "contain",
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)),url("http://127.0.0.1:8000/media/images/cover-profile.jpg")`,
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
          Profile
        </h1>
      </Row>
      {showDetail ? (
        <Container fluid>
          <Row>
            <Table className="text-center" hover>
              <thead>
                <tr
                  style={{
                    fontSize: "1.3rem",
                    backgroundColor: "#ece7db",
                    fontWeight: 700,
                  }}
                >
                  <th style={{ backgroundColor: "#ece7db" }} colSpan={2}>
                    Product
                  </th>
                  <th style={{ backgroundColor: "#ece7db" }}>Price</th>
                  <th style={{ backgroundColor: "#ece7db" }}>Quantity</th>
                  <th style={{ backgroundColor: "#ece7db" }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail[0].items.map((item) => (
                  <tr key={item.id} className="align-middle">
                    <td>
                      <Image
                        src={`http://127.0.0.1:8000/${item.product.image}`}
                        style={{ height: "150px", width: "150px" }}
                      ></Image>
                    </td>

                    <td>{item.product.name}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
                <tr
                  style={{ backgroundColor: "#ece7db" }}
                  className="align-middle"
                >
                  <td
                    style={{ fontSize: "1.3rem", backgroundColor: "#ece7db" }}
                  >
                    <strong>Order Total</strong>
                  </td>
                  <td style={{ backgroundColor: "#ece7db" }}></td>
                  <td style={{ backgroundColor: "#ece7db" }}></td>
                  <td style={{ backgroundColor: "#ece7db" }}></td>
                  <td
                    style={{ fontSize: "1.3rem", backgroundColor: "#ece7db" }}
                  >
                    <strong>${orderDetail[0].total_price}</strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Row>
            <div className="scrollable-table-wrapper p-0 ">
              <Table className="text-center scrollable-table" hover>
                <thead>
                  <tr>
                    <th>Order Date</th>
                    <th>Payment Status</th>
                    <th>Delivered</th>
                    <th>Total Items</th>
                    <th>Total Price</th>
                    <th>Order Details</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders.map((order) => (
                    <tr key={order.id} className="align-middle">
                      <td>
                        {new Date(order.order_date).toLocaleDateString("en-GB")}
                      </td>
                      <td>{order.payment_status ? "Paid" : "Pending"}</td>
                      <td>{order.delivered ? "Delivered" : "On Route"} </td>
                      <td>{order.items.length} </td>
                      <td>${order.total_price} </td>
                      <td>
                        <Button
                          onClick={() => handleOrderDetails(order.id)}
                          type="button"
                          variant="light"
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Row>
          <Row></Row>
        </Container>
      )}
    </>
  );
}

export default ProfilePage;
