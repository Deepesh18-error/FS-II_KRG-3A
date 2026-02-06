import { useCallback } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Button, Container } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const LoginPage = () => {
  const { setIsAuthenticated } = useAuth();   
  const navigate = useNavigate();            

  // useCallback prevents function recreation on every render
  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
    navigate("/");
  }, [setIsAuthenticated, navigate]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Paper elevation={6} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom color="primary">
            EcoTrack
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Login Page
          </Typography>
          <Button 
            variant="contained" 
            color="success"
            size="large"
            startIcon={<LoginIcon />}
            onClick={handleLogin}
            sx={{ px: 4, py: 1.5 }}
          >
            Login to ECOTRACK
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;   