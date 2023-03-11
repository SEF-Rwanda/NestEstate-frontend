import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import http from "../../utils/http";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { updateProperty } from "../../state/property/propertySlice";
import { useParams } from "react-router-dom";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

const UpdateProperty = () => {
    const {id} = useParams();
    sessionStorage.setItem("propid", id);
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
    const [tank, setTank] = useState(false);
    const [furnished, setFurnished] = useState(false);
    const [internet, setInternet] = useState(false);
    const [parking, setParking] = useState(false);
    const [propertyData, setPropertyData] = useState({});
    

    const getProperty = async (id) => {
        const response = await http.get(`/properties/${id}`);
        setPropertyData(response.data.data);
        setTank(response.data.data.tank)
        setParking(response.data.data.parking)
        setFurnished(response.data.data.furnished)
        setInternet(response.data.data.internet)
        setTank(response.data.data.tank)
        return response;
    };
    useEffect(() => {
        getProperty(id);

    }, [id]);
    
    // useEffect(() => {
    //     getProperty(id);

    // }, [furnished]);

    // console.log("value of tank: ", propertyData.tank)
    
    let mainImageUrl="";
    if (propertyData.mainImage && propertyData.mainImage.url) {
         mainImageUrl = propertyData.mainImage.url;
    }

    //handle and convert it in base 64
    const handleMainImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setMainImage(reader.result);
        }
    }

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
            // window.location.href = "/user/properties";
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
    console.log("--------------------------------------")
    console.log(furnished)
    console.log("----------------------------------------")

  return (
    <Container  className="justify-content-center align-items-center"> 
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
        <h1  style={{
                  textAlign:"center"
                }}> Update Property</h1>
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
                            <option>--category--</option>
                            <option value="House">House</option>
                            <option value="Plot">Plot</option> 
                                                                          
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
                            <option value="For rent">For rent</option>
                            <option value="For sale">For sale</option>                                            
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
                        checked={negociable}
                        onChange={handleNegotiable}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextMasterPlanUse">  
                <Form.Label column sm="2">
                Plan
                </Form.Label>
                <Col sm="6">
                {/* <Form.Control type="text" defaultValue={propertyData.masterPlanUse} value={masterPlanUse} onChange={(e) => setMasterPlanUse(e.target.value)} /> */}
                <Form.Select name="level" aria-label="level" value={masterPlanUse} onChange={(e) => setMasterPlanUse(e.target.value)}>
                    <option>{propertyData.masterPlanUse}</option>
                    <option value="Farming">Farming</option>
                    <option value="Settlement">Settlement</option> 
                    <option value="Industry">Industry</option>  
                    <option value="Commerce">Commerce</option>                                            
                </Form.Select>
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
                                    <option value="R4">R4</option>
                                    <option value="R5">R5</option> 
                                    <option value="R6">R6</option>                                            
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
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextTitle">  
                        <Form.Label column sm="2">
                        Size
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="text"defaultValue={propertyData.size} onChange={(e) => setSize(e.target.value)} />
                        </Col>
                    </Form.Group>
                    
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
            <Row className="justify-content-center align-items-center">
                <Button
                    variant="primary"
                    // type="submit"
                    style={{
                    background: "#d9d9d9",
                    borderRadius: "30px",
                    borderColor: "white",
                    color:"black",
                    marginTop: "10px",
                    marginBottom: "10px",
                    width: "160px",
                    }}
                >
                    Current location
                </Button>
                <Button
                    variant="primary"
                    // type="submit"
                    style={{
                    background: "#d9d9d9",
                    borderRadius: "30px",
                    borderColor: "white",
                    color:"black",
                    marginTop: "10px",
                    marginBottom: "10px",
                    width: "160px",
                    marginLeft: "10px",
                    }}
                >
                    Google map
                </Button>
            </Row>
            
            {category==="House"? (
                <Row>
                    <Col sm="5">
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
                    </Col>
                    
                    <Col sm="4">
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
                                // value={furnished}
                                // defaultValue={propertyData.furnished}
                                checked={furnished}
                                onChange={handleFurnished}
                            />
                        </Form.Group>

                    </Col>
                    <Col sm="3">
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
                <> </>
            )}
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextTitle">  
                <Form.Label column sm="2">
                Pictures
                </Form.Label>
                <Col sm="10">
                    <Row>
                        <Col sm="5">
                            <MDBRow>
                                <MDBCol lg='6' md='14' className='mb-6'>
                                    <img src={mainImageUrl} className='img-fluid rounded' alt='' />
                                    <img className="img-fluid" src={mainImage} alt="" />
                                </MDBCol>
                            </MDBRow>
                        </Col>
                        <Col sm="7">

                            <div className="form-outline mb-2">
                                <input onChange={handleMainImage}  type="file" id="formupload" name="mainImage" className="form-control"  />
                            </div>
                            
                        </Col>
                    </Row>
                </Col>
            </Form.Group>
            <Row className="justify-content-center align-items-center">
                <Button variant="primary" type="submit" style={{
                        background: "#6736CF",
                        borderRadius: "25px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        borderColor: "white",
                        width: "160px",
                        marginLeft: "10px",
                        }}>
                Update
                </Button>
            </Row>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProperty;