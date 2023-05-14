import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const UpdateUserContent = () => {
  const [ModifiedId, setModifiedId] = useState("");
  const [ModifiedPassword, setModifiedPassword] = useState("");
  const [ConfirmModifiedPassword, setConfirmModifiedPassword] = useState("");
  const [mpwValid, setMpwValid] = useState(false);

  const onChangeModifiedId = (e) => {
    setModifiedId(e.target.value);
  };

  const onChangeModifiedPassword = (e) => {
    setModifiedPassword(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setMpwValid(true);
    } else setMpwValid(false);
  };
  const onChangeConfirmModifiedPassword = (e) => {
    setConfirmModifiedPassword(e.target.value);
  };

  const MemberProfileEditing = () => {
    if (ModifiedPassword !== ConfirmModifiedPassword)
      return alert("비밀번호를 확인해주세요.");
    else {
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
          alert(error.response);
        });
    }
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
          <Form.Label>Username 변경</Form.Label>
          <Form.Control
            type="text"
            value={ModifiedId}
            onChange={onChangeModifiedId}
            placeholder="Username"
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
          <div className="errorMessageWrap">
            {!mpwValid &&
              ModifiedPassword.length > 0 &&
              ModifiedPassword.length < 21 && (
                <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
              )}
            {!mpwValid && ModifiedPassword.length > 20 && (
              <div>20자 이하로 입력해 주세요.</div>
            )}
          </div>
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
          <div className="errorMessageWrap">
            {!(ModifiedPassword === ConfirmModifiedPassword) &&
              ConfirmModifiedPassword.length > 0 && (
                <div>입력하신 비밀번호와 일치하지 않습니다.</div>
              )}
          </div>
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

export default UpdateUserContent;
