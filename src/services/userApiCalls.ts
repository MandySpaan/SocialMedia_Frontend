const URL = "http://localhost:4000";

export const getFollowingProfiles = async (token: string) => {
  const response = await fetch(`${URL}/api/users/following/profiles`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const getAllUsers = async (token: string) => {
  const response = await fetch(`${URL}/api/users`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const deleteUserByIdAdmin = async (token: string, id: string) => {
  const response = await fetch(`${URL}/api/users/${id}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const getMyProfile = async (token: string) => {
  const response = await fetch(`${URL}/api/users/profile`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const updateProfile = async (changes: any, token: string) => {
  const response = await fetch(`${URL}/api/users/profile`, {
    method: "PUT",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(changes),
  });

  return await response.json();
};

export const followUser = async (
  token: string,
  userId: string,
  currentFollowing: string[]
) => {
  const response = await fetch(`${URL}/api/users/follow/${userId}`, {
    method: "PUT",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ following: currentFollowing }),
  });

  return await response.json();
};
