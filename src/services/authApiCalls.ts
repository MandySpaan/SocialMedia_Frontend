const URL = "http://localhost:4000";

interface Credentials {
  username?: string;
  email?: string;
  identifier?: string;
  password: string;
}

export const registerUser = async (credentials: Credentials) => {
  const request = await fetch(`${URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const result = await request.json();

  return result;
};

export const loginUser = async (credentials: Credentials) => {
  const request = await fetch(`${URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const result = await request.json();

  return result;
};
