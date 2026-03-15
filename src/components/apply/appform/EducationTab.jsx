import { useState } from "react";
import { CaretDown, Trash } from "@phosphor-icons/react";

const levels = [
  "High School",
  "Senior High School",
  "Vocational",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
];

const emptyEntry = () => ({
  id: Date.now(),
  level: "",
  school: "",
  course: "",
  yearFrom: "",
  yearTo: "",
  present: false,
});

export default function EducationTab() {
  const [entries, setEntries] = useState([emptyEntry()]);

  const update = (id, k, v) =>
    setEntries((es) => es.map((e) => (e.id === id ? { ...e, [k]: v } : e)));
  const add = () => setEntries((es) => [...es, emptyEntry()]);
  const remove = (id) => setEntries((es) => es.filter((e) => e.id !== id));

  return (
    <div>
      <h3 className="font-jakarta font-bold text-black text-base mb-1">
        Educational Background
      </h3>
      <p className="text-sm text-zinc-400 mb-6">
        Add all relevant education history, from most recent to oldest.
      </p>

      <div className="flex flex-col gap-4">
        {entries.map((entry, i) => (
          <div key={entry.id} className="border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Entry {i + 1}
              </span>
              {entries.length > 1 && (
                <button
                  onClick={() => remove(entry.id)}
                  className="text-zinc-400 hover:text-primary transition-colors"
                >
                  <Trash size={16} />
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {/* Level + School */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-black">
                    Educational Level <span className="text-primary">*</span>
                  </label>
                  <div className="relative mt-1.5">
                    <select
                      value={entry.level}
                      onChange={(e) =>
                        update(entry.id, "level", e.target.value)
                      }
                      className="w-full appearance-none border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer pr-10"
                    >
                      <option value="">Select level</option>
                      {levels.map((l) => (
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
                  <label className="text-sm font-medium text-black">
                    School / University <span className="text-primary">*</span>
                  </label>
                  <input
                    placeholder="University of the Philippines"
                    value={entry.school}
                    onChange={(e) => update(entry.id, "school", e.target.value)}
                    className="mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm placeholder-zinc-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>

              {/* Course + Year */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-black">
                    Course / Degree <span className="text-primary">*</span>
                  </label>
                  <input
                    placeholder="BS Information Technology"
                    value={entry.course}
                    onChange={(e) => update(entry.id, "course", e.target.value)}
                    className="mt-1.5 w-full border border-border rounded-xl px-4 py-2.5 text-sm placeholder-zinc-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-black">
                    Year Attended <span className="text-primary">*</span>
                  </label>
                  <div className="flex items-center gap-2 mt-1.5">
                    <input
                      placeholder="2016"
                      value={entry.yearFrom}
                      onChange={(e) =>
                        update(entry.id, "yearFrom", e.target.value)
                      }
                      className="w-full border border-border rounded-xl px-4 py-2.5 text-sm placeholder-zinc-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                    <span className="text-zinc-400 flex-shrink-0">—</span>
                    <input
                      placeholder="2020"
                      value={entry.yearTo}
                      onChange={(e) =>
                        update(entry.id, "yearTo", e.target.value)
                      }
                      disabled={entry.present}
                      className="w-full border border-border rounded-xl px-4 py-2.5 text-sm placeholder-zinc-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all disabled:opacity-40"
                    />
                    <label className="flex items-center gap-1.5 flex-shrink-0 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={entry.present}
                        onChange={(e) =>
                          update(entry.id, "present", e.target.checked)
                        }
                        className="accent-primary"
                      />
                      <span className="text-sm text-black">Present</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add entry */}
        <button
          onClick={add}
          className="w-full border-2 border-dashed border-border rounded-2xl py-4 text-sm font-semibold text-zinc-400 hover:border-primary hover:text-primary transition-colors"
        >
          + Add Another Education Entry
        </button>
      </div>
    </div>
  );
}
