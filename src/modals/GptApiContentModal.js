import { Modal, Button, Form, Container } from "react-bootstrap";
import React from "react";

import { useState } from "react";
import axios from "axios";

const GptApiContentModal = ({ show, onHide }) => {
  const [Dest, setDest] = useState("");
  const [Start, setStart] = useState("");
  const onChangeDest = (e) => {
    setDest(e.target.value);
  };
  const onChangeStart = (e) => {
    setStart(e.target.value);
  };

  const submit = () => {
    axios
      .post("https://localhost:3000/travelkeyword", {
        destination: Dest,
        startingPoint: Start,
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
    <>
      <Container>
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              여행 떠나기
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>1. 목적지를 입력해주세요</Form.Label>
                <Form.Control
                  type="text"
                  id="dest"
                  value={Dest}
                  onChange={onChangeDest}
                  placeholder="목적지 입력"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>2. 출발지를 입력해주세요.</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="출발지 입력"
                  id="start"
                  value={Start}
                  onChange={onChangeStart}
                />
              </Form.Group>
              <Button
                block
                variant="info"
                type="button"
                className="my-3"
                onClick={() => {
                  submit();
                }}
              >
                전송
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default GptApiContentModal;
