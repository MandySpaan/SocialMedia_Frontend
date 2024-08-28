import { followUser, getMyProfile } from "../services/userApiCalls";

export const handleFollowUser = async (
  token: string,
  userId: string,
  currentFollowing: string[],
  updateFollow: Function
) => {
  try {
    const updatedFollow = await followUser(token, userId, currentFollowing);

    console.log(updatedFollow.data);
    updateFollow((prevFollow: any) =>
      prevFollow.map((follow: any) =>
        follow._id === userId
          ? { ...follow, following: updatedFollow.data.following }
          : follow
      )
    );

    const myProfile = await getMyProfile(token);
    console.log(myProfile.data.following);
    const passport = JSON.parse(localStorage.getItem("passport") || "{}");

    if (passport && passport.tokenData) {
      passport.tokenData.following = myProfile.data.following;
      localStorage.setItem("passport", JSON.stringify(passport));
    }
  } catch (error) {
    console.error("Error handling like:", error);
  }
};
