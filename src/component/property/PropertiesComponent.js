import { Col, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PropertiesComponent = ({ properties }) => {
  return (
    <Row>
      {properties.map((property) => {
        return (
          <Col md={4} sm={6} className="mt-3" key={property.id}>
            <Link
              to={`/all-properties/${property.id}`}
              style={{ textDecoration: "none", color: "" }}
            >
              <Card>
                <Card.Img
                  variant="top"
                  src={property.mainImage.url}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Text
                    style={{
                      color: "#000000",
                      fontWeight: 600,
                    }}
                  >
                    {property.description.length > 80
                      ? `${property.description.substring(0, 80)}...`
                      : property.description}
                  </Card.Text>
                  <p
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                    }}
                  >
                    {" "}
                    {property.bedrooms} Bedrooms & {property.bathrooms}{" "}
                    bathrooms
                  </p>
                  <Card.Text className="d-flex justify-content-between align-items-center">
                    <span
                      style={{
                        fontSize: "18px",
                        color: "#000000",
                        fontWeight: 600,
                      }}
                    >
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
            </Link>
          </Col>
        );
      })}
    </Row>
  );
};
export default PropertiesComponent;
