import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postsApiCalls";
import Navbar from "../../components/Navbar/Navbar";

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
      <div className="about-page">
        <h1>All Posts</h1>
        {posts.length === 0 ? (
          <p>No posts found...</p>
        ) : (
          <div className="services-collection">
            {posts.map(
              (post: {
                _id: string;
                title: string;
                description: string;
                likes: number;
              }) => (
                <div className="allposts-container" key={post._id}>
                  <div className="title bold">{post.title}</div>
                  <div className="likes">{post.likes}</div>
                  <div className="description">{post.description}</div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AllPosts;
