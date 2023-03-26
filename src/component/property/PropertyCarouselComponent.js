import { Carousel, Form, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProductCarouselComponent = ({ handleInputChange, handleSearch }) => {
  const cursorP = {
    cursor: "pointer",
  };
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
