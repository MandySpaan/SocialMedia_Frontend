import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const { passport } = useAuth();
  const navigate = useNavigate();

  if (!passport || !passport.token) {
    navigate("/login");
  }

  return <div>Home</div>;
};

export default Home;
