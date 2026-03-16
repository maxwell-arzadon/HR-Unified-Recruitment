import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminDashboard from "../../components/admin/dashboard/AdminDashboard";

export default function AdminApp() {
  return (
    <div className="flex min-h-screen bg-bg font-dm">
      <Sidebar />

      {/* Main content — offset by sidebar width */}
      <main className="ml-[220px] flex-1 min-h-screen">
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          {/* Future routes go here */}
        </Routes>
      </main>
    </div>
  );
}
