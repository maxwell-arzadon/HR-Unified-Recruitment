/**
 * AdminApp.jsx
 * Root layout for the admin panel.
 * Handles protected routing, sidebar state (collapsed/mobile),
 * and renders all admin sub-pages via nested React Router routes.
 */

import { useState } from "react";
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

export default function AdminApp() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-full bg-bg font-dm">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Backdrop for mobile sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <main
        className={`flex-1 min-h-screen w-full transition-all duration-300 ${
          collapsed ? "lg:ml-[72px]" : "lg:ml-[220px]"
        } ml-0`}
      >
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route
            path="dashboard"
            element={<AdminDashboard onMenuOpen={() => setMobileOpen(true)} />}
          />
          <Route
            path="applicants/new"
            element={<NewApplicants onMenuOpen={() => setMobileOpen(true)} />}
          />
          <Route
            path="applicants/trainees"
            element={<Trainees onMenuOpen={() => setMobileOpen(true)} />}
          />
          <Route
            path="jobs"
            element={<Jobs onMenuOpen={() => setMobileOpen(true)} />}
          />
          <Route
            path="jobs/create"
            element={<CreateJob onMenuOpen={() => setMobileOpen(true)} />}
          />
          <Route
            path="jobs/:id/applicants"
            element={<JobApplicants onMenuOpen={() => setMobileOpen(true)} />}
          />
          <Route
            path="calendar"
            element={<Calendar onMenuOpen={() => setMobileOpen(true)} />}
          />
          <Route
            path="studio"
            element={<StudioAccounts onMenuOpen={() => setMobileOpen(true)} />}
          />
        </Routes>
      </main>
    </div>
  );
}
