import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { Pie } from "react-chartjs-2";

const baseAPIUrl = "/api/v1";

const DashboardInterface = () => {
  const [propertyCount, setPropertyCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [houseCount, setHouseCount] = useState(0);
  const [plotCount, setPlotCount] = useState(0);
  const [availablePropertyCount, setAvailablePropertyCount] = useState(0);
  const [unavailablePropertyCount, setUnavailablePropertyCount] = useState(0);
  const [approvedPropertyCount, setApprovedPropertyCount] = useState(0);
  const [unapprovedPropertyCount, setUnapprovedPropertyCount] = useState(0);
  const [hiddenPropertyCount, setHiddenPropertyCount] = useState(0);
  const [unhiddenPropertyCount, setUnhiddenPropertyCount] = useState(0);
  const [houseForSaleCount, setHouseForSaleCount] = useState(0);
  const [houseForRentCount, setHouseForRentCount] = useState(0);
  const [availablePlotCount, setAvailablePlotCount] = useState(0);
  const [unavailablePlotCount, setUnavailablePlotCount] = useState(0);

  useEffect(() => {
    countRecords();
  });

  const countRecords = async () => {
    try {
      const { data } = await axios.get(`${baseAPIUrl}/reports`);
      setPropertyCount(data.data.totalProperties);
      setUserCount(data.data.totalUsers);
      setHouseCount(data.data.totalHouseProperties);
      setPlotCount(data.data.totalPlotProperties);
      setAvailablePropertyCount(data.data.totalAvailableProperties);
      setUnavailablePropertyCount(data.data.totalUnavailableProperties);
      setApprovedPropertyCount(data.data.totalApprovedProperties);
      setUnapprovedPropertyCount(data.data.totalUnapprovedProperties);
      setHiddenPropertyCount(data.data.totalHiddenProperties);
      setUnhiddenPropertyCount(data.data.totalUnhiddenProperties);
      setHouseForSaleCount(data.data.totalHouseForSale);
      setHouseForRentCount(data.data.totalHouseForRent);
      setAvailablePlotCount(data.data.totalAvailablePlots);
      setUnavailablePlotCount(data.data.totalUnavailablePlots);
    } catch (e) {
      throw new Error(e);
    }
  };

  //       Admin Dashboard {userCount} {propertyCount} {houseCount} {plotCount} {availablePropertyCount} {unavailablePropertyCount} {approvedPropertyCount} {unapprovedPropertyCount} {hiddenPropertyCount} {unhiddenPropertyCount} {houseForSaleCount} {houseForRentCount} {availablePlotCount} {unavailablePlotCount}

  return (
    <Container>
      <h3
        className="mb-3 mt-3"
        style={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "30px",
          color: "#000000",
          textAlign: "center",
        }}
      >
        Admin Dashboard
      </h3>
      <hr />

      <Row>
        <Col xs={6} md={3}>
          <Card style={{ backgroundColor: "#ABA0C1" }}>
            <Card.Body>
              <Card.Title>{propertyCount}</Card.Title>
              <Card.Text>Total Properties</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card style={{ backgroundColor: "#B1B2DF" }}>
            <Card.Body>
              <Card.Title>{userCount}</Card.Title>
              <Card.Text>Total Users</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card style={{ backgroundColor: "#6CB26A" }}>
            <Card.Body>
              <Card.Title>{houseCount}</Card.Title>
              <Card.Text>Total Houses</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card style={{ backgroundColor: "#FAEB63" }}>
            <Card.Body>
              <Card.Title>{plotCount}</Card.Title>
              <Card.Text>Total Plots</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardInterface;
