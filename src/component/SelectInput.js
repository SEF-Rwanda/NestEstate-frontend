import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const SelectInput = ({ id, label, description, value, onChange, values }) => {
  return (
    <Form.Group>
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
            {label}
          </Form.Label>
        </Col>
        <Col sm={12} md={8}>
          <Form.Select value={value} onChange={onChange}>
            <option disabled value="">
              {description}
            </option>
            {values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Form.Group>
  );
};

export default SelectInput;
