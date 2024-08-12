import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../services/postsApiCalls";
import { useAuth } from "../../contexts/AuthContext";
import "./PostDetails.css";

const EditPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { passport } = useAuth();

  console.log(passport);

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
  }, [postId]);

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
    <div className="editpost-page">
      <div className="editpost-container">
        <h1>Post Details</h1>
        <p>{post.title}</p>
        <p>{post.description}</p>
        <button id="back-button" type="button" onClick={handleCancel}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default EditPostPage;
