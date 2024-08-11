import { likePostById } from "../services/postsApiCalls";

export const handleLikePost = async (
  token: string,
  postId: string,
  currentLikes: string[],
  updatePosts: Function
) => {
  try {
    const updatedPost = await likePostById(token, postId, currentLikes);

    updatePosts((prevPosts: any) =>
      prevPosts.map((post: any) =>
        post._id === postId ? { ...post, likes: updatedPost.likes } : post
      )
    );
  } catch (error) {
    console.error("Error handling like:", error);
  }
};
