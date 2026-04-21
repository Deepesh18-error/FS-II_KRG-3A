import { useEffect, useState } from 'react';
import client from '../api/client';

export default function AdminPage() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [polls, setPolls] = useState([]);

  const loadPolls = async () => {
    const { data } = await client.get('/api/polls');
    setPolls(data);
  };

  useEffect(() => {
    loadPolls();
  }, []);

  const updateOption = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => setOptions([...options, '']);

  const createPoll = async (e) => {
    e.preventDefault();
    try {
      await client.post('/api/admin/polls', {
        question,
        options: options.filter(Boolean)
      });
      setQuestion('');
      setOptions(['', '']);
      loadPolls();
    } catch (error) {
      alert(error.response?.data?.message || 'Could not create poll');
    }
  };

  const togglePoll = async (pollId) => {
    await client.post(`/api/admin/polls/${pollId}/toggle`);
    loadPolls();
  };

  return (
    <div className="page admin-grid">
      <div className="card">
        <h2>Create Poll</h2>
        <form onSubmit={createPoll} className="form">
          <input placeholder="Poll question" value={question} onChange={(e) => setQuestion(e.target.value)} />
          {options.map((option, index) => (
            <input
              key={index}
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
            />
          ))}
          <button type="button" onClick={addOption}>Add option</button>
          <button type="submit">Create poll</button>
        </form>
      </div>
      <div className="stack">
        {polls.map((poll) => (
          <div key={poll.id} className="card">
            <h3>{poll.question}</h3>
            <p className="meta">{poll.active ? 'Active' : 'Closed'}</p>
            <button onClick={() => togglePoll(poll.id)}>
              {poll.active ? 'Close Poll' : 'Reopen Poll'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
