import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setIsAuthenticated } = useAuth();   
  const navigate = useNavigate();            

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/");
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login to ECOTRACK</button>
    </div>
  );
};

export default LoginPage;