/**
 * StatsBar.jsx
 * A full-width stats bar displayed between the hero and category cards.
 * Shows key recruitment metrics to build trust and encourage applicants.
 * Open positions count is dynamic, pulled from jobs data.
 */

import { Briefcase, CheckCircle, Lightning } from "@phosphor-icons/react";
import { jobs } from "../../../data/jobs_applicant";

export default function StatsBar() {
  const openPositions = jobs.length;

  const stats = [
    {
      icon: <Briefcase size={22} weight="fill" className="text-primary" />,
      value: `${openPositions}+`,
      label: "Open Positions",
      bg: "bg-red-50",
    },
    {
      icon: <CheckCircle size={22} weight="fill" className="text-success" />,
      value: "95%",
      label: "Placement Rate",
      bg: "bg-green-50",
    },
  ];

  return (
    <section className="w-full border-y border-border bg-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[80px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 py-6 px-4 sm:px-8"
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}
              >
                {stat.icon}
              </div>

              {/* Text */}
              <div>
                <p className="font-jakarta font-bold text-xl text-black leading-none">
                  {stat.value}
                </p>
                <p className="text-sm text-zinc-400 mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
