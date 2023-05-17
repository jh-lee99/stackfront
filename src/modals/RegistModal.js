import { Modal, Button, Form, Container } from "react-bootstrap";
import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import HorizonLine from "../components/HorizonLine";
import { useState } from "react";
import axios from "axios";
//import { Login } from "./LoginModal";

const RegistModal = ({ show, onHide }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const onChangeId = (e) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else setEmailValid(false);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else setPwValid(false);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const register = () => {
    axios
      .post("http://localhost:3000/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("회원가입이 성공적으로 이루어졌습니다!");
        //Login(email, password);
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
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
          <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Name"
                value={username}
                onChange={onChangeId}
                className="my-2"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="이메일"
                value={email}
                onChange={onChangeEmail}
                className="my-2"
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
                className="my-2 register"
              />
              <div className="errorMessageWrap">
                {!pwValid && password.length > 0 && password.length < 21 && (
                  <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                )}
                {!pwValid && password.length > 20 && (
                  <div>20자 이하로 입력해 주세요.</div>
                )}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호 확인"
                value={confrimPassword}
                onChange={onChangeConfirmPassword}
                className="my-2"
              />
              <div className="errorMessageWrap">
                {!(password === confrimPassword) &&
                  confrimPassword.length > 0 && (
                    <div>비밀번호가 일치하지 않습니다.</div>
                  )}
              </div>
            </Form.Group>

            <Button
              block
              variant="info"
              type="button"
              className="my-3"
              onClick={() => {
                register();
              }}
              id="fullBtn"
            >
              Sign Up
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

export default RegistModal;
