import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLogs } from '../store/logSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { data: logs, status } = useSelector((state) => state.logs);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchLogs());
        }
    }, [status, dispatch]);

    const handleRefresh = () => {
        dispatch(fetchLogs());
    };

    // Calculate totals
    const totalActivities = logs.reduce((acc, log) => {
        acc[log.activity] = (acc[log.activity] || 0) + log.carbon;
        return acc;
    }, {});

    // Categorize by carbon level
    const highCarbon = logs.filter(log => log.carbon > 4);
    const lowCarbon = logs.filter(log => log.carbon <= 4);

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Total Activities</h2>
            <ul>
                {Object.entries(totalActivities).map(([activity, carbon]) => (
                    <li key={activity}>
                        {activity}: {carbon} Kg
                    </li>
                ))}
            </ul>

            <h3 style={{ color: 'red' }}>High Carbon (&gt; 4 Kg)</h3>
            <ul>
                {highCarbon.map((log) => (
                    <li key={log.id}>{log.activity}</li>
                ))}
            </ul>

            <h3 style={{ color: 'green' }}>Low Carbon (≤ 4 Kg)</h3>
            <ul>
                {lowCarbon.map((log) => (
                    <li key={log.id}>{log.activity}</li>
                ))}
            </ul>

            <button onClick={handleRefresh} style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
                {status === 'loading' ? 'Loading...' : 'Refresh Logs'}
            </button>
        </div>
    );
};

export default Dashboard;