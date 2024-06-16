import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ChatProvider from "./Context/ChatProvider";
import { GridBackground } from "./components/GradientBackground/GradientBackground";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChatProvider>
      <GridBackground />
      <App />
    </ChatProvider>
  </BrowserRouter>
);
