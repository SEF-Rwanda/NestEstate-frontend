import React, { useState, useEffect } from "react";
import { Carousel, Modal, Card, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonComponent from "../../component/utils/Button";
import { fetchSingleProduct } from "../../state/property/propertySlice";
import { createChat } from "../../state/chat/chatSlice";
import { store } from "../../state/store";
import Spinner from "../../component/utils/Spinner";
import Map from "../../component/utils/Map";

const lat = -1.9693568; // replace with your GPS coordinates
const lng = 30.1236224; // replace with your GPS coordinates

const SingleProperty = () => {
  const [property, setProperty] = useState(null);
  const [newChat, setNewChat] = useState(null);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const createChatWithLandlord = (id) => {
    dispatch(
      createChat({
        userId: id,
      })
    );
  };
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const isSuccess = store.getState().property.isFetchingPropertySuccess;
      const error = store.getState().property.fetchingPropertyError;
      const property = store.getState().property.fetchedProperty;
      const chat = store.getState().chat.selectedChat;
      const isCreateChatSuccess = store.getState().chat.isCreateChatSuccess;

      if (isSuccess) {
        if (property !== null) {
          setProperty(property);
          images.push(property?.mainImage?.url);
          property.otherImages.map((image) => images.push(image.url));
          setImages(images);
        }
      } else if (error) {
        toast.error(error);
      }
      if (isCreateChatSuccess) {
        setNewChat(chat);
        navigate("/messages");
      }
    });
    return () => unsubscribe();
  });
  function distance(lat1, lon1, lat2, lon2) {
    const p = 0.017453292519943295; // Math.PI / 180
    const c = Math.cos;
    const a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    const d = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    return d;
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        setLocation({
          latitude: lat,
          longitude: long,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  });

  return (
    <>
      {property !== null ? (
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
                action={() => createChatWithLandlord(property.postedBy)}
              />
              <ButtonComponent
                type="submit"
                value="Pay for property"
                onClick={() => {}}
              />
              <ButtonComponent
                type="submit"
                value="Locate property"
                action={() => setShowLocationModal(true)}
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
                      {property.category === "House" ? (
                        <Card.Text>Section</Card.Text>
                      ) : (
                        <></>
                      )}
                      <Card.Text>Size</Card.Text>
                      <Card.Text>UPI</Card.Text>
                      <Card.Text>Street Address</Card.Text>
                      <Card.Text>Master plan uses</Card.Text>
                      <Card.Text>Master plan level</Card.Text>
                      {property.category === "House" ? (
                        <Card.Text>Number of bedrooms </Card.Text>
                      ) : (
                        <></>
                      )}
                      {property.category === "House" ? (
                        <Card.Text>Number of bathrooms </Card.Text>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col>
                      <Card.Text> {property?.title}</Card.Text>
                      <Card.Text> {property.category}</Card.Text>
                      {property.category === "House" ? (
                        <Card.Text> {property?.section}</Card.Text>
                      ) : (
                        <></>
                      )}
                      <Card.Text>{property.size} M square</Card.Text>
                      <Card.Text>{property.upi} </Card.Text>
                      <Card.Text>{property?.streetAddress}</Card.Text>

                      <Card.Text>{property?.masterPlanUse}</Card.Text>
                      <Card.Text>{property?.masterPlanLevel}</Card.Text>
                      {property.category === "House" ? (
                        <Card.Text>{property?.bedrooms} </Card.Text>
                      ) : (
                        <></>
                      )}
                      {property.category === "House" ? (
                        <Card.Text>{property?.bathrooms} </Card.Text>
                      ) : (
                        <></>
                      )}
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
                  <Card.Text>{property.description}</Card.Text>
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
                  <Card.Text>{property.tank ? "Tank available" : ""}</Card.Text>
                  <Card.Text>
                    {property.parking ? "Parking available" : ""}
                  </Card.Text>
                  <Card.Text>
                    {property.internet ? "Internet available" : ""}
                  </Card.Text>
                  <Card.Text>{property.furnished ? "Furnished" : ""}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
            <img
              src={images[index]}
              alt={`image_${index}`}
              className="img-fluid"
            />
          </Modal>
          <Modal
            show={showLocationModal}
            onHide={() => setShowLocationModal(false)}
          >
            <Modal.Body>
              <div>
                <Map lat={lat} lng={lng} />
              </div>
              <Modal.Footer>
                This Property is located in{" "}
                {distance(
                  property.geoLocation.latitude,
                  property.geoLocation.longitude,
                  location.latitude,
                  location.longitude
                ).toFixed(2)}
                km from you location
              </Modal.Footer>
            </Modal.Body>
          </Modal>
        </Container>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default SingleProperty;
