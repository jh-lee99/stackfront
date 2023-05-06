import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
  const loginLink = () => {
    navigate("/travel");
  };
  return (
    <div>
      <div className="introText">
        <div className="imgBox">
          <img
            className="marginRight"
            src="images\Travel1.png"
            alt="Travel1"
            width="600vh"
            height="400vh"
          />
          <img
            className="marginLeft"
            src="images\Travel2.png"
            alt="Travel2"
            width="600vh"
            height="400vh"
          />
        </div>
      </div>

      <div className="introBox">
        <Button
          href="#"
          onClick={() => {
            loginLink();
          }}
          variant="info"
          className="introBtn"
        >
          로그인 이후 화면 이동하기
        </Button>
      </div>
    </div>
  );
};

export default Intro;
