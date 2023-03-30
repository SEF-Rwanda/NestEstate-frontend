import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const baseAPIUrl = "http://172.29.98.230:5000/api/v1";
const UserProperties = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };

      try {
        const { data } = await axios.get(`${baseAPIUrl}/users`, config);
        setUsers(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Get authentication token
    const authToken = localStorage.getItem("token");

    // Fetch user data if authentication token exists
    if (authToken) {
      fetchUserData();
    }
  }, [users]);

  return (
    <Container>
      <h5 style={{ textAlign: "center", margin: "25px", fontWeight: "bold" }}>
        <i class="bi bi-people"></i> All Users
      </h5>
      <hr />
      <Row>
        {users.length === 0 ? (
          <>
            <p>Slow internet. We are unable to fetch data now.</p>

            <img
              src="/images/preview.gif"
              alt=""
              height="148px"
              width="428px"
              style={{ objectFit: "cover", align: "center" }}
            />
          </>
        ) : (
          <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>email</th>
                <th>telephone</th>
                <th>Verified</th>
                <th>Admin</th>
                <th>Edit/MakeAdmin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {user.isVerified ? (
                      <i className="bi bi-check-lg text-success"></i>
                    ) : (
                      <i className="bi bi-x-lg text-danger"></i>
                    )}
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i className="bi bi-check-lg text-success"></i>
                    ) : (
                      <i className="bi bi-x-lg text-danger"></i>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/users/${user.id}`}
                      style={{ marginRight: "10px", color: "black" }}
                    >
                      <i class="bi bi-pencil"></i>
                    </Link>
                    <Link to="" style={{ marginLeft: "10px", color: "green" }}>
                      <i class="bi bi-person-up"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
    </Container>
  );
};

export default UserProperties;
