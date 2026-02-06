import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

import Header from "./components/Header";
import ProtectedRoute from "./routes/ProtectedRoute";

// Lazy loading components - they load only when needed
const Logs = lazy(() => import("./pages/logs"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/login"));
const DashboardLayout = lazy(() => import("./pages/dashboardlayout"));
const DashboardSummary = lazy(() => import("./pages/dashboardsummary"));
const DashboardAnalytics = lazy(() => import("./pages/dashboardanalytics"));

// Loading fallback component
const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress size={60} />
  </Box>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;