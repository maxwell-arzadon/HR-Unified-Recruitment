import { useState } from "react";
import { ShieldCheck, X } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const content = {
  "Privacy Notice": "Lorem ipsum dolor sit amet consectetur. Sed adipiscing imperdiet id magna magna lorem sed imperdiet. Ut arcu eget a aliquam molestie euismod pretium mus. In ultrices purus eget at adipiscing malesuada. A vivamus tempus habitant facilisis id integer in arcu. Lorem ipsum dolor sit amet consectetur. Sed adipiscing imperdiet id magna magna lorem sed imperdiet. Ut arcu eget a aliquam molestie euismod pretium mus. In ultrices purus eget at adipiscing malesuada. A vivamus tempus habitant facilisis id integer in arcu.",
  "Non-Disclosure Agreement": "Lorem ipsum dolor sit amet consectetur. Sed adipiscing imperdiet id magna magna lorem sed imperdiet. Ut arcu eget a aliquam molestie euismod pretium mus. In ultrices purus eget at adipiscing malesuada. A vivamus tempus habitant facilisis id integer in arcu. Lorem ipsum dolor sit amet consectetur. Sed adipiscing imperdiet id magna magna lorem sed imperdiet. Ut arcu eget a aliquam molestie euismod pretium mus. In ultrices purus eget at adipiscing malesuada. A vivamus tempus habitant facilisis id integer in arcu.",
};

const tabs = ["Privacy Notice", "Non-Disclosure Agreement"];

export default function BeforeYouApply({ onClose, jobId }) {
    const navigate   = useNavigate();
    const [activeTab, setActiveTab] = useState("Privacy Notice");
    const [agreed, setAgreed]       = useState(false);

    const handleContinue = () => {
    onClose();
    navigate(`/apply/${jobId}`);
  };
  return (
    <>
      {/* Backdrop */}
    <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999]"
    onClick={onClose}
    />

      {/* Modal */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">

          {/* Header */}
          <div className="flex items-center gap-3 p-6 pb-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={22} className="text-primary" weight="regular" />
            </div>
            <h2 className="font-jakarta font-bold text-black text-lg">Before You Apply</h2>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0 border-b border-border px-6">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-semibold font-jakarta transition-colors border-b-2 -mb-px
                  ${activeTab === tab
                    ? "text-primary border-primary"
                    : "text-zinc-400 border-transparent hover:text-black"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="px-6 py-5 text-sm text-zinc-500 leading-relaxed max-h-56 overflow-y-auto">
            {content[activeTab]}
          </div>

          {/* Divider */}
          <div className="border-t border-border mx-6" />

          {/* Agree checkbox */}
          <div className="px-6 py-4 flex items-start gap-3">
            <button
              onClick={() => setAgreed(v => !v)}
              className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-colors
                ${agreed ? "bg-primary border-primary" : "border-zinc-300 bg-white"}`}
            >
              {agreed && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
              )}
            </button>
            <p className="text-sm text-zinc-500">
              I have read and agree to the{" "}
              <span className="font-bold text-black">Privacy Notice</span>{" "}
              and{" "}
              <span className="font-bold text-black">Non-Disclosure Agreement</span>
            </p>
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 border border-border text-zinc-500 hover:text-black hover:border-zinc-300 font-semibold font-jakarta text-sm py-3 rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!agreed}
              style={agreed ? { background: "linear-gradient(90deg, #F13338, #F17F33)" } : {}}
              className={`flex-1 flex items-center justify-center gap-2 text-white font-semibold font-jakarta text-sm py-3 rounded-full transition-opacity
                ${agreed ? "hover:opacity-90 cursor-pointer" : "bg-red-200 cursor-not-allowed"}`}
            >
              Continue
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}