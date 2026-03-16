import { Check } from "@phosphor-icons/react";

const steps = [
  { number: 1, label: "Step 1", sub: "Basic Information" },
  { number: 2, label: "Step 2", sub: "Assessment Test" },
  { number: 3, label: "Step 3", sub: "Application Form" },
];

export default function Stepper({ currentStep }) {
  return (
    <div className="flex items-start w-full max-w-2xl">
      {steps.map((step, i) => {
        const isDone = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div key={step.number} className="flex items-start flex-1">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {/* Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all
                    ${
                      isDone || isActive
                        ? "gradient-bg border-transparent"
                        : "border-zinc-300 bg-white"
                    }`}
                >
                  {isDone ? (
                    <Check size={14} weight="bold" className="text-white" />
                  ) : (
                    <span
                      className={`text-sm font-bold font-jakarta ${
                        isActive ? "text-white" : "text-zinc-400"
                      }`}
                    >
                      {step.number}
                    </span>
                  )}
                </div>

                {/* Label — hidden on mobile, visible on sm+ */}
                <span
                  className={`hidden sm:block text-sm font-semibold font-jakarta ${
                    isActive || isDone ? "text-black" : "text-zinc-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Sub label — hidden on mobile, visible on sm+ */}
              <p
                className={`hidden sm:block text-xs ml-10 ${
                  isActive ? "font-bold text-black" : "text-zinc-400"
                }`}
              >
                {step.sub}
              </p>

              {/* Mobile: show only sub label below circle, no ml offset */}
              <p
                className={`block sm:hidden text-[10px] text-center w-8 ${
                  isActive ? "font-bold text-black" : "text-zinc-400"
                }`}
              >
                {step.sub}
              </p>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="flex-1 mt-4 mx-2 sm:mx-3">
                <div
                  className={`h-px w-full ${
                    isDone ? "bg-primary" : "bg-zinc-200"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
