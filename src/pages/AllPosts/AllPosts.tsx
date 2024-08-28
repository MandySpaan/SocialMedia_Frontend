import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getAllPosts } from "../../services/postsApiCalls";
import { handleLikePost } from "../../utils/postUtils";
import { handleFollowUser } from "../../utils/userUtils";
import Navbar from "../../components/Navbar/Navbar";
import "./AllPosts.css";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const { passport } = useAuth();

  useEffect(() => {
    const bringAllPosts = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    bringAllPosts();
  }, []);

  const onFollowUser = (
    token: string,
    userId: string,
    currentFollowing: string[]
  ) => {
    handleFollowUser(token, userId, currentFollowing, setPosts);
  };

  const onLikePost = (
    token: string,
    postId: string,
    currentLikes: string[]
  ) => {
    handleLikePost(token, postId, currentLikes, setPosts);
  };

  return (
    <>
      <Navbar />
      <>
        <h1>All Posts</h1>
        {posts.length === 0 ? (
          <p>No posts found...</p>
        ) : (
          <div className="allposts-page">
            {posts.map(
              (post: {
                _id: string;
                user_id: { username: string; _id: string };
                title: string;
                description: string;
                likes: string[];
              }) => (
                <div className="allposts-container" key={post._id}>
                  <div className="username-title-likes">
                    <div className="username-title">
                      <div className="username-follow">
                        <div className="username">{post.user_id.username}</div>
                        <div
                          className="follow"
                          onClick={() =>
                            onFollowUser(
                              passport!.token,
                              post.user_id._id,
                              passport!.tokenData.following
                            )
                          }
                        >
                          {"Follow"}
                        </div>
                      </div>
                      <div
                        className="title bold"
                        onClick={() => {
                          navigate(`/post-details/${post._id}`);
                        }}
                      >
                        {post.title}
                      </div>
                    </div>
                    <div
                      className="likes"
                      onClick={() =>
                        onLikePost(passport!.token, post._id, post.likes)
                      }
                    >
                      likes: {post.likes.length}
                    </div>
                  </div>
                  <div className="description">{post.description}</div>
                </div>
              )
            )}
          </div>
        )}
      </>
    </>
  );
};

export default AllPosts;
