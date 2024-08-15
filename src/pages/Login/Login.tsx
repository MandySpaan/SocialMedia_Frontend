import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authApiCalls";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  interface Credentials {
    email: string;
    password: string;
  }

  const { passport, setPassport } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (passport && passport.token) {
      if (passport.tokenData.role === "super_admin") {
        navigate("/super-admin");
      } else {
        navigate("/");
      }
    }
  }, [passport]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredentials((prevState: Credentials) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function login() {
    try {
      const response = await loginUser(credentials);

      if (response.success) {
        const decodedToken = jwtDecode(response.data);
        setPassport({
          token: response.data,
          tokenData: decodedToken,
        });
        localStorage.setItem("passport", JSON.stringify(passport));
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
        <input type="button" value="Login" onClick={login} />
        <p>
          No account yet? <NavLink to="/register">Register here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
