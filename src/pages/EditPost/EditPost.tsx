import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePostById } from "../../services/postsApiCalls";
import "./EditPost.css";
import { useAuth } from "../../contexts/AuthContext";

const EditPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { passport } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await getPostById(postId as string);
        setPost(response.data);
        setEditData(response.data);
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await updatePostById(
        postId as string,
        editData,
        passport!.token
      );
      if (response.success) {
        setPost(editData);
        navigate(`/profile`);
      } else {
        setError("Failed to update post");
      }
    } catch (error: any) {
      setError(error.message);
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
    <div className="editpost-page">
      <h1>Edit Post</h1>
      <div className="input-label-field">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={editData.title}
          placeholder={post.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-label-field">
        <label htmlFor="description">Content:</label>
        <textarea
          id="description"
          name="description"
          value={editData.description}
          placeholder={post.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="edit-buttons">
        <button id="submit-button" onClick={handleSubmit}>
          Save Changes
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditPostPage;
