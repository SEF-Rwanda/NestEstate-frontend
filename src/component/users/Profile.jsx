import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect} from "react";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";





const UserProfile = () => {
    const token = localStorage.getItem("token");
    const user = jwt_decode(token);
    console.log(user)

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    
    const [error, setError] = useState("");
    
    
    useEffect(() => {
      const timeout = setTimeout(() => {
          setError(null);
      }, 5000);
      return () => clearTimeout(timeout);
  }, [error]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const updateProfileInfo = { firstName, lastName };
      console.log(updateProfileInfo);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
          

          // const { data } = await axios.put("http://localhost:5000/api/v1/users/profile", updateProfileInfo, config);
          const { data } = await axios.put(`http://localhost:5000/api/v1/users/profile/${user.id}`, updateProfileInfo);
          localStorage.setItem("token", data.token)
      } catch (error) {
        // setError(error.response.data);
      }

  }
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Change your profile</h1>
          <Form noValidate  onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Your name</Form.Label>np
              <Form.Control
                required
                type="text"
                defaultValue={user.firstName}
                onChange={(e) => setFirstName(e.target.value)}
                name="firstName"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a first name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Your last name</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user.lastName}
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
            
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;