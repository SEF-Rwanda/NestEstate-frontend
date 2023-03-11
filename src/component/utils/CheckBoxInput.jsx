import { Form } from "react-bootstrap";

const CheckBoxInput = ({ id, label, checked, onChange }) => {
  return (
    <Form.Group controlId={id}>
      <Form.Check
        type="checkbox"
        label={label}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </Form.Group>
  );
};

export default CheckBoxInput;
