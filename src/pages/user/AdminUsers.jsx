import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const baseAPIUrl = "/api/v1";
const UserProperties = () => {
  const authToken = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [currentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  let url = `${baseAPIUrl}/users?perPage=${usersPerPage}&page=${currentPage}&`;

  if (startDate && endDate) {
    url += `startDate=${startDate}&endDate=${endDate}&`;
  }

  if (url.endsWith("&")) {
    url = url.slice(0, -1);
  }

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
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(url);
    setUsers(data.data);
  };

  const makeUserAdmin = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const { data } = await axios({
        method: "PUT",
        url: `${baseAPIUrl}/users/makeAdmin/${id}`,
        headers: config.headers,
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h5 style={{ textAlign: "center", margin: "25px", fontWeight: "bold" }}>
        <i className="bi bi-people"></i> All Users
      </h5>
      <hr />
      <Form onSubmit={handleSearch}>
        <Row className="align-items-center">
          <Col sm={3} className="my-1">
            <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
              Start Date
            </Form.Label>
            <Form.Control
              type="date"
              id="inlineFormInputName"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Col>
          <Col sm={3} className="my-1">
            <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
              End Date
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="date"
                id="inlineFormInputGroupUsername"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs="auto" className="my-1">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>{" "}
      <br />
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
                      to="" //{`/users/${user.id}`}
                      style={{ marginRight: "10px", color: "black" }}
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>

                    {user.isAdmin ? (
                      <Link
                        to=""
                        style={{ marginLeft: "10px", color: "green" }}
                      >
                        <i
                          className="bi bi-person-up"
                          onClick={() => makeUserAdmin(user.id)}
                        ></i>
                      </Link>
                    ) : (
                      <Link to="" style={{ marginLeft: "10px", color: "gray" }}>
                        <i
                          className="bi bi-person-up"
                          onClick={() => makeUserAdmin(user.id)}
                        ></i>
                      </Link>
                    )}
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
