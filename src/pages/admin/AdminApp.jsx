import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminDashboard from "./AdminDashboard";
import NewApplicants from "./NewApplicants";
import Trainees from "./Trainees";
import Jobs from "./jobs/Jobs";
import CreateJob from "./jobs/CreateJob";
import JobApplicants from "./jobs/JobApplicants";
import Calendar from "./Calendar";
import StudioAccounts from "./StudioAccounts";
import { useState } from "react";

export default function AdminApp() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-bg font-dm">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      <main
        className={`flex-1 min-h-screen transition-all duration-300 ${
          collapsed ? "ml-[72px]" : "ml-[220px]"
        }`}
      >
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="applicants/new" element={<NewApplicants />} />
          <Route path="applicants/trainees" element={<Trainees />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/create" element={<CreateJob />} />
          <Route path="jobs/:id/applicants" element={<JobApplicants />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="studio" element={<StudioAccounts />} />
        </Routes>
      </main>
    </div>
  );
}
