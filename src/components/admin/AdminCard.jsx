/**
 * AdminCard.jsx
 * Reusable white card container used across all admin pages.
 * Accepts an optional className prop for additional Tailwind utilities.
 */

export default function AdminCard({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-border p-6 ${className}`}
    >
      {children}
    </div>
  );
}
