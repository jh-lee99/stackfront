import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import RegistModal from "../modals/RegistModal";
import LoginModal from "../modals/LoginModal";

const Header = () => {
  const [RegistModalOn, setRegistModalOn] = useState(false);
  const [LoginModalOn, setLoginModalOn] = useState(false);
  return (
    <>
      <RegistModal
        show={RegistModalOn}
        onHide={() => setRegistModalOn(false)}
      />
      <LoginModal show={LoginModalOn} onHide={() => setLoginModalOn(false)} />
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>Danny TWLC</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link>
                  <Button
                    variant="primary"
                    onClick={() => setLoginModalOn(true)}
                  >
                    Sign In
                  </Button>
                </Nav.Link>
                <Nav.Link>
                  <Button
                    variant="secondary"
                    onClick={() => setRegistModalOn(true)}
                  >
                    Sign Up
                  </Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
