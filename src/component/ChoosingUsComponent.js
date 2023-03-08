import { Col, Row, Card, Container } from "react-bootstrap"
const ChoosingUsComponent = () => {

    const whyChooseUs = [
        { id: 1, icon: 'bi bi-send', title: 'Service', description: 'We deliver high quality and exceptional service to our clients.' },
        { id: 2, icon: 'bi bi-eject', title: 'Experience', description: 'Over 10 years in providing professional real estate solutions.' },
        { id: 3, icon: 'bi bi-house-gear', title: 'Our Staff', description: 'Highly motivated and dedicated to meet your real estate needs.' },

    ]

    return (
        <Container>
            <h4 style={{ marginTop: "10px", marginBottom: "10px", textAlign: "center" }}>Why choosing us</h4>
            <Row>
                {whyChooseUs.map((item) => {
                    return (
                        <Col md={4} sm={6} key={item.id}>
                            <Card className="text-center">
                                <Card.Body>
                                    <i className={item.icon} style={{ fontSize: "30px" }}></i>
                                    <Card.Title style={{ fontSize: "30px" }}>{item.title}</Card.Title>
                                    <Card.Text>{item.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}

            </Row>
        </Container >
    );

}

export default ChoosingUsComponent