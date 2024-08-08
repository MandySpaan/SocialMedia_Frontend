import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import hamburgerImg from "../../img/hamburger-icon.png";

import "./Navbar.css";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  const handleShowNavbar = () => {
    setShowNav(!showNav);
  };

  const { passport, setPassport } = useAuth();

  const logOut = () => {
    localStorage.removeItem("passport");
    setPassport(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h2>GeekTok</h2>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <h4>
            <img src={hamburgerImg} alt="Hamburger icon" />
          </h4>
        </div>
        <div className={`nav-elements ${showNav && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/allposts">All Posts</NavLink>
            </li>
            <li>
              <NavLink to="/createpost">Create Post</NavLink>
            </li>
            {passport && passport.token ? (
              <>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/login" onClick={logOut}>
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
