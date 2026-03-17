/**
 * Trainees.jsx
 * Displays applicants currently in trainee status.
 * Uses the shared ApplicantTable and ApplicantDrawer
 * with the "trainee" variant for status updates.
 */

import { useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import ApplicantTable from "../../components/admin/applicants/ApplicantTable";
import ApplicantDrawer from "../../components/admin/applicants/ApplicantDrawer";
import { TRAINEES, TRAINEE_STATUSES } from "../../data/applicants";

export default function Trainees({ onMenuOpen }) {
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  return (
    <div className="p-8 min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="Trainees"
        subtitle="Applicants currently in trainee status"
        onMenuOpen={onMenuOpen}
      />

      {/* Table — pass trainee-specific statuses for the filter dropdown */}
      <ApplicantTable
        applicants={TRAINEES}
        statusOptions={TRAINEE_STATUSES}
        onRowClick={(applicant) => setSelectedApplicant(applicant)}
      />

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
