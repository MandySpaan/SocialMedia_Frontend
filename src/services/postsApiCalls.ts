const URL = "http://localhost:4000";

export const getAllPosts = async () => {
  const response = await fetch(`${URL}/api/posts`);
  return await response.json();
};

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

export const deletePostById = async (token: string, id: string) => {
  const response = await fetch(`${URL}/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const getPostById = async (postId: string): Promise<any> => {
  try {
    const response = await fetch(`${URL}/api/posts/${postId}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Expected JSON response");
    }
  } catch (error) {
    console.error("Failed to fetch post:", error);
    throw error;
  }
};

export const updatePostById = async (
  postId: string,
  data: any,
  token: string
) => {
  try {
    const response = await fetch(`${URL}/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Expected JSON response");
    }
  } catch (error) {
    console.error("Failed to update post:", error);
    throw error;
  }
};

export const likePostById = async (
  token: string,
  postId: string,
  currentLikes: string[]
) => {
  try {
    const response = await fetch(`${URL}/api/posts/like/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ likes: currentLikes }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Error liking post");
    }

    return data.data;
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};
