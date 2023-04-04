import React from "react";
import { Button, Container } from "react-bootstrap";
import { useState } from "react";
import TravelMap from "../components/TravelMap";
import GptApiContentModal from "../modals/GptApiContentModal";

const GptApiContent = () => {
  const [GptApiContentModalOn, setGptApiContentModalOn] = useState(false);
  const [showButton, setShowButton] = useState(true);
  return (
    <>
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
      </Container>
      <GptApiContentModal
        show={GptApiContentModalOn}
        onHide={() => setGptApiContentModalOn(false)}
        showButton={showButton}
        HideButton={() => setShowButton(false)}
      />
    </>
  );
};

export default GptApiContent;
