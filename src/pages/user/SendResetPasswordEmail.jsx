import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const SendingEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendEmail = { email };
    console.log(sendEmail);
    try {
      const { data } = await axios.post(
        "users/forgotPassword",
        sendEmail
      );
      console.log("Hello world");
      console.log(data);
      console.log(data.resetToken);
      localStorage.setItem("resetToken", data.resetToken);
    } catch (error) {
      console.log(error.message);
      setError(error.response.data);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <div style={{ marginTop: "25px" }}>
            <h5 className="login-text" style={{ textAlign: "center" }}>
              Fill in your email address to receive a password reset link
            </h5>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Send Email
              </Button>
            </Form>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default SendingEmail;
