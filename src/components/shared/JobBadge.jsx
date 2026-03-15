export default function JobBadge({ type }) {
  const styles = {
    "Full Time": "bg-red-50 text-primary",
    "Freelance": "bg-[#FFF3E8] text-accent",
    "Language":  "bg-[#F2EFF4] text-muted",
  };

  return (
    <span className={`${styles[type] ?? styles["Full Time"]} text-xs font-bold px-3 py-1 rounded-full`}>
      {type}
    </span>
  );
}