import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../component/utils/Input";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../state/user/userSlice";
import { store } from "../../state/store";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [error]);


  useEffect(()=>{
    const unsubscribe = store.subscribe(() => {
      const newIsLoading = store.getState().user.loading;
      const isSuccess = store.getState().user.success;
      const error = store.getState().user.error;
      setIsFormLoading(newIsLoading);

      if (isSuccess) {
        navigate("/");
        window.location.reload()
      } else if (error) {
        toast.error(error);
      }
    });
    return () => unsubscribe();
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginInfo = { email, password };
    dispatch(login(loginInfo))
  };
  return (
    <>
      <Container
        style={{ height: "calc(100vh - 8vh)" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Row className="d-flex justify-content-center align-items-center">
          <h1
            className="text-center"
            style={{ fontSize: "25px", fontWeight: "bold", margin: "25px" }}
          >
            Login Here
          </h1>
          <Col xs="4">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Form onSubmit={handleSubmit} className="login-form">
              <Input
                controlId="email"
                labelText="Email"
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={email}
                onChange={setEmail}
              />
              <Input
                controlId="password"
                labelText="Password"
                type="password"
                name="passwrod"
                placeholder="Enter password"
                value={password}
                onChange={setPassword}
              />
              <div style={{ marginLeft: "140px" }}>
                <Link to="/send-email" style={{ color: "#6736CF" }}>
                  {" "}
                  Forgot Password ?{" "}
                </Link>
                <br />
                <Button
                  style={{
                    backgroundColor: "#6736CF",
                    border: "none",
                    borderRadius: "25px",
                    width: "100px",
                    fontWeight: "bold",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                  type="submit"
                >
                  Login
                </Button>
                <p style={{ fontSize: "15px" }}>
                  Don't have an account? Click{" "}
                  <Link to="/register" style={{ color: "#6736CF" }}>
                    {" "}
                    here
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
          <Col xs="4">
            <img
              src="images/login_undraw.svg"
              alt="login"
              style={{ width: "100%", height: "100%" }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
