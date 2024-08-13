import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, likePostById } from "../../services/postsApiCalls";
import { useAuth } from "../../contexts/AuthContext";
import "./PostDetails.css";

const PostDetails = () => {
  const [post, setPost] = useState({
    _id: "",
    title: "",
    description: "",
    user_id: { username: "" },
    likes: [],
    likedby: [],
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { postId } = useParams();
  const { passport } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await getPostById(postId as string);
        setPost(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (postId) {
      loadPost();
    }
  }, [postId, post]);

  const onLikePost = async (
    token: string,
    postId: string,
    currentLikes: string[]
  ) => {
    try {
      const updatedPost = await likePostById(token, postId, currentLikes);
      setPost({ ...post, likes: updatedPost.likes });
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="postdetails-page">
      <div className="postdetails-container">
        <h1>Post Details</h1>
        <div className="username-title-likes">
          <div className="username-title">
            <div className="username">{post.user_id.username}</div>
            <div className="detail-title bold">{post.title}</div>
          </div>
          <div
            className="likes"
            onClick={() => onLikePost(passport!.token, post._id, post.likes)}
          >
            likes: {post.likes.length}
          </div>
        </div>
        <div className="description">{post.description}</div>
        <div className="likedby">
          <div>Liked by:</div>
          {post.likedby.map((user: any) => (
            <ul key={user}>
              <li>{user}</li>
            </ul>
          ))}
        </div>
        <button id="back-button" type="button" onClick={handleCancel}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
