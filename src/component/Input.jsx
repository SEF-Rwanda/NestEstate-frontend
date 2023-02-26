import React from "react";

import { Form } from "react-bootstrap";

const Input = ({ id, labelText, type, name, value, onChange }) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{labelText}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Form.Group>
  );
};

export default Input;
