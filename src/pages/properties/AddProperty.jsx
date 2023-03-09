import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../component/Input";
import { signup } from "../../state/user/userSlice";
import { store } from "../../state/store";
import SelectInput from "./../../component/SelectInput";

function AddProperty() {
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
  const [password, setPassword] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("##########", category);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const property = {
      title: title,
      // lastName: lname,
      // email: email,
      // password: password,
      // phone: phone,
      // passwordConfirm: confirmPassword,
    };
    dispatch(signup(property));
  };
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newIsLoading = store.getState().user.loading;
      const isSuccess = store.getState().user.success;
      const error = store.getState().user.error;
      setIsFormLoading(newIsLoading);

      if (isSuccess) {
        navigate("/verify-account");
      } else if (error) {
        toast.error(error);
      }
    });
    return () => unsubscribe();
  });
  const categories = ["House", "Plot"];
  const sections = ["For rent", "For sell"];
  const masterPlanUses = ["Farming", "Settlement", "Industry", "Commerce"];
  const levels = ["R1", "R2", "R3", "R4", "R5", "R6"];

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
        }}
      >
        Upload new property
      </h3>

      <Form onSubmit={handleSubmit} className="mobile-phone_input">
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
            <SelectInput
              id="section"
              label="Section"
              description="Select section"
              values={sections}
              value={section}
              onChange={(e) => setSection(e.target.value)}
            />

            <Input
              controlId="price"
              labelText="Price"
              type="number"
              name="price"
              placeholder="Enter price in RWF"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              controlId="size"
              labelText="Size"
              type="number"
              name="size"
              placeholder="Enter size in m square"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <Input
              controlId="bedrooms"
              labelText="Bedrooms"
              type="number"
              name="number"
              placeholder="Enter number of bedroom"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
            <Input
              controlId="bathrooms"
              labelText="Bathrooms"
              type="number"
              name="bathrooms"
              placeholder="Enter number of bathrooms"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
            />
            <Form.Group controlId="description">
              <Row>
                <Col sm={12} md={4}>
                  <Form.Label
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "14px",
                      lineHeight: "36px",
                      color: "#000000",
                    }}
                  >
                    {" "}
                    Description
                  </Form.Label>
                </Col>
                <Col sm={12} md={8}>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter description"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>

          <Col md={6}>
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
              label="Mater plan use"
              description="Building level"
              values={levels}
              value={buildingLevel}
              onChange={(e) => setBuildingLevel(e.target.value)}
            />

            <Input
              controlId="street address"
              labelText="Street address"
              type="text"
              name="street address"
              placeholder="Enter street address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <Input
              controlId="upi"
              labelText="UPI"
              type="text"
              name="upi"
              placeholder="Enter UPI"
              value={upi}
              onChange={setUPI}
            />
            <Input
              controlId="main_image"
              labelText="Main image"
              type="file"
              name="main_image"
              value={password}
              onChange={setPassword}
            />
            <Input
              controlId="other_images"
              labelText="Other images"
              type="file"
              name="other_images"
              value={password}
              onChange={setPassword}
            />

            <Form.Group controlId="description">
              <Row>
                <Col sm={12} md={4}>
                  <Form.Label
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "14px",
                      lineHeight: "36px",
                      color: "#000000",
                    }}
                  >
                    {" "}
                    construction level
                  </Form.Label>
                </Col>
                <Col sm={12} md={8}>
                  <Row>
                    <Button
                      variant="primary"
                      type="submit"
                      // disabled={!termsAccepted}
                      style={{
                        background: "#6736CF",
                        borderRadius: "25px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        width: "160px",
                      }}
                    >
                      Current location
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      // disabled={!termsAccepted}
                      style={{
                        background: "#6736CF",
                        borderRadius: "25px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        width: "160px",
                        marginLeft: "10px",
                      }}
                    >
                      Google map
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="description">
              <Row>
                <Col sm={12} md={4}>
                  <Form.Label
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "14px",
                      lineHeight: "36px",
                      color: "#000000",
                    }}
                  >
                    {" "}
                    Others
                  </Form.Label>
                </Col>
                <Col sm={12} md={8}>
                  <Row>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Tank"
                        // checked={isChecked}
                        // onChange={handleCheckboxChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Internet"
                        // checked={isChecked}
                        // onChange={handleCheckboxChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Furnished"
                        // checked={isChecked}
                        // onChange={handleCheckboxChange}
                      />
                    </Form.Group>
                  </Row>
                </Col>
              </Row>
            </Form.Group>

            <Container
              className="justify-content-center align-items-center"
              style={{ width: "188px" }}
            >
              <Button
                variant="primary"
                type="submit"
                // disabled={!termsAccepted}
                style={{
                  background: "#6736CF",
                  borderRadius: "25px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  width: "188px",
                }}
              >
                {!isFormLoading ? (
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
                )}
              </Button>
            </Container>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AddProperty;
