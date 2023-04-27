import { Modal, Button, Form, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import TravelCalendar from "../components/TravelCalendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const GptApiContentModal = ({ show, onHide, diff }) => {
  const [dest, setDest] = useState("");
  const [start, setStart] = useState("");
  const [date, setDate] = useState(0);

  //const [loading, setLoading] = useState(true);

  const [result, setResult] = useState([]);
  const [showButton, setShowButton] = useState(true);
  //const [startEN, setStartEN] = useState('');
  //const [endEN, setEndEN] = useState('');

  const onChangeDest = (e) => {
    setDest(e.target.value);
  };
  const onChangeStart = (e) => {
    setStart(e.target.value);
  };
  const navigate = useNavigate();

  const addForm = () => {
    //버튼이 사라지게
    setShowButton(false);
  };
  const clearStart = () => {
    //버튼이 보이게
    setShowButton(true);
  };

  const resetDest = (e) => {
    setDest("");
  };

  const resetStart = (e) => {
    setStart("");
  };

  const submit = () => {
    //setLoading(true);
    setDate(diff);
    axios
      .post("http://localhost:3000/travelkeyword", {
        dest: dest,
        start: start,
        date: date,
      })
      .then((response) => {
        console.log(response.data.result);
        setResult(response.data.result); //startEN, destEN 같이들어온다.
        setShowButton(true);
        //setStartEN(response.data.starEN);
        //setEndEN(response.data.endEN);
        onHide();
      })
      .catch((error) => {
        // Handle error.
        alert(error.message);
        console.log("An error occurred:", error.response);
        setShowButton(true);
        window.location.replace("/travel");
        navigate("/travel", { replace: true });
      });
    resetDest();
    resetStart();
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
              {showButton && (
                <Button block variant="info" type="button" onClick={addForm}>
                  출발지 입력하기!
                </Button>
              )}
              {!showButton && (
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
              )}
              {!showButton && (
                <Button
                  variant="info"
                  onClick={() => {
                    clearStart();
                  }}
                >
                  목적지만 입력하기
                </Button>
              )}
              <div className="Box">
                <TravelCalendar />
              </div>
              <Button
                block
                variant="info"
                type="button"
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
      <div>{/*diff*/}</div>
    </>
  );
};

export default GptApiContentModal;
