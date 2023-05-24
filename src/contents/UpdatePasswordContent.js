import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { selectupdate } from "../Reducer/UpdateUserReducer";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const UpdatePasswordContent = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const [confirmNewpassword, setConfirmNewpassword] = useState("");
  const [mpwValid, setMpwValid] = useState(false);
  // const email = Cookies.get("email");

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setMpwValid(true);
    } else setMpwValid(false);
  };

  const onChangeNewpassword = (e) => {
    setNewpassword(e.target.value);
  };

  const onChangeConfirmNewpassword = (e) => {
    setConfirmNewpassword(e.target.value);
  };

  const submitPassword = () => {
    if (password === "") alert("비밀번호를 입력해주세요!");
    else if (newPassword === "") alert("변경할 비밀번호를 입력해주세요!");
    else {
      // console.log(email, password);
      axios({
        url:"http://localhost:3000/update/password",
        method:"post",
        withCredentials:true,
        data:{
          // 이부분 이메일 받아올 수 있도록 수정
          // email:,
          password: password,
          newPassword: newPassword,
        }
      })
      .then((res) => {
        console.log("res.data", res.data);
        if (res.status === 200) {
          // Cookies.set("password", res.data.password);
          window.location.reload();
          alert("비밀번호가 변경되었습니다!");
        } else alert("실패하였습니다.");
      })
      .catch((err) => {
        alert("실패하였습니다.");
        console.log(err);
      });
    setPassword("");
    setNewpassword("");
    setConfirmNewpassword("");
  }
  //else alert("비밀번호가 일치하지 않습니다.");
  };
  return (
  <Container style={{ marginTop: "3%" }}>
      <Form id="Form" className="UpdatePwBox">
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="danger"
            id="exitBtn"
            onClick={() => {
              dispatch(selectupdate());
            }}
          >
            x
          </Button>
        </div>
        <Form.Group className="updateForm">
          <Form.Label>
            <h1 className="my-4">Password 변경</h1>
          </Form.Label>
          <Form.Label>Password 입력하기</Form.Label>
          <Form.Control
            id="radius"
            type="password"
            placeholder="CurrentPassword"
            value={password}
            onChange={onChangePassword}
            className="my-2"
          />
        </Form.Group>
        <Form.Group className="updateForm">
          <Form.Label>Password 변경하기</Form.Label>
          <Form.Control
            type="password"
            id="radius"
            placeholder="newPassword"
            value={newPassword}
            onChange={onChangeNewpassword}
            className="my-2"
          />
          <div className="errorMessageWrap">
            {!mpwValid && newPassword.length > 0 && newPassword.length < 21 && (
              <div style={{ marginBottom: "3%" }}>
                영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
              </div>
            )}
            {!mpwValid && newPassword.length > 20 && (
              <div style={{ marginBottom: "3%" }}>
                20자 이하로 입력해 주세요.
              </div>
            )}
          </div>
        </Form.Group>
        <Form.Group className="updateForm">
          <Form.Label>Password 변경확인</Form.Label>
          <Form.Control
            id="radius"
            type="password"
            placeholder="newPassword"
            value={confirmNewpassword}
            onChange={onChangeConfirmNewpassword}
            className="my-2"
          />
          <div className="errorMessageWrap">
            {newPassword !== confirmNewpassword && (
              <div style={{ marginBottom: "3%" }}>
                입력하신 비밀번호가 일치하지 않습니다.
              </div>
            )}
          </div>
        </Form.Group>
        <Form.Group className="updateForm">
          <Button
            id="radius"
            variant="info"
            onClick={() => {
              submitPassword();
            }}
          >
            Password 변경하기
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default UpdatePasswordContent;
