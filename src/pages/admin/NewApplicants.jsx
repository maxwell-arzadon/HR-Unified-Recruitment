import { useState } from "react";
import { Bell } from "@phosphor-icons/react";
import ApplicantTable from "../../components/admin/applicants/ApplicantTable";
import ApplicantDrawer from "../../components/admin/applicants/ApplicantDrawer";
import { APPLICANTS } from "../../data/applicants";

export default function NewApplicants() {
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  return (
    <div className="p-8 min-h-screen">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-jakarta font-semibold text-xl text-black">
            New Applicants
          </h1>
          <p className="text-base text-muted mt-0.5">
            Manage and review incoming applications
          </p>
        </div>
        <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted hover:text-black hover:border-primary/30 transition-all">
          <Bell size={18} />
        </button>
      </div>

      {/* Table */}
      <ApplicantTable
        applicants={APPLICANTS}
        onRowClick={(applicant) => setSelectedApplicant(applicant)}
      />

      {/* Drawer */}
      {selectedApplicant && (
        <ApplicantDrawer
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </div>
  );
}
