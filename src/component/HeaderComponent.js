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
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { IoMdMail } from "react-icons/io";

const HeaderComponent = () => {
  const selectNotifications = (state) => state.chat.notifications;

  const notifications = useSelector(selectNotifications);
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
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ height: "8vh" }}
    >
      <Container>
        <LinkContainer to="/">
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
            {user && user.isAdmin ? (
              <>
                <LinkContainer to="/admin/analytics">
                  <Nav.Link>
                    <i className=""></i>
                    {"  "}Analytics
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/properties">
                  <Nav.Link>
                    <i className="bi bi-houses"></i>
                    {"  "}Properties
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/users">
                  <Nav.Link>
                    <i className="bi bi-people"></i> users
                  </Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            )}

            {user && user?._id?.length ? (
              <>
                <LinkContainer to="/add-property">
                  <Nav.Link>Add Property</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/messages">
                  <Nav.Link>
                    <IoMdMail size={20} style={{ color: "#CCCCCC" }} />
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#ffff",
                        marginLeft: "-5px",
                      }}
                    >
                      {notifications.length}
                    </span>
                  </Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/about">
                  <Nav.Link>About</Nav.Link>
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
              </>
            )}

            {user && user?._id?.length ? (
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={user.firstName}
                menuVariant="dark"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} onClick={handleOnClickLogout}>
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/user/properties">
                  My Properties
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/add-preference">
                  Add preference
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
