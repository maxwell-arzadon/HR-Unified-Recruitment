import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  SquaresFour,
  Users,
  Briefcase,
  CalendarDots,
  Star,
  SignOut,
  CaretDown,
  CaretLeft,
  CaretRight,
  UserCirclePlus,
  GraduationCap,
  CheckCircle,
  XCircle,
  ProhibitInset,
} from "@phosphor-icons/react";

const NAV = [
  {
    label: "Dashboard",
    icon: SquaresFour,
    to: "/admin/dashboard",
  },
  {
    label: "Applicants",
    icon: Users,
    children: [
      {
        label: "New Applicants",
        to: "/admin/applicants/new",
      },
      {
        label: "Trainees",
        to: "/admin/applicants/trainees",
      },
      { label: "Passers", to: "/admin/applicants/passers" },
      { label: "Failed", to: "/admin/applicants/failed" },
      {
        label: "Discontinued",
        to: "/admin/applicants/discontinued",
      },
    ],
  },
  { label: "Jobs", icon: Briefcase, to: "/admin/jobs" },
  { label: "Calendar", icon: CalendarDots, to: "/admin/calendar" },
  { label: "Studio Accounts", icon: Star, to: "/admin/studio" },
];

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();
  const [applicantsOpen, setApplicantsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const baseLinkClass =
    "flex items-center rounded-xl text-sm font-medium transition-all duration-150 w-full text-left";
  const activeClass = "bg-primary/10 text-primary font-semibold";
  const inactiveClass = "text-muted hover:bg-border hover:text-black";

  return (
    <aside
      className={` fixed top-0 left-0 h-screen bg-white border-r border-border flex flex-col z-30 transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[220px]"
      }`}
    >
      <div
        className={`flex items-center border-b border-border ${
          collapsed
            ? "justify-center px-0 py-6" // centered, no side padding
            : "gap-3 px-5 py-6" // normal layout
        }`}
      >
        <img
          src="/logo.png"
          alt="RC"
          className="h-9 w-9 object-contain flex-shrink-0" // fixed width prevents compression
        />
        {!collapsed && (
          <div className="font-jakarta font-bold text-sm leading-tight text-black">
            <div>Recruitment</div>
            <div>Center</div>
          </div>
        )}
      </div>

      {/* ── Floating toggle on sidebar edge ──────────────────── */}
      <button
        onClick={onToggle}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-[52px] w-6 h-6 rounded-full bg-white border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 shadow-sm transition-all z-50"
      >
        {collapsed ? (
          <CaretRight size={10} weight="bold" />
        ) : (
          <CaretLeft size={10} weight="bold" />
        )}
      </button>
      {/* ── Nav ──────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
        {NAV.map((item) => {
          // ── Collapsible group (Applicants) ──
          if (item.children) {
            return (
              <div key={item.label}>
                <button
                  onClick={
                    () =>
                      collapsed
                        ? navigate("/admin/applicants/new") // collapsed: go directly
                        : setApplicantsOpen((v) => !v) // expanded: toggle dropdown
                  }
                  title={collapsed ? "Applicants" : undefined}
                  className={`${baseLinkClass} ${inactiveClass} ${
                    collapsed
                      ? "justify-center py-2.5"
                      : "justify-between gap-3 px-3 py-2.5"
                  }`}
                >
                  <span
                    className={`flex items-center ${collapsed ? "" : "gap-3"}`}
                  >
                    <item.icon
                      size={18}
                      weight="regular"
                      className="flex-shrink-0"
                    />
                    {!collapsed && item.label}
                  </span>
                  {!collapsed && (
                    <CaretDown
                      size={14}
                      className={`transition-transform duration-200 flex-shrink-0 ${
                        applicantsOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Sub-items — hidden entirely when collapsed */}
                {!collapsed && (
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      applicantsOpen
                        ? "max-h-60 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) =>
                            `${baseLinkClass} gap-3 px-3 py-2.5 text-xs ${
                              isActive ? activeClass : inactiveClass
                            }`
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }

          // ── Regular nav link ──
          return (
            <NavLink
              key={item.to}
              to={item.to}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `${baseLinkClass} ${isActive ? activeClass : inactiveClass} ${
                  collapsed ? "justify-center py-2.5" : "gap-3 px-3 py-2.5"
                }`
              }
            >
              <item.icon size={18} weight="regular" className="flex-shrink-0" />
              {!collapsed && item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* ── Admin Profile + Logout ────────────────────────────── */}
      <div className="border-t border-border px-4 py-4">
        <div
          className={`flex items-center mb-3 ${collapsed ? "justify-center" : "gap-3"}`}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            AD
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-black truncate">Admin</p>
              <p className="text-xs text-muted truncate">admin@rc.com</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={`flex items-center text-sm text-muted hover:text-primary transition-colors w-full ${
            collapsed ? "justify-center" : "gap-2 px-1"
          }`}
        >
          <SignOut size={16} className="flex-shrink-0" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
