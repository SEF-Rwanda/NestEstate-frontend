import React, { useState } from "react";
import { Carousel, Modal, Card, Container, Row, Col } from "react-bootstrap";
import ButtonComponent from "../../component/utils/Button";

const SingleProperty = () => {
  // An array of image urls
  const images = [
    "https://source.unsplash.com/random/800x600",
    "https://source.unsplash.com/random/800x600",
    "https://source.unsplash.com/random/800x600",
  ];

  // A state variable to store the index of the current image
  const [index, setIndex] = useState(0);

  // A state variable to store whether the modal is shown or not
  const [showModal, setShowModal] = useState(false);

  // A handler function to change the index when selecting a carousel item
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // A handler function to show the modal when clicking on an image
  const handleShowModal = () => {
    setShowModal(true);
  };

  // A handler function to hide the modal when closing it
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container fluid="md">
      <Row className="justify-content-center" style={{ marginTop: "20px" }}>
        <Col md={6}>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image}
                  alt={`image_${index}`}
                  className="d-block w-100"
                  onClick={handleShowModal}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <ButtonComponent
            type="submit"
            value="Contact LandLord"
            action={() => {}}
          />
          <ButtonComponent
            type="submit"
            value="Pay for property"
            action={() => {}}
          />
        </Col>
        <Col md={6}>
          <label
            style={{
              color: "#000000",
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "10px",
            }}
          >
            Property details
          </label>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Text>Title </Card.Text>
                  <Card.Text>Category </Card.Text>
                  <Card.Text>Section</Card.Text>

                  <Card.Text>Size</Card.Text>
                  <Card.Text>UPI</Card.Text>
                  <Card.Text>Street Address</Card.Text>
                  <Card.Text>Master plan uses</Card.Text>
                  <Card.Text>Master plan level</Card.Text>
                  <Card.Text>Number of bedrooms </Card.Text>
                  <Card.Text>Number of bathrooms </Card.Text>
                </Col>
                <Col>
                  <Card.Text> House for Sales in Kimisagara </Card.Text>
                  <Card.Text> House </Card.Text>
                  <Card.Text> R1</Card.Text>

                  <Card.Text>200 M square</Card.Text>
                  <Card.Text>02/04/05/276</Card.Text>
                  <Card.Text>KG 22 St</Card.Text>
                  <Card.Text>Settlement</Card.Text>
                  <Card.Text>R1</Card.Text>
                  <Card.Text>5 </Card.Text>
                  <Card.Text>5 </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row
        className="justify-content-center"
        style={{ marginTop: "20px", marginBottom: "40px" }}
      >
        <Col md={6}>
          <label
            style={{
              color: "#000000",
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "10px",
            }}
          >
            Description
          </label>
          <Card>
            <Card.Body>
              <Card.Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <label
            style={{
              color: "#000000",
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "10px",
            }}
          >
            Other details
          </label>
          <Card>
            <Card.Body>
              <Card.Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <img src={images[index]} alt={`image_${index}`} className="img-fluid" />
      </Modal>
    </Container>
  );
};

export default SingleProperty;
