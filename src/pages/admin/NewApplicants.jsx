/**
 * NewApplicants.jsx
 * Displays incoming applicants in a filterable, sortable table.
 * Clicking a row opens the ApplicantDrawer with full applicant details,
 * assessment scores, and interview scheduling.
 */

import { useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import ApplicantTable from "../../components/admin/applicants/ApplicantTable";
import ApplicantDrawer from "../../components/admin/applicants/ApplicantDrawer";
import { APPLICANTS } from "../../data/applicants";

export default function NewApplicants({ onMenuOpen }) {
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  return (
    <div className="p-8 min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="New Applicants"
        subtitle="Manage and review incoming applications"
        onMenuOpen={onMenuOpen}
      />

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
