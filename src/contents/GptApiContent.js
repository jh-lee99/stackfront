import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import TravelMap from "../components/TravelMap";
import GptApiContentModal from "../modals/GptApiContentModal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUsername } from "../Reducer/UserNameReducer";

const GptApiContent = (place) => {
  const [GptApiContentModalOn, setGptApiContentModalOn] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const dispatch = useDispatch();
  useEffect(() => {
    setLocation(place);
  }, [place]);
  useEffect(() => {
    console.log("location", location);
  }, [location]);
  return (
    <>
      <div style={{ marginTop: "3%" }}></div>
      <div style={{ position: "relative" }}>
        <>
          <TravelMap />
          <div className="setCenter">
            <Button
              block
              variant="info"
              type="button"
              className="my-3 travelBtn center"
              onClick={() => {
                axios
                  .get("http://localhost:3000/api/token/verify", {
                    withCredentials: true,
                  })
                  .then((response) => {
                    console.log(response.data.message);
                    setGptApiContentModalOn(true);
                  })
                  .catch(() => {
                    alert("로그인 이후 이용해주세요!");
                    dispatch(setUsername(""));
                  });
              }}
            >
              여행 떠나기
            </Button>
          </div>
          <GptApiContentModal
            show={GptApiContentModalOn}
            onHide={() => setGptApiContentModalOn(false)}
            showButton={showButton}
            HideButton={() => setShowButton(false)}
          />
        </>
      </div>
    </>
  );
};

export default GptApiContent;
