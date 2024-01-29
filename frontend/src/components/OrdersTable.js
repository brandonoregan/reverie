import { getOrders } from "../features/Order/orderSlice";
import React, { useEffect } from "react";
import Message from "../components/Message";
import { Row, Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function OrdersTable() {
  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => state.order);

  function handleOrderDetails() {}

  useEffect(
    function () {
      dispatch(getOrders());
    },
    [dispatch]
  );

  return (
    <>
      {allOrders.length === 0 ? (
        <Message>There are currently no orders. </Message>
      ) : (
        <Container>
          <Row>
            <Table className="text-center" hover>
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#ece7db" }}>Order ID</th>
                  <th style={{ backgroundColor: "#ece7db" }}>User ID</th>
                  <th style={{ backgroundColor: "#ece7db" }}>Order Date</th>
                  <th style={{ backgroundColor: "#ece7db" }}>Payment Status</th>
                  <th style={{ backgroundColor: "#ece7db" }}>Delivered</th>
                  <th style={{ backgroundColor: "#ece7db" }}>Total Price</th>
                  <th style={{ backgroundColor: "#ece7db" }}>Order Details</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order) => (
                  <tr key={order.id} className="align-middle">
                    <td>{order.id}</td>
                    <td>{order.user}</td>
                    <td>
                      {new Date(order.order_date).toLocaleDateString("en-GB")}
                    </td>
                    <td>{order.payment_status ? "Paid" : "Pending"}</td>
                    <td>{order.delivered ? "Delivered" : "On Route"} </td>
                    <td>${order.total_price}</td>
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
          </Row>
          <Row></Row>
        </Container>
      )}
    </>
  );
}

export default OrdersTable;
