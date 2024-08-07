import { useState } from "react";
import "./Register.css";

const Register = () => {
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
    <div className="register-page">
      <div className="register-container">
        <h1>GeekTok</h1>
        <p>Create Your GeekTok Account now</p>
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
        <input type="button" value="Create account" />
      </div>
    </div>
  );
};

export default Register;
