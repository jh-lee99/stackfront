import { Modal, Button, Form, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import TravelCalendar from "../components/TravelCalendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, finishLoading } from "../Reducer/LoadingReducer";
import { loadPlace } from "../Reducer/MapReducer";
import Cookies from "js-cookie";
import { dateDiff } from "../Reducer/DateDiffReducer";
import { eventListeners } from "@popperjs/core";

const GptApiContentModal = ({ show, onHide }) => {
  const [dest, setDest] = useState("");
  const [start, setStart] = useState("");
  const isLoading = useSelector((state) => state.LoadingReducer.isLoading);
  const date = useSelector((state) => state.DateDiffReducer.date);
  const dispatch = useDispatch();
  const [result, setResult] = useState("<div></div>");
  const [showButton, setShowButton] = useState(true);
  const [selectedBtnIndex, setSelectedBtnIndex] = useState(0);
  const handleClick = (index) => {
    setSelectedBtnIndex(index);
  };

  function getPlace(location) {
    axios
      .get(`http://localhost:3000/findLocation?query=${location}`) // 서버에서 location 데이터를 받아서 center 값을 변경
      .then((res) => {
        console.log("getPlace", res.data);
        dispatch(loadPlace(res.data));
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

  const resetDate = (e) => {
    dispatch(dateDiff(0));
  };

  useEffect(() => {
    console.log("업", date);
  }, [date]);

  const submit = () => {
    if (!dest) {
      alert("목적지를 입력해주세요!");
    } else if (date === 0) {
      alert("여행 기간을 설정해주세요!");
    } else {
      onHide();
      dispatch(startLoading());

      axios
        .post("http://localhost:3000/travelkeyword", {
          username: Cookies.get("username"),
          dest: dest,
          start: start,
          date: date,
        })
        .then((response) => {
          console.log(response.data.result);
          setResult(response.data.result);
          dispatch(finishLoading());
          setShowButton(true);
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
      resetDate();
    }
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
                  //onKeyDown={handleKeyPress}
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

              <div>
                <div>결과로 받는 언어를 선택해주세요.</div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <Button
                    id="submit"
                    block
                    variant="info"
                    type="button"
                    onClick={() => {
                      submit();
                    }}
                  >
                    전송
                  </Button>
                  <Button
                    type="button"
                    variant="info"
                    className={` ${selectedBtnIndex === 0 && "active"}`}
                    style={{ width: "94px", height: "48px" }}
                    onClick={() => {
                      handleClick(0);
                    }}
                  >
                    한국어
                  </Button>
                  <Button
                    type="button"
                    variant="info"
                    className={` ${selectedBtnIndex === 1 && "active"}`}
                    style={{ width: "94px", height: "48px" }}
                    onClick={() => {
                      handleClick(1);
                    }}
                  >
                    영어
                  </Button>
                  <Button
                    type="button"
                    variant="info"
                    style={{ width: "94px", height: "48px" }}
                    className={` ${selectedBtnIndex === 2 && "active"}`}
                    onClick={() => {
                      handleClick(2);
                    }}
                  >
                    일본어
                  </Button>
                </div>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      {isLoading ? (
        <div className="loadingStyle">
          <Loading />
        </div>
      ) : (
        <div
          id="pre"
          style={{
            width: "60%",
            display: "flex",
            justifyContent: "center",
          }}
        ></div>
      )}
    </>
  );
};

export default GptApiContentModal;
