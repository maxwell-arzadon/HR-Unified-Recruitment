import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminDashboard from "../../components/admin/dashboard/AdminDashboard";
import NewApplicants from "./NewApplicants";
import Trainees from "./Trainees";
import Jobs from "./jobs/Jobs";
import CreateJob from "./jobs/CreateJob";
import JobApplicants from "./jobs/JobApplicants";

export default function AdminApp() {
  return (
    <div className="flex min-h-screen bg-bg font-dm">
      <Sidebar />
      <main className="ml-[220px] flex-1 min-h-screen">
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="applicants/new" element={<NewApplicants />} />
          <Route path="applicants/trainees" element={<Trainees />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/create" element={<CreateJob />} />
          <Route path="jobs/:id/applicants" element={<JobApplicants />} />
          {/* Future: passers, failed, discontinued, calendar, studio */}
        </Routes>
      </main>
    </div>
  );
}
