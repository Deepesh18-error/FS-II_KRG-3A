import client from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function PollCard({ poll, onRefresh }) {
  const { user } = useAuth();

  const handleVote = async (optionId) => {
    try {
      await client.post(`/api/polls/${poll.id}/vote`, { optionId });
      onRefresh();
    } catch (error) {
      alert(error.response?.data?.message || 'Vote failed');
    }
  };

  return (
    <div className="card">
      <h3>{poll.question}</h3>
      <p className="meta">Created by {poll.createdBy} • {poll.active ? 'Active' : 'Closed'}</p>
      <div className="options">
        {poll.options.map((option) => (
          <div key={option.id} className="option-row">
            <div>
              <strong>{option.optionText}</strong>
              <div className="meta">Votes: {option.voteCount}</div>
            </div>
            {user && poll.active && (
              <button onClick={() => handleVote(option.id)}>Vote</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
