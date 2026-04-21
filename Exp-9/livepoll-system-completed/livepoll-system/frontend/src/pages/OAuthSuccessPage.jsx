import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function OAuthSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');

    const finishLogin = async () => {
      try {
        if (!token) {
          navigate('/login');
          return;
        }

        localStorage.setItem('livepoll_token', token);
        const { data } = await client.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        login({ token, name: data.name, email: data.email, roles: data.roles, provider: data.provider });
        navigate('/dashboard');
      } catch {
        localStorage.removeItem('livepoll_token');
        navigate('/login');
      }
    };

    finishLogin();
  }, [searchParams, navigate, login]);

  return <div className="page"><p>Completing Google login...</p></div>;
}
