import React from "react";
import { Button, Container } from "react-bootstrap";
import { useState } from "react";
import TravelMap from "../components/TravelMap";
import GptApiContentModal from "../modals/GptApiContentModal";
import axios from "axios";

const GptApiContent = () => {
  const [GptApiContentModalOn, setGptApiContentModalOn] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [location, setLocation] = useState();

  return (
    <>
      <TravelMap
      /*location={location} /*서버에서 받은 location 을 TravelMap 으로
      전달 */
      />

      <Button
        block
        variant="info"
        type="button"
        className="my-3 travelBtn center"
        onClick={() => {
          setGptApiContentModalOn(true);
        }}
      >
        여행 떠나기
      </Button>

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
