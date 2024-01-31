import React, { useEffect } from "react";
import { Row, Form, Container, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function OrderDetail({ orderId }) {
  const { allOrders } = useSelector((state) => state.order);

  const order = allOrders.filter((order) => order.id === orderId);

  console.log("ORDER: ", order);

  const orderObject = order[0];

  console.log("ORDER OBJECT: ", orderObject);

  const orderItems = orderObject.items;

  console.log("ORDER ITEMS: ", orderItems);

  useEffect(() => {}, []);

  return (
    <>
      <Container>
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
              {orderItems.map((item) => (
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
                <td style={{ fontSize: "1.3rem", backgroundColor: "#ece7db" }}>
                  <strong>Order Total</strong>
                </td>
                <td style={{ backgroundColor: "#ece7db" }}></td>
                <td style={{ backgroundColor: "#ece7db" }}></td>
                <td style={{ backgroundColor: "#ece7db" }}></td>
                <td style={{ fontSize: "1.3rem", backgroundColor: "#ece7db" }}>
                  <strong>${orderObject.total_price}</strong>
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
}

export default OrderDetail;
