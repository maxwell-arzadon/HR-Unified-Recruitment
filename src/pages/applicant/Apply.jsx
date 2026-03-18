/**
 * Apply.jsx
 * Multi-step application form for job seekers.
 * Steps: Basic Information → Assessment Test → Application Form.
 * Manages step navigation and form state across all steps.
 */

import { useState } from "react";
import { useParams } from "react-router-dom";
import { jobs } from "../../data/jobs_applicant";
import Navbar from "../../components/applicant/layout/Navbar";
import Stepper from "../../components/applicant/shared/Stepper";
import JobBadge from "../../components/applicant/shared/JobBadge";
import LocationBadge from "../../components/applicant/shared/LocationBadge";
import Step1BasicInfo from "../../components/applicant/apply/Step1BasicInfo";
import Step2Assessment from "../../components/applicant/apply/Step2Assessment";
import Step3AppForm from "../../components/applicant/apply/Step3AppForm";
import SuccessScreen from "../../components/applicant/apply/SuccessScreen";

export default function Apply() {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === Number(id));
  const [step, setStep] = useState(1);

  if (!job)
    return <div className="p-10 text-center text-zinc-400">Job not found.</div>;

  return (
    <div className="bg-bg min-h-screen">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-transparent pointer-events-none">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[80px] pt-4 pointer-events-auto">
          <Navbar activeLink="form" />
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-4 sm:px-8 py-10">
        {/* Centered title + badges + stepper */}
        {step <= 3 && (
          <div className="flex flex-col items-center text-center mb-10">
            <h1 className="font-jakarta font-bold text-black text-3xl mb-3">
              Application
            </h1>
            <div className="flex items-center gap-2 flex-wrap justify-center mb-8">
              <span className="text-success text-xs font-bold">
                {job.title}
              </span>
              <JobBadge type={job.type} />
              <LocationBadge location={job.location} />
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <Stepper currentStep={step} />
              </div>
            </div>
          </div>
        )}

        {/* Steps Content */}
        {step === 1 && <Step1BasicInfo onNext={() => setStep(2)} />}
        {step === 2 && (
          <Step2Assessment
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <Step3AppForm
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
            job={job}
          />
        )}
        {step === 4 && <SuccessScreen job={job} />}
      </div>
    </div>
  );
}
