import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const baseAPIUrl = "/api/v1";

const UserProperties = () => {
  const [userProperties, setUserPropertiesData] = useState([]);
  let formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    seconds: "numeric",
  });

  useEffect(() => {
    // Make API request to fetch user data
    const fetchUserData = async () => {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };

      try {
        const { data } = await axios.get(
          `${baseAPIUrl}/properties/all`,
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

  console.log(userProperties);

  const authToken = localStorage.getItem("token");

  const approveProperty = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const { data } = await axios({
        method: "PUT",
        url: `${baseAPIUrl}/properties/approveProperty/${id}`,
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
        <i className="bi bi-houses"></i>
        {"  "}All Posts
      </h5>
      <hr />
      <Row>
        {userProperties.length === 0 ? (
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
                <th>Title</th>
                <th>Date</th>
                <th>Photo</th>
                <th>Price (Rwf)</th>
                <th>Available</th>
                <th>Hidden</th>
                <th>Edit/Approve</th>
              </tr>
            </thead>

            <tbody>
              {userProperties.map((property, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{property.title}</td>
                  <td>{formatter.format(new Date(property.createdAt))}</td>
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
                    {property.isAvailable ? (
                      <i className="bi bi-check-lg text-success"></i>
                    ) : (
                      <i className="bi bi-x-lg text-danger"></i>
                    )}
                  </td>
                  <td>
                    {property.isHidden ? (
                      <i className="bi bi-check-lg text-success"></i>
                    ) : (
                      <i className="bi bi-x-lg text-danger"></i>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/properties/${property.id}`}
                      style={{ marginRight: "10px", color: "black" }}
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>

                    {property.isApproved ? (
                      <Link
                        to=""
                        style={{ marginLeft: "10px", color: "green" }}
                      >
                        <i
                          className="bi bi-check-circle-fill"
                          onClick={() => approveProperty(property.id)}
                        ></i>
                      </Link>
                    ) : (
                      <Link to="" style={{ marginLeft: "10px", color: "gray" }}>
                        <i
                          className="bi bi-check-circle-fill"
                          onClick={() => approveProperty(property.id)}
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
