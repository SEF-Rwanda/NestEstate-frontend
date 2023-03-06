import React from "react";
import FooterComponent from "../component/FooterComponent";

import PropertyCarouselComponent from "../component/PropertyCarouselComponent";
import ChoosingUsComponent from "../component/ChoosingUsComponent";
import HouseCardComponent from "../component/PropertyCardComponent";

const Home = () => {
  return (
    <div>
      <PropertyCarouselComponent />
      <HouseCardComponent />
      <ChoosingUsComponent />
      <FooterComponent />
    </div>
  );
};

export default Home;
