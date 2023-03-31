import React from "react";
import { Container } from "react-bootstrap";
import TravelLayout from "../layouts/TravelLayout";
import RegisterContent from "../layouts/RegisterContent";
const RegisterUpdate = () => {
  return (
    <TravelLayout>
      <Container style={{ minHeight: "75vh" }}>
        <RegisterContent />
      </Container>
    </TravelLayout>
  );
};

export default RegisterUpdate;
