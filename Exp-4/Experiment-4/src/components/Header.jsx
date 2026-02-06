import { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    // useCallback prevents recreation of this function on every render
    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
        navigate('/login');
    }, [setIsAuthenticated, navigate]);

    return (
        <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
            <Toolbar>
                <Typography variant="h5" component="h1" sx={{ flexGrow: 1, color: '#4caf50' }}>
                    EcoTrack Dashboard
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/summary">Summary</Button>
                    <Button color="inherit" component={Link} to="/analytics">Analytics</Button>
                    <Button color="inherit" component={Link} to="/logs">Logs</Button>
                    <Button 
                        color="error" 
                        variant="outlined"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

// React.memo prevents re-rendering if props haven't changed
export default memo(Header);