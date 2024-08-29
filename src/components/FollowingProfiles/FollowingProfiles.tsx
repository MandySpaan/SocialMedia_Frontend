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
  onUnfollowUser: (userId: string) => void;
}

const FollowingProfiles = ({
  users,
  onUnfollowUser,
}: FollowingProfilesProps) => {
  return (
    <div className="following-box">
      <h2>Following</h2>
      <div className="following-container">
        {users.map((user) => (
          <div key={user._id} className="following">
            <div className="username-follow">
              <div>{user.username}</div>
              <div
                className="unfollow"
                onClick={() => onUnfollowUser(user._id)}
              >
                {"Unfollow"}
              </div>
            </div>
            <div className="fullname">
              {user.first_name || user.last_name
                ? `(${user.first_name} ${user.last_name})`
                : null}
            </div>
            <div className="description">{user.description}</div>
          </div>
        ))}
      </div>
      <div className={users.length > 0 ? "hidden" : "no-following"}>
        You are not following anyone.
      </div>
    </div>
  );
};

export default FollowingProfiles;
