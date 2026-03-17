/**
 * JobDetail.jsx
 * Detailed view of a single job posting.
 * Shows job overview, description, system requirements,
 * FAQ tabs, and a sidebar with application CTA.
 */

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobs } from "../../data/jobs_applicant";
import Navbar from "../../components/applicant/layout/Navbar";
import JobBadge from "../../components/applicant/shared/JobBadge";
import LocationBadge from "../../components/applicant/shared/LocationBadge";
import BeforeYouApply from "../../components/applicant/shared/BeforeYouApply";
import {
  EnvelopeSimple,
  Headset,
  Megaphone,
  Monitor,
  Code,
  MagnifyingGlass,
  Globe,
  UsersThree,
  Briefcase,
  MapPin,
  Users,
  Clock,
  Check,
} from "@phosphor-icons/react";

const iconMap = {
  mail: <EnvelopeSimple size={28} weight="regular" />,
  headset: <Headset size={28} weight="regular" />,
  megaphone: <Megaphone size={28} weight="regular" />,
  screen: <Monitor size={28} weight="regular" />,
  code: <Code size={28} weight="regular" />,
  search: <MagnifyingGlass size={28} weight="regular" />,
  globe: <Globe size={28} weight="regular" />,
  team: <UsersThree size={28} weight="regular" />,
};

const iconColors = {
  "Full Time": "text-primary bg-red-50",
  Freelance: "text-accent bg-[#FFF3E8]",
  Language: "text-muted bg-[#F2EFF4]",
};

const tabs = ["Overview", "Description", "System Requirements", "FAQ"];

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [showModal, setShowModal] = useState(false);

  const job = jobs.find((j) => j.id === Number(id));
  if (!job)
    return <div className="p-10 text-center text-zinc-400">Job not found.</div>;

  return (
    <div className="bg-bg min-h-screen w-full overflow-x-hidden">
      {/* Sticky floating navbar */}
      <div className="sticky top-0 z-50 bg-transparent pointer-events-none">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[80px] pt-4 pointer-events-auto">
          <Navbar />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 md:px-16 lg:px-[80px] py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm mb-5 sm:mb-8">
          <span
            onClick={() => navigate("/")}
            className="text-zinc-400 hover:text-black cursor-pointer transition-colors"
          >
            Available Jobs
          </span>
          <span className="text-zinc-300">›</span>
          <span className="text-zinc-400">{job.location}</span>
          <span className="text-zinc-300">›</span>
          <span className="text-primary font-semibold">{job.type}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-start w-full">
          {/* Left — main content */}
          <div className="w-full flex-1 bg-white border border-border rounded-2xl p-5 sm:p-8 min-w-0">
            {/* Job header */}
            <div className="flex items-start gap-3 mb-6">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconColors[job.type]}`}
              >
                {iconMap[job.icon]}
              </div>
              <div>
                <h1 className="font-jakarta font-bold text-black text-2xl mb-2">
                  {job.title}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <JobBadge type={job.type} />
                  <LocationBadge location={job.location} />
                  <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">
                    {job.slots} slots
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-0 border-b border-border mb-6 overflow-x-auto scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm font-semibold font-jakarta transition-colors border-b-2 -mb-px whitespace-nowrap flex-shrink-0
                    ${
                      activeTab === tab
                        ? "text-primary border-primary"
                        : "text-zinc-400 border-transparent hover:text-black"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="text-sm text-zinc-500 leading-relaxed">
              {activeTab === "Overview" && (
                <div>
                  <p className="mb-6">{job.overview}</p>
                  <h3 className="font-jakarta font-bold text-black text-base mb-4">
                    What you'll be doing:
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {job.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check
                          size={16}
                          weight="bold"
                          className="text-primary mt-0.5 flex-shrink-0"
                        />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "Description" && <p>{job.description}</p>}

              {activeTab === "System Requirements" && (
                <ul className="flex flex-col gap-3">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        size={16}
                        weight="bold"
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "FAQ" && (
                <div className="flex flex-col gap-6">
                  {job.faq.map((f, i) => (
                    <div key={i}>
                      <h4 className="font-jakarta font-bold text-black mb-1">
                        {f.q}
                      </h4>
                      <p>{f.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right — sidebar */}
          <div className="w-full lg:w-72 flex flex-col sm:flex-row lg:flex-col gap-4 flex-shrink-0">
            {/* Job Overview card */}
            <div className="bg-white border border-border rounded-2xl p-6">
              <h3 className="font-jakarta font-bold text-black text-base mb-5">
                Job Overview
              </h3>
              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: <Briefcase size={20} className="text-primary" />,
                    label: "JOB TYPE",
                    value: job.type,
                  },
                  {
                    icon: <MapPin size={20} className="text-primary" />,
                    label: "LOCATION",
                    value: job.location,
                  },
                  {
                    icon: <Users size={20} className="text-primary" />,
                    label: "OPEN SLOTS",
                    value: `${job.slots} positions`,
                  },
                  {
                    icon: <Clock size={20} className="text-primary" />,
                    label: "SCHEDULE",
                    value: job.schedule,
                  },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                      {icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
                        {label}
                      </div>
                      <div className="text-sm font-semibold text-black">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ready to apply card */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <h3 className="font-jakarta font-bold text-black text-base mb-2">
                Ready to apply?
              </h3>
              <p className="text-sm text-zinc-500 mb-5">
                Takes about 15–20 min. Have your personal details and SSS number
                ready.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="w-full gradient-bg hover:opacity-90 text-white font-semibold font-jakarta text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-opacity"
              >
                Apply Now
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Before You Apply modal */}
      {showModal && (
        <BeforeYouApply onClose={() => setShowModal(false)} jobId={job.id} />
      )}
    </div>
  );
}
