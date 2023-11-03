import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "antd/dist/reset.css";
import "./index.scss";
import StoreProvider from "./redux/store/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
