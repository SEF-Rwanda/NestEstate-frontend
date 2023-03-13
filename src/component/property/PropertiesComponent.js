import { Col, Row, Card, Container, Button } from "react-bootstrap";

const PropertiesComponent = ({ properties, loading }) => {
  return (
    <Row>
      {properties.map((property) => {
        return (
          <Col md={4} sm={6} className="mt-3" key={property.id}>
            <Card>
              <Card.Img
                variant="top"
                src={property.mainImage.url}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Text>
                  {property.description.length > 80
                    ? `${property.description.substring(0, 80)}...`
                    : property.description}
                </Card.Text>
                <p>
                  {" "}
                  {property.bedrooms} Bedrooms & {property.bathrooms} bathrooms
                </p>
                <Card.Text className="d-flex justify-content-between align-items-center">
                  <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                    ${property.price}
                  </span>
                  <Button
                    style={{ backgroundColor: "#6736CF", border: "none" }}
                  >
                    {property.section} Now
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};
export default PropertiesComponent;
