import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ImageProvider } from "./context/ImageContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ImageProvider>
        <Router>
          <App />
        </Router>
      </ImageProvider>
    </AuthProvider>
  </StrictMode>
);
