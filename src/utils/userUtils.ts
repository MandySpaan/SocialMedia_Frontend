import { followUser } from "../services/userApiCalls";

export const handleFollowUser = async (
  token: string,
  userId: string,
  currentFollowing: string[],
  updateFollow: Function
) => {
  try {
    const updatedFollow = await followUser(token, userId, currentFollowing);
    updateFollow((prevFollow: any) =>
      prevFollow.map((follow: any) =>
        follow._id === userId
          ? { ...follow, following: updatedFollow.following }
          : follow
      )
    );
  } catch (error) {
    console.error("Error handling like:", error);
  }
};
