import React from "react";
import { Container } from "react-bootstrap";

const Intro = () => {
  return (
    <div>
      첫 접속시 표시되는 화면입니다.
      <br />
      <a href="/travel">로그인 이후 화면 이동하기</a>
      <br />
      <a href="/RegisterUpdate">회원정보 수정 페이지 이동하기</a>
    </div>
  );
};

export default Intro;
