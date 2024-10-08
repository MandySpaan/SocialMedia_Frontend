import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { deletePostById, getMyPosts } from "../../services/postsApiCalls";
import { NavLink, useNavigate } from "react-router-dom";
import "./MyPosts.css";
import { handleLikePost } from "../../utils/postUtils";

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const { passport } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const bringMyPosts = async () => {
      if (passport) {
        const response = await getMyPosts(passport.token);
        setMyPosts(response.data);
      }
    };

    bringMyPosts();
  }, [editing, myPosts]);

  const onLikePost = (
    token: string,
    postId: string,
    currentLikes: string[]
  ) => {
    handleLikePost(token, postId, currentLikes, setMyPosts);
  };

  const makeChangesHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const postId = event.currentTarget.name;
    navigate(`/edit-post/${postId}`);
  };

  const deletePostHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.name;
    await deletePostById(passport!.token, id);
    setMyPosts((prevPosts) => prevPosts.filter((post: any) => post._id !== id));
  };

  const editView = () => {
    setEditing(!editing);
  };

  return (
    <div className="myposts-box">
      <h2>My Posts</h2>
      {myPosts.length > 0 ? (
        <>
          {!editing ? (
            <span onClick={editView} className="link-style">
              Edit your posts
            </span>
          ) : (
            <span onClick={editView} className="link-style">
              Cancel editting
            </span>
          )}
          {myPosts.map(
            (post: {
              _id: string;
              title: string;
              description: string;
              likes: string[];
            }) => (
              <div className="myposts-buttons" key={post._id}>
                <div className="my-posts">
                  <div className="title-likes">
                    <div
                      className="title"
                      onClick={() => {
                        navigate(`/post-details/${post._id}`);
                      }}
                    >
                      {post.title}
                    </div>
                    <div
                      className="likes"
                      onClick={() =>
                        onLikePost(passport!.token, post._id, post.likes)
                      }
                    >{`likes: ${post.likes.length}`}</div>
                  </div>
                  <div className="description">{post.description}</div>
                </div>
                <div className="post-buttons">
                  <button
                    className={editing ? "save-changes" : "hidden"}
                    value="make-changes"
                    name={post._id}
                    onClick={makeChangesHandler}
                  >
                    Make Changes
                  </button>
                  <button
                    className={editing ? "delete-post" : "hidden"}
                    value="delete"
                    name={post._id}
                    onClick={deletePostHandler}
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            )
          )}
        </>
      ) : (
        <div className="no-posts">
          <p>
            You have no posts yet,{" "}
            <NavLink to="/create-post">Create a post</NavLink>.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
