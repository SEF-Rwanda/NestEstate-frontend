import { Nav, Navbar} from "react-bootstrap";
import { LinkContainer} from "react-router-bootstrap";


const AdminLinksComponent = () => {
  const handleOnClickLogout = () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Navbar style={{color:"red"}} >
      <Nav className="flex-column">
        <LinkContainer  to="/user/properties">
          <Nav.Link >My Properties</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/profile">
          <Nav.Link>Profile</Nav.Link>
        </LinkContainer>
        <Nav.Link onClick={handleOnClickLogout} >Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default AdminLinksComponent;