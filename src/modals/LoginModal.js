import { Modal, Button, Form, Container } from "react-bootstrap";
import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import HorizonLine from "../components/HorizonLine";
import axios from "axios";

const LoginModal = ({ show, onHide }) => {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const Login = () => {
    axios
      .post("", {
        id: Id,
        password: Password,
      })
      .then((response) => {
        // Handle success.
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        localStorage.setItem("token", response.data.jwt);
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
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                id="id"
                name="id"
                value={Id}
                onChange={onChangeId}
                placeholder="아이디"
                className="my-2"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호"
                id="password"
                name="Password"
                value={Password}
                onChange={onChangePassword}
                className="my-2"
              />
            </Form.Group>
            <Button
              block
              variant="info"
              type="button"
              className="my-3"
              id="fullBtn"
              name="loginButton"
              value={Password}
              onClick={Login}
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
