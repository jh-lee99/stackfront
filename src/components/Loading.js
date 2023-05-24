import React from "react";

export const Loading = () => {
  return (
    <div className="progress" style={{ marginTop: "5%" }}>
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: "100%", borderRadius: "8px" }}
      ></div>
    </div>
  );
};

export default Loading;
