import React from "react";
import { Button, Container } from "react-bootstrap";
import { useState } from "react";
import TravelMap from "../components/TravelMap";
import GptApiContentModal from "../modals/GptApiContentModal";
import { useLocation } from "react-router-dom";

const GptApiContent = () => {
  const [GptApiContentModalOn, setGptApiContentModalOn] = useState(false);

  <GptApiContentModal
    show={GptApiContentModalOn}
    onHide={() => setGptApiContentModalOn(false)}
  />;

  const location = useLocation();
  const number = location.state.value;

  return (
    <>
      <GptApiContentModal
        show={GptApiContentModalOn}
        onHide={() => setGptApiContentModalOn(false)}
      />
      <Container>
        <TravelMap />
        <Button
          block
          variant="info"
          type="button"
          className="my-3"
          onClick={() => {
            setGptApiContentModalOn(true);
          }}
          id="Center"
        >
          여행 떠나기
        </Button>
        <div>{number}</div>
      </Container>
    </>
  );
};

export default GptApiContent;
