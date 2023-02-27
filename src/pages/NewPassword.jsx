import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  //   const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [error]);

  const token = localStorage.getItem("resetTOken");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const resetPassword = { password, passwordConfirm };
    console.log(resetPassword);
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/v1/users/resetPassword/${token}`,
        resetPassword
      );
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <div style={{ marginTop: "25px" }}>
            <h5 className="login-text" style={{ textAlign: "center" }}>
              Fill the form to reset your password
            </h5>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label> Confirm Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  type="password"
                  placeholder="confirm Password"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
export default ResetPassword;
