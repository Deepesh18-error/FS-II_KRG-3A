import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Logs from "./pages/logs";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import DashboardLayout from "./pages/dashboardlayout";
import DashboardSummary from "./pages/dashboardsummary";
import DashboardAnalytics from "./pages/dashboardanalytics";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Header />
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="summary" element={<DashboardSummary />} />
          <Route path="analytics" element={<DashboardAnalytics />} />
          <Route path="logs" element={<Logs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;