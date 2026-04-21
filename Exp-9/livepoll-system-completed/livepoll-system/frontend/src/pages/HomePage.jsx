import { useEffect, useState } from 'react';
import client from '../api/client';
import PollCard from '../components/PollCard';

export default function HomePage() {
  const [polls, setPolls] = useState([]);
  const [message, setMessage] = useState('');

  const loadPolls = async () => {
    try {
      const { data } = await client.get('/api/polls');
      setPolls(data);
      setMessage('');
    } catch {
      setMessage('Login to view secured polls and interact with the system.');
    }
  };

  useEffect(() => {
    loadPolls();
  }, []);

  return (
    <div className="page">
      <div className="hero">
        <h1>Secure LivePoll System</h1>
        <p>Spring Security, JWT, Google OAuth, RBAC and React integration in one project.</p>
      </div>
      {message && <div className="card"><p>{message}</p></div>}
      <div className="stack">
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} onRefresh={loadPolls} />
        ))}
      </div>
    </div>
  );
}
