import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  Container,
  Table,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const baseAPIUrl = "/api/v1";

const UserProperties = () => {
  const [userProperties, setUserPropertiesData] = useState([]);
  const [currentPage] = useState(1);
  const [propertiesPerPage] = useState(60);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  let url = `${baseAPIUrl}/properties/all?perPage=${propertiesPerPage}&page=${currentPage}&`;

  if (startDate && endDate) {
    url += `startDate=${startDate}&endDate=${endDate}&`;
  }

  if (url.endsWith("&")) {
    url = url.slice(0, -1);
  }

  let formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    seconds: "numeric",
  });

  // Write a function to generate reports in pdf
  const generatePdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Property Report", 20, 20);

    let yOffset = 40;

    autoTable(doc, {
      head: [["Title", "Description", "Price"]],
      body: userProperties.map((property) => [
        property.title,
        property.description,
        property.price,
      ]),
      startY: yOffset,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 2,
        overflow: "linebreak",
        halign: "lefter",
        valign: "lefter",
      },
      columnStyles: {
        0: { columnWidth: 50 },

        1: {
          columnWidth: 80,
          createdCell: (cell) => {
            cell.styles.fontSize = 10;
            cell.styles.cellPadding = 2;
          },
        },
        2: {
          columnWidth: 50,
          createdCell: (cell) => {
            cell.styles.fontSize = 8;
            cell.styles.cellPadding = 2;
          },
        },
      },
    });

    doc.save(`property-report-${new Date().toJSON()}.pdf`);
  };

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

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(url);
    setUserPropertiesData(data.data);
  };

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
      </Form>
      <hr />
      <Button className="btn-btn-primary" onClick={generatePdf}>
        Generate Pdf
      </Button>
      <hr />
      <Row>
        {userProperties.length === 0 ? (
          <>
            <p
              style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
            >
              No Properties Found
            </p>

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
