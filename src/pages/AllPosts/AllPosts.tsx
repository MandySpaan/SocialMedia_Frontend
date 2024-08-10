import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postsApiCalls";
import Navbar from "../../components/Navbar/Navbar";
import "./AllPosts.css";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

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
                user_id: { username: string };
                title: string;
                description: string;
                likes: string[];
              }) => (
                <div className="allposts-container" key={post._id}>
                  <div className="username">{post.user_id.username}</div>
                  <div className="title-likes">
                    <div className="title bold">{post.title}</div>
                    <div className="likes">likes: {post.likes.length}</div>
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
