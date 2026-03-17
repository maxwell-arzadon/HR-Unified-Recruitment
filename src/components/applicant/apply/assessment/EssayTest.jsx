/**
 * EssayTest.jsx
 * Essay writing test within the assessment step.
 * Presents a prompt and a timed textarea for the applicant
 * to compose their response within the allotted time.
 */

import { useState, useEffect, useRef } from "react";

const DURATION = 25 * 60; // 25 minutes
const MIN_CHARS = 100;
const PROMPT =
  "Describe a time when you had to handle a difficult customer or situation at work. What did you do, and what was the outcome?";

export default function EssayTest() {
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [essay, setEssay] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (started && !finished) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setFinished(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [started, finished]);

  const handleInput = (e) => {
    if (!started) {
      setStarted(true);
      onStart(); // notify parent
    }
    if (!finished) setEssay(e.target.value);
  };

  const fmtTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const timeColor = timeLeft <= 60 ? "text-primary" : "text-success";

  return (
    <>
      {/* Guidelines modal */}
      {showGuidelines && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999]" />
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-8">
              <h2 className="font-jakarta font-bold text-black text-lg mb-6">
                Essay Guidelines
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet consectetur. Sed adipiscing imperdiet
                id magna magna lorem sed imperdiet. Ut arcu eget a aliquam
                molestie euismod pretium mus. In ultrices purus eget at
                adipiscing malesuada. A vivamus tempus habitant facilisis id
                integer in arcu.
              </p>
              <div className="border-t border-border pt-6 mb-6">
                <p className="text-sm font-bold text-primary mb-3">Rules</p>
                <ol className="flex flex-col gap-2">
                  {[
                    "Lorem ipsum dolor sit amet consectetur.",
                    "Lorem ipsum dolor sit amet consectetur.",
                    "Lorem ipsum dolor sit amet consectetur.",
                    "Lorem ipsum dolor sit amet consectetur.",
                  ].map((r, i) => (
                    <li key={i} className="text-sm text-zinc-500">
                      {i + 1}. {r}
                    </li>
                  ))}
                </ol>
              </div>
              <button
                onClick={() => setShowGuidelines(false)}
                className="w-full gradient-bg hover:opacity-90 text-white font-semibold font-jakarta text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-opacity"
              >
                Continue
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Timer bar */}
      <div className="flex items-center justify-between border border-success/30 bg-success/5 rounded-xl px-4 py-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-success flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
          </div>
          <span className="text-sm font-medium text-zinc-500">
            Time Remaining
          </span>
        </div>
        <span className={`font-jakarta font-bold text-lg ${timeColor}`}>
          {fmtTime(timeLeft)}
        </span>
      </div>

      <h2 className="font-jakarta font-bold text-black text-lg mb-1">
        Essay Test
      </h2>
      <p className="text-sm text-zinc-400 mb-6">
        Write a thoughtful and detailed response. You have 25 minutes
      </p>

      {/* Prompt */}
      <div className="border border-border rounded-2xl p-5 mb-4">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
          Essay Prompt
        </p>
        <p className="text-sm font-semibold text-black leading-relaxed">
          {PROMPT}
        </p>
      </div>

      {/* Essay input */}
      <textarea
        rows={7}
        placeholder={`Write your essay here... (maximum ${MIN_CHARS} characters)`}
        value={essay}
        onChange={handleInput}
        disabled={finished}
        className="w-full border border-border rounded-2xl px-4 py-3 text-sm placeholder-zinc-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none disabled:opacity-50"
      />
      <div className="text-right text-xs text-zinc-400 mt-1">
        {essay.length} / {MIN_CHARS}
      </div>

      {finished && (
        <div className="mt-3 text-center text-sm font-semibold text-success">
          Time's up! Your essay has been recorded.
        </div>
      )}
    </>
  );
}
