import { Modal, Button, Form, Container, Dropdown } from "react-bootstrap";
import React, { useState } from "react";
import Cookies from 'js-cookie';
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import HorizonLine from "../components/HorizonLine";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const Login = () => {
    axios({
      url: "http://localhost:3000/login",
      method: "POST",
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    }).then((result) => {
      if (result.status === 200) {
        alert(`로그인 성공: ${result.data.username}님 안녕하세요!`);
        console.log(result.data);
      }
    }).catch((error) => {
      alert("로그인 실패: 등록되지 않은 사용자\n" + error);
      console.log(error.data);
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
