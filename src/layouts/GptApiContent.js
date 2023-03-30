import React from "react";
import { Button, Container } from "react-bootstrap";
import { useState } from "react";

import GptApiContentModal from "../modals/GptApiContentModal";

const GptApiContent = () => {
  const [GptApiContentModalOn, setGptApiContentModalOn] = useState(false);
  <GptApiContentModal
    show={GptApiContentModalOn}
    onHide={() => setGptApiContentModalOn(false)}
  />;
  return (
    <>
      <GptApiContentModal
        show={GptApiContentModalOn}
        onHide={() => setGptApiContentModalOn(false)}
      />
      <Button
        block
        variant="info"
        type="button"
        className="my-3"
        onClick={() => {
          setGptApiContentModalOn(true);
        }}
      >
        여행 떠나기
      </Button>
    </>
  );
};

export default GptApiContent;
