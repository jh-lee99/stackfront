import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import TravelMap from "../components/TravelMap";
import GptApiContentModal from "../modals/GptApiContentModal";

const GptApiContent = (place) => {
  const [GptApiContentModalOn, setGptApiContentModalOn] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  useEffect(() => {
    setLocation(place);
  }, [place]);
  useEffect(() => {
    console.log("location", location);
  }, [location]);
  return (
    <>
      <div style={{ marginTop: "3%" }}></div>
      <TravelMap />

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
