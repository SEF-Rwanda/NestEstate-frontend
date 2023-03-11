import React from "react";
import { Form } from "react-bootstrap";
function Label({ text }) {
  return (
    <Form.Label
      style={{
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "14px",
        lineHeight: "36px",
        color: "#000000",
      }}
    >
      {text}
    </Form.Label>
  );
}

export default Label;
