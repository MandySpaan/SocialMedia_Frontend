import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import CreatePost from "../pages/CreatePost/CreatePost";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
