import React from "react";
import TravelHeader from "./TravelHeader";
import Footer from "./Footer";

const TravelLayout = ({ children }) => {
  return (
    <>
      <TravelHeader />
      <div className="ComponentBox">{children}</div>
      <Footer />
    </>
  );
};

export default TravelLayout;
