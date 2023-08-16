import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { CartContextProvider } from "./contexts/CartContext";
import { AlertContextProvider } from "./contexts/AlertContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={'553762030277-g4405g2rj6kbug1bkpb2kd6fdpg5hmlh.apps.googleusercontent.com'}>
      <AlertContextProvider>
        <CartContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </CartContextProvider>
      </AlertContextProvider>

      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
