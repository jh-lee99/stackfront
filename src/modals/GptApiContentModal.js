import { Modal, Button, Form, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import TravelCalendar from "../components/TravelCalendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

//import GptApiContent from "../layouts/GptApiContent";
//import Loading from "../components/Loading";
let mapPlace = null; // Travel 맵으로 내보낼 변수

const GptApiContentModal = ({ show, onHide, diff }) => {
  const [dest, setDest] = useState("");
  const [start, setStart] = useState("");
  const [date, setDate] = useState(0);
  const [place, setPlace] = useState();

  //const [loading, setLoading] = useState(true);

  const [result, setResult] = useState("<div></div>");
  const [showButton, setShowButton] = useState(true);

  function getPlace(location) {
    axios
      .get(`http://localhost:3000/findLocation?query=${location}`) // 서버에서 location 데이터를 받아서 center 값을 변경
      .then((res) => {
        console.log("getPlace", res.data);
        setPlace(res.data);
      })
      .catch(() => {
        console.log("data error");
      });
  }
  // 추가함
  useEffect(() => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(result, "text/html");
    const pre = document.getElementById("pre");
    pre.innerHTML = "";
    pre.appendChild(parsedHtml.documentElement);

    function handleLocationClick(event) {
      // 클릭한 요소의 location 속성 값을 가져옵니다.
      const location = event.target.getAttribute("location");

      // 가져온 값을 사용해 필요한 작업을 수행합니다.
      console.log(`Location clicked: ${location}`);
      getPlace(location);
    }

    const locationElements = pre.querySelectorAll("[location]");
    locationElements.forEach((element) => {
      element.addEventListener("click", handleLocationClick);
    });
  }, [result]);

  useEffect(() => {
    // place 에 getPlace 로 얻어온 값이 잘 넘어왔는지 확인
    console.log("place", place);
    mapPlace = place;
  }, [place]);

  useEffect(() => {
    // diff 값이 바뀔때마다 date값이 변경됨
    setDate(diff);
  }, [diff]);

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

  // 목적지, 출발지 칸을 비우기 위한 함수
  const resetDest = (e) => {
    setDest("");
  };

  const resetStart = (e) => {
    setStart("");
  };

  const submit = () => {
    //setLoading(true);
    axios
      .post("http://localhost:3000/travelkeyword", {
        dest: dest,
        start: start,
        date: date,
      })
      .then((response) => {
        console.log(response.data.result);
        //var responseDiv = document.getElementById("pre");
        //responseDiv.innerHTML = response.data.result;
        setResult(response.data.result);
        setShowButton(true);
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

      <div id="pre"></div>
    </>
  );
};

export default GptApiContentModal;
export { mapPlace };
