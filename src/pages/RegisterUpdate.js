import React from "react";

import TravelLayout from "../layouts/TravelLayout";
import RegisterContent from "../layouts/RegisterContent";
import { Container } from "react-bootstrap";
const RegisterUpdate = () => {
  return (
    <TravelLayout>
      <Container>
        <RegisterContent />
      </Container>
    </TravelLayout>
  );
};

export default RegisterUpdate;
