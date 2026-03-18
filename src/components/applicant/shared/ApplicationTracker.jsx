/**
 * ApplicationTracker.jsx
 * Allows applicants to search for their application status
 * using their reference number. Only shows non-sensitive
 * status info — no personal details are displayed.
 */

import { useState } from "react";
import {
  MagnifyingGlass,
  CheckCircle,
  Circle,
  Warning,
} from "@phosphor-icons/react";

export default function ApplicationTracker() {
  const [refInput, setRefInput] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const trimmed = refInput.trim().toUpperCase();
    if (!trimmed) return;

    // Look up in localStorage
    const stored = JSON.parse(localStorage.getItem("rc_applications") || "[]");
    const match = stored.find((a) => a.ref === trimmed);

    if (match) {
      setResult(match);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-10 md:px-16 lg:px-[80px] py-10 sm:py-14">
      <div className="max-w-[640px] mx-auto">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h2 className="font-jakarta font-bold text-black text-2xl mb-2">
            Track Your Application
          </h2>
          <p className="text-sm text-zinc-400">
            Enter your reference number to check your application status.
          </p>
        </div>

        {/* Search input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <div className="flex-1 flex items-center gap-3 border border-border rounded-2xl px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all bg-white">
            <MagnifyingGlass size={18} className="text-muted flex-shrink-0" />
            <input
              type="text"
              placeholder="e.g. RC-K4X9M2PQ"
              value={refInput}
              onChange={(e) => {
                setRefInput(e.target.value);
                setNotFound(false);
                setResult(null);
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 text-sm outline-none placeholder-zinc-300 bg-transparent text-black font-mono"
            />
          </div>
          <button
            onClick={handleSearch}
            className="gradient-bg text-white font-semibold font-jakarta text-sm px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity sm:flex-shrink-0 w-full sm:w-auto"
          >
            Search
          </button>
        </div>

        {/* Not found state */}
        {notFound && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4">
            <Warning
              size={18}
              className="text-primary flex-shrink-0"
              weight="fill"
            />
            <div>
              <p className="text-sm font-semibold text-black">
                Reference number not found
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Please check your reference number and try again. Reference
                numbers are case-sensitive.
              </p>
            </div>
          </div>
        )}

        {/* Result card */}
        {result && (
          <div className="bg-white border border-border rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-border">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    Reference Number
                  </p>
                  <p className="font-jakarta font-bold text-black text-xl">
                    {result.ref}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs text-zinc-400">Submitted</p>
                  <p className="text-sm font-semibold text-black">
                    {result.dateSubmitted}
                  </p>
                </div>
              </div>
            </div>

            {/* Job info */}
            <div className="px-6 py-4 border-b border-border bg-bg">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Position Applied
              </p>
              <p className="font-jakarta font-bold text-black text-base">
                {result.jobTitle}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-zinc-400">{result.jobType}</span>
                <span className="text-zinc-300">•</span>
                <span className="text-xs text-zinc-400">
                  {result.jobLocation}
                </span>
              </div>
            </div>

            {/* Application stages */}
            <div className="px-6 py-5">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                Application Progress
              </p>
              <div className="flex flex-col gap-3">
                {result.stages.map((stage, i) => (
                  <div key={stage.label} className="flex items-center gap-3">
                    {stage.done ? (
                      <CheckCircle
                        size={20}
                        weight="fill"
                        className="text-success flex-shrink-0"
                      />
                    ) : (
                      <Circle
                        size={20}
                        className="text-zinc-200 flex-shrink-0"
                      />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stage.done ? "text-black" : "text-zinc-300"
                      }`}
                    >
                      {stage.label}
                    </span>
                    {/* Current stage pill */}
                    {i === result.stages.findIndex((s) => !s.done) - 0 &&
                      result.stages[i - 1]?.done &&
                      !stage.done && (
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full ml-auto">
                          In Progress
                        </span>
                      )}
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy note */}
            <div className="px-6 py-4 border-t border-border bg-bg">
              <p className="text-xs text-zinc-400 text-center">
                🔒 Keep your reference number private.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
