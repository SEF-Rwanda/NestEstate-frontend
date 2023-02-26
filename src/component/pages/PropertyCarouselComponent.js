import { Carousel } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

const ProductCarouselComponent = () => {
    const cursorP = {
        cursor: "pointer"
    }
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
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
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
            </Carousel.Item>
        </Carousel>
    );
}

export default ProductCarouselComponent;