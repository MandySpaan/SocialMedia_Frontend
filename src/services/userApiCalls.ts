const URL = "http://localhost:4000";

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
