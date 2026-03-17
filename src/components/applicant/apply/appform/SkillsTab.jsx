/**
 * SkillsTab.jsx
 * Skills and language proficiency tab within the application form.
 * Supports dynamic skill tag input and multiple language
 * entries with spoken and written proficiency levels.
 */

import { useState, useRef } from "react";
import { CaretDown, X } from "@phosphor-icons/react";

const languages = [
  "English",
  "French",
  "Spanish",
  "Japanese",
  "Mandarin",
  "Korean",
  "Arabic",
];
const proficiency = ["Basic", "Intermediate", "Fluent"];

export default function SkillsTab() {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [langEntries, setLangEntries] = useState([
    { id: 1, language: "English", spoken: "", written: "" },
  ]);
  const inputRef = useRef(null);

  const addSkill = (raw) => {
    const val = raw.trim();
    if (val && !skills.includes(val)) setSkills((s) => [...s, val]);
    setSkillInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(skillInput);
    }
    if (e.key === "Backspace" && !skillInput && skills.length > 0) {
      setSkills((s) => s.slice(0, -1));
    }
  };

  const removeSkill = (s) => setSkills((ss) => ss.filter((x) => x !== s));

  const addLang = () =>
    setLangEntries((ls) => [
      ...ls,
      { id: Date.now(), language: "English", spoken: "", written: "" },
    ]);
  const removeLang = (id) =>
    setLangEntries((ls) => ls.filter((l) => l.id !== id));
  const updateLang = (id, k, v) =>
    setLangEntries((ls) => ls.map((l) => (l.id === id ? { ...l, [k]: v } : l)));

  return (
    <div>
      <h3 className="font-jakarta font-bold text-black text-base mb-1">
        Skills & Language
      </h3>
      <p className="text-sm text-zinc-400 mb-6">
        List your relevant skills and language proficiency
      </p>

      {/* Skills */}
      <div className="mb-8">
        <label className="text-sm font-bold text-black mb-3 block">
          Skills
        </label>
        <div
          className="flex flex-wrap items-center gap-2 border border-border rounded-xl px-3 py-2.5 min-h-[46px] cursor-text focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all"
          onClick={() => inputRef.current?.focus()}
        >
          {skills.map((s) => (
            <span
              key={s}
              className="flex items-center gap-1.5 bg-red-50 text-primary text-xs font-semibold px-3 py-1 rounded-full"
            >
              {s}
              <button
                onClick={() => removeSkill(s)}
                className="hover:text-red-700 transition-colors"
              >
                <X size={11} weight="bold" />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => skillInput.trim() && addSkill(skillInput)}
            placeholder={skills.length === 0 ? "Add another skill..." : ""}
            className="flex-1 min-w-[120px] outline-none text-sm placeholder-zinc-300 bg-transparent"
          />
        </div>
        <p className="text-xs text-zinc-400 mt-2">
          Press{" "}
          <kbd className="border border-border rounded px-1.5 py-0.5 font-mono text-xs">
            Enter
          </kbd>{" "}
          or{" "}
          <kbd className="border border-border rounded px-1.5 py-0.5 font-mono text-xs">
            ,
          </kbd>{" "}
          to add a skill • Backspace to remove last
        </p>
      </div>

      {/* Language Proficiency */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-bold text-black">
            Language Proficiency
          </label>
          <button
            onClick={addLang}
            className="text-sm font-semibold text-primary text-right hover:opacity-70 transition-opacity"
          >
            + Add Language
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {langEntries.map((entry, i) => (
            <div
              key={entry.id}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
            >
              <div>
                {i === 0 && (
                  <label className="hidden sm:block text-xs font-medium text-zinc-400 mb-1.5">
                    Language
                  </label>
                )}
                <label className="sm:hidden text-xs font-medium text-zinc-400 mb-1.5 block">
                  Language
                </label>
                <div className="relative">
                  <select
                    value={entry.language}
                    onChange={(e) =>
                      updateLang(entry.id, "language", e.target.value)
                    }
                    className="w-full appearance-none border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer pr-10"
                  >
                    {languages.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                  <CaretDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                  />
                </div>
              </div>
              <div>
                {i === 0 && (
                  <label className="hidden sm:block text-xs font-medium text-zinc-400 mb-1.5">
                    Spoken Level
                  </label>
                )}
                <label className="sm:hidden text-xs font-medium text-zinc-400 mb-1.5 block">
                  Spoken Level
                </label>
                <div className="relative">
                  <select
                    value={entry.spoken}
                    onChange={(e) =>
                      updateLang(entry.id, "spoken", e.target.value)
                    }
                    className="w-full appearance-none border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer pr-10"
                  >
                    <option value="">Select</option>
                    {proficiency.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                  <CaretDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                  />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  {i === 0 && (
                    <label className="hidden sm:block text-xs font-medium text-zinc-400 mb-1.5">
                      Written Level
                    </label>
                  )}
                  <label className="sm:hidden text-xs font-medium text-zinc-400 mb-1.5 block">
                    Written Level
                  </label>
                  <div className="relative">
                    <select
                      value={entry.written}
                      onChange={(e) =>
                        updateLang(entry.id, "written", e.target.value)
                      }
                      className="w-full appearance-none border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer pr-10"
                    >
                      <option value="">Select</option>
                      {proficiency.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                    <CaretDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                    />
                  </div>
                </div>
                {langEntries.length > 1 && (
                  <button
                    onClick={() => removeLang(entry.id)}
                    className="text-zinc-400 hover:text-primary transition-colors pb-2.5"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
