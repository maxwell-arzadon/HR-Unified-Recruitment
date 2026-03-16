export default function AdminCard({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-border p-6 ${className}`}
    >
      {children}
    </div>
  );
}
