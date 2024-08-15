import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllPosts from "../pages/AllPosts/AllPosts";
import PostDetails from "../pages/PostDetails/PostDetails";
import Profile from "../pages/Profile/Profile";
import CreatePost from "../pages/CreatePost/CreatePost";
import EditPost from "../pages/EditPost/EditPost";
import SuperAdmin from "../pages/SuperAdmin/SuperAdmin";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/post-details/:postId" element={<PostDetails />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-post/:postId" element={<EditPost />} />
        <Route path="/super-admin" element={<SuperAdmin />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
