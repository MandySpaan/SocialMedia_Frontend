import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { deletePostById, getMyPosts } from "../../services/postsApiCalls";
import { NavLink } from "react-router-dom";
import "./MyPosts.css";

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);

  const [editing, setEditing] = useState(false);

  const { passport } = useAuth();

  useEffect(() => {
    const bringMyPosts = async () => {
      if (passport) {
        const response = await getMyPosts(passport.token);
        setMyPosts(response.data);
      }
    };

    bringMyPosts();
  }, [editing, myPosts]);

  const saveChangesHandler = () => {
    console.log("save changes");
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
              <div className="myposts-buttons">
                <div className="my-posts" key={post._id}>
                  <div className="title-likes">
                    <div className="title">{post.title}</div>
                    <div className="likes">{`likes: ${post.likes.length}`}</div>
                  </div>
                  <div className="description">{post.description}</div>
                </div>
                <div className="post-buttons">
                  <button
                    className={editing ? "save-changes" : "hidden"}
                    value="save-changes"
                    name={post._id}
                    onClick={saveChangesHandler}
                  >
                    Save Changes
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
            <NavLink to="/createpost">Create a post</NavLink>.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
