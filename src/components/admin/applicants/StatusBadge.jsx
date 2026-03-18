/**
 * StatusBadge.jsx
 * Reusable colored pill badge components for applicant tables.
 * Exports StatusBadge with color-coded styles
 * based on status (Interview, Passed, etc.).
 */

const STATUS_STYLES = {
  Interview: "text-accent border border-accent/40 bg-accent/5",
  Orientation: "text-info border border-info/40 bg-info/5",
  Passed: "text-success border border-success/40 bg-success/5",
  Certification: "text-muted border border-muted/30 bg-gray/10",
  Failed: "text-primary border border-primary/40 bg-primary/5",
  Hired: "text-success border border-success/40 bg-success/5",
  Discontinued: "text-muted border border-muted/30 bg-gray/10",
};

export function StatusBadge({ status }) {
  const styles =
    STATUS_STYLES[status] ?? "text-muted border border-muted/30 bg-gray/10";
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
}
