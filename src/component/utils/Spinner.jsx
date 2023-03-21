import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner animation="border" />
    </div>
  );
};

export default Loader;
