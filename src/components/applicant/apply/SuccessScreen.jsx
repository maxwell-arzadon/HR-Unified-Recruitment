/**
 * SuccessScreen.jsx
 * Confirmation screen shown after a successful application submission.
 * Generates a random reference number, saves application to localStorage,
 * and displays next steps for the applicant.
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, House, Warning } from "@phosphor-icons/react";
import JobBadge from "../shared/JobBadge";
import LocationBadge from "../shared/LocationBadge";

// ─── Generate random reference number ─────────────────────────────
// Uses random alphanumeric to prevent sequential guessing
const generateRef = () =>
  "RC-" + Math.random().toString(36).slice(2, 10).toUpperCase();

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
  const ref = generateRef();
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Save application to localStorage on mount
  useEffect(() => {
    const existing = JSON.parse(
      localStorage.getItem("rc_applications") || "[]",
    );

    const newApplication = {
      ref,
      jobTitle: job.title,
      jobType: job.type,
      jobLocation: job.location,
      dateSubmitted: today,
      // Only non-sensitive status info — no personal details
      stage: "Application Received",
      stages: [
        { label: "Application Received", done: true },
        { label: "Initial Screening", done: false },
        { label: "Interview", done: false },
        { label: "Final Decision", done: false },
      ],
    };

    localStorage.setItem(
      "rc_applications",
      JSON.stringify([...existing, newApplication]),
    );
  }, []);

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
        <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
          <span className="text-success text-xs font-bold">{job.title}</span>
          <JobBadge type={job.type} />
          <LocationBadge location={job.location} />
        </div>
        <p className="text-sm text-zinc-400 max-w-md mx-auto">
          Thank you for applying! Save your reference number below to track your
          application status. We'll review your application and get back to you
          within 3–5 business days.
        </p>
      </div>

      {/* Reference number */}
      <div className="border border-border rounded-2xl px-6 py-5 mb-4 flex items-center justify-between">
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

      {/* Privacy disclaimer */}
      <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3 mb-8">
        <Warning
          size={15}
          className="text-yellow-500 flex-shrink-0 mt-0.5"
          weight="fill"
        />
        <p className="text-xs text-yellow-700">
          Keep your reference number private. Do not share it with others.
          You'll need it to track your application status on our homepage.
        </p>
      </div>

      {/* What happens next */}
      <div className="mb-8">
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-5">
          What Happens Next
        </p>
        <div className="flex flex-col gap-0">
          {nextSteps.map((step, i) => (
            <div key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all
                  ${i <= 1 ? "gradient-bg border-transparent" : "border-zinc-200 bg-white"}`}
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
            className={`text-sm cursor-pointer transition-colors ${
              i === 0
                ? "text-primary font-semibold"
                : "text-zinc-400 hover:text-black"
            }`}
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}
