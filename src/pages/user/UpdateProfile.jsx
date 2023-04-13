import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import http from "../../utils/http";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { updateUserProfile } from "../../state/user/userSlice";

const UpdateUserProfile = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    user = jwt_decode(token);
  }
  // console.log(user.id)
  const [userdata, setUserData] = useState({});
  const getProfile = async (id) => {
    const response = await http.get(`/api/v1/users/profile/${id}`);
    // console.log(response.data.data);
    setUserData(response.data.data);
    return response;
  };
  console.log(user);
  useEffect(() => {
    getProfile(user._id);
  }, [user._id]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ firstName, lastName }))
      .unwrap()
      .then((response) => {
        window.location.href = "/profile";
      });
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label
                style={{
                  color: "#C1BDBD",
                  fontFamily: "Poppins",
                  fonSize: "20em",
                }}
              >
                First name
              </Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={userdata.firstName}
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
                defaultValue={userdata.lastName}
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
