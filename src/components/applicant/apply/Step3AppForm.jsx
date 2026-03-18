/**
 * Step3AppForm.jsx
 * Third and final step of the application form.
 * Collects detailed applicant information before submission.
 */

import { useState } from "react";
import PersonalTab from "./appform/PersonalTab";
import EducationTab from "./appform/EducationTab";
import SkillsTab from "./appform/SkillsTab";
import WorksTab from "./appform/WorksTab";
import { ArrowLeft, ArrowRight, PaperPlaneTilt } from "@phosphor-icons/react";

const tabs = ["Personal", "Education", "Skills & Language", "Works & Files"];

export default function Step3AppForm({ onNext, onBack, job }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxReachedIndex, setMaxReachedIndex] = useState(0); // ← add this

  const handleNext = () => {
    if (activeIndex < tabs.length - 1) {
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      // Unlock the next tab
      setMaxReachedIndex((prev) => Math.max(prev, nextIndex));
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (activeIndex > 0) setActiveIndex((i) => i - 1);
    else onBack();
  };

  return (
    <div className="bg-white border border-border rounded-2xl p-6 sm:p-8">
      {/* Header */}
      <div className="px-8 pt-8 pb-0">
        <h2 className="font-jakarta font-bold text-black text-lg mb-1">
          Application Form
        </h2>
        <p className="text-sm text-zinc-400 mb-6">
          Fill in all sections completely. This serves as your digital resume.
        </p>

        {/* Tabs */}
        <div className="flex items-center border-b border-border overflow-x-auto scrollbar-none">
          {tabs.map((tab, i) => {
            const isActive = activeIndex === i;
            const isUnlocked = i <= maxReachedIndex;

            return (
              <button
                key={tab}
                onClick={() => isUnlocked && setActiveIndex(i)}
                className={`px-4 py-3 text-sm font-semibold font-jakarta whitespace-nowrap border-b-2 -mb-px transition-colors
                  ${
                    isActive
                      ? "text-primary border-primary"
                      : isUnlocked
                        ? "text-zinc-400 border-transparent hover:text-black cursor-pointer"
                        : "text-zinc-300 border-transparent cursor-not-allowed"
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {activeIndex === 0 && <PersonalTab />}
        {activeIndex === 1 && <EducationTab />}
        {activeIndex === 2 && <SkillsTab />}
        {activeIndex === 3 && <WorksTab jobType={job?.type} />}
      </div>

      {/* Footer */}
      <div className="flex gap-3 border-t border-border p-6">
        <button
          onClick={handleBack}
          className="flex-1 flex items-center justify-center gap-2 border border-border text-zinc-500 hover:text-black hover:border-zinc-300 font-semibold font-jakarta text-sm py-3 rounded-full transition-colors"
        >
          <ArrowLeft size={16} weight="bold" className="text-zinc-500" />
          {activeIndex === 0 ? "Back to Assessment" : "Back"}
        </button>
        <button
          onClick={handleNext}
          className="flex-1 gradient-bg hover:opacity-90 text-white font-semibold font-jakarta text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-opacity"
        >
          {activeIndex === tabs.length - 1 ? (
            <>
              Submit Application
              <PaperPlaneTilt size={16} weight="bold" className="text-white" />
            </>
          ) : (
            <>
              Next
              <ArrowRight size={16} weight="bold" className="text-white" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
