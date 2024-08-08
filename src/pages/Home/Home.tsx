import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const { passport } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!passport || !passport.token) {
      navigate("/login");
    }
  }, [passport, navigate]);

  return (
    <div>
      <Navbar />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
