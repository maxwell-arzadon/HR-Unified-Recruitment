import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { jobs } from "../../data/jobs";
import JobCard from "./JobCard";

const tabs = ["All", "Full Time", "Freelance", "Language"];
const locations = ["All Locations", "Office Based", "Remote", "Hybrid"];

export default function JobListings({ activeFilter, setActiveFilter }) {
  const [location, setLocation] = useState("All Locations");

  const filtered = jobs.filter(
    (j) =>
      (activeFilter === "All" || j.type === activeFilter) &&
      (location === "All Locations" || j.location === location),
  );

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[80px] py-10">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const count =
              tab === "All"
                ? jobs.length
                : jobs.filter((j) => j.type === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold font-jakarta transition-colors
                  ${
                    activeFilter === tab
                      ? "bg-black text-white"
                      : "text-zinc-500 hover:text-black"
                  }`}
              >
                {tab}
                {tab !== "All" && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-bold
                    ${activeFilter === tab ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-400"}`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-400 font-medium">Job Type</span>
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="appearance-none bg-white border border-border rounded-xl px-4 py-2 pr-9 text-sm font-medium text-black outline-none cursor-pointer hover:border-zinc-300 transition-colors"
            >
              {locations.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
            <CaretDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <p className="text-sm text-zinc-400 mb-6">
        Showing <span className="font-bold text-black">{filtered.length}</span>{" "}
        positions
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
