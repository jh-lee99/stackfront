import { Modal, Button, Form, Container, Dropdown } from "react-bootstrap";
import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import HorizonLine from "../components/HorizonLine";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const User = {
  // 로그인 테스트
  email: "test@example.com",
  password: "test@1234",
};

const LoginModal = ({ show, onHide }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const navigate = useNavigate();

  /*const redirectTest = () => { // redirect test
    navigate("/*", { replace: true });
  };*/

  const onChangeEmail = (e) => {
    //이메일 검증
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else setEmailValid(false);
  };

  const onChangePassword = (e) => {
    //비밀번호 검증
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else setPwValid(false);
  };

  const confirmButton = () => {
    //로그인에 성공하면 travel 로 이동(테스트)
    if (email === User.email && password === User.password) {
      alert("로그인에 성공했습니다.");
      navigate("/travel");
    } else alert("등록되지 않은 회원입니다.");
  };

  const Login = () => {
    axios
      .post("http://localhost:3000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // Handle success.
        if (response.status === 201) alert(response.message);
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/travel");
        console.log("login complete!");
        //console.log("User profile", response.data.user);
        //console.log("User token", response.data.jwt);

        //localStorage.setItem("token", response.data.jwt);
      })
      .catch((error) => {
        // Handle error.
        if (error.status === 401) {
          alert(error.message);
        } else {
          alert(error.message);
          window.location.replace("/");
          navigate("/", { replace: true });
        }

        //console.log("An error occurred:", error.response);
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={onChangeEmail}
                placeholder="이메일"
                className="my-3"
              />
              <div className="errorMessageWrap">
                {!emailValid && email.length > 0 && (
                  <div>올바른 이메일을 입력해주세요.</div>
                )}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={onChangePassword}
                className="my-2"
              />
              <div className="errorMessageWrap">
                {!pwValid && password.length > 0 && password.length < 21 && (
                  <div>
                    영문, 숫자, 특수문자 포함 8자 이상 20자 이내로 입력해주세요.
                  </div>
                )}
                {!pwValid && password.length > 20 && (
                  <div>20자 이하로 입력해 주세요.</div>
                )}
              </div>
            </Form.Group>
            <Button
              block
              variant="info"
              type="button"
              className="my-3"
              id="fullBtn"
              name="loginButton"
              onClick={() => {
                Login();
                confirmButton();
                //redirectTest();
              }}
            >
              Login
            </Button>

            <HorizonLine text={"OR"} />
            <GoogleOAuthProvider>
              <GoogleLogin />
            </GoogleOAuthProvider>
          </Form>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default LoginModal;
