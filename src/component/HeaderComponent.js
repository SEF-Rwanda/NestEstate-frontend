import { Nav, Navbar, Container } from "react-bootstrap";
import {
  Dropdown,
  DropdownButton,
  Button,
  Form,
  InputGroup,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const HeaderComponent = () => {
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    user = jwt_decode(token);
  }

  const handleOnClickLogout = () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/home">
          <Navbar.Brand>Real Estate</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav className="mt-2">
              <DropdownButton id="dropdown-basic-button" title="All">
                <Dropdown.Item>Apartments</Dropdown.Item>
                <Dropdown.Item>Houses</Dropdown.Item>
                <Dropdown.Item>Lands</Dropdown.Item>
              </DropdownButton>
              <InputGroup className="mb-2">
                <Form.Control
                  type="password"
                  placeholder="Search for property..."
                />
                <Button variant="warning">
                  <i className="bi bi-search"></i>Search
                </Button>
              </InputGroup>
            </Nav>
          </Nav>
          <Nav>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>

            {user?.id?.length ? (
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={user.firstName}
                menuVariant="dark"
              >
                <NavDropdown.Item as={Link} to="/user">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} onClick={handleOnClickLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default HeaderComponent;
