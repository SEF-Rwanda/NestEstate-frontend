import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


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
    <Navbar bg="light" variant="light">
      <Nav className="flex-column">
        <LinkContainer to="/admin/properties">
          <Nav.Link>Properties</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/users">
          <Nav.Link>Users</Nav.Link>
        </LinkContainer>
        <LinkContainer to="">
          <Nav.Link>Chats</Nav.Link>
        </LinkContainer>
        <LinkContainer to="">
          <Nav.Link>Analytics</Nav.Link>
        </LinkContainer>
        <Nav.Link onClick={handleOnClickLogout}>Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default AdminLinksComponent;
