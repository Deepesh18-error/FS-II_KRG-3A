import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  const isAdmin = user?.roles?.includes?.('ROLE_ADMIN') || user?.roles?.has?.('ROLE_ADMIN');

  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="brand">LivePoll</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
        {isAdmin && <Link to="/admin">Admin</Link>}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={logout} className="link-button">Logout</button>
        )}
      </div>
    </nav>
  );
}
