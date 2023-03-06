import { Col, Row, Card, Container } from "react-bootstrap"
const CategoryCardComponent = ({ category, id }) => {
    const propertiesData = [
        {
            id: 1,
            imageUrl: "images/house-1.jpg",
            description: "Furnished House For Rent in Kacyiru",
            bedrooms: 3,
            bathrooms: 2,
            price: 100000,
            type: "Rent"
        },
        {
            id: 2,
            imageUrl: "images/house-1.jpg",
            description: "Furnished House For Sale in Remera",
            bedrooms: 4,
            bathrooms: 2,
            price: 200000,
        },
        {
            id: 3,
            imageUrl: "images/house-1.jpg",
            description: "Furnished House For Rent in Kanombe",
            bedrooms: 6,
            bathrooms: 3,
            price: 150000,
        },
        {
            id: 3,
            imageUrl: "images/house-1.jpg",
            description: "Furnished House For Rent in Kacyiru",
            bedrooms: 10,
            bathrooms: 4,
            price: 300000,
        },
    ];

    return (
        <Container>
            <h4 style={{ marginTop: "10px", marginBottom: "10px", textAlign: "center" }}>Find Recent Properties</h4>
            <Row>
                {propertiesData.map((property) => {
                    return (

                        <Col md={4} sm={6} className="mt-3">
                            <Card>
                                <Card.Img variant="top" src={property.imageUrl} style={{ height: "200px", objectFit: "cover" }} />
                                <Card.Body>
                                    {/* <Card.Title>{property.title}</Card.Title> */}
                                    <Card.Text>{property.description}</Card.Text>
                                    <p> {property.bedrooms} Bedrooms & {property.bathrooms} bathrooms</p>
                                    <p style={{fontWeight: "bold", fontSize: "18px"}}>$ {property.price}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );

}

export default CategoryCardComponent