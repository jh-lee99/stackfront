import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const RegisterContent = () => {
  const [ModifiedId, setModifiedId] = useState("");
  const [ModifiedPassword, setModifiedPassword] = useState("");
  const [ConfirmModifiedPassword, setConfirmModifiedPassword] = useState("");
  const onChangeModifiedId = (e) => {
    setModifiedId(e.target.value);
  };
  const onChangeModifiedPassword = (e) => {
    setModifiedPassword(e.target.value);
  };
  const onChangeConfirmModifiedPassword = (e) => {
    setConfirmModifiedPassword(e.target.value);
  };

  const MemberProfileEditing = () => {
    axios
      .post("", {
        modifiedId: ModifiedId,
        modifiedPassword: ModifiedPassword,
        confirmModifiedPassword: ConfirmModifiedPassword,
      })
      .then((response) => {
        // Handle success.
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        localStorage.setItem("token", response.data.jwt);
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <Container>
      <Form id="Form">
        <Form.Group>
          <Form.Label>
            <h1 className="my-5">회원정보 수정</h1>
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>Id 변경</Form.Label>
          <Form.Control
            type="text"
            value={ModifiedId}
            onChange={onChangeModifiedId}
            placeholder="아이디"
            className="my-2"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password 변경</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호"
            value={ModifiedPassword}
            onChange={onChangeModifiedPassword}
            className="my-2"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password 변경 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호 확인"
            value={ConfirmModifiedPassword}
            onChange={onChangeConfirmModifiedPassword}
            className="my-2"
          />
        </Form.Group>
        <Button
          block
          variant="info"
          type="button"
          className="my-3"
          id="fullBtn"
          onClick={() => {
            MemberProfileEditing();
          }}
        >
          Edit
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterContent;
