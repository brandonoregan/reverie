import React, { useEffect, useState } from "react";
import Message from "../components/Message";
import { Row, Button, Container, Table, Image } from "react-bootstrap";
import axiosInstance from "../axios";

function UsersTable({ setTab }) {
  const [users, setUsers] = useState([]);

  function handleEditUser(user) {
    setTab(user);
  }

  useEffect(function () {
    async function getUsers() {
      try {
        const { data } = await axiosInstance.get("users/");

        setUsers(data);
      } catch (error) {
        console.log("Get Users Error: ", error);
      }
    }

    getUsers();
  }, []);

  return (
    <>
      {users.length === 0 ? (
        <Message>There are currently no users. </Message>
      ) : (
        <Container>
          <Row>
            <Table className="text-center" hover>
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#ece7db",
                    }}
                  >
                    ID
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ece7db",
                    }}
                  >
                    Username
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ece7db",
                    }}
                  >
                    Email
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ece7db",
                    }}
                  >
                    First name
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ece7db",
                    }}
                  >
                    Last name
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ece7db",
                    }}
                  >
                    Staff
                  </th>
                  <th
                    style={{
                      backgroundColor: "#ece7db",
                    }}
                  >
                    Edit user
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.product_id} className="align-middle">
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.first_name} </td>
                    <td>{user.last_name}</td>
                    <td>
                      {user.is_staff ? (
                        <i class="fa-solid fa-check"></i>
                      ) : (
                        <i class="fa-solid fa-x"></i>
                      )}
                    </td>
                    <td>
                      <Button
                        onClick={() => handleEditUser(user.id)}
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

export default UsersTable;
