import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  SquaresFour,
  Users,
  Briefcase,
  CalendarBlank,
  VideoCamera,
  SignOut,
  CaretDown,
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
        icon: UserCirclePlus,
      },
      {
        label: "Trainees",
        to: "/admin/applicants/trainees",
        icon: GraduationCap,
      },
      { label: "Passers", to: "/admin/applicants/passers", icon: CheckCircle },
      { label: "Failed", to: "/admin/applicants/failed", icon: XCircle },
      {
        label: "Discontinued",
        to: "/admin/applicants/discontinued",
        icon: ProhibitInset,
      },
    ],
  },
  { label: "Jobs", icon: Briefcase, to: "/admin/jobs" },
  { label: "Calendar", icon: CalendarBlank, to: "/admin/calendar" },
  { label: "Studio Accounts", icon: VideoCamera, to: "/admin/studio" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [applicantsOpen, setApplicantsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const baseLinkClass =
    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 w-full text-left";
  const activeClass = "bg-primary/10 text-primary font-semibold";
  const inactiveClass = "text-muted hover:bg-border hover:text-black";

  return (
    <aside className="fixed top-0 left-0 h-screen w-[220px] bg-white border-r border-border flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-border">
        <img src="/logo.png" alt="RC" className="h-9" />
        <div className="font-jakarta font-bold text-sm leading-tight text-black">
          <div>Recruitment</div>
          <div>Center</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
        {NAV.map((item) => {
          if (item.children) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => setApplicantsOpen((v) => !v)}
                  className={`${baseLinkClass} ${inactiveClass} justify-between`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon size={18} weight="regular" />
                    {item.label}
                  </span>
                  <CaretDown
                    size={14}
                    className={`transition-transform duration-200 ${applicantsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Sub-items */}
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
                          `${baseLinkClass} text-xs ${isActive ? activeClass : inactiveClass}`
                        }
                      >
                        <child.icon size={15} />
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <item.icon size={18} weight="regular" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Admin Profile + Logout */}
      <div className="border-t border-border px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            AD
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-black truncate">Admin</p>
            <p className="text-xs text-muted truncate">admin@rc.com</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors w-full px-1"
        >
          <SignOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
