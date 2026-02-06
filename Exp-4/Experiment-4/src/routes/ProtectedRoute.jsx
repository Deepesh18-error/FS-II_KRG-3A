import { memo } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

// React.memo prevents re-rendering if props haven't changed
export default memo(ProtectedRoute);