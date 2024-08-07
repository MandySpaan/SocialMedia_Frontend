import "./Login.css";

const Login = () => {
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
        <input type="text" name="email" id="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <input type="button" value="Login" />
        <p>No account yet? Register here</p>
      </div>
    </div>
  );
};

export default Login;
