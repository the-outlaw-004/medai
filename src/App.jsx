import { Route, Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashborad";
import UploadReport from "./pages/UploadReport";
import ReportsDashboard from "./pages/ReportsDashboard";
import ReportDetail from "./pages/reportDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {/* <Dashboard /> */}
            <ReportsDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadReport />
          </ProtectedRoute>
        }
      />
      <Route path="/report/:id" element={<ReportDetail />} />
    </Routes>
  );
}

export default App;
