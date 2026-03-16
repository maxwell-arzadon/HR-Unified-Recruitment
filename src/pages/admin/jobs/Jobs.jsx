import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  MagnifyingGlass,
  CaretRight,
  PencilSimple,
  Trash,
} from "@phosphor-icons/react";
import { JOBS, JOB_DEPT_TABS } from "../../../data/jobs_admin";

const PAGE_SIZE = 8;

// ─── Toggle Switch ────────────────────────────────────────────────
function Toggle({ active, onChange }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={`toggle-track ${active ? "active" : "inactive"}`}
    >
      <span className={`toggle-thumb ${active ? "active" : "inactive"}`} />
    </button>
  );
}

export default function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(JOBS);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // ── Filter ────────────────────────────────────────────────────
  const filtered = jobs.filter((j) => {
    const matchTab = activeTab === "All" || j.department === activeTab;
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleToggle = (id) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, active: !j.active } : j)),
    );
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <div className="p-8 min-h-screen">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-jakarta font-bold text-2xl text-black">Jobs</h1>
          <p className="text-sm text-muted mt-0.5">
            Manage job postings and view applicants
          </p>
        </div>
        <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted hover:text-black hover:border-primary/30 transition-all">
          <Bell size={18} />
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-wrap gap-3">
          {/* Dept tabs */}
          <div className="flex items-center gap-1">
            {JOB_DEPT_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all relative ${
                  activeTab === tab
                    ? "text-primary font-semibold"
                    : "text-muted hover:text-black"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Search + New Job */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <MagnifyingGlass size={15} className="text-muted flex-shrink-0" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="text-sm outline-none placeholder-muted w-44 bg-transparent text-black"
              />
            </div>
            <button
              onClick={() => navigate("/admin/jobs/create")}
              className="gradient-bg text-white font-semibold font-jakarta text-sm px-4 py-2 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span className="text-lg leading-none">+</span> New Job
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-bg">
                {[
                  "JOB TITLE",
                  "DESCRIPTION",
                  "VACANCY",
                  "APPLIED TODAY",
                  "STATUS",
                  "ACTIONS",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[10px] font-bold text-muted tracking-widest uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-16 text-sm text-muted"
                  >
                    No jobs found.
                  </td>
                </tr>
              ) : (
                paginated.map((job, i) => (
                  <tr
                    key={job.id}
                    className={`border-b border-border hover:bg-bg transition-colors ${
                      i === paginated.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    {/* Job Title — clickable */}
                    <td className="px-5 py-4">
                      <button
                        onClick={() =>
                          navigate(`/admin/jobs/${job.id}/applicants`)
                        }
                        className="flex items-center gap-1.5 font-semibold text-sm text-black hover:text-primary transition-colors group"
                      >
                        {job.title}
                        <CaretRight
                          size={13}
                          className="text-muted group-hover:text-primary transition-colors"
                        />
                      </button>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted max-w-xs truncate">
                      {job.description}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-black">
                      {job.vacancy}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-sm font-bold ${
                          job.appliedToday >= 100
                            ? "text-primary"
                            : "text-success"
                        }`}
                      >
                        {job.appliedToday.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Toggle
                        active={job.active}
                        onChange={() => handleToggle(job.id)}
                      />
                    </td>
                    {/* Edit + Delete */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/jobs/${job.id}/edit`)}
                          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 transition-all"
                        >
                          <PencilSimple size={14} />
                        </button>
                        <button className="w-8 h-8 rounded-lg border border-primary/20 bg-primary/5 flex items-center justify-center text-primary hover:bg-primary/10 transition-all">
                          <Trash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-border">
          <span className="text-xs text-muted">
            {filtered.length} jobs listed • Click a row to view applicants
          </span>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                  p === page
                    ? "border border-border text-black font-semibold bg-white shadow-sm"
                    : "text-muted hover:text-black hover:bg-bg"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
