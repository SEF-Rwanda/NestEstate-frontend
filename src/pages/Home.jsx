import React from "react";
import FooterComponent from "../component/FooterComponent";

import PropertyCarouselComponent from "../component/property/PropertyCarouselComponent";

import ChoosingUsComponent from "../component/ChoosingUsComponent";
import Properties from "./properties/Properties";

const Home = () => {
  return (
    <div>
      <PropertyCarouselComponent />
      <Properties />
      <ChoosingUsComponent />
      <FooterComponent />
    </div>
  );
};

export default Home;
