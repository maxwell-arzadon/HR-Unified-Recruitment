/**
 * dashboard.js
 * Realistic dummy data for the admin dashboard.
 * Based on a mid-sized Philippine BPO/recruitment center
 * processing ~300 applications per month.
 *
 */

// Stat Cards
export const STAT_CARDS = [
  {
    label: "Total",
    value: 300,
    delta: "+18%",
    positive: true,
    color: "text-black",
    iconBg: "bg-gray/20",
    icon: "total",
  },
  {
    label: "New Candidates",
    value: 87,
    delta: "+12%",
    positive: true,
    color: "text-info",
    iconBg: "bg-info/10",
    icon: "candidate",
  },
  {
    label: "In Process",
    value: 54,
    delta: "+5%",
    positive: true,
    color: "text-accent",
    iconBg: "bg-accent/10",
    icon: "process",
  },
  {
    label: "Hired",
    value: 68,
    delta: "+8%",
    positive: true,
    color: "text-success",
    iconBg: "bg-success/10",
    icon: "hired",
  },
  {
    label: "Rejected",
    value: 47,
    delta: "-3%",
    positive: false,
    color: "text-primary",
    iconBg: "bg-primary/10",
    icon: "rejected",
  },
  {
    label: "Discontinued",
    value: 44,
    delta: "-2%",
    positive: false,
    color: "text-muted",
    iconBg: "bg-gray/20",
    icon: "discontinued",
  },
];

// Applicants by Position
export const POSITION_DATA = [
  { position: "Non Voice Support", applicants: 98, hired: 28 },
  { position: "Customer Support", applicants: 82, hired: 24 },
  { position: "Senior Programmer", applicants: 45, hired: 8 },
  { position: "Email Support", applicants: 38, hired: 4 },
  { position: "Marketing Lead", applicants: 22, hired: 2 },
  { position: "SEO Personnel", applicants: 15, hired: 2 },
];

// Application Sources
export const SOURCES = [
  {
    label: "Company Website",
    value: 120,
    color: "bg-primary",
    dot: "bg-primary",
  },
  { label: "LinkedIn", value: 75, color: "bg-info", dot: "bg-info" },
  { label: "Indeed", value: 48, color: "bg-accent", dot: "bg-accent" },
  { label: "Referral", value: 32, color: "bg-success", dot: "bg-success" },
  { label: "Agency", value: 25, color: "bg-gray", dot: "bg-gray" },
];

// ─── Bar Chart — Weekly Application Statistics ────────────────────
export const BAR_DATA = [
  { date: "Mon", applied: 48, interviewed: 22, offered: 9 },
  { date: "Tue", applied: 55, interviewed: 28, offered: 12 },
  { date: "Wed", applied: 42, interviewed: 19, offered: 8 },
  { date: "Thu", applied: 61, interviewed: 31, offered: 14 },
  { date: "Fri", applied: 57, interviewed: 26, offered: 11 },
  { date: "Sat", applied: 22, interviewed: 10, offered: 4 },
  { date: "Sun", applied: 15, interviewed: 6, offered: 2 },
];

export const BAR_LEGEND = [
  { label: "Applied", color: "bg-info" },
  { label: "Interviewed", color: "bg-accent" },
  { label: "Offered", color: "bg-success" },
];

// Filter + Time Tabs
export const FILTER_TABS = [
  "All",
  "Full Time",
  "Flexible",
  "Language",
  "Analytics",
];
export const TIME_TABS = ["Daily", "Weekly", "Monthly"];

// Hire Rate
export const COMPLETION_RATE = 53; // (68 + 47 + 44) / 300
export const COMPLETION_DELTA = "+5%";
