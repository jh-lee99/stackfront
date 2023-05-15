import React, { useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { selectupdate } from "../Reducer/UpdateUserReducer";
import { useDispatch, useSelector } from "react-redux";

const UpdatePasswordContent = () => {
  const modeState = useSelector((state) => state.UpdateUserReducer.mode);
  const dispatch = useDispatch();
  const [ModifiedPassword, setModifiedPassword] = useState("");
  const [ConfirmModifiedPassword, setConfirmModifiedPassword] = useState("");
  const [mpwValid, setMpwValid] = useState(false);

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

  const updateUserEdit = () => {
    if (ModifiedPassword !== ConfirmModifiedPassword)
      return alert("비밀번호를 확인해주세요.");
    else {
      axios
        .post("", {})
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
            <h1 className="my-5">Password 변경</h1>
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>메인으로 돌아가기</Form.Label>
        </Form.Group>
        <Button
          variant="info"
          style={{ marginBottom: "5%" }}
          onClick={() => {
            dispatch(selectupdate());
          }}
        >
          Username 변경하기
        </Button>
        <Form.Group>
          <Form.Label>Password 변경</Form.Label>
        </Form.Group>
        <Button variant="info" onClick={() => {}}>
          Password 변경하기
        </Button>
      </Form>
    </Container>
  );
};

export default UpdatePasswordContent;
