import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";

import GptApiContentModal from "../modals/GptApiContentModal";

const GptApiContent = () => {
  return (
    <>
      <Button
        block
        variant="info"
        type="button"
        className="my-3"
        /*onClick={() => {
          GptApiContentModalOn(true);
        }}*/
      >
        여행 떠나기
      </Button>
    </>
  );
};

export default GptApiContent;
