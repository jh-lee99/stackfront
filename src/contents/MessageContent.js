import React, { useEffect } from "react";
import { useState } from "react";
import TravelMap from "../components/TravelMap";
import axios from "axios";
import { get } from "react-hook-form";

const MessageContent = (place) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setLocation(place);
  }, [place]);
  useEffect(() => {
    console.log("location", location);
  }, [location]);
  useEffect(() => {
    // 시작시 서버에 요청을 보낸다.
    try {
      axios({
        url: `http://localhost:3000/recentmessage?msgnum=${0}`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          console.log("have accessToken", res.data);
        })
        .catch((err) => {
          console.log(err);
          console.log("Err: ", err.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div style={{ marginTop: "3%" }}></div>
      <div style={{ marginBottom: "3%" }}>
        <TravelMap />
        <div></div>
        <nav aria-label="guide">
          <ul className="pagination" style={{ justifyContent: "center" }}>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={() => {}}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => {}}>
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => {}}>
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => {}}>
                4
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => {}}>
                5
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Next"
                onClick={() => {}}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MessageContent;
