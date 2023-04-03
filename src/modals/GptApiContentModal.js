import { Modal, Button, Form, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import TravelCalendar from "../components/TravelCalendar";
import "react-calendar/dist/Calendar.css";

const GptApiContentModal = ({ show, onHide }) => {
  const [dest, setDest] = useState("");
  const [start, setStart] = useState("");
  const [result, setResult] = useState([]);

  const onChangeDest = (e) => {
    setDest(e.target.value);
  };
  const onChangeStart = (e) => {
    setStart(e.target.value);
  };

  const submit = () => {
    axios
      .post("http://localhost:3000/travelkeyword", {
        dest: dest,
        start: start,
      })
      .then((response) => {
        console.log(response.data.result);
        setResult(response.data.result);
        onHide();
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
                  value={dest}
                  onChange={onChangeDest}
                  placeholder="목적지 입력"
                  className="my-3"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>2. 출발지를 입력해주세요.</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="출발지 입력"
                  id="start"
                  value={start}
                  onChange={onChangeStart}
                  className="my-3"
                />
              </Form.Group>
              <div className="Box">
                <TravelCalendar />
              </div>
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
      <div className="pre">{result}</div>
    </>
  );
};

export default GptApiContentModal;
