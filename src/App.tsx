import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./contexts/AuthContext";
import "./App.css";
import { useEffect } from "react";

function App() {
  const { passport } = useAuth();

  useEffect(() => {
    if (passport) {
      localStorage.setItem("passport", JSON.stringify(passport));
    } else {
      localStorage.removeItem("passport");
    }
  }, [passport]);
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
