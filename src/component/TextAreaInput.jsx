import { Form, Col, Row } from "react-bootstrap";
import Label from "./Label";

const TextArea = ({ id, placeholder, description, value, onChange }) => {
  return (
    <Form.Group controlId={id}>
      <Row>
        <Col sm={12} md={4}>
          <Label text={description} />
        </Col>
        <Col sm={12} md={8}>
          <Form.Control
            as="textarea"
            placeholder={placeholder}
            rows="5"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </Col>
      </Row>
    </Form.Group>
  );
};

export default TextArea;
