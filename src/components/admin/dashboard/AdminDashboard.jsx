import { useState } from "react";
import { Bell } from "@phosphor-icons/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  STAT_CARDS,
  PIPELINE,
  SOURCES,
  BAR_DATA,
  BAR_LEGEND,
  FILTER_TABS,
  TIME_TABS,
  COMPLETION_RATE,
  COMPLETION_DELTA,
} from "../../../data/dashboard.js";

// ─── Stat Card Icons ──────────────────────────────────────────────
const ICONS = {
  total: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5 text-gray"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  candidate: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5 text-info"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  process: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5 text-accent"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  hired: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5 text-success"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  ),
  rejected: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5 text-primary"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  ),
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-xl shadow-lg px-4 py-3 text-xs">
      <p className="font-semibold text-black mb-1.5">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: p.fill }}
          />
          <span className="capitalize text-muted">{p.name}:</span>
          <span className="font-semibold text-black">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ─── SVG Arc Progress ─────────────────────────────────────────────
// - Two circles share the same center, radius, and rotation
// - stroke-dasharray controls how much of the circumference is "drawn"
// - The track covers 240° (SWEEP_DEG), leaving a 120° gap at the bottom
// - The fill arc is a fraction of the track based on the percent value
// - rotate(150) positions the gap symmetrically at the bottom
// - stroke-linecap="round" gives soft rounded ends on both arcs

const RADIUS = 72;
const STROKE = 12;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 452.4
const SWEEP_DEG = 240;
const SWEEP_FRAC = SWEEP_DEG / 360; // 0.667
const TRACK_LENGTH = CIRCUMFERENCE * SWEEP_FRAC;
const GAP_LENGTH = CIRCUMFERENCE - TRACK_LENGTH;
const ROTATE = 150; // starts the arc at bottom-left, ends at bottom-right

function ArcProgress({ percent = 45 }) {
  const fillLength = TRACK_LENGTH * (percent / 100);

  return (
    <div className="relative" style={{ width: 180, height: 180 }}>
      <svg width="180" height="180" viewBox="0 0 180 180">
        {/* Grey track arc */}
        <circle
          cx="90"
          cy="90"
          r={RADIUS}
          fill="none"
          stroke="#F2EFF4"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${TRACK_LENGTH} ${GAP_LENGTH}`}
          transform={`rotate(${ROTATE} 90 90)`}
        />
        {/* Red fill arc */}
        <circle
          cx="90"
          cy="90"
          r={RADIUS}
          fill="none"
          stroke="#FF4545"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${fillLength} ${CIRCUMFERENCE - fillLength}`}
          transform={`rotate(${ROTATE} 90 90)`}
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
      </svg>

      {/* Center label overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="flex items-end leading-none">
          <span className="font-jakarta font-bold text-4xl text-primary">
            {percent}
          </span>
          <span className="font-jakarta font-bold text-lg text-primary mb-0.5">
            %
          </span>
        </div>
        <span className="text-[10px] font-semibold tracking-widest text-muted uppercase mt-1">
          Complete
        </span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTime, setActiveTime] = useState("Weekly");

  return (
    <div className="p-8 min-h-screen">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-jakarta font-semibold text-xl text-black">
            Dashboard
          </h1>
          <p className="text-base text-muted mt-0.5">
            Overview of your recruitment pipeline
          </p>
        </div>
        <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted hover:text-black hover:border-primary/30 transition-all">
          <Bell size={18} />
        </button>
      </div>

      {/* Filter Tabs + Time Toggle */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === tab
                  ? "gradient-bg text-white shadow-sm"
                  : "text-muted hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center border border-border rounded-xl overflow-hidden">
          {TIME_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTime(t)}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                activeTime === t
                  ? "border border-primary text-primary rounded-xl -mx-px z-10 bg-white"
                  : "text-muted hover:text-black bg-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {STAT_CARDS.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-border p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center`}
              >
                {ICONS[card.icon]}
              </div>
              <span
                className={`text-xs font-semibold ${card.positive ? "text-success" : "text-primary"}`}
              >
                {card.delta}
              </span>
            </div>
            <div>
              <p className={`font-jakarta font-bold text-3xl ${card.color}`}>
                {card.value}
              </p>
              <p className="text-xs text-muted mt-0.5">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Hiring Pipeline + Application Sources */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-2xl border border-border p-6">
          <h3 className="font-jakarta font-bold text-base text-black mb-5">
            Hiring Pipeline
          </h3>
          <div className="flex flex-col gap-5">
            {PIPELINE.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-black">{item.label}</span>
                  <span className="text-sm font-bold text-black">
                    {item.value}
                  </span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-700`}
                    style={{ width: `${(item.value / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6">
          <h3 className="font-jakarta font-bold text-base text-black mb-5">
            Application Sources
          </h3>
          <div className="flex flex-col gap-4">
            {SOURCES.map((src) => (
              <div key={src.label} className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${src.dot}`}
                />
                <span className="text-sm text-black flex-1">{src.label}</span>
                <span className="text-sm font-bold text-black w-8 text-right">
                  {src.value}
                </span>
                <div className="w-28 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${src.color}`}
                    style={{ width: `${(src.value / 240) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Application Statistics + Application Status */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-jakarta font-bold text-base text-black">
              Application Statistics
            </h3>
            <button className="flex items-center gap-1.5 border border-border rounded-lg px-3 py-1.5 text-sm text-black font-medium hover:border-primary/40 transition-colors">
              Weekly
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={BAR_DATA} barCategoryGap="30%" barGap={2}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#897F8E" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#897F8E" }}
                axisLine={false}
                tickLine={false}
                ticks={[0, 2, 5, 7, 10]}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "transparent" }}
              />
              <Bar dataKey="applied" fill="#FF4545" radius={[3, 3, 0, 0]} />
              <Bar dataKey="interviewed" fill="#F17F33" radius={[3, 3, 0, 0]} />
              <Bar dataKey="offered" fill="#16A34A" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="flex items-center gap-5 mt-2 justify-center">
            {BAR_LEGEND.map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${l.color}`} />
                <span className="text-xs text-muted">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SVG Arc Progress Card */}
        <div className="bg-white rounded-2xl border border-border p-6 flex flex-col">
          <h3 className="font-jakarta font-bold text-base text-black mb-1">
            Application Status
          </h3>
          <p className="text-xs text-muted mb-4">
            Overall completion rate this period
          </p>
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <ArcProgress percent={COMPLETION_RATE} />
            <p className="text-sm text-muted">
              <span className="text-success font-semibold">
                {COMPLETION_DELTA}
              </span>{" "}
              increase from last week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
