import { Navbar, Container } from "react-bootstrap";
import Dropdown from "../components/Dropdown";
const TravelHeader = () => {
  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <img
                src="images\logo.png"
                alt="For. travel"
                width="auto"
                height="50vh"
              />
            </Navbar.Brand>
            <Dropdown />
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default TravelHeader;
