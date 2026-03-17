/**
 * ApplicantDrawer.jsx
 * Reusable slide-in drawer for viewing applicant details.
 * Supports two variants:
 * - "new"     → tabbed layout (Overview, Assessment, Schedule)
 * - "trainee" → single view (Update Status, Test Scores, Details)
 */

import { useState } from "react";
import { StatusBadge } from "./StatusBadge";
import {
  HIRING_STAGES,
  INTERVIEWERS,
  TRAINEE_STATUS_OPTIONS,
} from "../../../data/applicants";
import {
  X,
  Check,
  Envelope,
  Phone,
  CalendarBlank,
  GlobeSimple,
  Archive,
  PencilLine,
} from "@phosphor-icons/react";

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
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      {label === "EMAIL" && (
                        <Envelope size={24} className="text-muted" />
                      )}
                      {label === "PHONE" && (
                        <Phone size={24} className="text-muted" />
                      )}
                      {label === "DATE APPLIED" && (
                        <CalendarBlank size={24} className="text-muted" />
                      )}
                      {label === "SOURCE" && (
                        <GlobeSimple size={24} className="text-muted" />
                      )}
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
          <PencilLine size={16} /> Edit Profile
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 border border-primary/30 bg-primary/5 rounded-xl py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-all">
          <Archive size={16} /> Archive
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
