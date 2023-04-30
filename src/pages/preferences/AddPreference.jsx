import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../component/utils/Input";
import { store } from "../../state/store";
import SelectInput from "../../component/utils/SelectInput";
import CheckBoxInput from "../../component/utils/CheckBoxInput";
import ButtonComponent from "../../component/utils/Button";
import Label from "../../component/utils/Label";
import { createPreference } from "../../state/preference/preferenceSlice";

const categories = ["House", "Plot"];
const sections = ["For Rent", "For Sale"];

const AddProperty = () => {
  const [category, setCategory] = useState("");
  const [section, setSection] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [size, setSize] = useState("");

  const [isFormLoading, setIsFormLoading] = useState(false);

  const [isFurnished, setIsFurnished] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const preference = {
      category: category,
      section: section,
      price: {
        min: minPrice,
        max: maxPrice,
      },
      size: size,
      bedrooms: bedrooms,
      furnished: isFurnished,
    };
    console.log("to be added================>", preference);
    dispatch(createPreference(preference));
    console.log(preference);
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const isLoading = store.getState().preference.loading;
      const isSuccess = store.getState().preference.success;
      const error = store.getState().preference.error;
      setIsFormLoading(isLoading);

      if (isSuccess) {
        navigate("/");
      } else if (error) {
        toast.error("Preference associated with this user already exists");
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
        className="mb-5 mt-5"
        style={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "30px",
          color: "#000000",
          textAlign: "center",
        }}
      >
        Add New preference
      </h3>

      <Form className="">
        <Container
          className="flex justify-content-center"
          style={{
            width: "50%",
          }}
        >
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
            labelText="Min Price"
            type="number"
            name="Mini price"
            placeholder="Enter price in RWF"
            value={minPrice}
            onChange={setMinPrice}
          />
          <Input
            controlId="price"
            labelText="Max Price"
            type="number"
            name="Max price"
            placeholder="Enter price in RWF"
            value={maxPrice}
            onChange={setMaxPrice}
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
          {category === "House" ? (
            <Input
              controlId="bedrooms"
              labelText="BedRoom"
              type="number"
              name="bedrooms"
              placeholder="Enter size in m square"
              value={bedrooms}
              onChange={setBedrooms}
            />
          ) : (
            <></>
          )}
          {category === "House" ? (
            <Row>
              <Col sm={12} md={4}>
                <Label text="" />
              </Col>
              <Col sm={12} md={4}>
                <CheckBoxInput
                  id="furnished"
                  label="Furnished"
                  checked={isFurnished}
                  onChange={setIsFurnished}
                />
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </Container>
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
      </Form>
    </Container>
  );
};

export default AddProperty;
