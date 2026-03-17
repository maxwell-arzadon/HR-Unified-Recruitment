/**
 * SecurityTab.jsx
 * Security information tab within the application form.
 * Collects government ID numbers and other
 * security-related applicant information.
 */

import { useState } from "react";
import { ShieldCheck, WarningCircle, CaretDown } from "@phosphor-icons/react";

const questions = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "What was the name of your elementary school?",
  "What city were you born in?",
  "What is your oldest sibling's middle name?",
];

const FieldError = ({ msg }) =>
  msg ? (
    <div className="flex items-center gap-1.5 mt-1">
      <WarningCircle size={13} className="text-primary flex-shrink-0" />
      <span className="text-xs text-primary">{msg}</span>
    </div>
  ) : null;

export default function SecurityTab() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const e = {};
    if (!question) e.question = "Please select a security question";
    if (!answer.trim()) e.answer = "Please provide an answer";
    return e;
  };

  const handleBlur = (k) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate());
  };

  const err = (k) => (touched[k] ? errors[k] : undefined);

  return (
    <div>
      <h3 className="font-jakarta font-bold text-black text-base mb-1">
        Security Information
      </h3>
      <p className="text-sm text-zinc-400 mb-6">
        This helps verify your identity if you need to recover your account.
      </p>

      <div className="flex flex-col gap-5">
        {/* Security Question */}
        <div>
          <label className="text-sm font-medium text-black">
            Security Question <span className="text-primary">*</span>
          </label>
          <div className="relative mt-1.5">
            <select
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onBlur={() => handleBlur("question")}
              className={`w-full appearance-none border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer pr-10
                ${err("question") ? "border-primary bg-red-50" : "border-border"}`}
            >
              <option value="">Select a security question</option>
              {questions.map((q) => (
                <option key={q}>{q}</option>
              ))}
            </select>
            <CaretDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
            />
          </div>
          <FieldError msg={err("question")} />
        </div>

        {/* Security Answer */}
        <div>
          <label className="text-sm font-medium text-black">
            Security Answer <span className="text-primary">*</span>
          </label>
          <input
            placeholder="Your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onBlur={() => handleBlur("answer")}
            className={`mt-1.5 w-full border rounded-xl px-4 py-2.5 text-sm placeholder-zinc-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all
              ${err("answer") ? "border-primary bg-red-50" : "border-border"}`}
          />
          <p className="text-xs text-zinc-400 mt-1">
            Keep this answer private. It is case-insensitive.
          </p>
          <FieldError msg={err("answer")} />
        </div>

        {/* Security notice */}
        <div className="flex items-start gap-3 border border-success/30 bg-green-50 rounded-2xl px-5 py-4">
          <ShieldCheck
            size={20}
            className="text-success flex-shrink-0 mt-0.5"
          />
          <p className="text-sm text-zinc-600 leading-relaxed">
            Your information is secured and used solely for recruitment
            purposes, in compliance with our Privacy Notice and NDA
          </p>
        </div>
      </div>
    </div>
  );
}
