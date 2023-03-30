import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Br } from "react-router-dom";

import Router from "./Route";
import reportWebVitals from "./reportWebVitals";

import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Br>
    <Router />
  </Br>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
