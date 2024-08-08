import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../services/authApiCalls";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  interface Credentials {
    username: string;
    email: string;
    password: string;
  }

  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredentials((prevState: Credentials) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function register() {
    try {
      const response = await registerUser(credentials);

      if (response.success) {
        navigate("/login");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>GeekTok</h1>
        <p>Create Your GeekTok Account now</p>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange={handleChange}
          autoComplete="username"
        />
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
        <input type="button" value="Create account" onClick={register} />
      </div>
      <div className="small">
        <p>
          Already have an account? <NavLink to="/login">Login</NavLink> instead.
        </p>
      </div>
    </div>
  );
};

export default Register;
