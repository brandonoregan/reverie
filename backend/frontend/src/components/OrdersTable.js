import { getOrders } from "../features/Order/orderSlice";
import React, { useEffect } from "react";
import Message from "../components/Message";
import { Row, Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function OrdersTable({ setTab, setId }) {
  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => state.order);

  function handleOrderDetails(order_id) {
    setTab("orderDetail");
    setId(order_id);
  }

  useEffect(
    function () {
      dispatch(getOrders());
    },
    [dispatch]
  );

  return (
    <>
      <Container style={{ position: "relative" }}>
        {allOrders.length === 0 ? (
          <Message>There are currently no orders. </Message>
        ) : (
          <Row>
            <div className="scrollable-table-wrapper p-0 ">
              <div class="order-table-container">
                <Table className="text-center scrollable-table" hover>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>User ID</th>
                      <th>Order Date</th>
                      <th>Payment Status</th>
                      <th>Delivered</th>
                      <th>Order Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.map((order) => (
                      <tr key={order.id} className="align-middle">
                        <td>{order.id}</td>
                        <td>{order.user.id}</td>
                        <td>
                          {new Date(order.order_date).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td>{order.payment_status ? "Paid" : "Pending"}</td>
                        <td>{order.delivered ? "Delivered" : "On Route"} </td>
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
            </div>
          </Row>
        )}
      </Container>
    </>
  );
}

export default OrdersTable;
