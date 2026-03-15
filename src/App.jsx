import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import JobDetail from "./pages/JobDetail";
import Apply from "./pages/Apply";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminApp from "./pages/admin/AdminApp";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("adminAuth") === "true";
  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/apply/:id" element={<Apply />} />

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
