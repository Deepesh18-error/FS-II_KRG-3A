
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Header from "./components/Header.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Logs from "./pages/logs.jsx";
import Login from "./pages/login.jsx";
import ProtectedRoutes from "./routes/ProtectedRoute.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import DashboardAnalytics from "./pages/DashboardAnalytics.jsx";
import DashboardSummary from "./pages/DashboardSummary.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header title="Ecotrack"/>
      <Routes>
        <Route path="/" element={<Navigate to="/Login"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={
          <ProtectedRoutes>
            <DashboardLayout/>
          </ProtectedRoutes>
        }>
          <Route index element={<DashboardSummary/>}/>
          <Route path="summary" element={<DashboardSummary/>}/>
          <Route path="analytics" element={<DashboardAnalytics/>}/>
          <Route path="logs" element={<ProtectedRoutes> <Logs/></ProtectedRoutes>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;