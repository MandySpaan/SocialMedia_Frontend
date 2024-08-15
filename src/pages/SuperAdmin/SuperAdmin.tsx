import { NavLink, useNavigate } from "react-router-dom";
import "./SuperAdmin.css";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userApiCalls";

const SuperAdmin = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="superadmin-page">
      <h1>Welcome Super Admin</h1>
      <h3>On this page you can delete users and posts</h3>
      <div>
        If you want to visit GeekTok as a user{" "}
        <NavLink to={"/"}>click here</NavLink>
      </div>
      <div className="sa-instructions">
        You can always return to the super admin view by going to
        geektok.com/super-admin <br /> or get automatically forwarded by simply
        logging out and logging in again
      </div>
      <div className="all-users">
        <h2>All Users</h2>
        {users.length === 0 ? (
          <p>No users found...</p>
        ) : (
          <div className="all-users-container">
            {users.map((user: { _id: string; username: string }) => (
              <div className="all-users-card" key={user._id}>
                <div className="username">{user.username}</div>
                <button>Delete User</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdmin;
