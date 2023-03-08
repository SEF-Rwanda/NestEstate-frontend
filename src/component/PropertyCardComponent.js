import { Col, Row, Card, Container, Button } from "react-bootstrap"
import { useState, useEffect } from "react";
import axios from 'axios'
const CategoryCardComponent = ({ category, id }) => {

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        propertiesData1()
    }, [])

    const propertiesData1 = async () => {
        const { data } = await axios.get("http://localhost:3000/api/v1/properties")
        setProperties(data.data)
    }

    console.log("Properties ", properties)

    return (
        <Container>
            <h4 style={{ marginTop: "10px", marginBottom: "10px", textAlign: "center" }}>Find Recent Properties</h4>
            <Row>
                {properties.map((property) => {
                    return (

                        <Col md={4} sm={6} className="mt-3" key={property.id}>
                            <Card>
                                <Card.Img variant="top" src={property.mainImage} style={{ height: "200px", objectFit: "cover" }} />
                                <Card.Body>
                                    <Card.Text>{property.description}</Card.Text>
                                    <p> {property.bedrooms} Bedrooms & {property.bathrooms} bathrooms</p>
                                    <Card.Text className="d-flex justify-content-between align-items-center">
                                        <span style={{ fontWeight: "bold", fontSize: "18px" }}>${property.price}</span>
                                        <Button style={{ backgroundColor: "#6736CF", border: "none" }}>{property.section} Now</Button>
                                    </Card.Text>
                                </Card.Body>

                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container >
    );

}

export default CategoryCardComponent