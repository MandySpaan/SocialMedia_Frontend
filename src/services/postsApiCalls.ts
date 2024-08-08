const URL = "http://localhost:4000";

export const getMyPosts = async (token: string) => {
  const response = await fetch(`${URL}/api/posts/own`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const createPost = async (data: any, token: string) => {
  const response = await fetch(`${URL}/api/posts`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};
