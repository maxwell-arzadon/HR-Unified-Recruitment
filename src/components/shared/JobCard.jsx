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
  mail:     <EnvelopeSimple size={22} weight="regular" />,
  headset:  <Headset size={22} weight="regular" />,
  megaphone:<Megaphone size={22} weight="regular" />,
  screen:   <Monitor size={22} weight="regular" />,
  code:     <Code size={22} weight="regular" />,
  search:   <MagnifyingGlass size={22} weight="regular" />,
  globe:    <Globe size={22} weight="regular" />,
  team:     <UsersThree size={22} weight="regular" />,
};

const iconColors = {
  "Full Time": "text-primary bg-red-50",
  "Freelance": "text-accent bg-[#FFF3E8]",
  "Language":  "text-muted bg-[#F2EFF4]",
};


export default function JobCard({ job, onClick }) {
    const navigate = useNavigate();

    return (
        <div
        onClick={() => navigate(`/jobs/${job.id}`)}
        className="bg-white border border-border rounded-2xl p-6 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer"
        >
        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColors[job.type] ?? iconColors["Full Time"]}`}>
            {iconMap[job.icon]}
        </div>

        {/* Title + slots */}
        <div>
            <h3 className="font-jakarta font-bold text-black text-base leading-snug">{job.title}</h3>
            <p className="text-zinc-400 text-sm mt-1">{job.slots} open positions</p>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap mt-auto">
            <JobBadge type={job.type} />
            <LocationBadge location={job.location} />
        </div>
        </div>
    );
}