import React, { useEffect } from "react";
import Message from "../components/Message";
import { Row, Button, Container, Table, Image } from "react-bootstrap";
function StockTable({ allProducts, setTab, setId, setMessage }) {
  function handleEditItem(product_id) {
    setTab("editProduct");
    setId(product_id);
  }

  useEffect(function () {}, []);

  return (
    <>
      {allProducts.length === 0 ? (
        <Message>There are no items in stock. </Message>
      ) : (
        <Container>
          <Row>
            <div className="scrollable-table-wrapper p-0">
              <Table className="text-center scrollable-table" hover>
                <thead>
                  <tr>
                    <th colSpan={2}>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock Count</th>
                    <th>Added</th>
                    <th>Edit Product</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.map((item, index) => (
                    <tr key={item.id} className="align-middle">
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
            </div>
          </Row>
        </Container>
      )}
    </>
  );
}
export default StockTable;
