/**
 * PageHeader.jsx
 * Shared page header for all admin pages.
 * Displays the page title, subtitle, a notification bell,
 * and a hamburger menu button visible on mobile/tablet.
 */

import { Bell, List } from "@phosphor-icons/react";

export default function PageHeader({ title, subtitle, onMenuOpen }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-3">
        {/* Hamburger */}
        <button
          onClick={onMenuOpen}
          className="lg:hidden w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted hover:text-black hover:border-primary/30 transition-all flex-shrink-0"
        >
          <List size={18} />
        </button>
        <div>
          <h1 className="font-jakarta font-semibold text-xl sm:text-2xl text-black">
            {title}
          </h1>
          <p className="hidden sm:block text-base text-muted mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Notification bell + Profile */}
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-border flex items-center justify-center text-muted hover:text-black hover:border-primary/30 transition-all flex-shrink-0">
          <Bell size={18} />
        </button>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0 cursor-pointer">
          AD
        </div>
      </div>
    </div>
  );
}
