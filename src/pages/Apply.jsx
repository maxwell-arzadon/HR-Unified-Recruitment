import { useState } from "react";
import { useParams } from "react-router-dom";
import { jobs } from "../data/jobs";
import Navbar from "../components/layout/Navbar";
import Stepper from "../components/shared/Stepper";
import JobBadge from "../components/shared/JobBadge";
import LocationBadge from "../components/shared/LocationBadge";
import Step1BasicInfo from "../components/apply/Step1BasicInfo";
import Step2Assessment from "../components/apply/Step2Assessment";
import Step3AppForm from "../components/apply/Step3AppForm";
import SuccessScreen from "../components/apply/SuccessScreen";

export default function Apply() {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === Number(id));
  const [step, setStep] = useState(1);

  if (!job)
    return <div className="p-10 text-center text-zinc-400">Job not found.</div>;

  return (
    <div className="bg-bg min-h-screen">
      <div className="sticky top-0 z-50 bg-transparent pointer-events-none">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[80px] pt-4 pointer-events-auto">
          <Navbar activeLink="form" />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[80px] py-10">
        {step <= 3 && (
          <>
            <h1 className="font-jakarta font-bold text-black text-3xl mb-2">
              Application
            </h1>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-success text-xs font-bold">
                {job.title}
              </span>
              <JobBadge type={job.type} />
              <LocationBadge location={job.location} />
            </div>
            <div className="mb-10">
              <Stepper currentStep={step} />
            </div>
          </>
        )}

        {step === 1 && <Step1BasicInfo onNext={() => setStep(2)} />}
        {step === 2 && (
          <Step2Assessment
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <Step3AppForm onNext={() => setStep(4)} onBack={() => setStep(2)} />
        )}
        {step === 4 && <SuccessScreen job={job} />}
      </div>
    </div>
  );
}
