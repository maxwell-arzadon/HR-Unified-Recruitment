export const STAT_CARDS = [
  {
    label: "Total",
    value: 113,
    delta: "+18%",
    positive: true,
    color: "text-black",
    iconBg: "bg-gray/20",
    icon: "total",
  },
  {
    label: "New Candidates",
    value: 55,
    delta: "+12%",
    positive: true,
    color: "text-info",
    iconBg: "bg-info/10",
    icon: "candidate",
  },
  {
    label: "In Process",
    value: 15,
    delta: "+5%",
    positive: true,
    color: "text-accent",
    iconBg: "bg-accent/10",
    icon: "process",
  },
  {
    label: "Hired",
    value: 32,
    delta: "+8%",
    positive: true,
    color: "text-success",
    iconBg: "bg-success/10",
    icon: "hired",
  },
  {
    label: "Rejected",
    value: 11,
    delta: "-3%",
    positive: false,
    color: "text-primary",
    iconBg: "bg-primary/10",
    icon: "rejected",
  },
];

export const PIPELINE = [
  { label: "Applications", value: 240, max: 240, color: "bg-primary" },
  { label: "Screening Calls", value: 120, max: 240, color: "bg-accent" },
  { label: "Interviews", value: 15, max: 240, color: "bg-success" },
];

export const SOURCES = [
  {
    label: "Company Website",
    value: 240,
    color: "bg-primary",
    dot: "bg-primary",
  },
  { label: "LinkedIn", value: 120, color: "bg-info", dot: "bg-info" },
  { label: "Agency", value: 15, color: "bg-accent", dot: "bg-accent" },
  { label: "Career Page", value: 15, color: "bg-success", dot: "bg-success" },
  { label: "Others", value: 15, color: "bg-gray", dot: "bg-gray" },
];

export const BAR_DATA = [
  { date: "Apr 2", applied: 8, interviewed: 7, offered: 4 },
  { date: "Apr 3", applied: 5, interviewed: 4, offered: 6 },
  { date: "Apr 4", applied: 6, interviewed: 3, offered: 5 },
  { date: "Apr 5", applied: 2, interviewed: 1, offered: 3 },
  { date: "Apr 6", applied: 7, interviewed: 6, offered: 5 },
  { date: "Apr 7", applied: 6, interviewed: 5, offered: 7 },
  { date: "Apr 8", applied: 5, interviewed: 4, offered: 9 },
];

export const BAR_LEGEND = [
  { label: "Applied", color: "bg-primary" },
  { label: "Interviewed", color: "bg-accent" },
  { label: "Offered", color: "bg-success" },
];

export const FILTER_TABS = [
  "All",
  "Full Time",
  "Flexible",
  "Language",
  "Analytics",
];
export const TIME_TABS = ["Daily", "Weekly", "Monthly"];

export const COMPLETION_RATE = 45;
export const COMPLETION_DELTA = "+5%";
