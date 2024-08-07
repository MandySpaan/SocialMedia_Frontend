import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  interface Credentials {
    email: string;
    password: string;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredentials((prevState: Credentials) => ({
      ...prevState,
      [name]: value,
    }));
  }

  console.log(credentials);

  return (
    <div className="login-page">
      <div className="intro-container">
        <h1>GeekTok</h1>
        <p>
          Share Your Love for All Things Geek and Connect with Fellow Geeks
          Worldwide
        </p>
      </div>
      <div className="login-container">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          autoComplete="current-password"
        />
        <input type="button" value="Login" />
        <p>No account yet? Register here</p>
      </div>
    </div>
  );
};

export default Login;
