import React from "react";
import Message from "../components/Message";
import { Row, Button, Container, Table, Image } from "react-bootstrap";
function StockTable({ allProducts, setTab }) {
  function handleEditItem() {
    setTab("edit");
  }

  return (
    <>
      {allProducts.length === 0 ? (
        <Message>There are no items in stock. </Message>
      ) : (
        <Container>
          <Row>Add Product</Row>
          <Row>
            <Table className="text-center" hover>
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#ece7db",
                    }}
                    colSpan={2}
                  >
                    Product
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ece7db",
                    }}
                  >
                    Category
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ece7db",
                    }}
                  >
                    Price
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ece7db",
                    }}
                  >
                    Stock Count
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ece7db",
                    }}
                  >
                    Added
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ece7db",
                    }}
                  >
                    Edit Product
                  </th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((item) => (
                  <tr key={item.product_id} className="align-middle">
                    <td>
                      <Image
                        src={`http://127.0.0.1:8000/${item.image}`}
                        style={{ height: "75px", width: "75px" }}
                      ></Image>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>${item.price}</td>
                    <td>{item.stock_count}</td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      <Button
                        onClick={() => handleEditItem(item.product_id)}
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
        </Container>
      )}
    </>
  );
}
export default StockTable;
