import { NavLink, useNavigate } from "react-router-dom";
import "./SuperAdmin.css";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userApiCalls";
import { getAllPosts } from "../../services/postsApiCalls";

const SuperAdmin = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const { passport } = useAuth();
  const navigate = useNavigate();

  if (passport && passport.tokenData.role !== "super_admin") {
    navigate("/");
  }

  useEffect(() => {
    const bringAllUsers = async () => {
      try {
        const response = await getAllUsers(passport!.token);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    bringAllUsers();
  }, [passport]);

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
    <div className="superadmin-page">
      <h1>Welcome Super Admin</h1>
      <div className="sa-instructions">
        <h3>On this page you can delete users and posts</h3>
        <div>
          If you want to visit GeekTok as a user{" "}
          <NavLink to={"/"}>click here</NavLink>
        </div>
        <div className="sa-instructions-return">
          You can always return to the super admin view by going to
          geektok.com/super-admin <br /> or get automatically forwarded by
          simply logging out and logging in again
        </div>
      </div>
      <div className="sa-users-posts">
        <div className="sa-allusers">
          <h2>All Users</h2>
          {users.length === 0 ? (
            <p>No users found...</p>
          ) : (
            <div className="sa-allusers-container">
              {users.map((user: { _id: string; username: string }) => (
                <div className="sa-users-card" key={user._id}>
                  <div className="sa-username">{user.username}</div>
                  <button>Delete User</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="sa-allposts">
          <h2>All Posts</h2>
          {posts.length === 0 ? (
            <p>No posts found...</p>
          ) : (
            <div className="sa-allposts-container">
              {posts.map(
                (post: {
                  _id: string;
                  user_id: { username: string };
                  title: string;
                }) => (
                  <div className="sa-posts-card" key={post._id}>
                    <div className="sa-username-title">
                      <div className="sa-username">{post.user_id.username}</div>
                      <div
                        className="sa-title bold"
                        onClick={() => {
                          navigate(`/post-details/${post._id}`);
                        }}
                      >
                        {post.title}
                      </div>
                    </div>
                    <button>Delete Post</button>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
