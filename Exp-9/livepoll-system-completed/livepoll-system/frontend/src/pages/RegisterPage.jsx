import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', requestedRole: 'USER' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.post('/api/auth/register', form);
      login(data);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="page narrow">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="form">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <select value={form.requestedRole} onChange={(e) => setForm({ ...form, requestedRole: e.target.value })}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
}
