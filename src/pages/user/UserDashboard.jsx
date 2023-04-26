import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Chart as ChartJS, registerables } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import jwt_decode from "jwt-decode";
import UserLinksComponent from "../../component/UserLinksComponent";
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';
import ChoosingUsComponent from "../../component/ChoosingUsComponent";
import FooterComponent from "../../component/FooterComponent";
ChartJS.register(...registerables);


const baseAPIUrl = "/api/v1";

const UserDashboardInterface = () => {
const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    user = jwt_decode(token);
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [propertyCount, setPropertyCount] = useState(0);
  const [houseCount, setHouseCount] = useState(0);
  const [plotCount, setPlotCount] = useState(0);
  const [availablePropertyCount, setAvailablePropertyCount] = useState(0);
  const [unavailablePropertyCount, setUnavailablePropertyCount] = useState(0);
  const [approvedPropertyCount, setApprovedPropertyCount] = useState(0);
  const [unapprovedPropertyCount, setUnapprovedPropertyCount] = useState(0);
  const [houseForSaleCount, setHouseForSaleCount] = useState(0);
//   const [houseForRentCount, setHouseForRentCount] = useState(0);
  const [availablePlotCount, setAvailablePlotCount] = useState(0);
  const [unavailablePlotCount, setUnavailablePlotCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    countRecords();
  });

  const countRecords = async () => {
    try {
    //   const { data } = await axios.get(`${baseAPIUrl}/users/reports`);
      const { data }= await axios.get("http://localhost:5000/api/v1/users/reports", config);
      setPropertyCount(data.data.totalProperties);
      setHouseCount(data.data.totalHouseProperties);
      setPlotCount(data.data.totalPlotProperties);
      setAvailablePropertyCount(data.data.totalAvailableProperties);
      setUnavailablePropertyCount(data.data.totalUnavailableProperties);
      setApprovedPropertyCount(data.data.totalApprovedProperties);
      setUnapprovedPropertyCount(data.data.totalUnapprovedProperties);
      setHouseForSaleCount(data.data.totalHouseForSale);
    //   setHouseForRentCount(data.data.totalHouseForRent);
      setAvailablePlotCount(data.data.totalAvailablePlots);
      setUnavailablePlotCount(data.data.totalUnavailablePlots);
    } catch (e) {
      throw new Error(e);
    }
  };

  const checkAvailability = {
    labels: ["Available", "Unavailable"],
    datasets: [
      {
        data: [availablePropertyCount, unavailablePropertyCount],
        backgroundColor: ["#6CB26A", "#FAEB63"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const checkPropertyApproval = {
    labels: ["Approved", "UnApproved"],
    datasets: [
      {
        data: [approvedPropertyCount, unapprovedPropertyCount],
        backgroundColor: ["#FAEB63", "#B1B2DF"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };  
  const checkHouseCategory = {
    labels: ["House for Rent", "Available for Sale"],
    datasets: [
      {
        label: "House Category",
        // data: [houseForRentCount, houseForSaleCount],
        backgroundColor: ["#6CB26A", "#FAEB63"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const checkPlotAvailability = {
    labels: ["Available Plots", "Unavailable Plots"],
    datasets: [
      {
        label: "Plot Availability",
        data: [availablePlotCount, unavailablePlotCount],
        backgroundColor: ["#6CB26A", "#FAEB63"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <Container>
      <p
        className="mb-3 mt-3"
        style={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "20px",
          color: "#000000",
          textAlign: "center",
        }}
      >
        Welcome back {user.firstName} {user.lastName}!        
      
      
      
      <Button
          className="float-end"
          style={{ backgroundColor: "#6736CF", border: "none" }}
          as={Link}
          to="/add-property"
        >
          {" "}
          <i
            style={{ margin: "5px", fontWeight: "bold", position:"right"}}
            className="bi bi-plus-circle"
          ></i>
          Add Property
      </Button>
      </p>
      <hr />
      
      
      <Row>
        <Col md={3}>
          {/* <p>Hello man</p> */}
          <Card style={{ width: '16rem' }}>
            <Card.Header>My properties info</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Total properties ({propertyCount})</ListGroup.Item>
              <ListGroup.Item>Total houses ({houseCount})</ListGroup.Item>
              <ListGroup.Item>Total plots ({plotCount})</ListGroup.Item>
              <ListGroup.Item>Approved properties ({approvedPropertyCount})</ListGroup.Item>
              <ListGroup.Item>Pending for approval ({unapprovedPropertyCount})</ListGroup.Item>
              <ListGroup.Item>Available properties ({availablePropertyCount})</ListGroup.Item>
              <ListGroup.Item>Unavailable properties ({unavailablePropertyCount})</ListGroup.Item>
            </ListGroup>
          </Card>
        
          < UserLinksComponent />
          

        </Col>
        <Col md={9}>
          {availablePropertyCount >0 ? (
            <>
            <Row>
              <p>
               {"  "} You have posted {propertyCount} properties so far. {houseCount}{" "}houses and {plotCount} plots.
              </p>  
            </Row>
            
            <Row className="mt-3">
              <Col xs={6} md={4}>
                <Pie
                  data={checkAvailability}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                    },
                  }}
                />
              </Col>
              <Col xs={6} md={4}>
                <Pie
                  data={checkPropertyApproval}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                    },
                  }}
                />
              </Col>
              </Row>
              </>
            ) : (
              <>
              <Row>
                
                
                <img
                  src="/images/property.gif"
                  alt=""
                  height="448px"
                  width="428px"
                  style={{ objectFit: "cover", align: "center" }}
                />
                <p
              style={{ textAlign: "center", color: "gray", fontWeight: "bold" }}
            >
              You have not posted any property yet!
            </p>
              </Row>
              </>
          )}
        </Col>

        
      </Row>
      <ChoosingUsComponent />
      <FooterComponent />
    </Container>
  );
};

export default UserDashboardInterface;
