import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MyPosts from "../../components/MyPosts/MyPosts";

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
      <h1>Profile</h1>
      <MyPosts />
    </div>
  );
};

export default Profile;
