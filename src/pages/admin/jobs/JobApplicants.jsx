import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bell, CaretRight } from "@phosphor-icons/react";
import ApplicantTable from "../../../components/admin/applicants/ApplicantTable";
import ApplicantDrawer from "../../../components/admin/applicants/ApplicantDrawer";
import { JOBS } from "../../../data/jobs_admin";
import { APPLICANTS } from "../../../data/applicants";

export default function JobApplicants() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const job = JOBS.find((j) => j.id === Number(id));

  return (
    <div className="p-8 min-h-screen">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-jakarta font-bold text-2xl text-black">
            Job Applicants
          </h1>
          <p className="text-sm text-muted mt-0.5">
            Applicants filtered by position
          </p>
        </div>
        <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted hover:text-black hover:border-primary/30 transition-all">
          <Bell size={18} />
        </button>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <button
          onClick={() => navigate("/admin/jobs")}
          className="text-muted hover:text-black transition-colors"
        >
          Jobs
        </button>
        <CaretRight size={13} className="text-muted" />
        <span className="text-primary font-semibold">
          {job?.title ?? "Job"}
        </span>
      </div>

      {/* Reuse ApplicantTable with period filter enabled */}
      <ApplicantTable
        applicants={APPLICANTS}
        onRowClick={(applicant) => setSelectedApplicant(applicant)}
        showPeriodFilter={true}
      />

      {selectedApplicant && (
        <ApplicantDrawer
          applicant={selectedApplicant}
          variant="new"
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </div>
  );
}
