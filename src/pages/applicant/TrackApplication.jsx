/**
 * TrackApplication.jsx
 * Dedicated page for applicants to track their application
 * status using their reference number.
 */

import Navbar from "../../components/applicant/layout/Navbar";
import ApplicationTracker from "../../components/applicant/shared/ApplicationTracker";

export default function TrackApplication() {
  return (
    <div className="bg-bg min-h-screen">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-transparent pointer-events-none">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[80px] pt-4 pointer-events-auto">
          <Navbar />
        </div>
      </div>

      {/* Tracker */}
      <ApplicationTracker />
    </div>
  );
}
