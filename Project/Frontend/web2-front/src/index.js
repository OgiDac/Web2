import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { AuthContextProvider } from "./contexts/auth-context";
// import { CartContextProvider } from "./contexts/cart-context";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}> */}
        {/* <CartContextProvider>
          <AuthContextProvider> */}
            <App />
          {/* </AuthContextProvider>
        </CartContextProvider> */}
      {/* </GoogleOAuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
