import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    
    
    localStorage.setItem("token", "fake-jwt-token");
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        
        
        <button onClick={handleLogin} className="bg-primary text-white px-6 py-2 rounded-xl">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;