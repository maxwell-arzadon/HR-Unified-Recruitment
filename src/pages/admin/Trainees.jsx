import { useState } from "react";
import { Bell } from "@phosphor-icons/react";
import ApplicantTable from "../../components/admin/applicants/ApplicantTable";
import ApplicantDrawer from "../../components/admin/applicants/ApplicantDrawer";
import { TRAINEES, TRAINEE_STATUSES } from "../../data/applicants";

export default function Trainees() {
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  return (
    <div className="p-8 min-h-screen">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-jakarta font-bold text-2xl text-black">
            Trainees
          </h1>
          <p className="text-sm text-muted mt-0.5">
            Applicants currently in trainee status
          </p>
        </div>
        <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted hover:text-black hover:border-primary/30 transition-all">
          <Bell size={18} />
        </button>
      </div>

      {/* Table — pass trainee-specific statuses for the filter dropdown */}
      <ApplicantTable
        applicants={TRAINEES}
        statusOptions={TRAINEE_STATUSES}
        onRowClick={(applicant) => setSelectedApplicant(applicant)}
      />

      {/* Drawer — trainee variant */}
      {selectedApplicant && (
        <ApplicantDrawer
          applicant={selectedApplicant}
          variant="trainee"
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </div>
  );
}
