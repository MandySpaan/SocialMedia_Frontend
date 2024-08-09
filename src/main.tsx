import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { EditingProvider } from "./contexts/EditingContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <EditingProvider>
        <App />
      </EditingProvider>
    </AuthProvider>
  </React.StrictMode>
);
