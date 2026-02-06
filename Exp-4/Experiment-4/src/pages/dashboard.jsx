import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useCallback } from 'react';
import { fetchLogs } from '../store/logSlice';
import { Box, Typography, List, ListItem, Button, CircularProgress, Paper } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { data: logs, status } = useSelector((state) => state.logs);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchLogs());
        }
    }, [status, dispatch]);

    // useCallback memoizes the function to prevent recreation on every render
    const handleRefresh = useCallback(() => {
        dispatch(fetchLogs());
    }, [dispatch]);

    if (status === 'loading') {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // useMemo prevents recalculating totals on every render
    const totalActivities = useMemo(() => {
        return logs.reduce((acc, log) => {
            acc[log.activity] = (acc[log.activity] || 0) + log.carbon;
            return acc;
        }, {});
    }, [logs]);

    // useMemo for filtering operations
    const highCarbon = useMemo(() => logs.filter(log => log.carbon > 4), [logs]);
    const lowCarbon = useMemo(() => logs.filter(log => log.carbon <= 4), [logs]);

    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>Total Activities</Typography>
                <List>
                    {Object.entries(totalActivities).map(([activity, carbon]) => (
                        <ListItem key={activity}>
                            <Typography>{activity}: {carbon} Kg CO2</Typography>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <Paper elevation={3} sx={{ p: 2, mb: 2, backgroundColor: '#ffebee' }}>
                <Typography variant="h5" sx={{ color: '#d32f2f', mb: 1 }}>High Carbon (&gt; 4 Kg)</Typography>
                <List>
                    {highCarbon.map((log) => (
                        <ListItem key={log.id}>
                            <Typography>{log.activity}</Typography>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <Paper elevation={3} sx={{ p: 2, mb: 3, backgroundColor: '#e8f5e9' }}>
                <Typography variant="h5" sx={{ color: '#2e7d32', mb: 1 }}>Low Carbon (≤ 4 Kg)</Typography>
                <List>
                    {lowCarbon.map((log) => (
                        <ListItem key={log.id}>
                            <Typography>{log.activity}</Typography>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <Button 
                variant="contained" 
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                disabled={status === 'loading'}
            >
                {status === 'loading' ? 'Loading...' : 'Refresh Logs'}
            </Button>
        </Box>
    );
};

export default Dashboard;