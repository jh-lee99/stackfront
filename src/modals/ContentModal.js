import { Modal, Button, Form, Container } from "react-bootstrap";
import React from "react";

const ContentModal = ({ show, onHide }) => {
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
          <Modal.Title id="contained-modal-title-vcenter">Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>가고 싶은 장소를 입력해주세요.</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Button
              block
              variant="info"
              type="button"
              className="my-3"
              id="Btn"
            >
              버튼
            </Button>
            <Button
              block
              variant="info"
              type="button"
              className="my-3"
              id="fullBtn"
            >
              전송
            </Button>
            <Button
              block
              variant="info"
              type="button"
              className="my-3"
              id="fullBtn"
            >
              나가기
            </Button>
          </Form>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default ContentModal;
