import { useAuth } from "../../contexts/AuthContext";
import { handleLikePost } from "../../utils/postUtils";
import "./FollowingPosts.css";
import { handleFollowUser } from "../../utils/userUtils";

interface User {
  _id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  description?: string;
}

interface Post {
  _id: string;
  title: string;
  description: string;
  likes: string[];
  user_id: User;
}

interface FollowingPostsProps {
  posts: Post[];
  onUnfollowUser: (userId: string) => void;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const FollowingPosts = ({
  posts,
  onUnfollowUser,
  setPosts,
}: FollowingPostsProps) => {
  const { passport } = useAuth();

  const onFollowUser = async (userId: string) => {
    const currentFollowing = posts.map((post) => post.user_id._id);
    await handleFollowUser(
      passport!.token,
      userId,
      currentFollowing,
      (updatedFollowing: any) => {
        // Update the posts state with the new following list
        const updatedPosts = posts.filter(
          (post) => post.user_id._id !== userId
        );
        setPosts(updatedPosts);
        onUnfollowUser(userId);
      }
    );
  };

  const onLikePost = async (postId: string, currentLikes: string[]) => {
    await handleLikePost(
      passport!.token,
      postId,
      currentLikes,
      (updatedPosts: any) => {
        // Update the posts state with the new like status
        setPosts(updatedPosts);
      }
    );
  };

  return (
    <div className="followingposts-box">
      <h2>Posts by Following</h2>
      <div className="followingposts-container">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <div className="username-title-likes">
              <div className="username-title">
                <div className="username-follow">
                  <div className="username">{post.user_id.username}</div>

                  <div
                    className="unfollow"
                    onClick={() => onFollowUser(post.user_id._id)}
                  >
                    {"Unfollow"}
                  </div>
                </div>
                <div className="title bold">{post.title}</div>
              </div>
              <div
                className="likes"
                onClick={() => onLikePost(post._id, post.likes)}
              >
                likes: {post.likes.length}
              </div>
            </div>
            <div className="description">{post.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowingPosts;
