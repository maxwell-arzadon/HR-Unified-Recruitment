import { Bell } from "@phosphor-icons/react";

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="font-jakarta font-semibold text-xl text-black">
          {title}
        </h1>
        <p className="text-base text-muted mt-0.5">{subtitle}</p>
      </div>
      <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted hover:text-black hover:border-primary/30 transition-all">
        <Bell size={18} />
      </button>
    </div>
  );
}
