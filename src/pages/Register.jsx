import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Input from "../component/Input";
import { signup } from "../state/user/userSlice";
import { store } from "../state/store";

function SignupForm() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
      phone: phone,
      passwordConfirm: confirmPassword,
    };
    dispatch(signup(newUser));
  };
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newIsLoading = store.getState().user.loading;
      const isSuccess = store.getState().user.success;
      const error = store.getState().user.error;
      setIsFormLoading(newIsLoading);

      if (isSuccess) {
        navigate("/verify-account");
      } else if (error) {
        toast.error(error);
      }
    });
    return () => unsubscribe();
  });

  return (
    <Container
      style={{
        height: "calc(100vh - 8vh)",
        width: "100vw",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <Row>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Form onSubmit={handleSubmit}>
            <h3 className="text-secondary mb-5">Create user account</h3>
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
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />

            <Form.Group controlId="termsAccepted">
              <Form.Check
                type="checkbox"
                label="By signing up, you agree to the terms and conditions for this application."
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
              />
            </Form.Group>
            <Container className="d-flex justify-content-center align-items-center">
              <Button
                variant="primary"
                type="submit"
                disabled={!termsAccepted}
                style={{ background: "#6736CF" }}
              >
                {!isFormLoading ? (
                  "Submit"
                ) : (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  />
                )}
              </Button>
            </Container>
            <Container className="d-flex justify-content-center align-items-center">
              {" "}
              <span>
                Already have an account? Click
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#6736CF" }}
                >
                  {" "}
                  here
                </Link>
              </span>
            </Container>
          </Form>
        </Col>
        <Col md={6} className="create-image">
          <img src="images/login_undraw.svg" alt="description of " style={{}} />
        </Col>
      </Row>
    </Container>
  );
}

export default SignupForm;
