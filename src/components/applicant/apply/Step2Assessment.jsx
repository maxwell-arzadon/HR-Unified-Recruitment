import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import AssessmentQuestions from "./assessment/AssessmentQuestions";
import GrammarTest from "./assessment/GrammarTest";
import TypingTest from "./assessment/TypingTest";
import EssayTest from "./assessment/EssayTest";

const tabs = [
  "Assessment Questions",
  "Grammar Test",
  "Typing Test",
  "Essay Test",
];

export default function Step2Assessment({ onNext, onBack }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typingStarted, setTypingStarted] = useState(false);
  const [essayStarted, setEssayStarted] = useState(false);

  // Lifted grammar state
  const [grammarAnswers, setGrammarAnswers] = useState({});
  const [grammarChecked, setGrammarChecked] = useState(false);

  const isTimerActive =
    (activeIndex === 2 && typingStarted) || (activeIndex === 3 && essayStarted);

  const showBackButton = !isTimerActive;

  const handleNext = () => {
    if (activeIndex < tabs.length - 1) setActiveIndex((i) => i + 1);
    else onNext();
  };

  const handleBack = () => {
    if (isTimerActive) {
      setShowWarning(true);
      return;
    }
    if (activeIndex > 0) setActiveIndex((i) => i - 1);
    else onBack();
  };

  return (
    <div className="bg-white border border-border rounded-2xl max-w-[860px]">
      {/* Progress tabs */}
      <div className="flex items-center border-b border-border px-6 overflow-x-auto scrollbar-none">
        {tabs.map((tab, i) => {
          const isDone = i < activeIndex;
          const isActive = i === activeIndex;
          return (
            <div
              key={tab}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold font-jakarta whitespace-nowrap border-b-2 -mb-px
                ${
                  isActive
                    ? "text-primary border-primary"
                    : isDone
                      ? "text-zinc-400 border-zinc-200"
                      : "text-zinc-300 border-transparent"
                }`}
            >
              {isDone && (
                <div className="w-4 h-4 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                  <Check size={9} weight="bold" className="text-white" />
                </div>
              )}
              {tab}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-8">
        {activeIndex === 0 && <AssessmentQuestions />}
        {activeIndex === 1 && (
          <GrammarTest
            answers={grammarAnswers}
            setAnswers={setGrammarAnswers}
            checked={grammarChecked}
            setChecked={setGrammarChecked}
          />
        )}
        {activeIndex === 2 && (
          <TypingTest onStart={() => setTypingStarted(true)} />
        )}
        {activeIndex === 3 && (
          <EssayTest onStart={() => setEssayStarted(true)} />
        )}
      </div>

      {/* Footer */}
      {!isTimerActive && (
        <div className="flex gap-3 border-t border-border p-6">
          {activeIndex > 0 || true ? (
            <button
              onClick={handleBack}
              className="flex-1 flex items-center justify-center gap-2 border border-border text-zinc-500 hover:text-black hover:border-zinc-300 font-semibold font-jakarta text-sm py-3 rounded-full transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          ) : null}
          <button
            onClick={handleNext}
            className="flex-1 gradient-bg hover:opacity-90 text-white font-semibold font-jakarta text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-opacity"
          >
            Next
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
      )}
    </div>
  );
}
