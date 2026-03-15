import { useState } from "react";
import PersonalTab from "./appform/PersonalTab";
import EducationTab from "./appform/EducationTab";
import SkillsTab from "./appform/SkillsTab";
import WorksTab from "./appform/WorksTab";
import SecurityTab from "./appform/SecurityTab";

const tabs = ["Personal", "Education", "Skills & Language", "Works & Files", "Security"];

export default function Step3AppForm({ onNext, onBack }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < tabs.length - 1) setActiveIndex(i => i + 1);
    else onNext();
  };

  const handleBack = () => {
    if (activeIndex > 0) setActiveIndex(i => i - 1);
    else onBack();
  };

  return (
    <div className="bg-white border border-border rounded-2xl max-w-[860px]">

      {/* Header */}
      <div className="px-8 pt-8 pb-0">
        <h2 className="font-jakarta font-bold text-black text-lg mb-1">Application Form</h2>
        <p className="text-sm text-zinc-400 mb-6">Fill in all sections completely. This serves as your digital resume.</p>

        {/* Tabs */}
        <div className="flex items-center border-b border-border overflow-x-auto scrollbar-none">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-3 text-sm font-semibold font-jakarta whitespace-nowrap border-b-2 -mb-px transition-colors
                ${activeIndex === i
                  ? "text-primary border-primary"
                  : "text-zinc-400 border-transparent hover:text-black"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {activeIndex === 0 && <PersonalTab />}
        {activeIndex === 1 && <EducationTab />}
        {activeIndex === 2 && <SkillsTab />}
        {activeIndex === 3 && <WorksTab />}
        {activeIndex === 4 && <SecurityTab />}
      </div>

      {/* Footer */}
      <div className="flex gap-3 border-t border-border p-6">
        <button
          onClick={handleBack}
          className="flex-1 flex items-center justify-center gap-2 border border-border text-zinc-500 hover:text-black hover:border-zinc-300 font-semibold font-jakarta text-sm py-3 rounded-full transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {activeIndex === 0 ? "Back to Assessment" : "Back"}
        </button>
        <button
          onClick={handleNext}
          className="flex-1 gradient-bg hover:opacity-90 text-white font-semibold font-jakarta text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-opacity"
        >
          {activeIndex === tabs.length - 1 ? (
            <>
              Submit Application
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </>
          ) : (
            <>
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}