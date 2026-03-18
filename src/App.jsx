import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/applicant/Landing";
import JobDetail from "./pages/applicant/JobDetail";
import Apply from "./pages/applicant/Apply";
import TrackApplication from "./pages/applicant/TrackApplication";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminApp from "./pages/admin/AdminApp";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("adminAuth") === "true";
  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

export default function App() {
  return (
    <Routes>
      {/* Applicant routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/apply/:id" element={<Apply />} />
      <Route path="/track-application" element={<TrackApplication />} />

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminApp />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
