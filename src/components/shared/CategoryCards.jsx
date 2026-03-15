import { Briefcase, Laptop, Translate } from "@phosphor-icons/react";

const categories = [
  {
    type: "Full Time",
    label: "Full Time Positions",
    desc: "40 hrs/wk • SSS, HDMF, PhilHealth • Paid Holidays",
    open: 12,
    iconBg: "bg-red-50",
    badgeBg: "bg-red-50",
    badgeColor: "text-primary",
    icon: <Briefcase size={22} weight="regular" className="text-primary" />,
  },
  {
    type: "Freelance",
    label: "Freelance Positions",
    desc: "Flexible hours • Work anywhere • Work like a boss",
    open: 12,
    iconBg: "bg-[#FFF3E8]",
    badgeBg: "bg-[#FFF3E8]",
    badgeColor: "text-accent",
    icon: <Laptop size={22} weight="regular" className="text-accent" />,
  },
  {
    type: "Language",
    label: "Language Positions",
    desc: "Flexible hours • Work anywhere • Multilingual",
    open: 12,
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
        {categories.map((cat) => (
          <div
            key={cat.type}
            onClick={() => onCategoryClick(cat.type)}
            className="bg-white border border-border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-all cursor-pointer hover:border-primary/30 hover:-translate-y-0.5"
          >
            <div
              className={`w-10 h-10 rounded-xl ${cat.iconBg} flex items-center justify-center flex-shrink-0`}
            >
              {cat.icon}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-jakarta font-bold text-black text-base">
                {cat.label}
              </h3>
              <p className="text-zinc-400 text-sm">{cat.desc}</p>
            </div>
            <div className="mt-auto">
              <span
                className={`${cat.badgeBg} ${cat.badgeColor} text-xs font-bold px-3 py-1 rounded-full`}
              >
                {cat.open} open
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
