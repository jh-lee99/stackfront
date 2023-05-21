import { Form, Button, Container } from "react-bootstrap";
import {
  updateUsername,
  updateUserpassword,
} from "../Reducer/UpdateUserReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const UpdateUserContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Container style={{ marginTop: "3%" }}>
      <Form id="Form" className="UpdateBox">
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            id="exitBtn"
            variant="danger"
            onClick={() => {
              navigate("/travel");
            }}
          >
            x
          </Button>
        </div>
        <Form.Group className="updateForm">
          <Form.Label>
            <h1 className="my-5">회원정보 수정</h1>
          </Form.Label>
        </Form.Group>
        <Form.Group className="updateForm" style={{ marginBottom: "25%" }}>
          <Form.Label>Username 변경</Form.Label>
          <Button
            variant="info"
            className="updateBtn"
            onClick={() => {
              dispatch(updateUsername());
            }}
          >
            Username 변경하기
          </Button>
        </Form.Group>
        <Form.Group className="updateForm">
          <Form.Label>Password 변경</Form.Label>
          <Button
            variant="info"
            onClick={() => {
              dispatch(updateUserpassword());
            }}
            className="updateBtn"
          >
            Password 변경하기
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default UpdateUserContent;
