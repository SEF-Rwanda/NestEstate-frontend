import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Input from "../component/Input";

function SignupForm() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  useEffect(() => {
    console.log(fname);
  });

  return (
    <Container>
      <Row>
        <Col md={6} className="d-flex justify-content-center">
          <Form onSubmit={handleSubmit}>
            <Input
              controlId="fname"
              labelText="First Name"
              type="text"
              name="fname"
              value={fname}
              onChange={setFname}
            />
            <Input
              controlId="lname"
              labelText="Last Name"
              type="text"
              name="fname"
              value={lname}
              onChange={setLname}
            />
            <Input
              controlId="email"
              labelText="Email"
              type="email"
              name="email"
              value={email}
              onChange={setEmail}
            />
            <Input
              controlId="phone"
              labelText="Phone"
              type="phone"
              name="phone"
              value={phone}
              onChange={setPhone}
            />
            <Input
              controlId="password"
              labelText="Password"
              type="password"
              name="password"
              value={password}
              onChange={setPassword}
            />
            <Input
              controlId="confirmPassword"
              labelText="Confirm Password"
              type="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />

            <Form.Group controlId="termsAccepted">
              <Form.Check
                type="checkbox"
                label="I accept the terms and conditions"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!termsAccepted}>
              Submit
            </Button>
            <div>
              {" "}
              <span>Already have an account? Click here</span>
            </div>
          </Form>
        </Col>
        <Col md={6}>
          <img src="logo512.png" alt="description of " />
        </Col>
      </Row>
    </Container>
  );
}

export default SignupForm;
