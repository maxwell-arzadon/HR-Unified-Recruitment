/**
 * CategoryCards.jsx
 * Displays job category cards on the landing page.
 * Each card represents a job type with a description,
 * role examples, best-for guidance, and a dynamic
 * count of open positions pulled from jobs data.
 */

import { Briefcase, Laptop, Translate } from "@phosphor-icons/react";
import { jobs } from "../../../data/jobs_applicant";

const categories = [
  {
    type: "Full Time",
    label: "Full Time Positions",
    desc: "Looking for stability and long-term growth? Our full-time roles offer a 40-hour work week, steady monthly salary, and a complete government benefits package — SSS, PhilHealth, and Pag-IBIG (HDMF) — plus paid leaves and holidays.",
    roles: "Billing Specialists, Customer Support Agents, Back Office Staff",
    bestFor:
      "People seeking a consistent routine and a permanent professional home.",
    iconBg: "bg-red-50",
    badgeBg: "bg-red-50",
    badgeColor: "text-primary",
    icon: <Briefcase size={22} weight="regular" className="text-primary" />,
  },
  {
    type: "Freelance",
    label: "Freelance Positions",
    desc: "Prefer flexibility over a fixed schedule? Partner with us on a per-project or per-task basis and work on your own terms. Note that freelance roles do not include government-mandated benefits (SSS, PhilHealth, Pag-IBIG) as these are the contractor's own responsibility.",
    roles:
      "Virtual Assistants, Data Entry Specialists, Online Customer Support Agents",
    bestFor:
      "Students, side-hustlers, or anyone who wants control over when and where they work.",
    iconBg: "bg-[#FFF3E8]",
    badgeBg: "bg-[#FFF3E8]",
    badgeColor: "text-accent",
    icon: <Laptop size={22} weight="regular" className="text-accent" />,
  },
  {
    type: "Language",
    label: "Language Positions",
    desc: "Speak more than one language? These specialized roles let your linguistic skills take center stage — from multilingual customer support to translation and content moderation for global clients. Available in Spanish, Mandarin, Japanese, Korean, and more.",
    roles:
      "Japanese-Speaking Support Agents, Korean Billing Specialists, Spanish Customer Representatives",
    bestFor:
      "Bilingual or multilingual speakers looking for roles that leverage their unique language skills.",
    iconBg: "bg-[#F2EFF4]",
    badgeBg: "bg-[#F2EFF4]",
    badgeColor: "text-muted",
    icon: <Translate size={22} weight="regular" className="text-muted" />,
  },
];

export default function CategoryCards({ onCategoryClick }) {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[80px] py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => {
          // Dynamically count open positions by matching job type
          const openCount = jobs.filter((j) => j.type === cat.type).length;

          return (
            <div
              key={cat.type}
              onClick={() => onCategoryClick(cat.type)}
              className="bg-white border border-border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-all cursor-pointer hover:border-primary/30 hover:-translate-y-0.5"
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl ${cat.iconBg} flex items-center justify-center flex-shrink-0`}
              >
                {cat.icon}
              </div>

              {/* Title + Description */}
              <div className="flex flex-col gap-2">
                <h3 className="font-jakarta font-bold text-black text-base">
                  {cat.label}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {cat.desc}
                </p>
              </div>
              {/* Dynamic open positions badge */}
              <div className="mt-auto">
                <span
                  className={`${cat.badgeBg} ${cat.badgeColor} text-xs font-bold px-3 py-1 rounded-full`}
                >
                  {openCount} open
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
