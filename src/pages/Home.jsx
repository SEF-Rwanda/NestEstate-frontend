import React from "react";
import FooterComponent from "../component/FooterComponent";
import HeaderComponent from "../component/HeaderComponent";

import PropertyCarouselComponent from "../component/PropertyCarouselComponent";
import HouseCardComponent from "../component/HouseCardComponent";

const Home = () => {
  return (
    <div>
      <PropertyCarouselComponent />
      <HouseCardComponent />
      <FooterComponent />
    </div>
  );
};

export default Home;
