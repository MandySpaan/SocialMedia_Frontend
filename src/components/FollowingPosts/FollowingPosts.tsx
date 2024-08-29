import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getFollowingPosts } from "../../services/postsApiCalls";
import "./FollowingPosts.css";

const FollowingPosts = () => {
  const [posts, setPosts] = useState([]);
  const { passport } = useAuth();

  useEffect(() => {
    const bringFollowingPosts = async () => {
      try {
        const response = await getFollowingPosts(passport!.token);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    bringFollowingPosts();
  }, [passport]);
  return (
    <div className="followingposts-box">
      <h2>Posts by Following</h2>
      <div className="followingposts-container">
        {posts.map((post: any) => (
          <div key={post._id} className="post">
            <div className="username-title-likes">
              <div className="username-title">
                <div className="username-follow">
                  <div className="username">{post.user_id.username}</div>

                  <div className="unfollow">Unfollow</div>
                </div>{" "}
                <div className="title bold">{post.title}</div>
              </div>
              <div className="likes">Likes:</div>
            </div>
            <div className="description">{post.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowingPosts;
