import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import CreatePost from "../pages/CreatePost/CreatePost";
import EditPost from "../pages/EditPost/EditPost";
import AllPosts from "../pages/AllPosts/AllPosts";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-post/:postId" element={<EditPost />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
