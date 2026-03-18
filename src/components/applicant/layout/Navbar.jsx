/**
 * Navbar.jsx
 * Floating navigation bar for the applicant-facing pages.
 * Includes logo, nav links, search input, and a responsive
 * hamburger menu for mobile/tablet viewports.
 */

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";

export default function Navbar({ searchQuery = "", setSearchQuery }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isForm = location.pathname.startsWith("/apply");
  const isTracking = location.pathname === "/track-application";
  const isOpenings = !isForm && !isTracking;

  const handleSearch = (e) => {
    const val = e.target.value;
    if (setSearchQuery) setSearchQuery(val);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("job-listings")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document
        .getElementById("job-listings")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document
            .getElementById("job-listings")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        document
          .getElementById("job-listings")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative">
      <nav className="bg-white rounded-full px-6 py-3 flex items-center justify-between gap-4 shadow-sm">
        {/* Logo */}
        <div
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
          onClick={() => {
            navigate("/");
            setMenuOpen(false);
          }}
        >
          <img src="/logo.png" alt="RC" className="h-7 md:h-8" />
          <div className="hidden sm:block font-jakarta font-bold text-sm leading-tight text-black text-left">
            <div>Recruitment</div>
            <div>Center</div>
          </div>
        </div>

        {/* Nav links — desktop only */}
        <div className="hidden md:flex items-center gap-6">
          <span
            onClick={() => navigate("/")}
            className={`text-sm font-semibold font-jakarta px-5 py-2 rounded-full cursor-pointer transition-colors ${
              isOpenings
                ? "bg-primary text-white"
                : "text-zinc-500 hover:text-black"
            }`}
          >
            Openings
          </span>
          <span
            onClick={() => navigate("/track-application")}
            className={`text-sm font-semibold font-jakarta px-5 py-2 rounded-full cursor-pointer transition-colors ${
              isTracking
                ? "bg-primary text-white"
                : "text-zinc-500 hover:text-black"
            }`}
          >
            Track Application
          </span>
        </div>

        {/* Search + Hamburger */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Search bar — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 border border-border rounded-full px-4 py-2 w-44 md:w-56 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <svg
              className="w-4 h-4 text-zinc-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search a job"
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              className="text-sm placeholder-zinc-400 outline-none w-full bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery?.("")}
                className="text-zinc-300 hover:text-zinc-500 transition-colors flex-shrink-0"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Mobile search icon */}
          <button className="sm:hidden p-2 rounded-full hover:bg-border transition-colors">
            <svg
              className="w-5 h-5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* Hamburger — tablet/mobile only */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg hover:bg-border transition-colors"
          >
            {menuOpen ? (
              <X size={20} className="text-black" />
            ) : (
              <List size={20} className="text-black" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-border overflow-hidden z-50">
          <div className="flex flex-col p-2 gap-1">
            <button
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold font-jakarta transition-colors ${
                isOpenings
                  ? "bg-primary/10 text-primary"
                  : "text-zinc-500 hover:bg-bg hover:text-black"
              }`}
            >
              Openings
            </button>
            <button
              onClick={() => {
                navigate("/track-application");
                setMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold font-jakarta transition-colors ${
                isTracking
                  ? "bg-primary/10 text-primary"
                  : "text-zinc-500 hover:bg-bg hover:text-black"
              }`}
            >
              Track Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
