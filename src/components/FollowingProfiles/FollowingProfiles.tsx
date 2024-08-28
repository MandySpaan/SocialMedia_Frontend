import { useEffect, useState } from "react";
import { getFollowingProfiles } from "../../services/userApiCalls";
import { useAuth } from "../../contexts/AuthContext";
import "./FollowingProfiles.css";

const FollowingProfiles = () => {
  const [users, setUsers] = useState([]);
  const { passport } = useAuth();

  useEffect(() => {
    const bringFollowingProfiles = async () => {
      try {
        const response = await getFollowingProfiles(passport!.token);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    bringFollowingProfiles();
  }, [passport]);
  return (
    <div className="following-box">
      <h2>Following</h2>
      <ul>
        {users.map((user: any) => (
          <div key={user._id} className="following">
            <div>{user.username}</div>
            <div className="fullname">
              {user.first_name || user.last_name
                ? `(${user.first_name} ${user.last_name})`
                : null}
            </div>
            <div className="description">{user.description}</div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FollowingProfiles;
