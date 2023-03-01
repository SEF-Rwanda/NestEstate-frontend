import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const Input = ({ id, labelText, type, name, value, onChange }) => {
  return (
    <Form.Group controlId={id} style={{ marginBottom: "15px" }}>
      <Row>
        <Col>
          <Form.Label>{labelText}</Form.Label>
        </Col>
        <Col xs={8}>
          <Form.Control
            type={type}
            name={name}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        </Col>
      </Row>
    </Form.Group>
  );
};

export default Input;
