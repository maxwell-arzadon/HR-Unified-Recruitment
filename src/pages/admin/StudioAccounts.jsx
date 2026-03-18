/**
 * StudioAccounts.jsx
 * Manages studio account assignments in a two-panel layout.
 * Left panel lists studio accounts with department filter tabs.
 * Right panel shows applicants assigned to the selected account.
 */

import { useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import {
  MagnifyingGlass,
  Plus,
  DotsThreeVertical,
  Check,
  CaretDown,
} from "@phosphor-icons/react";
import {
  STUDIO_ACCOUNTS,
  SA_APPLICANTS,
  SA_DEPARTMENTS,
} from "../../data/studio";

//Applicant Card
function ApplicantCard({ applicant }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = applicant.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-bg border border-border rounded-2xl p-4 flex items-start justify-between relative">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold text-black">{applicant.name}</p>
          {applicant.status && (
            <div className="flex items-center gap-1 mt-0.5">
              <Check size={11} className="text-success" weight="bold" />
              <span className="text-xs text-success font-medium">
                {applicant.status}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Three-dot menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-black hover:bg-border transition-all"
        >
          <DotsThreeVertical size={15} weight="bold" />
        </button>
        {menuOpen && (
          <div className="absolute top-full right-0 mt-1 w-36 bg-white border border-border rounded-xl shadow-lg z-10 overflow-hidden">
            {["View Profile", "Remove"].map((opt) => (
              <button
                key={opt}
                onClick={() => setMenuOpen(false)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-bg ${
                  opt === "Remove" ? "text-primary" : "text-black"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Component
export default function StudioAccounts({ onMenuOpen }) {
  const [selectedId, setSelectedId] = useState(STUDIO_ACCOUNTS[0].id);
  const [saSearch, setSaSearch] = useState("");
  const [appSearch, setAppSearch] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("All Departments");

  const selectedSA = STUDIO_ACCOUNTS.find((sa) => sa.id === selectedId);
  const allApplicants = SA_APPLICANTS[selectedId] ?? [];

  // Filter SA list by search and department tab
  const filteredSA = STUDIO_ACCOUNTS.filter((sa) => {
    const matchSearch = sa.name.toLowerCase().includes(saSearch.toLowerCase());
    const matchDept =
      activeDepartment === "All Departments" ||
      sa.department === activeDepartment;
    return matchSearch && matchDept;
  });

  const filteredApplicants = allApplicants.filter((a) =>
    a.name.toLowerCase().includes(appSearch.toLowerCase()),
  );

  const saInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="px-4 sm:px-8 pt-6 pb-8 min-h-screen">
      <PageHeader
        title="Studio Accounts"
        subtitle="Manage studio account assignments"
        onMenuOpen={onMenuOpen}
      />

      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Left: Studio Accounts list */}
        <div className="w-full lg:w-[340px] flex-shrink-0 bg-white rounded-2xl border border-border overflow-hidden">
          {/* Header + search */}
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-jakarta font-bold text-base text-black mb-3">
              Studio Accounts
            </h2>
            <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <MagnifyingGlass size={15} className="text-muted flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={saSearch}
                onChange={(e) => setSaSearch(e.target.value)}
                className="flex-1 text-sm outline-none placeholder-muted bg-transparent text-black"
              />
            </div>
          </div>

          {/* Department filter tabs */}
          <div className="px-5 py-4 border-b border-border">
            <div className="relative">
              <select
                value={activeDepartment}
                onChange={(e) => setActiveDepartment(e.target.value)}
                className="w-full appearance-none border border-border rounded-xl px-4 py-2.5 text-sm text-black bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer pr-10"
              >
                {SA_DEPARTMENTS.map((dept) => (
                  <option key={dept}>{dept}</option>
                ))}
              </select>
              <CaretDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
            </div>
          </div>

          {/* SA rows */}
          <div className="divide-y divide-border">
            {filteredSA.length === 0 ? (
              <p className="text-sm text-muted text-center py-8">
                No accounts found.
              </p>
            ) : (
              filteredSA.map((sa) => {
                const isSelected = sa.id === selectedId;
                return (
                  <button
                    key={sa.id}
                    onClick={() => setSelectedId(sa.id)}
                    className={`w-full flex items-center justify-between px-5 py-4 transition-colors text-left ${
                      isSelected ? "bg-primary/5" : "hover:bg-bg"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {saInitials(sa.name)}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-bold ${isSelected ? "text-primary" : "text-black"}`}
                        >
                          {sa.name}
                        </p>
                        {/* Department shown below name */}
                        <p className="text-xs text-muted">{sa.department}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted border border-border rounded-full px-3 py-1 bg-bg flex-shrink-0">
                      {sa.saId}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Applicants panel */}
        <div className="w-full flex-1 bg-white rounded-2xl border border-border overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-4 border-b border-border gap-3">
            <div>
              <h2 className="font-jakarta font-bold text-base text-black">
                Applicants — {selectedSA?.name}
              </h2>
              {/* Show department in subtitle */}
              <p className="text-xs text-muted mt-0.5">
                {selectedSA?.department} • SA ID: {selectedSA?.saId}
              </p>
            </div>
            <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all w-full sm:w-52">
              <MagnifyingGlass size={15} className="text-muted flex-shrink-0" />
              <input
                type="text"
                placeholder="Search applicants..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                className="flex-1 text-sm outline-none placeholder-muted bg-transparent text-black"
              />
            </div>
          </div>

          <div className="p-5">
            {filteredApplicants.length === 0 ? (
              <p className="text-sm text-muted text-center py-8">
                No applicants assigned.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredApplicants.map((a) => (
                  <ApplicantCard key={a.id} applicant={a} />
                ))}
              </div>
            )}
            <button className="w-full flex items-center justify-center gap-2 border border-border rounded-2xl py-4 text-sm font-semibold text-black hover:border-primary/30 hover:text-primary transition-all mt-4">
              <Plus size={15} />
              Add Applicant to Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
