import { useState } from "react";
import { X, CalendarBlank, Check } from "@phosphor-icons/react";
import { StatusBadge } from "./StatusBadge";
import {
  HIRING_STAGES,
  INTERVIEWERS,
  TRAINEE_STATUS_OPTIONS,
} from "../../../data/applicants";

// Shared: Hiring Stage Stepper
function HiringStepper({ currentStage }) {
  const currentIndex = HIRING_STAGES.indexOf(currentStage);
  return (
    <div className="flex items-center w-full">
      {HIRING_STAGES.map((stage, i) => {
        const isDone = i < currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={stage} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0
                ${isDone ? "bg-primary/10 border-primary text-primary" : ""}
                ${isCurrent ? "bg-primary border-primary text-white" : ""}
                ${!isDone && !isCurrent ? "bg-white border-border text-muted" : ""}
              `}
              >
                {isDone ? <Check size={12} weight="bold" /> : i + 1}
              </div>
              <span
                className={`text-xs font-semibold tracking-wide uppercase
                ${isCurrent || isDone ? "text-primary" : "text-muted"}
              `}
              >
                {stage}
              </span>
            </div>
            {i < HIRING_STAGES.length - 1 && (
              <div className="flex-1 mx-3 h-px bg-border relative overflow-hidden">
                {isDone && <div className="absolute inset-0 bg-primary" />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

//Section Label
function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-bold tracking-widest text-muted uppercase mb-3">
      {children}
    </p>
  );
}

//Test Scores Cards
function TestScores({ assessment }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-bg border border-border rounded-xl p-4">
        <p className="text-sm font-semibold text-black mb-1">Grammar</p>
        <div className="flex items-end gap-0.5">
          <span className="font-jakarta font-bold text-2xl text-accent">
            {assessment.grammar.score}
          </span>
          <span className="text-sm text-muted mb-0.5">
            /{assessment.grammar.total}
          </span>
        </div>
        <p className="text-xs text-muted mt-1">
          {assessment.grammar.percent} score
        </p>
      </div>
      <div className="bg-bg border border-border rounded-xl p-4">
        <p className="text-sm font-semibold text-black mb-1">Typing</p>
        <div className="flex items-end gap-0.5">
          <span className="font-jakarta font-bold text-2xl text-accent">
            {assessment.typing.wpm}
          </span>
          <span className="text-sm text-muted mb-0.5">wpm</span>
        </div>
        <p className="text-xs text-muted mt-1">
          {assessment.typing.accuracy} accuracy
        </p>
      </div>
      <div className="bg-bg border border-border rounded-xl p-4">
        <p className="text-sm font-semibold text-black mb-1">Essay</p>
        <span
          className={`font-jakarta font-bold text-2xl ${
            assessment.essay === "Passed" ? "text-success" : "text-primary"
          }`}
        >
          {assessment.essay}
        </span>
      </div>
    </div>
  );
}

//Details Table
function DetailsTable({ rows }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      {rows.map(({ label, value }, i) => (
        <div
          key={label}
          className={`grid grid-cols-2 px-4 py-3 ${
            i < rows.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <span className="text-sm text-muted">{label}</span>
          <span className="text-sm font-bold text-black">{value}</span>
        </div>
      ))}
    </div>
  );
}

//Shared: Bottom Action Bar
function EditIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function DeleteIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6M9 6V4h6v2" />
    </svg>
  );
}

//Applicant Content
function NewApplicantContent({ applicant }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const TABS = ["Overview", "Assessment", "Schedule"];

  const contactRows = [
    { icon: "envelope", label: "EMAIL", value: applicant.email },
    { icon: "phone", label: "PHONE", value: applicant.phone },
    { icon: "calendar", label: "DATE APPLIED", value: applicant.dateApplied },
    { icon: "globe", label: "SOURCE", value: applicant.source },
  ];

  const appDetailRows = [
    { label: "Applying For", value: applicant.position },
    { label: "Job Type", value: applicant.jobType },
    { label: "SA ID Owner", value: applicant.saIdOwner },
    { label: "Based", value: applicant.based },
    { label: "Service", value: applicant.service },
    { label: "Language", value: applicant.language },
  ];

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [link, setLink] = useState("");

  const inputClass =
    "w-full border border-border rounded-xl px-4 py-3 text-sm text-black placeholder-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white";

  return (
    <>
      {/* Tabs */}
      <div className="flex items-center gap-6 px-6 border-b border-border flex-shrink-0">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3.5 text-sm font-medium border-b-2 transition-all -mb-px ${
              activeTab === tab
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-muted hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">
        {/*Overview */}
        {activeTab === "Overview" && (
          <>
            <div>
              <SectionLabel>Hiring Stage</SectionLabel>
              <HiringStepper currentStage={applicant.hiringStage} />
            </div>
            <div>
              <SectionLabel>Contact Information</SectionLabel>
              <div className="grid grid-cols-2 gap-3">
                {contactRows.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-bg border border-border rounded-xl px-4 py-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-muted"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        {label === "EMAIL" && (
                          <>
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </>
                        )}
                        {label === "PHONE" && (
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
                        )}
                        {label === "DATE APPLIED" && (
                          <>
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </>
                        )}
                        {label === "SOURCE" && (
                          <>
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </>
                        )}
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted font-medium tracking-wide">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-black truncate">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>Application Details</SectionLabel>
              <DetailsTable rows={appDetailRows} />
            </div>
          </>
        )}

        {/* Assessment*/}
        {activeTab === "Assessment" && (
          <>
            <div>
              <SectionLabel>Hiring Stage</SectionLabel>
              <HiringStepper currentStage={applicant.hiringStage} />
            </div>
            <div>
              <SectionLabel>Test Scores</SectionLabel>
              <TestScores assessment={applicant.assessment} />
            </div>
            <div>
              <SectionLabel>Essay Response</SectionLabel>
              <div className="bg-bg border border-border rounded-xl p-4">
                <p className="text-sm font-semibold text-black mb-2">
                  Q: {applicant.assessment.essayQuestion}
                </p>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {applicant.assessment.essayAnswer}
                </p>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-xs text-muted">
                    Time:{" "}
                    <span className="font-bold text-black">
                      {applicant.assessment.essayTime}
                    </span>
                  </span>
                  <span className="text-xs text-muted">
                    Character:{" "}
                    <span className="font-bold text-black">
                      {applicant.assessment.essayCharacters}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <SectionLabel>Assessment Answers</SectionLabel>
              <div className="flex flex-col gap-3">
                {applicant.assessment.answers.map((item, i) => (
                  <div
                    key={i}
                    className="bg-bg border border-border rounded-xl p-4"
                  >
                    <p className="text-sm font-semibold text-black mb-1">
                      Q{i + 1}: {item.q}
                    </p>
                    <p className="text-sm text-muted">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/*Schedule*/}
        {activeTab === "Schedule" && (
          <>
            <div>
              <SectionLabel>Hiring Stage</SectionLabel>
              <HiringStepper currentStage={applicant.hiringStage} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-black block mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-black block mb-1.5">
                    Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-black block mb-1.5">
                  Interviewer
                </label>
                <select
                  value={interviewer}
                  onChange={(e) => setInterviewer(e.target.value)}
                  className={inputClass}
                >
                  <option value="">– Select Interviewer –</option>
                  {INTERVIEWERS.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-black block mb-1.5">
                  Room / Meeting Link
                </label>
                <input
                  type="url"
                  placeholder="https://meet.google.com/..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className={inputClass}
                />
              </div>
              <button className="w-full gradient-bg text-white font-semibold font-jakarta text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-2">
                <CalendarBlank size={16} weight="bold" />
                Confirm Schedule
              </button>
            </div>
          </>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center gap-3 px-6 py-4 border-t border-border flex-shrink-0">
        <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-semibold text-black hover:border-primary/30 hover:text-primary transition-all">
          <EditIcon /> Edit Profile
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 border border-primary/30 bg-primary/5 rounded-xl py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-all">
          <DeleteIcon /> Delete
        </button>
        {activeTab !== "Schedule" && (
          <button className="flex-1 gradient-bg text-white rounded-xl py-3 text-sm font-semibold font-jakarta hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <CalendarBlank size={15} weight="bold" /> Schedule Interview
          </button>
        )}
      </div>
    </>
  );
}

//Trainee Content
function TraineeContent({ applicant }) {
  const [newStatus, setNewStatus] = useState("");

  const detailRows = [
    { label: "Email", value: applicant.email },
    { label: "Phone", value: applicant.phone },
    { label: "City", value: applicant.city },
    { label: "Job Type", value: applicant.jobTypeDetail },
    { label: "Based", value: applicant.based },
    { label: "Service", value: applicant.service },
    { label: "Language", value: applicant.language },
    { label: "Source", value: applicant.source },
    { label: "Date Applied", value: applicant.dateApplied },
  ];

  return (
    <>
      {/* Scrollable content — no tabs */}
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">
        {/* Update Status */}
        <div>
          <SectionLabel>Update Status</SectionLabel>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full border border-border rounded-xl px-4 py-3 text-sm text-black bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
          >
            <option value="">– Select new status –</option>
            {TRAINEE_STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Test Scores */}
        <div>
          <SectionLabel>Test Scores</SectionLabel>
          <TestScores assessment={applicant.assessment} />
        </div>

        {/* Details */}
        <div>
          <SectionLabel>Details</SectionLabel>
          <DetailsTable rows={detailRows} />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center gap-3 px-6 py-4 border-t border-border flex-shrink-0">
        <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-semibold text-black hover:border-primary/30 hover:text-primary transition-all">
          <EditIcon /> Edit Profile
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 border border-primary/30 bg-primary/5 rounded-xl py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-all">
          <DeleteIcon /> Delete
        </button>
        <button className="flex-1 gradient-bg text-white rounded-xl py-3 text-sm font-semibold font-jakarta hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Check size={15} weight="bold" /> Submit Update
        </button>
      </div>
    </>
  );
}

//Main Drawer Component
export default function ApplicantDrawer({
  applicant,
  onClose,
  variant = "new",
}) {
  if (!applicant) return null;

  const initials = applicant.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Drawer panel */}
      <div className="fixed top-0 right-0 h-full w-[580px] bg-white z-50 flex flex-col shadow-2xl">
        {/* Header — shared across all variants */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {initials}
            </div>
            <div>
              <p className="font-jakarta font-bold text-base text-black">
                {applicant.name}
              </p>
              <p className="text-xs text-muted">
                {applicant.position} • {applicant.jobType}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={applicant.status} />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-border flex items-center justify-center transition-colors text-muted hover:text-black"
            >
              <X size={16} weight="bold" />
            </button>
          </div>
        </div>

        {/* Variant content */}
        {variant === "new" && <NewApplicantContent applicant={applicant} />}
        {variant === "trainee" && <TraineeContent applicant={applicant} />}
      </div>
    </>
  );
}
