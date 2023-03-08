import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import http from "../../utils/http";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { updateProperty } from "../../state/property/propertySlice";

const UpdateProperty = () => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [section, setSection] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [negociable, setNegociable] = useState("");
    const [upi, setUpi] = useState("");
    const [description, setDescription] = useState("");
    const [mainImage, setMainImage] = useState("");
    const [otherImages, setOtherImages] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [masterPlanUse, setMasterPlanUse] = useState("");
    const [masterPlanLevel, setMasterPlanLevel] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [geoLocation, setGeoLocation] = useState("");
    const [tank, setTank] = useState("");
    const [furnished, setFurnished] = useState("");
    const [internet, setInternet] = useState("");
    const [parking, setParking] = useState("");
    const [propertyData, setPropertyData] = useState({});
    const getProperty = async (id) => {
        const response = await http.get(`/properties/${id}`);
        setPropertyData(response.data.data);
        return response;
    };
    useEffect(() => {
        // 6408dc57cdb31e2a00c18d24 6407395882aa7065a6d20a00
        getProperty("6408dc57cdb31e2a00c18d24");//property._id
        setCategory(propertyData.category)
    }, ["6408dc57cdb31e2a00c18d24"]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateProperty({
            title,
            category,
            section,
            price,
            size,
            upi,
            description,
            mainImage,
            otherImages,
            bedrooms,
            bathrooms,
            masterPlanUse,
            streetAddress,
            geoLocation,
            tank,
            furnished,
            internet,
            parking
        }))
        .unwrap()
        .then((response) => {
            // window.location.href = "/my-properties";
        });
    };
    const handleNegotiable = (event) => {
        setNegociable(event.target.checked);
    };
    const handleTank = (event) => {
        setTank(event.target.checked);
    };
    const handleFurnished = (event) => {
        setFurnished(event.target.checked);
    };
    const handleInternet = (event) => {
        setInternet(event.target.checked);
    };
    const handleParking = (event) => {
        setParking(event.target.checked);
    };
  return (
    <Container>
        
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
        <h1 > Update Property</h1>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextTitle">  
                <Form.Label column sm="2">
                Title
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" defaultValue={propertyData.title} onChange={(e) => setTitle(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="category">
                <Form.Label column sm="2">
                        Category
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select name="category" aria-label="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option>{propertyData.category}</option>
                            <option value="House">House</option>
                            <option value="Land">Land</option> 
                                                                          
                        </Form.Select>
                    </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="section"  >
                <Form.Label column sm="2">
                        Section
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select name="section" aria-label="section" value={section} onChange={(e) => setSection(e.target.value)}>
                            <option>{propertyData.section}</option>
                            <option value="Rent">Rent</option>
                            <option value="Sale">Sale</option>                                            
                        </Form.Select>
                    </Col>
            </Form.Group>
            
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextTitle">  
                <Form.Label column sm="2">
                Price
                </Form.Label>
                <Col sm="6">
                <Form.Control type="text" defaultValue={propertyData.price} onChange={(e) => setPrice(e.target.value)} />
                </Col>
                <Col sm="4">
                    <Form.Check 
                        type="checkbox"
                        id="default-checkbox"
                        label="Negociable"
                        // defaultValue={propertyData.negociable}
                        checked={negociable}
                        onChange={handleNegotiable}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextMasterPlan">  
                <Form.Label column sm="2">
                Plan
                </Form.Label>
                <Col sm="6">
                <Form.Control type="text" defaultValue={propertyData.masterPlanUse} onChange={(e) => setMasterPlanUse(e.target.value)} />
                </Col>
                <Col sm="4">
                    <Form.Group as={Row} className="mb-3" controlId="masterPlanLevel"  >
                        <Form.Label column sm="3">
                                Level
                            </Form.Label>
                            <Col sm="9">
                                <Form.Select name="level" aria-label="level" value={masterPlanLevel} onChange={(e) => setMasterPlanLevel(e.target.value)}>
                                    <option>{propertyData.masterPlanLevel}</option>
                                    <option value="R1">R1</option>
                                    <option value="R2">R2</option> 
                                    <option value="R3">R3</option>                                            
                                </Form.Select>
                            </Col>
                    </Form.Group>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextTitle">  
                <Form.Label column sm="2">
                UPI
                </Form.Label>
                <Col sm="6">
                <Form.Control type="text" defaultValue={propertyData.upi} onChange={(e) => setUpi(e.target.value)} />
                </Col>
                <Col sm="4">
                    
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextTitle">  
                <Form.Label column sm="2">
                Size(sqm)
                </Form.Label>
                <Col sm="6">
                <Form.Control type="text"defaultValue={propertyData.size} onChange={(e) => setSize(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextDescription">
                <Col sm="2">
                    <Form.Label >Description</Form.Label>
                </Col>
                
                <Col sm="10">
                    <Form.Control  as="textarea" defaultValue={propertyData.description} rows={3} onChange={(e) => setDescription(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextTitle">  
                <Form.Label column sm="2">
                Street
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" defaultValue={propertyData.streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
                </Col>
            </Form.Group>
            
            {category && category==="House" ? (
                <Row>
                    <Col sm="6">
                        <Form.Group as={Row} className="mb-3" controlId="bedrooms">
                            <Form.Label column sm="6">
                                    Bed Rooms
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Select name="bedrooms" aria-label="bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                                        <option>{propertyData.bedrooms}</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option> 
                                        <option value="3">3</option>
                                        <option value="4">4</option> 
                                        <option value="5">5</option>
                                        <option value="6">6</option> 
                                                                                    
                                    </Form.Select>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="bathrooms">
                            <Form.Label column sm="6">
                                    Bath Rooms
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Select name="bathrooms" aria-label="bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
                                        <option>{propertyData.bathrooms}</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option> 
                                        <option value="3">3</option>
                                        <option value="4">4</option> 
                                        <option value="5">5</option>
                                        <option value="6">6</option> 
                                                                                    
                                    </Form.Select>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formCheckBoxParking">  
                            <Form.Check 
                                type="checkbox"
                                id="parking-checkbox"
                                label="Parking"
                                value={internet}
                                checked={parking}
                                onChange={handleParking}
                            />
                        </Form.Group>
            
                    </Col>
                    
                    <Col sm="6">
                    <Form.Group as={Row} className="mb-3" controlId="formCheckBoxTank" >  
                        <Form.Check 
                            type="checkbox"
                            id="tank-checkbox"
                            label="Tank"
                            value={tank}
                            checked={tank}
                            // defaultValue={propertyData.tank}
                            onChange={handleTank}  
                        />
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formCheckBoxFurnished">  
                        <Form.Check 
                            type="checkbox"
                            id="furnished-checkbox"
                            label="Furnished"
                            value={furnished}
                            // defaultValue={propertyData.furnished}
                            checked={furnished}
                            onChange={handleFurnished}
                        />
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formCheckBoxInternet">  
                        <Form.Check 
                            type="checkbox"
                            id="internet-checkbox"
                            label="Internet"
                            value={internet}
                            // defaultValue={propertyData.internet}
                            checked={internet}
                            onChange={handleInternet}
                        />
                    </Form.Group>
                    </Col>
                </Row>
                

            ) : (
                
                <>
                
                </>
            )}
            
            
            {/* <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label
                style={{
                  color: "#C1BDBD",
                  fontFamily: "Poppins",
                  fonSize: "20em",
                }}
              >
                First name
              </Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={userdata.firstName}
                onChange={(e) => setFirstName(e.target.value)}
                name="firstName"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a first name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={userdata.lastName}
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            </Form.Group> */}
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProperty;
