import { useNavigate } from "react-router-dom";
import { Check, House } from "@phosphor-icons/react";
import JobBadge from "../shared/JobBadge";
import LocationBadge from "../shared/LocationBadge";

const ref = "RC-" + Math.random().toString(36).slice(2, 7).toUpperCase();

const nextSteps = [
  {
    label: "Application Received",
    desc: "We've received your application and it's now under review",
  },
  {
    label: "Initial Screening",
    desc: "Our recruitment team will review your assessment and profile",
  },
  {
    label: "Interview",
    desc: "Shortlisted candidates will be contacted for a scheduled interview",
  },
  {
    label: "Final Decision",
    desc: "You'll receive an email with the outcome of your application",
  },
];

export default function SuccessScreen({ job }) {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-[640px] mx-auto py-6">
      {/* Check icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full border-2 border-success flex items-center justify-center">
          <Check size={28} weight="bold" className="text-success" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="font-jakarta font-bold text-black text-2xl mb-3">
          Application Submitted
        </h1>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-success text-xs font-bold">{job.title}</span>
          <JobBadge type={job.type} />
          <LocationBadge location={job.location} />
        </div>
        <p className="text-sm text-zinc-400 max-w-md mx-auto">
          Thank you for applying. We'll review your submission and get back to
          you within 3-5 business days
        </p>
      </div>

      {/* Reference */}
      <div className="border border-border rounded-2xl px-6 py-5 mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
            Application Reference
          </p>
          <p className="font-jakarta font-bold text-black text-2xl">{ref}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-zinc-400">Submitted</p>
          <p className="text-sm font-semibold text-black">{today}</p>
        </div>
      </div>

      {/* What happens next */}
      <div className="mb-8">
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-5">
          What Happens Next
        </p>
        <div className="flex flex-col gap-0">
          {nextSteps.map((step, i) => (
            <div key={step.label} className="flex gap-4">
              {/* Icon + line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all
                  ${
                    i === 0
                      ? "gradient-bg border-transparent"
                      : i === 1
                        ? "gradient-bg border-transparent"
                        : "border-zinc-200 bg-white"
                  }`}
                >
                  {i === 0 ? (
                    <Check size={13} weight="bold" className="text-white" />
                  ) : (
                    <span
                      className={`text-xs font-bold font-jakarta ${i <= 1 ? "text-white" : "text-zinc-400"}`}
                    >
                      {i + 1}
                    </span>
                  )}
                </div>
                {i < nextSteps.length - 1 && (
                  <div
                    className={`w-px flex-1 my-1 ${i === 0 ? "bg-primary" : "bg-zinc-200"}`}
                  />
                )}
              </div>
              {/* Content */}
              <div className="pb-5">
                <p className="text-sm font-semibold text-black">{step.label}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Home */}
      <button
        onClick={() => navigate("/")}
        className="w-full gradient-bg hover:opacity-90 text-white font-semibold font-jakarta text-sm py-3.5 rounded-full flex items-center justify-center gap-2 transition-opacity mb-6"
      >
        <House size={16} />
        Back to Home
      </button>

      {/* Language switcher */}
      <div className="flex items-center justify-center gap-6">
        {["English", "French", "Spanish"].map((lang, i) => (
          <span
            key={lang}
            className={`text-sm cursor-pointer transition-colors ${i === 0 ? "text-primary font-semibold" : "text-zinc-400 hover:text-black"}`}
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}
