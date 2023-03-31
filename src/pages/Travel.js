import React from "react";
import TravelLayout from "../layouts/TravelLayout";
import { Container } from "react-bootstrap";
import GptApiContent from "../layouts/GptApiContent";

const Travel = () => {
  return (
    <TravelLayout>
      <Container>
        <GptApiContent />
      </Container>
    </TravelLayout>
  );
};

export default Travel;
