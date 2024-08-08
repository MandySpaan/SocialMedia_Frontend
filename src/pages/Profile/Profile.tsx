import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MyPosts from "../../components/MyPosts/MyPosts";
import MyProfile from "../../components/MyProfile/MyProfile";
import "./Profile.css";

const Profile = () => {
  const { passport } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!passport || !passport.token) {
      navigate("/login");
    }
  }, [passport, navigate]);

  return (
    <div>
      <Navbar />
      <div className="profile-page-title">
        <h1>My Profile Page</h1>
      </div>
      <div className="profile-page">
        <MyProfile />
        <MyPosts />
      </div>
    </div>
  );
};

export default Profile;
