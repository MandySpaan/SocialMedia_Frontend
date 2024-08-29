import "./FollowingProfiles.css";

interface User {
  _id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  description?: string;
}

interface FollowingProfilesProps {
  users: User[];
}

const FollowingProfiles = ({ users }: FollowingProfilesProps) => {
  return (
    <div className="following-box">
      <h2>Following</h2>
      <ul>
        {users.map((user) => (
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
