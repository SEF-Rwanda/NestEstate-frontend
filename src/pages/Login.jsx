import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginInfo = { email, password };
    console.log(loginInfo);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        loginInfo
      );
      localStorage.setItem("token", data.token);
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError(error.response.data);
    }
  };
    return (
        <div className="container">
            <div className="row justify-content-left">
                <div className="col-md-4">
                    <div style={{ marginTop: '25px' }}>
                        <h5 className="login-text">Sign In to Real Estate Application</h5>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <Form onSubmit={handleSubmit} className='login-form'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control className="input-form" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>
                            <Link to="/send-email"> Forgot Password ? </Link>
                            <br />
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember Me" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
                <div className="col-md-4">
                    {/* Add a photo */}
                    <img src="images/login_undraw.svg" alt="login" style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </div>
    )
};

export default Login;
