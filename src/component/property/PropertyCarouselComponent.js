import axios from "axios";
import { Carousel, Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";

const ProductCarouselComponent = () => {
  const [currentPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const [propertiesPerPage] = useState(6);
  const [filter, setFilter] = useState({
    priceMin: 0,
    priceMax: 0,
    title: "",
    description: "",
    section: "",
    category: "",
    size: 0,
    bedrooms: 0,
    bathrooms: 0,
    parking: false,
    furnished: false,
    internet: false,
  });
  const cursorP = {
    cursor: "pointer",
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let url = `http://localhost:5000/api/v1/properties?perPage=${propertiesPerPage}&page=${currentPage}&`;
    if (filter.title) {
      url += `title=${filter.title}&`;
    }
    if (filter.size) {
      url += `size=${filter.size}&`;
    }
    if (filter.category) {
      url += `category=${filter.category}&`;
    }
    if (filter.section) {
      url += `section=${filter.section}&`;
    }
    if (filter.priceMin && filter.priceMax) {
      url += `priceMin=${filter.priceMin}&priceMax=${filter.priceMax}&`;
    }
    if (filter.bedrooms) {
      url += `bedrooms=${filter.bedrooms}&`;
    }
    if (filter.bathrooms) {
      url += `bathrooms=${filter.bathrooms}&`;
    }
    if (filter.parking) {
      url += `parking=${filter.parking}&`;
    }
    if (filter.furnished) {
      url += `furnished=${filter.furnished}&`;
    }
    if (filter.internet) {
      url += `internet=${filter.internet}&`;
    }
    if (filter.description) {
      url += `description=${filter.description}&`;
    }
    if (url.endsWith("&")) {
      url = url.slice(0, -1);
    }
    console.log("URL: ", url);
    const { data } = await axios.get(url);
    setProperties(data);
  };
  console.log("Properties: ", properties);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(filter);
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel-1.jpg"
          alt="First slide"
          style={{
            maxWidth: "100%",
            minWidth: "100%",
            height: "450px",
            width: "auto",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <Carousel.Caption>
          <LinkContainer style={cursorP} to="/home">
            <h3>Find your Perfect Home</h3>
          </LinkContainer>
          <p>Best House Located in Kigali</p>
          <Form onSubmit={handleSearch} style={{ marginBottom: "100px" }}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCategory">
                <Form.Select name="category" onChange={handleInputChange}>
                  <option>Choose Category...</option>
                  <option>House</option>
                  <option>Plot</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridSection">
                <Form.Select name="section" onChange={handleInputChange}>
                  <option>Choose Section...</option>
                  <option>For Buy</option>
                  <option>For rent</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Control
                  placeholder="Title"
                  name="title"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Control
                  placeholder="Size"
                  name="size"
                  type="number"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Col xs="auto">
                <Button
                  style={{
                    background: "#6736CF",
                    fontWeight: "bold",
                    border: "none",
                  }}
                  type="submit"
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Carousel.Caption>
      </Carousel.Item>

      {/* <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/images/carousel-2.jpg"
                    alt="First slide"
                    style={{
                        maxWidth: "100%",
                        minWidth: "100%",
                        height: "450px",
                        width: "auto",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}

                />
                <Carousel.Caption>
                    <LinkContainer style={cursorP} to="/home">
                        <h3>Best Lands</h3>
                    </LinkContainer>
                    <p>Best Lands located in Kigali.</p>
                </Carousel.Caption>
            </Carousel.Item> */}
    </Carousel>
  );
};

export default ProductCarouselComponent;
