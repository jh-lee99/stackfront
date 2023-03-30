import { Navbar, Container } from "react-bootstrap";
import Dropdown from "../components/Dropdown";
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
          <Dropdown />
        </Navbar>
      </header>
    </>
  );
};

export default TravelHeader;
