import { useEffect, useState } from "react";
import { getFollowingProfiles } from "../../services/userApiCalls";
import { useAuth } from "../../contexts/AuthContext";

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
    <div>
      Following:
      <ul>
        {users.map((user: any) => (
          <div key={user._id}>
            <div>{user.username}</div>
            <div>
              {user.first_name} {user.last_name}
            </div>
            <div>{user.description}</div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FollowingProfiles;
