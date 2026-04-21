import { useEffect, useState } from 'react';
import client from '../api/client';
import PollCard from '../components/PollCard';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [polls, setPolls] = useState([]);

  const loadPolls = async () => {
    const { data } = await client.get('/api/polls');
    setPolls(data);
  };

  useEffect(() => {
    loadPolls();
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h2>Welcome, {user?.name}</h2>
        <p>Email: {user?.email}</p>
        <p>Roles: {Array.isArray(user?.roles) ? user.roles.join(', ') : ''}</p>
        <p>Provider: {user?.provider}</p>
      </div>
      <div className="stack">
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} onRefresh={loadPolls} />
        ))}
      </div>
    </div>
  );
}
