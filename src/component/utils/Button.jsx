import { Button } from "react-bootstrap";

const ButtonComponent = ({ value, type, action }) => {
  return (
    <Button
      variant="primary"
      type={type}
      style={{
        background: "#6736CF",
        borderRadius: "25px",
        marginTop: "10px",
        marginBottom: "10px",
        width: "160px",
        marginLeft: "10px",
      }}
      onClick={action}
    >
      {value}
    </Button>
  );
};

export default ButtonComponent;
