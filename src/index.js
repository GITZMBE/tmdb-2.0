import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "./components/connectors/Toast/ToastContainer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ToastContainer />
      <App />
    </RecoilRoot>
  </React.StrictMode>
);