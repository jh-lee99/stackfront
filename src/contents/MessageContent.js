import React, { useEffect } from "react";
import { useState } from "react";
import TravelMap from "../components/TravelMap";
import axios from "axios";
import { get } from "react-hook-form";
import Cookies from 'js-cookie';

const MessageContent = (place) => {
  const [index, setIndex] = useState(0);
  const [content, setContent] = useState("");
  const prev = (num) => {
    if (num > 0) {
      setIndex(num - 1);
    }
  };
  const next = (num) => {
    if (num < 5) {
      setIndex(num + 1);
    }
  };

  useEffect(() => {
    console.log("index", index);
  }, [index]);


  useEffect(() => {
    // 시작시 서버에 요청을 보낸다.
    try {
      axios.get("http://localhost:3000/findmessage", {
        withCredentials: true,
        username:Cookies.get("username"),
        messageID:6-index
      })
        .then((res) => {
          setContent(res.data);
          console.log("defaultMessage", res.data);
        })
        .catch((err) => {
          
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const showMessage = (num) => {
    setIndex(num);
    /*try {
      axios({
        url: `http://localhost:3000/recentmessage?msgnum=${index}`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setContent(res.data);
          console.log("Message", res.data);
        })
        .catch((err) => {
          console.log(err);
          console.log("Err: ", err.message);
        });
    } catch (error) {
      console.log(error);
    }
    //setIndex(0); // 인덱스 초기화*/
  };

  return (
    <>
      <div style={{ marginTop: "3%" }}></div>
      <div>
        <TravelMap />
        <div></div>
        <nav aria-label="guide">
          <ul className="pagination" style={{ justifyContent: "center" }}>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={() => {
                  prev(index);
                }}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => {
                  showMessage(0);
                }}
              >
                1
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => {
                  showMessage(1);
                }}
              >
                2
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => {
                  showMessage(2);
                }}
              >
                3
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => {
                  showMessage(3);
                }}
              >
                4
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => {
                  showMessage(4);
                }}
              >
                5
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Next"
                onClick={() => {
                  next(index);
                }}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div
        style={{
          marginBottom: "2%",
          width: "60%",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          marginBottom: "3%",
        }}
      >
        {content}
      </div>
    </>
  );
};

export default MessageContent;
