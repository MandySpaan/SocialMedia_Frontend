import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FollowingProfiles from "../../components/FollowingProfiles/FollowingProfiles";
import FollowingPosts from "../../components/FollowingPosts/FollowingPosts";
import "./Home.css";

const Home = () => {
  const { passport } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!passport || !passport.token) {
      navigate("/login");
    }
  }, [passport, navigate]);

  return (
    <>
      <Navbar />
      <h1>Your Geek Feed</h1>
      <div className="home-page">
        <FollowingProfiles />
        <FollowingPosts />
      </div>
    </>
  );
};

export default Home;
