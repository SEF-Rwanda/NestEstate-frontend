import { Container, Col, Row } from "react-bootstrap"

const FooterComponent = () => {
    return (
        <footer>
            <Container fluid>
                <Row className="bg-dark text-white text-center py-5">
                    <Col>Copyright &copy; Best Real Estate Application</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default FooterComponent