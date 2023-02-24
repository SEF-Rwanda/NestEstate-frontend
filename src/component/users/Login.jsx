import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

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

            const { data } = await axios.post("http://localhost:5000/api/v1/users/login", loginInfo);
            localStorage.setItem("token", data.token)
            navigate("/");
            window.location.reload();
        } catch (error) {
            setError(error.response.data);
        }

    }

    return (
        <Container>
            <Row>
                <Col>
                    <div style={{ marginTop: '25px' }}>
                        <h5 className="login-text" style={{ textAlign: "center" }}>Login Here</h5>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <Form onSubmit={handleSubmit} className='login-form'>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Col>
                <Col>

                </Col>
            </Row>
        </Container>
    )
};

export default Login;