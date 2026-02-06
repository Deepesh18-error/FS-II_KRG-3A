import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogs } from '../store/logSlice';

const DashboardAnalytics = () => {
  const dispatch = useDispatch();
  const { data: logs, status } = useSelector((state) => state.logs);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLogs());
    }
  }, [status, dispatch]);

  // Calculate analytics from logs
  const totalCarbon = logs.reduce((sum, log) => sum + log.carbon, 0);
  
  // Find most impactful activity
  const topEmissionSource = logs.length > 0 
    ? logs.reduce((max, log) => log.carbon > max.carbon ? log : max, logs[0])
    : null;

  // Calculate average carbon per activity
  const avgCarbon = logs.length > 0 ? (totalCarbon / logs.length).toFixed(1) : 0;

  // Count high vs low carbon activities
  const highCarbonCount = logs.filter(log => log.carbon > 4).length;
  const lowCarbonCount = logs.filter(log => log.carbon <= 4).length;
  const lowCarbonPercentage = logs.length > 0 
    ? Math.round((lowCarbonCount / logs.length) * 100) 
    : 0;

  if (status === 'loading') {
    return <div style={{ padding: "20px", textAlign: "center" }}>🔄 Loading data...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard Analytics</h1>
      <p>EcoTrack Analytics Page ✅</p>

      <div style={{ marginTop: "20px", display: "grid", gap: "15px" }}>
        <div style={cardStyle}>
          <h3>Average Carbon per Activity</h3>
          <p>📊 {avgCarbon} kg CO₂</p>
        </div>

        <div style={cardStyle}>
          <h3>Low Carbon Activities</h3>
          <p>🌱 {lowCarbonPercentage}% of total</p>
        </div>

        <div style={cardStyle}>
          <h3>Top Emission Source</h3>
          <p>⚡ {topEmissionSource ? `${topEmissionSource.activity} (${topEmissionSource.carbon} kg)` : 'No data'}</p>
        </div>

        <div style={cardStyle}>
          <h3>Suggested Action</h3>
          <p>✅ {highCarbonCount > 0 ? 'Reduce high carbon activities' : 'Keep up the good work!'}</p>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  padding: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  background: "#f8f8f8",
};

export default DashboardAnalytics;