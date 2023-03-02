import { Container, Row, Col, Button} from "react-bootstrap";
import { useState, useEffect} from "react";
import Modal from 'react-bootstrap/Modal';
import UpdateUserProfile from "./UpdateProfile";
import http from "../utils/http";

// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";


const MyProfile = () => {

    const token = localStorage.getItem("token");
    let user = null;
    if (token) {
      user = jwt_decode(token);
    }

    const [userdata, setUserData] = useState({})
        
    const getProfile = async (id) => {
    const response = await http.get(`/users/profile/${id}`)
    setUserData(response.data.data);
    return response;
    }
    useEffect(() => {
      getProfile(user.id);
  }, [user.id]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col >
          <Row className="justify-content-md-center" style={{textAlign:'center'}}>
          <h1>My  profile</h1>
            <div>
              <img src="/images/profile.png"/>
            </div>
            <br />
            <Button variant="primary" onClick={handleShow} size="sm" style={{width:'50%',backgroundColor:'#6736CF'}}>
              Edit Profile
            </Button>
          </Row>
        </Col>
        <Col md={6}>
          <p>Full Name</p>
          <h4>{userdata.firstName} {userdata.lastName}</h4>
          <p>Email</p>
          <h4>{userdata.email}</h4>
          <p>Joined on</p>
          <h4>2023-01-01</h4>
          <Row>
            <Col>
            <Button variant="primary" size="sm" style={{width:'40%',backgroundColor:'#6736CF'}} href='/properties'>
            My properties
            </Button>             
            &nbsp;&nbsp;
            <Button variant="primary" size="sm" style={{width:'40%',backgroundColor:'#6736CF'}} href='/send-email'>
            Change password
            </Button>
            </Col>
          </Row> 
        </Col>
      </Row>
    </Container>
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Update Profile</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <UpdateUserProfile />     
    </Modal.Body>
  </Modal>
  </>
  );
};

export default MyProfile;