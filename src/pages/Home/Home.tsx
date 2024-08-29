import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FollowingProfiles from "../../components/FollowingProfiles/FollowingProfiles";
import FollowingPosts from "../../components/FollowingPosts/FollowingPosts";
import { getFollowingPosts } from "../../services/postsApiCalls";
import { getFollowingProfiles } from "../../services/userApiCalls";
import "./Home.css";

interface User {
  _id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  description?: string;
}

interface Post {
  _id: string;
  title: string;
  description: string;
  likes: string[];
  user_id: User;
}

const Home = () => {
  const { passport } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!passport || !passport.token) {
      navigate("/login");
    }
  }, [passport, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (passport && passport.token) {
        try {
          const [postsResponse, profilesResponse] = await Promise.all([
            getFollowingPosts(passport.token),
            getFollowingProfiles(passport.token),
          ]);
          setPosts(postsResponse.data);
          setUsers(profilesResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [passport]);

  const handleUnfollowUser = (userId: string) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.user_id._id !== userId)
    );
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  return (
    <>
      <Navbar />
      <h1>Your Geek Feed</h1>
      <div className="home-page">
        <FollowingProfiles users={users} />
        <FollowingPosts
          posts={posts}
          onUnfollowUser={handleUnfollowUser}
          setPosts={setPosts}
        />
      </div>
    </>
  );
};

export default Home;
