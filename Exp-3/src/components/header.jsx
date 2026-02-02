import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <header style={{ padding: "1rem", backgroundColor: "#333", color: "white" }}>
            <h1 style={{ color: "#00ff00" }}>Dashboard</h1>
            <nav>
                <Link to="/" style={{ marginRight: "1rem", color: 'blue' }}>Home</Link>
                <Link to="/" style={{ marginRight: "1rem", color: 'blue' }}>Overview</Link>
                <Link to="/" style={{ marginRight: "1rem", color: 'blue' }}>Reports</Link>
                <button 
                    onClick={handleLogout} 
                    style={{ 
                        marginLeft: "1rem", 
                        color: 'red', 
                        background: 'transparent', 
                        border: 'none', 
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Logout
                </button>
            </nav>
        </header>
    );
}
export default Header;