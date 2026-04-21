import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import client from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('livepoll_token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  const fetchMe = async () => {
    try {
      setLoading(true);
      const { data } = await client.get('/api/users/me');
      setUser(data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMe();
    }
  }, [token]);

  const login = (authResponse) => {
    localStorage.setItem('livepoll_token', authResponse.token);
    setToken(authResponse.token);
    setUser({
      name: authResponse.name,
      email: authResponse.email,
      roles: authResponse.roles,
      provider: 'LOCAL'
    });
  };

  const logout = () => {
    localStorage.removeItem('livepoll_token');
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  const value = useMemo(() => ({ token, user, loading, login, logout, fetchMe }), [token, user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
