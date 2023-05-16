import { Form, Button, Container } from "react-bootstrap";
import {
  updateUsername,
  updateUserpassword,
} from "../Reducer/UpdateUserReducer";
import { useDispatch, useSelector } from "react-redux";
const UpdateUserContent = () => {
  const modeState = useSelector((state) => state.UpdateUserReducer.mode);
  const dispatch = useDispatch();
  return (
    <Container>
      <div className="UpdateBox">
        <Form id="Form">
          <Form.Group>
            <Form.Label>
              <h1 className="my-5">회원정보 수정</h1>
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>Username 변경</Form.Label>
          </Form.Group>
          <Button
            variant="info"
            style={{ marginBottom: "5%" }}
            onClick={() => {
              dispatch(updateUsername());
            }}
          >
            Username 변경하기
          </Button>
          <Form.Group>
            <Form.Label>Password 변경</Form.Label>
          </Form.Group>
          <Button
            variant="info"
            onClick={() => {
              dispatch(updateUserpassword());
            }}
          >
            Password 변경하기
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default UpdateUserContent;
