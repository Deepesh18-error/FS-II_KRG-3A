import React from "react";

const DashboardSummary = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard Summary</h1>
      <p>Welcome to EcoTrack Dashboard Summary Page ✅</p>

      <div style={{ marginTop: "20px", display: "grid", gap: "15px" }}>
        <div style={cardStyle}>
          <h3>Total Carbon Footprint</h3>
          <p>120 kg CO₂</p>
        </div>

        <div style={cardStyle}>
          <h3>Energy Usage</h3>
          <p>350 kWh</p>
        </div>

        <div style={cardStyle}>
          <h3>Waste Generated</h3>
          <p>15 kg</p>
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