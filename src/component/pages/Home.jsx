import React from "react";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import PropertyCarouselComponent from "./PropertyCarouselComponent";
import HouseCardComponent from "./HouseCardComponent";

const Home = () => {

    return (
        <div>
            <HeaderComponent />
            <PropertyCarouselComponent />
            <HouseCardComponent />
            <FooterComponent />
        </div>
    )
}

export default Home;