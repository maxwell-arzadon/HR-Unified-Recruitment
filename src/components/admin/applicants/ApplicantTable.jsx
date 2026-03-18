/**
 * ApplicantTable.jsx
 * Reusable filterable, sortable, paginated table for applicants.
 * Supports search, job type/status/source filters, date range,
 * and an optional period filter for job-specific views.
 * Filters use a modern floating dropdown instead of an inline panel.
 */

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MagnifyingGlass, Funnel, X } from "@phosphor-icons/react";
import { StatusBadge } from "./StatusBadge";
import {
  JOB_TYPES,
  STATUSES,
  SOURCES,
  FILTER_TABS,
} from "../../../data/applicants";

// ─── Constants ────────────────────────────────────────────────────
const TABLE_HEADERS = [
  { label: "REF NO.", key: "ref" },
  { label: "DATE", key: "date" },
  { label: "NAME", key: "name" },
  { label: "APPLIED POSITION", key: "position" },
  { label: "JOB TYPE", key: "jobType" },
  { label: "STATUS", key: "status" },
  { label: "SOURCE", key: "source" },
];

const PAGE_SIZE = 8;

// ─── Component ────────────────────────────────────────────────────
export default function ApplicantTable({
  applicants,
  onRowClick,
  statusOptions,
  showPeriodFilter = false,
}) {
  const resolvedStatuses = statusOptions ?? STATUSES;
  const filterRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  // ── State ────────────────────────────────────────────────────────
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

  // ── Close dropdown when clicking outside ─────────────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Update dropdown position ──────────────────────────────────────
  useEffect(() => {
    if (showFilter && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom + 8, left: rect.right - 288 });
    }
  }, [showFilter]);

  // ── Count active filters ──────────────────────────────────────────
  const activeFilterCount = [
    jobTypeFilter !== "All Job Types",
    statusFilter !== "All Status",
    sourceFilter !== "All Sources",
    dateFrom !== "",
    dateTo !== "",
    showPeriodFilter && period !== "This Week",
  ].filter(Boolean).length;

  // ── Clear all filters ─────────────────────────────────────────────
  const clearFilters = () => {
    setJobTypeFilter("All Job Types");
    setStatusFilter("All Status");
    setSourceFilter("All Sources");
    setDateFrom("");
    setDateTo("");
    setPeriod("This Week");
    setPage(1);
  };

  // ── Handlers ─────────────────────────────────────────────────────
  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  // ── Filtering ─────────────────────────────────────────────────────
  const filtered = applicants.filter((a) => {
    const matchTab = activeTab === "All" || a.jobType === activeTab;
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.position.toLowerCase().includes(search.toLowerCase()) ||
      a.ref?.toLowerCase().includes(search.toLowerCase());
    const matchType =
      jobTypeFilter === "All Job Types" || a.jobType === jobTypeFilter;
    const matchStatus =
      statusFilter === "All Status" || a.status === statusFilter;
    const matchSource =
      sourceFilter === "All Sources" || a.source === sourceFilter;
    return matchTab && matchSearch && matchType && matchStatus && matchSource;
  });

  // ── Sorting ───────────────────────────────────────────────────────
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey]?.toString().toLowerCase() ?? "";
    const valB = b[sortKey]?.toString().toLowerCase() ?? "";
    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  // ── Pagination ────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const selectClass =
    "w-full border border-border rounded-xl px-3 py-2 text-sm text-black bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer";

  return (
    <div className="bg-white rounded-2xl border border-border">
      {/* ── Top bar ────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-wrap gap-3 overflow-x-auto scrollbar-none">
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

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <MagnifyingGlass size={15} className="text-muted flex-shrink-0" />
            <input
              type="text"
              placeholder="Search name, position, ref no."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="text-sm outline-none placeholder-muted w-52 bg-transparent text-black"
            />
          </div>

          <div className="relative" ref={filterRef}>
            <button
              ref={buttonRef}
              onClick={() => setShowFilter((v) => !v)}
              className={`flex items-center gap-2 border rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                showFilter || activeFilterCount > 0
                  ? "border-primary text-primary bg-primary/5"
                  : "border-border text-black hover:border-primary/30"
              }`}
            >
              <Funnel size={15} />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full gradient-bg text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {showFilter &&
              createPortal(
                <div
                  ref={dropdownRef}
                  className="fixed w-72 bg-white border border-border rounded-2xl shadow-xl z-[9999] overflow-hidden"
                  style={{
                    top: dropdownPosition.top,
                    left: dropdownPosition.left,
                  }}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <span className="text-sm font-semibold text-black">
                      Filters
                    </span>
                    <div className="flex items-center gap-2">
                      {activeFilterCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="text-xs text-primary hover:opacity-70 font-semibold transition-opacity"
                        >
                          Clear all
                        </button>
                      )}
                      <button
                        onClick={() => setShowFilter(false)}
                        className="w-6 h-6 rounded-lg hover:bg-border flex items-center justify-center text-muted hover:text-black transition-all"
                      >
                        <X size={13} weight="bold" />
                      </button>
                    </div>
                  </div>

                  <div className="px-4 py-4 flex flex-col gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted uppercase tracking-wide block mb-1.5">
                        Job Type
                      </label>
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
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted uppercase tracking-wide block mb-1.5">
                        Status
                      </label>
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
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted uppercase tracking-wide block mb-1.5">
                        Source
                      </label>
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
                    {showPeriodFilter && (
                      <div>
                        <label className="text-xs font-semibold text-muted uppercase tracking-wide block mb-1.5">
                          Period
                        </label>
                        <select
                          value={period}
                          onChange={(e) => setPeriod(e.target.value)}
                          className={selectClass}
                        >
                          {["This Week", "Today", "This Month", "All Time"].map(
                            (p) => (
                              <option key={p}>{p}</option>
                            ),
                          )}
                        </select>
                      </div>
                    )}
                    <div>
                      <label className="text-xs font-semibold text-muted uppercase tracking-wide block mb-1.5">
                        Date Range
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                          className={`${selectClass} flex-1`}
                        />
                        <span className="text-xs text-muted flex-shrink-0">
                          to
                        </span>
                        <input
                          type="date"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                          className={`${selectClass} flex-1`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 border-t border-border">
                    <button
                      onClick={() => setShowFilter(false)}
                      className="w-full gradient-bg text-white text-sm font-semibold font-jakarta py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>,
                document.body,
              )}
          </div>
        </div>
      </div>

      {/* ── Table ──────────────────────────────────────────────────── */}
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
                  colSpan={7}
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
                  {/* Ref number in monospace, muted — visually distinct as an ID */}
                  <td className="px-5 py-4 text-xs font-mono text-muted whitespace-nowrap">
                    {a.ref}
                  </td>
                  <td className="px-5 py-4 text-sm text-black">{a.date}</td>
                  <td className="px-5 py-4 text-sm font-medium text-black">
                    {a.name}
                  </td>
                  <td className="px-5 py-4 text-sm text-black">{a.position}</td>
                  <td className="px-5 py-4 text-sm text-black">{a.jobType}</td>
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

      {/* ── Pagination ─────────────────────────────────────────────── */}
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
