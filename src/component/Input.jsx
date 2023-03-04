import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const Input = ({ id, labelText, type, placeholder, name, value, onChange }) => {
  return (
    <Form.Group controlId={id}>
      <Row>
        <Col sm={12} md={4}>
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
            {labelText}
          </Form.Label>
        </Col>
        <Col sm={12} md={8}>
          <Form.Control
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        </Col>
      </Row>
    </Form.Group>
  );
};

export default Input;
