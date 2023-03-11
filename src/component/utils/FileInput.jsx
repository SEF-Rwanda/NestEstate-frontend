import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import Label from "./Label";

const FileInput = ({ id, labelText, type, placeholder, name, onChange }) => {
  return (
    <Form.Group controlId={id}>
      <Row>
        <Col sm={12} md={4}>
          <Label text={labelText} />
        </Col>
        <Col sm={12} md={8}>
          <Form.Control
            type={type}
            name={name}
            placeholder={placeholder}
            multiple
            accept="images/*"
            onChange={(event) => onChange(event)}
          />
        </Col>
      </Row>
    </Form.Group>
  );
};

export default FileInput;
