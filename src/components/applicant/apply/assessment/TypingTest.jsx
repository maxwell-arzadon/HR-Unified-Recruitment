/**
 * TypingTest.jsx
 * Typing speed and accuracy test within the assessment step.
 * Tracks WPM, accuracy, and progress against a fixed passage
 * within a 60-second countdown timer.
 */

import { useState, useEffect, useRef } from "react";

const PASSAGE =
  "Lorem ipsum dolor sit amet consectetur. Sed adipiscing imperdiet id magna magna lorem sed imperdiet. Ut arcu eget a aliquam molestie euismod pretium mus. In ultrices purus eget at adipiscing malesuada. A vivamus tempus habitant facilisis id integer in arcu.";
const DURATION = 60;

export default function TypingTest({ onStart, onFinish }) {
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (started && !finished) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setFinished(true);
            onFinish?.(); // ← notify parent
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
      onStart?.();
    }
    if (!finished) setInput(e.target.value);
  };

  const words = input.trim().split(/\s+/).filter(Boolean).length;
  const passageWords = PASSAGE.trim().split(/\s+/);
  const inputWords = input.trim().split(/\s+/);
  const correct = inputWords.filter((w, i) => w === passageWords[i]).length;
  const accuracy =
    inputWords.length > 0
      ? Math.round((correct / inputWords.length) * 100)
      : 100;
  const progress = Math.min(
    Math.round((input.length / PASSAGE.length) * 100),
    100,
  );
  const fmtTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const timeColor = timeLeft <= 10 ? "text-primary" : "text-success";

  // Build highlighted passage
  const renderPassage = () => {
    return PASSAGE.split("").map((char, i) => {
      const typed = input[i];
      const isCursor = i === input.length;

      let className = "text-zinc-400"; // untyped
      if (typed !== undefined) {
        className =
          typed === char ? "text-black" : "bg-red-100 text-primary rounded-sm";
      }

      return (
        <span key={i} className="relative">
          {isCursor && (
            <span className="absolute -left-px top-0 bottom-0 w-0.5 bg-primary animate-pulse" />
          )}
          <span className={className}>{char}</span>
        </span>
      );
    });
  };

  return (
    <div>
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
        Typing Test
      </h2>
      <p className="text-sm text-zinc-400 mb-6">
        Type the passage below as accurately as possible within 1 minute
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border border-border rounded-2xl p-4 text-center">
          <div className="font-jakarta font-bold text-2xl text-success mb-1">
            {accuracy}%
          </div>
          <div className="text-xs text-zinc-400">Accuracy</div>
        </div>
        <div className="border border-border rounded-2xl p-4 text-center">
          <div className="font-jakarta font-bold text-2xl text-primary mb-1">
            {progress}%
          </div>
          <div className="text-xs text-zinc-400">Progress</div>
        </div>
        <div className="border border-border rounded-2xl p-4 text-center">
          <div className="font-jakarta font-bold text-2xl text-black mb-1">
            {finished ? "Done" : started ? "Typing" : "Ready"}
          </div>
          <div className="text-xs text-zinc-400">Status</div>
        </div>
      </div>

      {/* Highlighted passage */}
      <div
        className="border border-border rounded-2xl p-4 mb-4 text-sm leading-relaxed bg-zinc-50 font-mono cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {renderPassage()}
        {/* Cursor at end if fully typed */}
        {input.length >= PASSAGE.length && (
          <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-px align-middle" />
        )}
      </div>

      <textarea
        ref={inputRef}
        rows={4}
        placeholder="Start typing the passage here..."
        value={input}
        onChange={handleInput}
        disabled={finished}
        className="w-full border border-border rounded-2xl px-4 py-3 text-sm placeholder-zinc-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none disabled:opacity-50 font-mono"
      />

      {finished && (
        <div className="mt-3 text-center text-sm font-semibold text-success bg-green-50 py-3 rounded-full">
          Time's up! You typed {words} words at {accuracy}% accuracy.
        </div>
      )}
    </div>
  );
}
