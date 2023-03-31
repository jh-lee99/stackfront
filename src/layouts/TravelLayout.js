import React from "react";
import TravelHeader from "./TravelHeader";
import Footer from "./Footer";

const TravelLayout = ({ children }) => {
  return (
    <>
      <TravelHeader />
      {children}
      <Footer />
    </>
  );
};

export default TravelLayout;
