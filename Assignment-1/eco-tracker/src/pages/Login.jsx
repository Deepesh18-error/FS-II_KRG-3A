import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "fake-jwt-token");
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center border">
        <h2 className="text-2xl font-bold mb-6">EcoTrack Login</h2>
        <button 
          onClick={handleLogin} 
          className="bg-blue-500 text-white px-10 py-3 rounded-xl font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;