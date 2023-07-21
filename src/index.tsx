import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
