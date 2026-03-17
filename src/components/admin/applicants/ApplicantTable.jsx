/**
 * ApplicantTable.jsx
 * Reusable filterable, sortable, paginated table for applicants.
 * Supports search, job type/status/source filters, date range,
 * and an optional period filter for job-specific views.
 */

import { useState } from "react";
import { MagnifyingGlass, Funnel } from "@phosphor-icons/react";
import { JobTypeBadge, StatusBadge } from "./StatusBadge";
import {
  JOB_TYPES,
  STATUSES,
  SOURCES,
  FILTER_TABS,
} from "../../../data/applicants";

//Constants
const TABLE_HEADERS = [
  { label: "DATE", key: "date" },
  { label: "NAME", key: "name" },
  { label: "APPLIED POSITION", key: "position" },
  { label: "JOB TYPE", key: "jobType" },
  { label: "STATUS", key: "status" },
  { label: "SOURCE", key: "source" },
];

const PAGE_SIZE = 8;

export default function ApplicantTable({
  applicants,
  onRowClick,
  statusOptions,
  showPeriodFilter = false,
}) {
  const resolvedStatuses = statusOptions ?? STATUSES;

  // All useState hooks at the top of the component
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [jobTypeFilter, setJobTypeFilter] = useState("All Job Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [period, setPeriod] = useState("This Week");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  //Handlers
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  //Filtering
  const filtered = applicants.filter((a) => {
    const matchTab = activeTab === "All" || a.jobType === activeTab;
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.position.toLowerCase().includes(search.toLowerCase());
    const matchType =
      jobTypeFilter === "All Job Types" || a.jobType === jobTypeFilter;
    const matchStatus =
      statusFilter === "All Status" || a.status === statusFilter;
    const matchSource =
      sourceFilter === "All Sources" || a.source === sourceFilter;
    return matchTab && matchSearch && matchType && matchStatus && matchSource;
  });

  //Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey]?.toString().toLowerCase() ?? "";
    const valB = b[sortKey]?.toString().toLowerCase() ?? "";
    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  //Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const selectClass =
    "border border-border rounded-xl px-3 py-2 text-sm text-black bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer";

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Top bar: tabs + search + filter toggle */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-wrap gap-3 overflow-x-auto scrollbar-none">
        {/* Filter tabs */}
        <div className="flex items-center gap-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-1.5 rounded-full text-sm text-nowrap font-medium transition-all relative ${
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

        {/* Search + Filter */}
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
              className="text-sm outline-none placeholder-muted w-48 bg-transparent text-black"
            />
          </div>
          <button
            onClick={() => setShowFilter((v) => !v)}
            className={`flex items-center gap-2 border rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              showFilter
                ? "border-primary text-primary bg-primary/5"
                : "border-border text-black hover:border-primary/30"
            }`}
          >
            <Funnel size={15} />
            Filter
          </button>
        </div>
      </div>

      {/* Expandable filter panel */}
      <div
        className={`overflow-hidden transition-all duration-200 ${
          showFilter ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-4 border-b border-border bg-bg flex flex-wrap items-end gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-muted uppercase tracking-wide">
              Filters:
            </span>
            <select
              value={jobTypeFilter}
              onChange={(e) => {
                setJobTypeFilter(e.target.value);
                setPage(1);
              }}
              className={selectClass}
            >
              {JOB_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className={selectClass}
            >
              {resolvedStatuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select
              value={sourceFilter}
              onChange={(e) => {
                setSourceFilter(e.target.value);
                setPage(1);
              }}
              className={selectClass}
            >
              {SOURCES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted uppercase tracking-wide">
              Date From
            </span>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className={`${selectClass} w-36`}
            />
            <span className="text-xs text-muted">to</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className={`${selectClass} w-36`}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-bg">
              {TABLE_HEADERS.map(({ label, key }) => (
                <th
                  key={label}
                  onClick={() => handleSort(key)}
                  className="text-left px-5 py-3 text-[10px] font-bold text-muted tracking-widest uppercase cursor-pointer select-none hover:text-black transition-colors group"
                >
                  <div className="flex items-center gap-1.5">
                    {label}
                    <span className="flex flex-col gap-px opacity-40 group-hover:opacity-100 transition-opacity">
                      <svg
                        className={`w-2 h-2 ${sortKey === key && sortDir === "asc" ? "text-primary opacity-100" : ""}`}
                        viewBox="0 0 8 5"
                        fill="currentColor"
                      >
                        <path d="M4 0L8 5H0L4 0Z" />
                      </svg>
                      <svg
                        className={`w-2 h-2 ${sortKey === key && sortDir === "desc" ? "text-primary opacity-100" : ""}`}
                        viewBox="0 0 8 5"
                        fill="currentColor"
                      >
                        <path d="M4 5L0 0H8L4 5Z" />
                      </svg>
                    </span>
                  </div>
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
                  No applicants found.
                </td>
              </tr>
            ) : (
              paginated.map((a, i) => (
                <tr
                  key={a.id}
                  onClick={() => onRowClick(a)}
                  className={`border-b border-border cursor-pointer hover:bg-bg transition-colors ${
                    i === paginated.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-5 py-4 text-sm text-black">{a.date}</td>
                  <td className="px-5 py-4 text-sm font-medium text-black">
                    {a.name}
                  </td>
                  <td className="px-5 py-4 text-sm text-black">{a.position}</td>
                  <td className="px-5 py-4">
                    <JobTypeBadge type={a.jobType} />
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-5 py-4 text-sm text-black">{a.source}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="flex items-center justify-between px-5 py-4 border-t border-border">
        <span className="text-xs text-muted">
          Showing {paginated.length} of {filtered.length} results
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
  );
}
