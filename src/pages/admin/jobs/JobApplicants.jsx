import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import { CaretRight } from "@phosphor-icons/react";
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
      <PageHeader
        title="Job Applicants"
        subtitle="Applicants filtered by position"
      />

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

      <ApplicantTable
        applicants={APPLICANTS.filter((a) => a.jobId === Number(id))}
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
