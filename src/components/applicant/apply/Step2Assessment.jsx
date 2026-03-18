/**
 * Step2Assessment.jsx
 * Second step of the application form — assessment tests.
 * Contains four tabbed sections: Assessment Questions,
 * Grammar Test, Typing Test, and Essay Test.
 */

import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import AssessmentQuestions from "./assessment/AssessmentQuestions";
import GrammarTest from "./assessment/GrammarTest";
import TypingTest from "./assessment/TypingTest";
import EssayTest from "./assessment/EssayTest";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

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
  const [typingDone, setTypingDone] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Lifted grammar state
  const [grammarAnswers, setGrammarAnswers] = useState({});
  const [grammarChecked, setGrammarChecked] = useState(false);

  const isTimerActive =
    (activeIndex === 2 && typingStarted && !typingDone) ||
    (activeIndex === 3 && essayStarted);

  const handleNext = () => {
    if (activeIndex === 2) setTypingDone(false); // reset on leaving typing tab
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
    <div className="bg-white border border-border rounded-2xl p-6 sm:p-8">
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
          <TypingTest
            onStart={() => setTypingStarted(true)}
            onFinish={() => setTypingDone(true)}
          />
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
              <ArrowLeft size={16} weight="bold" className="text-zinc-500" />
              Back
            </button>
          ) : null}
          <button
            onClick={handleNext}
            className="flex-1 gradient-bg hover:opacity-90 text-white font-semibold font-jakarta text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-opacity"
          >
            Next
            <ArrowRight size={16} weight="bold" className="text-white" />
          </button>
        </div>
      )}

      {/* Warning Dialog */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold font-jakarta mb-2">Test in Progress</h3>
            <p className="text-zinc-600 mb-6">
              You have a test in progress. Going back will reset your progress. Are you sure you want to continue?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowWarning(false)}
                className="flex-1 border border-border text-zinc-500 hover:text-black hover:border-zinc-300 font-semibold font-jakarta text-sm py-3 rounded-full transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowWarning(false);
                  if (activeIndex > 0) setActiveIndex((i) => i - 1);
                  else onBack();
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold font-jakarta text-sm py-3 rounded-full transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
