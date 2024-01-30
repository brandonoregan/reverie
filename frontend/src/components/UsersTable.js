import React, { useEffect, useState } from "react";
import Message from "../components/Message";
import { Row, Button, Container, Table } from "react-bootstrap";
import axiosInstance from "../utils/axios";

function UsersTable({ setTab, setId }) {
  const [users, setUsers] = useState([]);

  function handleEditUser(user_id) {
    setTab("editUser");
    setId(user_id);
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
            <div className="scrollable-table-wrapper p-0 ">
              <Table className="text-center scrollable-table" hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Staff</th>
                    <th>Edit user</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="align-middle">
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.first_name} </td>
                      <td>{user.last_name}</td>
                      <td>
                        {user.is_staff ? (
                          <i className="fa-solid fa-check"></i>
                        ) : (
                          <i className="fa-solid fa-x"></i>
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
            </div>
          </Row>
          <Row></Row>
        </Container>
      )}
    </>
  );
}

export default UsersTable;
