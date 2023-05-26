import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./Reducer/rootReducer";
import { createStore } from "redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

const store = createStore(rootReducer);
const persistor = persistStore(store);
let unsubscribe = store.subscribe(() => console.log(store.getState()));
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
