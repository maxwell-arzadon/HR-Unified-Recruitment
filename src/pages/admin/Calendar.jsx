/**
 * Calendar.jsx
 * Interview calendar page for the admin panel.
 * Renders a monthly grid view of scheduled interviews,
 * a day detail panel, and a notes section.
 */

import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { INTERVIEWS } from "../../data/calendar";
import PageHeader from "../../components/admin/PageHeader";

const DAYS_OF_WEEK_FULL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAYS_OF_WEEK_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function toKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// Reschedule dropdown component used in interview cards
function RescheduleDropdown() {
  const [open, setOpen] = useState(false);
  const options = ["Reschedule", "Cancel", "Mark Done"];
  const [selected, setSelected] = useState("Reschedule");

  return (
    <div className="relative mt-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between border border-border rounded-xl px-4 py-2.5 text-sm text-black font-medium hover:border-primary/30 transition-all"
      >
        {selected}
        <CaretRight
          size={13}
          className={`text-muted transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-lg z-10 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-black hover:bg-bg transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Calendar({ onMenuOpen }) {
  const today = new Date();
  const [year, setYear] = useState(2020);
  const [month, setMonth] = useState(4); // May = 4
  const [selectedDay, setSelectedDay] = useState(1);
  const [notes, setNotes] = useState("");
  const [view, setView] = useState("Month");

  const daysInMonth = getDaysInMonth(year, month);
  const firstDaySlot = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
    setSelectedDay(1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
    setSelectedDay(1);
  };

  const selectedKey = toKey(year, month, selectedDay);
  const selectedInterviews = INTERVIEWS[selectedKey] ?? [];

  // Build calendar grid cells
  const cells = [
    ...Array(firstDaySlot).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  const rows = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  const VIEW_TABS = ["Month", "Week", "Day", "Today"];

  return (
    <div className="px-4 sm:px-8 pt-6 pb-8 min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="Interview Calendar"
        subtitle="Scheduled interviews and appointments"
        onMenuOpen={onMenuOpen}
      />

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Calendar - Left panel */}
        <div className="w-full flex-1 bg-white rounded-2xl border border-border overflow-hidden">
          {/* Calendar header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-4 border-b border-border gap-3">
            {/* Month nav */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevMonth}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted hover:text-black hover:border-primary/30 transition-all"
              >
                <CaretLeft size={14} />
              </button>
              <span className="font-jakarta font-bold text-base text-black w-28 text-center">
                {MONTHS[month]} {year}
              </span>
              <button
                onClick={nextMonth}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted hover:text-black hover:border-primary/30 transition-all"
              >
                <CaretRight size={14} />
              </button>
            </div>

            {/* View toggle */}
            <div className="flex items-center border border-border rounded-xl overflow-x-auto scrollbar-none">
              {VIEW_TABS.map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    view === v
                      ? "border border-border text-black rounded-xl -mx-px z-10 bg-white shadow-sm"
                      : "text-muted hover:text-black bg-white"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 border-b border-border">
            {DAYS_OF_WEEK_FULL.map((d, i) => (
              <div
                key={d}
                className="py-3 text-center text-xs font-semibold text-muted tracking-wide"
              >
                <span className="hidden sm:block">{DAYS_OF_WEEK_FULL[i]}</span>
                <span className="sm:hidden">{DAYS_OF_WEEK_SHORT[i]}</span>
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div>
            {rows.map((row, ri) => (
              <div
                key={ri}
                className={`grid grid-cols-7 ${ri < rows.length - 1 ? "border-b border-border" : ""}`}
              >
                {row.map((day, ci) => {
                  const key = day ? toKey(year, month, day) : null;
                  const dayEvents = key ? (INTERVIEWS[key] ?? []) : [];
                  const isSelected = day === selectedDay;
                  const isToday =
                    day === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear();

                  return (
                    <div
                      key={ci}
                      onClick={() => day && setSelectedDay(day)}
                      className={`min-h-[40px] sm:min-h-[90px] p-1 sm:p-2 border-r border-border last:border-r-0 flex flex-col gap-1 overflow-hidden  ${
                        day
                          ? "cursor-pointer hover:bg-bg transition-colors"
                          : ""
                      } ${isSelected && day ? "bg-primary/5" : ""}`}
                    >
                      {day && (
                        <>
                          <span
                            className={`text-xs sm:text-sm font-medium w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full ${
                              isToday
                                ? "bg-primary text-white font-bold"
                                : isSelected
                                  ? "text-primary font-bold"
                                  : "text-black"
                            }`}
                          >
                            {day}
                          </span>
                          {dayEvents.length > 0 && (
                            <span className="text-white text-[9px] sm:text-[10px] font-semibold px-1 sm:px-2 py-0.5 rounded-md w-full block bg-primary">
                              Interviews +{dayEvents.length}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/*Right Panel*/}
        <div className="w-full lg:w-[280px] flex-shrink-0">
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            {/* Date header */}
            <div className="px-5 py-4 border-b border-border">
              <p className="font-jakarta font-bold text-base text-black">
                {MONTHS[month]} {selectedDay}, {year}
              </p>
              <p className="text-xs text-muted mt-0.5">
                {selectedInterviews.length} interview
                {selectedInterviews.length !== 1 ? "s" : ""} scheduled
              </p>
            </div>
            {/* Interview cards */}
            <div className="px-5 py-4 flex flex-col gap-3 border-b border-border">
              {selectedInterviews.length === 0 ? (
                <p className="text-sm text-muted text-center py-4">
                  No interviews scheduled
                </p>
              ) : (
                selectedInterviews.map((iv) => (
                  <div
                    key={iv.id}
                    className="border border-border rounded-2xl px-4 py-4 bg-bg"
                  >
                    <p className="font-jakarta font-bold text-sm text-black">
                      {iv.name}
                    </p>
                    <p className="text-xs text-muted mt-0.5">{iv.time}</p>
                    <p className="text-xs text-muted mt-3">
                      Interviewer:{" "}
                      <span className="font-bold text-black">
                        {iv.interviewer}
                      </span>
                    </p>
                    <RescheduleDropdown />
                  </div>
                ))
              )}
            </div>
            {/* Notes */}
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold tracking-widest text-muted uppercase mb-3">
                Notes
              </p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes for today..."
                rows={4}
                className="w-full text-sm text-black placeholder-muted outline-none resize-none bg-transparent border border-border rounded-xl px-3 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
