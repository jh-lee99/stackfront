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
          <div class="btn-group">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              aria-expanded="false"
            >
              Default dropdown
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#">
                  Menu item
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Menu item
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Menu item
                </a>
              </li>
            </ul>
          </div>
        </Navbar>
      </header>
    </>
  );
};

export default TravelHeader;
