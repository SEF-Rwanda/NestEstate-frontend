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
const HeaderComponent = () => {
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
                <Dropdown.Item>Houses</Dropdown.Item>
                <Dropdown.Item>Plots</Dropdown.Item>
              </DropdownButton>
              <InputGroup className="mb-2">
                <Form.Control
                  type="password"
                  placeholder="Search for property..."
                />
                <Button variant="warning">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Nav>
          </Nav>
          <Nav>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>

            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Prince Musonerwa"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/user">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default HeaderComponent;
