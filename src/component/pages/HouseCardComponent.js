import { Col, Row, Card, Container } from "react-bootstrap"
const CategoryCardComponent = ({ category, id }) => {
    const cardData = [
        {
            id: 1,
            imageUrl: "images/house-1.jpg",
            title: "Card 1",
            description: "This is the description for card 1",
        },
        {
            id: 2,
            imageUrl: "images/house-1.jpg",
            title: "Card 2",
            description: "This is the description for card 2",
        },
        {
            id: 3,
            imageUrl: "images/house-1.jpg",
            title: "Card 3",
            description: "This is the description for card 3",
        },
    ];

    return (
        <Container>
            {/* Make a loop based on card data */}

            <Row className="p-2">
                <Col md={4} sm={6}>
                    <Card>
                        <Card.Img variant="top" src="images/house-1.jpg" style={{ height: "200px", objectFit: "cover", objectPosition: "center" }} />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up
                                the bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} sm={6}>
                    <Card>
                        <Card.Img variant="top" src="images/house-1.jpg" style={{ height: "200px", objectFit: "cover" }} />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up
                                the bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} sm={6}>
                    <Card>
                        <Card.Img variant="top" src="images/house-1.jpg" style={{ height: "200px", objectFit: "cover" }} />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up
                                the bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="p-2">
                <Col md={4} sm={6}>
                    <Card>
                        <Card.Img variant="top" src="images/house-1.jpg" style={{ height: "200px", objectFit: "cover" }} />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up
                                the bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

}

export default CategoryCardComponent