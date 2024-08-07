import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const passportString = localStorage.getItem("passport");

    let passport = null;
    if (passportString) {
      passport = JSON.parse(passportString);
    }

    if (!passport || !passport.token) {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Home</div>;
};

export default Home;
