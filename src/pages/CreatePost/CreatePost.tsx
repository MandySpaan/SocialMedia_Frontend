import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { createPost } from "../../services/postsApiCalls";
import Navbar from "../../components/Navbar/Navbar";
import "./CreatePost.css";

const CreatePost = () => {
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
  });

  const { passport } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!passport || !passport.token) {
      navigate("/login");
    }
  }, [passport, navigate]);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.name);
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await createPost(newPost, passport!.token);
      if (response.success) {
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>CreatePost</h1>
      <div className="createpost-page">
        <div className="createpost-container">
          <h2>What would you like to share?</h2>
          <div className="title">
            <input
              type="text"
              value={newPost.title}
              name="title"
              placeholder="Title"
              onChange={(e) => inputHandler(e)}
            />
          </div>
          <div className="description">
            <textarea
              value={newPost.description}
              name="description"
              placeholder="Description"
              onChange={(e) => inputHandler(e)}
            />
            <br />
            <button onClick={handleSubmit}>Create Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
