import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getMyPosts } from "../../services/postsApiCalls";
import { NavLink } from "react-router-dom";
import "./MyPosts.css";

export const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);

  const { passport } = useAuth();

  useEffect(() => {
    const bringMyPosts = async () => {
      if (passport) {
        const response = await getMyPosts(passport.token);
        setMyPosts(response.data);
      }
    };

    bringMyPosts();
  }, []);

  return (
    <div className="myposts-box">
      <h2>My Posts</h2>
      {myPosts.length > 0 ? (
        myPosts.map(
          (post: {
            _id: string;
            title: string;
            description: string;
            likes: string[];
          }) => (
            <div className="my-posts" key={post._id}>
              <div className="title-likes">
                <div className="title">{post.title}</div>
                <div className="likes">{`likes: ${post.likes.length}`}</div>
              </div>
              <div className="description">{post.description}</div>
            </div>
          )
        )
      ) : (
        <div className="no-posts">
          <p>
            You have no posts yet,{" "}
            <NavLink to="/createpost">Create a post</NavLink>.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
