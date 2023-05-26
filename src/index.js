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
// persistor.purge(); // 브라우저를 닫았을 때 리덕스 상태를 초기화
const root = ReactDOM.createRoot(document.getElementById("root"));
// window.addEventListener("beforeunload", () => {
//   persistor.purge();
// });

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
