import React, { useState, useEffect } from "react";
import { Carousel, Modal, Card, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonComponent from "../../component/utils/Button";
import { fetchSingleProduct } from "../../state/property/propertySlice";
import { store } from "../../state/store";
import Spinner from "../../component/utils/Spinner";

const SingleProperty = () => {
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [index, setIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const isSuccess = store.getState().property.isFetchingPropertySuccess;
      const error = store.getState().property.fetchingPropertyError;
      const property = store.getState().property.fetchedProperty;
      setProperty(property);
      if (isSuccess) {
        if (property !== null) {
          images.push(property?.mainImage?.url);
          property.otherImages.map((image) => images.push(image.url));
          setImages(images);
        }
      } else if (error) {
        toast.error(error);
      }
    });
    return () => unsubscribe();
  });

  console.log(property);

  console.log(images);
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
        </Container>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default SingleProperty;
