import React from "react";
import FooterComponent from "../component/FooterComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import PropertyCarouselComponent from "../component/property/PropertyCarouselComponent";
import { useState, useEffect } from "react";
import ChoosingUsComponent from "../component/ChoosingUsComponent";
import { getUserProfile } from "./../state/user/userSlice";
import Properties from "./properties/Properties";
import { store } from "../state/store";

const baseAPIUrl = "/api/v1";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6);
  const [totalProperties, setTotalProperties] = useState(0);
  const [profile, setProfile] = useState(0);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    priceMin: 0,
    priceMax: 0,
    title: "",
    description: "",
    section: "",
    category: "",
    size: 0,
    bedrooms: 0,
    bathrooms: 0,
    parking: false,
    furnished: false,
    internet: false,
  });

  let url = `${baseAPIUrl}/properties?perPage=${propertiesPerPage}&page=${currentPage}&`;
  if (filter.title) {
    url += `title=${filter.title}&`;
  }
  if (filter.size) {
    url += `size=${filter.size}&`;
  }
  if (filter.category) {
    url += `category=${filter.category}&`;
  }
  if (filter.section) {
    url += `section=${filter.section}&`;
  }
  if (filter.priceMin && filter.priceMax) {
    url += `priceMin=${filter.priceMin}&priceMax=${filter.priceMax}&`;
  }
  if (filter.bedrooms) {
    url += `bedrooms=${filter.bedrooms}&`;
  }
  if (filter.bathrooms) {
    url += `bathrooms=${filter.bathrooms}&`;
  }
  if (filter.parking) {
    url += `parking=${filter.parking}&`;
  }
  if (filter.furnished) {
    url += `furnished=${filter.furnished}&`;
  }
  if (filter.internet) {
    url += `internet=${filter.internet}&`;
  }
  if (filter.description) {
    url += `description=${filter.description}&`;
  }
  if (url.endsWith("&")) {
    url = url.slice(0, -1);
  }
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const unsubscribe = store.subscribe(() => {
    const loggedInProfile = store.getState().user.userProfile;
    if (loggedInProfile !== null) {
      setProfile(loggedInProfile);
    }
    return () => unsubscribe();
  });

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data } = await axios.get(url);
      const filteredProperties = data.data.filter(
        (property) => property.postedBy !== profile._id
      );
      setProperties(filteredProperties);
      setTotalProperties(data.totalProperties);
      setLoading(false);
    };
    fetchProperties();
  }, [currentPage, propertiesPerPage, url, profile._id]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const { data } = await axios.get(url);
    const filteredProperties = data.data.filter(
      (property) => property.postedBy !== profile._id
    );
    setProperties(filteredProperties);
    setTotalProperties(data.totalProperties);
    setLoading(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <PropertyCarouselComponent
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />
      <Properties
        properties={properties}
        totalProperties={totalProperties}
        propertiesPerPage={propertiesPerPage}
        setCurrentPage={setCurrentPage}
        loading={loading}
      />
      <ChoosingUsComponent />
      <FooterComponent />
    </div>
  );
};

export default Home;
