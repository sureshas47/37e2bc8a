import React from "react";
import { createRoot } from "react-dom/client";
import "./css/body.css";
import "./css/app.css";
import "./css/header.css";
import App from "./App.jsx";

const container = document.getElementById("app");

// Create a root and render the app
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
