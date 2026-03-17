/**
 * WorksTab.jsx
 * Work experience tab within the application form.
 * Allows applicants to add multiple work history entries
 * with company, position, and date range fields.
 */

import { useState, useRef } from "react";
import { UploadSimple, Check, X } from "@phosphor-icons/react";

const hours = [
  "Less than 20 hrs",
  "20-30 hrs",
  "30-40 hrs",
  "40+ hrs (Full Time)",
];

const FileUpload = ({ label, hint, accept, file, onFile }) => {
  const ref = useRef(null);

  return (
    <div>
      <label className="text-sm font-medium text-black mb-1.5 block">
        {label} <span className="text-primary">*</span>
      </label>
      <div
        onClick={() => ref.current?.click()}
        className={`flex items-center gap-4 border rounded-2xl px-5 py-4 cursor-pointer transition-all
          ${file ? "border-success bg-green-50" : "border-border hover:border-primary hover:bg-red-50/30"}`}
      >
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
          ${file ? "bg-green-100" : "bg-zinc-100"}`}
        >
          {file ? (
            <Check size={18} className="text-success" weight="bold" />
          ) : (
            <UploadSimple size={18} className="text-zinc-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {file ? (
            <>
              <p className="text-sm font-semibold text-success truncate">
                {file.name}
              </p>
              <p className="text-xs text-zinc-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-black">
                Click to upload {label}
              </p>
              <p className="text-xs text-zinc-400">{hint}</p>
            </>
          )}
        </div>
        {file && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFile(null);
            }}
            className="text-zinc-400 hover:text-primary transition-colors flex-shrink-0"
          >
            <X size={16} />
          </button>
        )}
        <input
          ref={ref}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0] || null)}
        />
      </div>
    </div>
  );
};

export default function WorksTab() {
  const [selectedHours, setSelectedHours] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [resume, setResume] = useState(null);
  const [nbi, setNbi] = useState(null);
  const [govId, setGovId] = useState(null);

  return (
    <div>
      <h3 className="font-jakarta font-bold text-black text-base mb-1">
        Work Availability & Files
      </h3>
      <p className="text-sm text-zinc-400 mb-6">
        Upload required documents. Max file size: 5MB each.
      </p>

      <div className="flex flex-col gap-6">
        {/* Work Hours */}
        <div>
          <label className="text-sm font-medium text-black mb-3 block">
            Available Work Hours per Week{" "}
            <span className="text-primary">*</span>
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {hours.map((h) => (
              <button
                key={h}
                onClick={() => setSelectedHours(h)}
                className={`px-4 py-2 border rounded-xl text-sm font-medium transition-all
                  ${
                    selectedHours === h
                      ? "border-primary bg-red-50 text-primary font-semibold"
                      : "border-border text-zinc-500 hover:border-zinc-300"
                  }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Age certification */}
        <div
          onClick={() => setIsAdult((v) => !v)}
          className={`flex items-start gap-4 border rounded-2xl px-5 py-4 cursor-pointer transition-all
            ${isAdult ? "border-primary bg-red-50/30" : "border-border hover:border-zinc-300"}`}
        >
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all
            ${isAdult ? "bg-primary border-primary" : "border-zinc-300"}`}
          >
            {isAdult && (
              <Check size={11} weight="bold" className="text-white" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-black">
              I certify that I am at least 18 years old{" "}
              <span className="text-primary">*</span>
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">
              By checking this, you confirm that you meet the minimum age
              requirement for employment
            </p>
          </div>
        </div>

        {/* File uploads */}
        <FileUpload
          label="Resume / CV"
          hint="PDF or DOCX • Max 5MB"
          accept=".pdf,.docx"
          file={resume}
          onFile={setResume}
        />
        <FileUpload
          label="NBI Clearance"
          hint="PDF, JPG or PNG • Max 5MB"
          accept=".pdf,.jpg,.jpeg,.png"
          file={nbi}
          onFile={setNbi}
        />
        <FileUpload
          label="Valid Government ID"
          hint="JPG or PNG • Max 5MB • Clear scan or photo"
          accept=".jpg,.jpeg,.png"
          file={govId}
          onFile={setGovId}
        />
      </div>
    </div>
  );
}
