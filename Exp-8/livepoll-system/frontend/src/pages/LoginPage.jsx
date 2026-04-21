import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.post('/api/auth/login', form);
      login(data);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="page narrow">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button type="submit">Login</button>
        </form>
        <div className="divider">or</div>
        <a className="oauth-button" href="http://localhost:8080/oauth2/authorization/google">Continue with Google</a>
        <div className="demo-box">
          <p><strong>Demo admin:</strong> admin@livepoll.com / admin123</p>
          <p><strong>Demo user:</strong> user@livepoll.com / user123</p>
        </div>
      </div>
    </div>
  );
}
