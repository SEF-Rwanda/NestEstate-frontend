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
  const [userProperties, setUserPropertiesData] = useState([]);
  const [currentPage] = useState(1);
  const [propertiesPerPage] = useState(10);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  let url = `${baseAPIUrl}/users?perPage=${propertiesPerPage}&page=${currentPage}&`;

  if (startDate && endDate) {
    url += `startDate=${startDate}&endDate=${endDate}&`;
  }

  if (url.endsWith("&")) {
    url = url.slice(0, -1);
  }
  // Get authentication token
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    // Make API request to fetch user data
    const fetchUserData = async () => {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };

      try {
        const { data } = await axios.get(
          `${baseAPIUrl}/properties/my-properties`,
          config
        );
        setUserPropertiesData(data.data);
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
    setUserPropertiesData(data.data);
  };

  const handleHideProperty = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const { data } = await axios({
        method: "PUT",
        url: `${baseAPIUrl}/properties/hideProperty/${id}`,
        headers: config.headers,
      });

      // refresh page
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h5 style={{ textAlign: "center", margin: "25px", fontWeight: "bold" }}>
        My Available Properties
      </h5>
      <hr />
      <Row className="align-items-center">
        <Col sm={3} className="my-1">
          <Button
            style={{ backgroundColor: "#6736CF", border: "none" }}
            as={Link}
            to="/add-property"
          >
            {" "}
            <i
              style={{ margin: "5px", fontWeight: "bold" }}
              className="bi bi-plus-circle"
            ></i>
            Add Property
          </Button>
        </Col>
        <Col sm={9} className="my-1">
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
                <Form.Label
                  htmlFor="inlineFormInputGroupUsername"
                  visuallyHidden
                >
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
        </Col>
      </Row>
      <hr />

      <Table responsive="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Photo</th>
            <th>Price</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {userProperties.map((property) => (
            <tr key={property.id}>
              <td>{property.title}</td>
              <td>
                {property.description.length > 80
                  ? `${property.description.substring(0, 80)}...`
                  : property.description}
              </td>
              <td>
                <img
                  src={property.mainImage.url}
                  alt=""
                  height="118px"
                  width="228px"
                  style={{ objectFit: "cover" }}
                />
              </td>
              <td>{property.price}</td>
              <td>
                <Link
                  to={`/properties/${property.id}`}
                  style={{ marginRight: "10px", color: "black" }}
                >
                  <i className="bi bi-pencil"></i>
                </Link>
                <Link to="" style={{ marginLeft: "10px", color: "red" }}>
                  <i
                    className="bi bi-calendar-x-fill"
                    onClick={() => handleHideProperty(property.id)}
                  ></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserProperties;
