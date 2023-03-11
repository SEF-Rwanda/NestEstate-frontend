import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import Label from "./Label";

const SelectInput = ({ id, label, description, value, onChange, values }) => {
  return (
    <Form.Group>
      <Row>
        <Col sm={12} md={4}>
          <Label text={label} />
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
