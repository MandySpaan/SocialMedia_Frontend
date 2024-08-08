const URL = "http://localhost:4000";

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
