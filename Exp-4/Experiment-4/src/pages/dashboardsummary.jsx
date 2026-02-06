import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogs } from '../store/logSlice';

const DashboardSummary = () => {
  const dispatch = useDispatch();
  const { data: logs, status } = useSelector((state) => state.logs);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLogs());
    }
  }, [status, dispatch]);

  // Calculate total carbon footprint
  const totalCarbon = logs.reduce((sum, log) => sum + log.carbon, 0);
  
  // Calculate activity counts
  const activityCount = logs.length;
  
  // Find high impact activities
  const highImpactCount = logs.filter(log => log.carbon > 4).length;

  if (status === 'loading') {
    return <div style={{ padding: "20px", textAlign: "center" }}>🔄 Loading data...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard Summary</h1>
      <p>Welcome to EcoTrack Dashboard Summary Page ✅</p>

      <div style={{ marginTop: "20px", display: "grid", gap: "15px" }}>
        <div style={cardStyle}>
          <h3>Total Carbon Footprint</h3>
          <p>{totalCarbon} kg CO₂</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Activities</h3>
          <p>{activityCount} activities</p>
        </div>

        <div style={cardStyle}>
          <h3>High Impact Activities</h3>
          <p>{highImpactCount} activities (&gt; 4 kg)</p>
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

export default DashboardSummary;