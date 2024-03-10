import React, { StrictMode } from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./store/AuthStore";
import { DishProvider } from "./store/GlobalStore";
import { UserProvider } from "./store/UserStore";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <DishProvider>
          <App />
        </DishProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
