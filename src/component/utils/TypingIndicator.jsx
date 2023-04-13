import React from "react";
import "../../index.css";
import { Container } from "react-bootstrap";

const TypingIndicator = () => {
  return (
    <Container style={{ marginBottom: "5px" }}>
      <div className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </Container>
  );
};

export default TypingIndicator;
