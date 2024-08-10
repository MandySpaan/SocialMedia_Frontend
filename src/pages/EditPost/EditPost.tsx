// EditPostPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../services/postsApiCalls";

const EditPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await getPostById(postId as string);
        setPost(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    if (postId) {
      loadPost();
    }
  }, [postId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form>
        <label>
          Title:
          <input type="text" value={post.title} readOnly />
        </label>
        <br />
        <label>
          Content:
          <textarea value={post.description} readOnly></textarea>
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
