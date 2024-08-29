import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getFollowingPosts } from "../../services/postsApiCalls";

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
    <div>
      <h2>Posts by Following</h2>
      {posts.map((post: any) => (
        <div key={post._id} className="post">
          <div>{post.user_id.username}</div>
          <div>{post.title}</div>
          <div>{post.description}</div>
        </div>
      ))}
    </div>
  );
};

export default FollowingPosts;
