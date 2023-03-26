import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserProperties = () => {
  const [userProperties, setUserPropertiesData] = useState([]);
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
          "properties/my-properties",
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


  const handleHideProperty = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const { data } = await axios({
        method: "PUT",
        url: `properties/hideProperty/${id}`,
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
      <Button
        style={{ backgroundColor: "#6736CF", border: "none" }}
        as={Link}
        to="/add-property"
      >
        {" "}
        <i
          style={{ margin: "5px", fontWeight: "bold" }}
          class="bi bi-plus-circle"
        ></i>
        Add Property
      </Button>
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
                  <i class="bi bi-pencil"></i>
                </Link>
                <Link to="" style={{ marginLeft: "10px", color: "red" }}>
                  <i
                    class="bi bi-calendar-x-fill"
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
