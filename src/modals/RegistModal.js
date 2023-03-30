import { Modal, Button, Form, Container } from "react-bootstrap";
import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import HorizonLine from "../components/HorizonLine";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistModal = ({ show, onHide }) => {
  const [Nickname, setNickname] = useState("");
  const [Email, setEmail] = useState("");
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfrimPassword, setConfirmPassword] = useState("");
  const { replace } = useNavigate();

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const register = () => {
    axios
      .post("", {
        username: Nickname,
        id: Id,
        email: Email,
        password: Password,
        confirmpassword: ConfrimPassword,
      })
      .then((response) => {
        // Handle success.
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        localStorage.setItem("token", response.data.jwt);
        replace("/");
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
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                placeholder="Enter Nickname"
                value={Nickname}
                onChange={onChangeNickname}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Id</Form.Label>
              <Form.Control
                placeholder="Enter Id"
                value={Id}
                onChange={onChangeId}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Enter Email"
                value={Email}
                onChange={onChangeEmail}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={Password}
                onChange={onChangePassword}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={ConfrimPassword}
                onChange={onChangeConfirmPassword}
              />
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

function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <RegistModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default RegistModal;
