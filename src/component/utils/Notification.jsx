import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { IoMdNotificationsOutline } from "react-icons/io";

const Notification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);

  const toggleNotification = () => setShowNotification(!showNotification);

  return (
    <Container
      className="d-flex justify-content-center align-content-center"
      style={{
        backgroundColor: "#fff",
        height: "35px",
        width: "32px",
        marginTop: "4px",
      }}
    >
      <div className="notification-icon">
        <h6 style={{ color: "red", marginLeft: "4px" }}>{2}</h6>
        <IoMdNotificationsOutline size={24} />
      </div>
    </Container>
  );
};

export default Notification;
