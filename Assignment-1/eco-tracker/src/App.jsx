import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import WaterTracker from "./pages/WaterTracker";
import Navbar from "./components/Navbar";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" 
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/water" 
        element={<ProtectedRoute><WaterTracker /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;