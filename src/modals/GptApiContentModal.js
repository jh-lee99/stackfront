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
import { dateDiff } from "../Reducer/DateDiffReducer";

const GptApiContentModal = ({ show, onHide }) => {
  const [dest, setDest] = useState("");
  const [start, setStart] = useState("");
  const isLoading = useSelector((state) => state.LoadingReducer.isLoading);
  const date = useSelector((state) => state.DateDiffReducer.date);
  const dispatch = useDispatch();
  const [result, setResult] = useState("<div></div>");
  const [showButton, setShowButton] = useState(true);
  const [selectedBtnIndex, setSelectedBtnIndex] = useState(0);
  const [langcode, setLangcode] = useState("ko");
  const handleClick = (index) => {
    // 버튼 활성화 함수
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
    const bodyStyle = parsedHtml.getElementsByTagName("body")[0].style;
    bodyStyle.backgroundColor = "rgb(245, 245, 220)";
    bodyStyle.padding = "5%";
    bodyStyle.borderRadius = "8px";

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

  function changeLang(lang) {
    setLangcode(lang);
  }
  useEffect(() => {
    // langcord 작동 확인
    console.log(langcode);
  }, [langcode]);

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
    document.getElementById("pre").innerHTML = "";
    if (!dest) {
      alert("목적지를 입력해주세요!");
    } else if (date === 0) {
      alert("여행 기간을 설정해주세요!");
    } else {
      onHide();
      dispatch(startLoading());

      axios({
        url: "http://localhost:3000/travelkeyword",
        method: "post",
        withCredentials: true,
        data: {
          dest: dest,
          start: start,
          date: date,
          langcode: langcode,
        },
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
      setLangcode("ko");
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
                  style={{ borderRadius: "8px" }}
                />
              </Form.Group>
              {showButton && (
                <Button
                  block
                  variant="info"
                  type="button"
                  onClick={addForm}
                  style={{ borderRadius: "8px" }}
                >
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
                    style={{ borderRadius: "8px" }}
                  />
                </Form.Group>
              )}
              {!showButton && (
                <Button
                  variant="info"
                  style={{ borderRadius: "8px" }}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginRight: "4vh",
                  marginBottom: "1%",
                }}
              >
                답변받을 언어를 선택해주세요!
              </div>
              <div
                className="btn-container"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  className="btn-wrapper"
                  style={{
                    justifyContent: "start",
                  }}
                >
                  <Button
                    style={{ borderRadius: "8px" }}
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
                </div>
                <div
                  className="btn-wrapper"
                  style={{
                    justifyContent: "end",
                  }}
                >
                  <div>
                    <Button
                      type="button"
                      variant="info"
                      className={` ${selectedBtnIndex === 0 && "active"}`}
                      style={{
                        width: "94px",
                        height: "48px",
                        borderStartStartRadius: "8px",
                        borderEndStartRadius: "8px",
                      }}
                      onClick={() => {
                        handleClick(0);
                        changeLang("ko");
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
                        changeLang("en");
                      }}
                    >
                      영어
                    </Button>
                    <Button
                      type="button"
                      variant="info"
                      style={{
                        width: "94px",
                        height: "48px",
                        borderStartEndRadius: "8px",
                        borderEndEndRadius: "8px",
                      }}
                      className={` ${selectedBtnIndex === 2 && "active"}`}
                      onClick={() => {
                        handleClick(2);
                        changeLang("jp");
                      }}
                    >
                      일본어
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      {isLoading ? (
        <div style={{ marginTop: "3%", marginBottom: "3%" }}>
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
