import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import AdminCard from "../../../components/admin/AdminCard";
import { Plus, Trash, Check, CaretRight } from "@phosphor-icons/react";
import {
  DEPARTMENTS,
  JOB_TYPE_OPTIONS,
  LANGUAGE_OPTIONS,
  PROCESS_SETTINGS,
} from "../../../data/jobs_admin";

// ─── Toggle Switch ─────────────────────────────────────────────────
function Toggle({ active, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
        active ? "bg-success" : "bg-gray/40"
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
          active ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

const inputClass =
  "w-full border border-border rounded-xl px-4 py-3 text-sm text-black placeholder-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white";

export default function CreateJob() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [requirements, setRequirements] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [jobType, setJobType] = useState("");
  const [language, setLanguage] = useState("");
  const [questions, setQuestions] = useState(["", "", ""]);
  const [process, setProcess] = useState({
    Interview: true,
    Orientation: false,
    Certification: false,
    "Mock Call": false,
  });

  const addQuestion = () => setQuestions((q) => [...q, ""]);

  const removeQuestion = (i) =>
    setQuestions((q) => q.filter((_, idx) => idx !== i));

  const updateQuestion = (i, val) =>
    setQuestions((q) => q.map((v, idx) => (idx === i ? val : v)));

  const toggleProcess = (key) => setProcess((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="p-8 min-h-screen">
      {/* Page Header */}
      <PageHeader title="Create Job" subtitle="Add a new job posting" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <button
          onClick={() => navigate("/admin/jobs")}
          className="text-muted hover:text-black transition-colors"
        >
          Jobs
        </button>
        <CaretRight size={13} className="text-muted" />
        <span className="text-primary font-semibold">Create Job</span>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-5 items-start">
        {/* ── Left: Job Information ─────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Job Information card */}
          <AdminCard className="flex flex-col">
            {" "}
            <h2 className="font-jakarta font-bold text-base text-black mb-5">
              Job Information
            </h2>
            <div className="flex flex-col gap-4">
              {/* Job Title */}
              <div>
                <label className="text-sm font-semibold text-black block mb-1.5">
                  Job Title <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Billing Specialist"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                />
              </div>
              {/* Requirements */}
              <div>
                <label className="text-sm font-semibold text-black block mb-1.5">
                  Requirements
                </label>
                <textarea
                  placeholder="List the job requirements..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>
              {/* Description */}
              <div>
                <label className="text-sm font-semibold text-black block mb-1.5">
                  Description
                </label>
                <textarea
                  placeholder="Describe the role and responsibilities"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </AdminCard>

          {/* Assessment Questions card */}
          <AdminCard className="flex flex-col">
            {" "}
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-jakarta font-bold text-base text-black">
                Assessment Questions
              </h2>
              <button
                onClick={addQuestion}
                className="flex items-center gap-1.5 border border-border rounded-xl px-3 py-2 text-sm font-medium text-black hover:border-primary/30 hover:text-primary transition-all"
              >
                <Plus size={14} />
                Add Question
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {questions.map((q, i) => (
                <div key={i} className="flex items-center gap-3">
                  {/* Number badge */}
                  <div className="w-7 h-7 rounded-full border-2 border-primary/30 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <input
                    type="text"
                    placeholder={`Question ${i + 1}`}
                    value={q}
                    onChange={(e) => updateQuestion(i, e.target.value)}
                    className={`${inputClass} flex-1`}
                  />
                  <button
                    onClick={() => removeQuestion(i)}
                    className="w-8 h-8 rounded-lg border border-primary/20 bg-primary/5 flex items-center justify-center text-primary hover:bg-primary/10 transition-all flex-shrink-0"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>

        {/* ── Right: Job Details + Process Settings ────────────── */}
        <div className="w-[280px] flex flex-col gap-5 flex-shrink-0">
          {/* Job Details card */}
          <AdminCard className="flex flex-col">
            {" "}
            <h2 className="font-jakarta font-bold text-base text-black mb-5">
              Job Details
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold text-black block mb-1.5">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className={inputClass}
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-black block mb-1.5">
                  Job Type
                </label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className={inputClass}
                >
                  {JOB_TYPE_OPTIONS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-black block mb-1.5">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={inputClass}
                >
                  {LANGUAGE_OPTIONS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          </AdminCard>

          {/* Process Settings card */}
          <AdminCard className="flex flex-col">
            {" "}
            <h2 className="font-jakarta font-bold text-base text-black mb-5">
              Process Settings
            </h2>
            <div className="flex flex-col gap-4">
              {PROCESS_SETTINGS.map((setting) => (
                <div
                  key={setting}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-black">{setting}</span>
                  <Toggle
                    active={process[setting]}
                    onChange={() => toggleProcess(setting)}
                  />
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="flex items-center gap-3 mt-5 bg-white rounded-2xl border border-border px-6 py-4">
        <button
          onClick={() => navigate("/admin/jobs")}
          className="flex-1 border border-border rounded-xl py-3 text-sm font-semibold text-black hover:border-primary/30 hover:text-primary transition-all"
        >
          Cancel
        </button>
        <button className="flex-1 gradient-bg text-white font-semibold font-jakarta text-sm py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <Check size={16} weight="bold" />
          Save Job Posting
        </button>
      </div>
    </div>
  );
}
