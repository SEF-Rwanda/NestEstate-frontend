import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

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
        Admin Dashboard {userCount} {propertyCount} {houseCount} {plotCount} {availablePropertyCount} {unavailablePropertyCount} {approvedPropertyCount} {unapprovedPropertyCount} {hiddenPropertyCount} {unhiddenPropertyCount} {houseForSaleCount} {houseForRentCount} {availablePlotCount} {unavailablePlotCount}

      </h3>
    </Container>
  );
};

export default DashboardInterface;
