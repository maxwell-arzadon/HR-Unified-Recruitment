/**
 * JobCard.jsx
 * Card component displaying a single job listing.
 * Shows job icon, slots badge, title, salary range,
 * job type badge, and work setup badge.
 */

import { useNavigate } from "react-router-dom";
import JobBadge from "./JobBadge";
import LocationBadge from "./LocationBadge";
import {
  EnvelopeSimple,
  Headset,
  Megaphone,
  Monitor,
  Code,
  MagnifyingGlass,
  Globe,
  UsersThree,
} from "@phosphor-icons/react";

const iconMap = {
  mail: <EnvelopeSimple size={24} weight="regular" />,
  headset: <Headset size={24} weight="regular" />,
  megaphone: <Megaphone size={24} weight="regular" />,
  screen: <Monitor size={24} weight="regular" />,
  code: <Code size={24} weight="regular" />,
  search: <MagnifyingGlass size={24} weight="regular" />,
  globe: <Globe size={24} weight="regular" />,
  team: <UsersThree size={24} weight="regular" />,
};

const iconColors = {
  "Full Time": "text-primary bg-red-50",
  Freelance: "text-accent bg-[#FFF3E8]",
  Language: "text-muted bg-[#F2EFF4]",
};

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="bg-white border border-border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-all cursor-pointer hover:border-primary/20 hover:-translate-y-0.5"
    >
      {/* Top row — icon + slots badge */}
      <div className="flex items-start justify-between">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            iconColors[job.type] ?? iconColors["Full Time"]
          }`}
        >
          {iconMap[job.icon]}
        </div>
        <span className="bg-green-50 text-success text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0">
          {job.slots} slots
        </span>
      </div>

      {/* Title + Salary */}
      <div className="flex flex-col gap-1">
        <h3 className="font-jakarta font-bold text-black text-base leading-snug">
          {job.title}
        </h3>
        {job.salary && <p className="text-sm text-zinc-400">{job.salary}</p>}
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap mt-auto">
        <JobBadge type={job.type} />
        <LocationBadge location={job.location} />
      </div>
    </div>
  );
}
