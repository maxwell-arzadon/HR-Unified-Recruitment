/**
 * Stepper.jsx
 * Multi-step progress indicator for the application form.
 * Shows three steps with active, completed, and upcoming states.
 * Responsive — hides labels on mobile, shows only step numbers.
 */

import { Check } from "@phosphor-icons/react";

const steps = [
  { number: 1, label: "Step 1", sub: "Basic Information" },
  { number: 2, label: "Step 2", sub: "Assessment Test" },
  { number: 3, label: "Step 3", sub: "Application Form" },
];

export default function Stepper({ currentStep }) {
  return (
    <div className="flex items-start w-full">
      {steps.map((step, i) => {
        const isDone = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div
            key={step.number}
            className={`flex items-start ${i < steps.length - 1 ? "flex-1" : ""}`}
          >
            {/* Circle + label + sub stacked */}
            <div className="flex flex-col">
              {/* Circle + label on same row */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all
                  ${isDone || isActive ? "gradient-bg border-transparent" : "border-zinc-300 bg-white"}`}
                >
                  {isDone ? (
                    <Check size={14} weight="bold" className="text-white" />
                  ) : (
                    <span
                      className={`text-sm font-bold font-jakarta ${isActive ? "text-white" : "text-zinc-400"}`}
                    >
                      {step.number}
                    </span>
                  )}
                </div>
                <span
                  className={`hidden sm:block text-sm font-semibold font-jakarta whitespace-nowrap ${
                    isActive || isDone ? "text-black" : "text-zinc-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Sub label sits below, indented to align under label text */}
              <p
                className={`hidden sm:block text-xs mt-1 ml-10 whitespace-nowrap ${
                  isActive ? "font-bold text-black" : "text-zinc-400"
                }`}
              >
                {step.sub}
              </p>

              {/* Mobile sub label */}
              <p
                className={`block sm:hidden text-[10px] text-center w-8 mt-1 ${
                  isActive ? "font-bold text-black" : "text-zinc-400"
                }`}
              >
                {step.sub}
              </p>
            </div>

            {/* Connector — vertically centered with the circle (h-8 / 2 = 16px = mt-4) */}
            {i < steps.length - 1 && (
              <div className="flex-1 mt-4 mx-3">
                <div
                  className={`h-px w-full ${isDone ? "bg-primary" : "bg-zinc-200"}`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
