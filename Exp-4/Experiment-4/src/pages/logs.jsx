import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { fetchLogs } from '../store/logSlice';
import { Box, Typography, List, ListItem, CircularProgress, Paper } from '@mui/material';

const Logs = () => {
    const dispatch = useDispatch();
    const { data: logs, status } = useSelector((state) => state.logs);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchLogs());
        }
    }, [status, dispatch]);

    // useMemo prevents recalculating filter on every render
    const highimpactlogs = useMemo(() => logs.filter(log => log.carbon > 4), [logs]);
    const lowimpactlogs = useMemo(() => logs.filter(log => log.carbon <= 4), [logs]);

    if (status === 'loading') {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ mb: 3, backgroundColor: '#ffebee' }}>
                <Box sx={{ p: 2, backgroundColor: '#f44336', color: 'white', textAlign: 'center' }}>
                    <Typography variant="h5">High Carbon Activities &gt; 4</Typography>
                </Box>
                <List>
                    {highimpactlogs.map(log => (
                        <ListItem key={log.id} sx={{ color: '#d32f2f', justifyContent: 'center' }}>
                            <Typography>{log.activity} = {log.carbon} kg CO2</Typography>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <Paper elevation={3} sx={{ backgroundColor: '#e8f5e9' }}>
                <Box sx={{ p: 2, backgroundColor: '#4caf50', color: 'white', textAlign: 'center' }}>
                    <Typography variant="h5">Low Carbon Activities ≤ 4</Typography>
                </Box>
                <List>
                    {lowimpactlogs.map(log => (
                        <ListItem key={log.id} sx={{ color: '#2e7d32', justifyContent: 'center', fontWeight: 'bold' }}>
                            <Typography>{log.activity} = {log.carbon} kg CO2</Typography>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
}
export default Logs;