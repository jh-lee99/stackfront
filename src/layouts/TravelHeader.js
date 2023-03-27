import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

const TravelHeader = () => {
  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <img
                src="images\logo.png"
                alt="For. travel"
                width="auto"
                height="50vh"
              />
            </Navbar.Brand>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default TravelHeader;
