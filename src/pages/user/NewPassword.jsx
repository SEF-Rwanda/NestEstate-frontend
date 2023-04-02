import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

const baseAPIUrl = "/api/v1";
const ResetPassword = () => {
  const navigate = useNavigate();
  //   const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { token } = useParams();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [error]);

  console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resetPassword = { password, passwordConfirm };
    console.log(resetPassword);
    try {
      const { data } = await axios.patch(
        `${baseAPIUrl}/users/resetPassword/${token}`,
        resetPassword
      );
      console.log(data);

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error.response);

      // setError(error.response.data);
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
