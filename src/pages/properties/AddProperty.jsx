import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../component/utils/Input";
import { store } from "../../state/store";
import SelectInput from "../../component/utils/SelectInput";
import TextArea from "../../component/utils/TextAreaInput";
import FileInput from "../../component/utils/FileInput";
import CheckBoxInput from "../../component/utils/CheckBoxInput";
import ButtonComponent from "../../component/utils/Button";
import Label from "../../component/utils/Label";
import { addProduct } from "../../state/property/propertySlice";

const categories = ["House", "Plot"];
const sections = ["For rent", "For sell"];
const masterPlanUses = ["Farming", "Settlement", "Industry", "Commerce"];
const levels = ["R1", "R2", "R3", "R4", "R5", "R6"];

const baseAPIUrl = "/api/v1";

const AddProperty = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [section, setSection] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [size, setSize] = useState("");
  const [masterPlanUse, setMasterPlanUse] = useState("");
  const [buildingLevel, setBuildingLevel] = useState("");
  const [upi, setUPI] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [mainImage, setMainImage] = useState({ public_id: "", url: "" });
  const [otherImages, setOtherImages] = useState([]);
  const [isParkingAvailable, setIsParkingAvailable] = useState(false);
  const [isTankAvailable, setIsTankAvailable] = useState(false);
  const [isInternetAvailable, setIsInternetAvailable] = useState(false);
  const [isFurnished, setIsFurnished] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        setLocation({
          latitude: lat,
          longitude: long,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const uploadMainImage = async (event) => {
    const imageData = new FormData();
    imageData.append("file", event.target.files[0]);
    imageData.append("upload_preset", "wingi-app");
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/kuranga/image/upload",
        imageData
      );
      setMainImage({
        public_id: data.public_id,
        url: data.secure_url,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const uploadOtherImages = async (event) => {
    const images = [];
    for (let i = 0; i < event.target.files.length; i++) {
      const imageData = new FormData();
      imageData.append("file", event.target.files[i]);
      imageData.append("upload_preset", "wingi-app");
      try {
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/kuranga/image/upload",
          imageData
        );
        images.push({
          public_id: data.public_id,
          url: data.secure_url,
        });
      } catch (err) {
        console.log(err);
      }
    }
    setOtherImages(images);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const property = {
      title: title,
      category: category,
      section: section,
      price: price,
      size: size,
      upi: upi,
      description: description,
      mainImage: mainImage,
      otherImages: otherImages,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      masterPlanUse: masterPlanUse,
      masterPlanLevel: buildingLevel,
      streetAddress: streetAddress,
      geoLocation: location,
      parking: isParkingAvailable,
      tank: isTankAvailable,
      internet: isInternetAvailable,
      furnished: isFurnished,
    };
    console.log("to be added================>",property)
    dispatch(addProduct(property));
    console.log(property);
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const isLoading = store.getState().property.isAddingProductLoading;
      const isSuccess = store.getState().property.isAddingProductSuccess;
      const error = store.getState().property.addingProductError;
      setIsFormLoading(isLoading);

      if (isSuccess) {
        navigate("/");
      } else if (error) {
        toast.error(error);
      }
    });
    return () => unsubscribe();
  });

  return (
    <Container
      style={{
        height: "calc(100vh - 8vh)",
      }}
      className="flex justify-content-center "
    >
      <h3
        className="mb-3 mt-3"
        style={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "30px",
          color: "#000000",
          textAlign: "center",
        }}
      >
        Upload new property
      </h3>

      <Form className="mobile-phone_input">
        <Row>
          <Col md={6} className="flex">
            <Input
              controlId="title"
              labelText="Title"
              type="text"
              name="title"
              placeholder="Enter property title"
              value={title}
              onChange={setTitle}
            />

            <SelectInput
              id="category"
              label="Category"
              description="Select Category"
              values={categories}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            {category === "House" ? (
              <SelectInput
                id="section"
                label="Section"
                description="Select section"
                values={sections}
                value={section}
                onChange={(e) => setSection(e.target.value)}
              />
            ) : (
              <></>
            )}

            <Input
              controlId="price"
              labelText="Price"
              type="number"
              name="price"
              placeholder="Enter price in RWF"
              value={price}
              onChange={setPrice}
            />
            <Input
              controlId="size"
              labelText="Size"
              type="number"
              name="size"
              placeholder="Enter size in m square"
              value={size}
              onChange={setSize}
            />
            <SelectInput
              id="Mater_plan_use"
              label="Mater plan use"
              description="Select master plan use"
              values={masterPlanUses}
              value={masterPlanUse}
              onChange={(e) => setMasterPlanUse(e.target.value)}
            />

            <SelectInput
              id=""
              building_level
              label="Building level"
              description="Building level"
              values={levels}
              value={buildingLevel}
              onChange={(e) => setBuildingLevel(e.target.value)}
            />
            <TextArea
              id="description"
              description="Description"
              placeholder="Enter description"
              value={description}
              onChange={setDescription}
            />
          </Col>

          <Col md={6}>
            <Input
              controlId="upi"
              labelText="UPI"
              type="text"
              name="upi"
              placeholder="Enter UPI"
              value={upi}
              onChange={setUPI}
            />
            {category === "House" ? (
              <Input
                controlId="bedrooms"
                labelText="Bedrooms"
                type="number"
                name="number"
                placeholder="Enter number of bedroom"
                value={bedrooms}
                onChange={setBedrooms}
              />
            ) : (
              <></>
            )}
            {category === "House" ? (
              <Input
                controlId="bathrooms"
                labelText="Bathrooms"
                type="number"
                name="bathrooms"
                placeholder="Enter number of bathrooms"
                value={bathrooms}
                onChange={setBathrooms}
              />
            ) : (
              <></>
            )}
            <Input
              controlId="street address"
              labelText="Street address"
              type="text"
              name="street address"
              placeholder="Enter street address"
              value={streetAddress}
              onChange={setStreetAddress}
            />

            <FileInput
              controlId="main_image"
              labelText="Main image"
              type="file"
              name="main_image"
              value={mainImage}
              onChange={uploadMainImage}
            />
            <FileInput
              controlId="other_images"
              labelText="Other images"
              type="file"
              name="other_images"
              onChange={uploadOtherImages}
            />

            <Form.Group controlId="description">
              <Row>
                <Col sm={12} md={4}>
                  <Label text="Location" />
                </Col>
                <Col sm={12} md={8}>
                  <Row>
                    <ButtonComponent
                      type="button"
                      variant="primary"
                      value="Current Location"
                      action={getCurrentLocation}
                    />
                    <ButtonComponent
                      type="button"
                      variant="primary"
                      value="Google map"
                      action={() => {}}
                    />
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            {category === "House" ? (
              <Form.Group controlId="others">
                <Row>
                  <Col sm={12} md={4}>
                    <Label text="Others" />
                  </Col>
                  <Col sm={12} md={8}>
                    <Row>
                      <Col>
                        <CheckBoxInput
                          id="tank"
                          label="Tank"
                          checked={isTankAvailable}
                          onChange={setIsTankAvailable}
                        />
                        <CheckBoxInput
                          id="internet"
                          label="Internet"
                          checked={isInternetAvailable}
                          onChange={setIsInternetAvailable}
                        />
                      </Col>
                      <Col>
                        <CheckBoxInput
                          id="parking"
                          label="Parking"
                          checked={isParkingAvailable}
                          onChange={setIsParkingAvailable}
                        />
                        <CheckBoxInput
                          id="furnished"
                          label="Furnished"
                          checked={isFurnished}
                          onChange={setIsFurnished}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form.Group>
            ) : (
              <></>
            )}

            <Container
              className="justify-content-center align-items-center"
              style={{ width: "188px" }}
            >
              <ButtonComponent
                value={
                  !isFormLoading ? (
                    "Submit"
                  ) : (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      style={{ marginRight: "5px" }}
                    />
                  )
                }
                action={handleSubmit}
              />
            </Container>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddProperty;
