import React, { useState } from "react";
import axios from "axios";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import RegistModal from "../modals/RegistModal";
import LoginModal from "../modals/LoginModal";
import Dropdown from "../components/Dropdown";
import Cookies from "js-cookie";

const Header = () => {
  // axios 요청으로 username을 반환하는 요청을 보냄
  // (로그인 상태라면)인터셉터 통해서 토큰 갱신하고 유저 이름 받아옴(navbar에 출력)
  // (로그인 상태가 아니라면)로그인 회원가입 버튼 인터페이스 제공
  const getusername = () => {
    axios
      .get("http://localhost:3000/userinfo")
      .then((res) => {
        if (res.status === 200) return res.data.username;
        else if (res.status === 401) return "";
        else return "";
      })
      .catch((err) => {
        console.log(err);
        return "";
      });
  };

  const [RegistModalOn, setRegistModalOn] = useState(false);
  const [LoginModalOn, setLoginModalOn] = useState(false);
  const token = Cookies.get("accessToken");
  Cookies.set("username", getusername());
  const username = Cookies.get("username");

  if (username && token) {
    console.log("have", username);
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
  } else {
    console.log("no have");
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
              <Navbar.Brand href="/">
                <img
                  src="images\logo.png"
                  alt="For. travel"
                  width="auto"
                  height="50vh"
                />
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-end"
              >
                <Nav className="ml-auto">
                  {/*<Nav.Link>
                    <Button
                      variant="primary"
                      onClick={() => setLoginModalOn(true)}
                      id="fullBtn"
                    >
                      Login
                    </Button>
                  </Nav.Link>
                  <Nav.Link>
                    <Button
                      variant="secondary"
                      onClick={() => setRegistModalOn(true)}
                      id="fullBtn"
                    >
                      Sign Up
                    </Button>
    </Nav.Link>*/}
                  <Dropdown />
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
};

export default Header;
