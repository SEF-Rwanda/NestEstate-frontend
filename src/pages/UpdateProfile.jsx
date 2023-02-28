import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect} from "react";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





const UpdateUserProfile = () => {
    // const navigate = useNavigate();
    const token = localStorage.getItem("token");
    let user = null;
    if (token) {
      user = jwt_decode(token);
    }

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

      try {
          

         
          const { data } = await axios.put(`http://localhost:5000/api/v1/users/profile/${user.id}`, updateProfileInfo);
          // toast.success("User profile updated successfully.");
          console.log(data)
          window.location.href = '/profile'
          // localStorage.setItem("token", data.token);
          // navigate("/profile");
      } catch (error) {
        // setError(error.response.data);
      }

  }
  return (
    <Container>

      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          {/* <h4>Edit profile</h4> */}
          <Form noValidate  onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label style={{color: '#C1BDBD', fontFamily:'Poppins', fonSize:'20em' }} >First name</Form.Label>
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
              <Form.Label>Last name</Form.Label>
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

export default UpdateUserProfile;