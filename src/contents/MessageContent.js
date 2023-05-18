import React, { useEffect } from "react";
import { useState } from "react";
import TravelMap from "../components/TravelMap";
import axios from "axios";
import Cookies from "js-cookie";
import { loadPlace } from "../Reducer/MapReducer";
import { useDispatch } from "react-redux";

const MessageContent = (place) => {
  const [index, setIndex] = useState(1);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  function getPlace(location) {
    axios({
      url: `http://localhost:3000/findLocation?query=${location}`,
      method: "get",
      withCredentials: true,
    })
    .then((res) => {
      // 서버에서 location 데이터를 받아서 center 값을 변경
      console.log("getPlace", res.data);
      dispatch(loadPlace(res.data));
    })
    .catch(() => {
      console.log("data error");
    });
  }
    
  const prev = (num) => {
    if (num > 1) {
      setIndex(num - 1);
    }
  };
  const next = (num) => {
    if (num < 5) {
      setIndex(num + 1);
    }
  };

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:3000/findmessage",
        method: "get",
        withCredentials: true,
        params: {
          messageID: index,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        console.log("Message", res.data.message);
        console.log("index2", index);
      })
      .catch((err) => {
        setMessage(err.response.data.error);
        console.log("Err: ", err.response.data.error);
      });
    } catch (error) {
      console.log(error);
    }
    //setIndex(1); // 인덱스 초기화*/
  }, [index]);

  useEffect(() => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(message, "text/html");
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
  }, [message]);

  return (
    <>
      <div style={{ marginTop: "3%" }}></div>
      <div>
        <TravelMap />
        <div></div>
        <nav aria-label="guide">
          <ul className="pagination" style={{ justifyContent: "center" }}>
            <li className="page-item">
              <button
                className="page-link"
                aria-label="Previous"
                onClick={() => {
                  prev(index);
                }}
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => {
                  setIndex(1);
                }}
              >
                1
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => {
                  setIndex(2);
                }}
              >
                2
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => {
                  setIndex(3);
                }}
              >
                3
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => {
                  setIndex(4);
                }}
              >
                4
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => {
                  setIndex(5);
                }}
              >
                5
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                href="#"
                aria-label="Next"
                onClick={() => {
                  next(index);
                }}
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div
        id="pre"
        style={{
          width: "60%",
          display: "flex",
          justifyContent: "center",
        }}
      ></div>
    </>
  );
};

export default MessageContent;
